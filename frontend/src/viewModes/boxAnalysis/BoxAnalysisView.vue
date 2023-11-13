<template>
    <div>
        <div class="leaflet-control topcenter rides-submode-switcher">
            <b-tabs type="is-toggle-rounded"
                    :value="boxViewMode"
                    @change="setBoxViewMode($event)"
                    @update="setBoxViewMode($event)">
                <b-tab-item :label="$t('boxAnalysis.startDestination')" icon="route"></b-tab-item>
                <b-tab-item :label="$t('boxAnalysis.originalRides')" icon="database"></b-tab-item>
            </b-tabs>
        </div>
        <div v-if="polygonResult">
            <div v-if="boxViewMode === 1">
                <l-geo-json :geojson="polygonResult" :options="rideStyle"/>
                <div v-if="polygonResult.features" class="leaflet-control bottomcenter">
                    <div class="overlay text" style="text-align: center">
                        {{ $t("boxAnalysis.numberOfRides") + polygonResult.features.length }}
                    </div>
                </div>
            </div>
            <div v-else-if="boxViewMode === 0">
                <l-geo-json :geojson="startDestinationResult" :options="markerStyle"/>
                <div v-if="startDestinationResult.features" class="leaflet-control bottomcenter">
                    <div class="overlay text" style="text-align: center">
                        {{ $t("boxAnalysis.numberOfRides") + startDestinationResult.features.length }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { LGeoJson } from "vue2-leaflet";
import LDraw from "leaflet-draw";
import * as L from "leaflet";

import Config from "@/constants";
import { ApiService } from "@/services/ApiService";
import {ExtraMarkers} from "leaflet-extra-markers";
import {IncidentUtils} from "@/services/IncidentUtils";
import Vue from "vue";
import MapPopup from "@/components/MapPopup.vue";

export default {
    name: "BoxAnalysisView",
    components: {
        LGeoJson,
        LDraw,
    },
    props: {
        mapLayer: { default: {} },
        subViewMode: Number,
    },
    data() {
        return {
            boxViewMode: 0, // 0: start destination, 1: original rides
            config: Config,
            polygon: null,
            polygonResult: [],
            polygonResultAll: null,
            polygonResultStart: null,
            polygonResultEnd: null,
            startDestinationResult: [],
            polygonResultLoaded: false,
            polygonTool: null,
            rideStyle: {
                style: feature => {
                    return {
                        // color: ['#90ee90', '#6ccc6c', '#48a948', '#248724', '#006400'][(this.rideStyleHelperCounter++ % 5)],
                        color: ['#90ee90', '#6ccc6c', '#48a948', '#248724', '#006400'][feature.properties.color],
                        weight: 2,
                        opacity: 0.8,
                    };
                },
            },
            markerStyle: {
                pointToLayer: (feature, latlng) =>
                    L.marker(latlng, {
                        icon: ExtraMarkers.icon({
                            icon: this.getStartDestinationIcon(feature.geometry.coordinates, latlng),
                            markerColor: this.getStartDestinationMarkerColor(feature.geometry.coordinates, latlng),
                            prefix: "fa",
                        }),
                    }),
            },
            rideStyleHelperCounter: 0,
        }
    },
    methods: {
        getStartDestinationIcon(incident, latlng) {
            if (latlng.lng === incident[0][0] && latlng.lat === incident[0][1]) {
                return "fa-step-forward"
            } else {
                return "fa-flag-checkered"
            }
        },
        getStartDestinationMarkerColor(incident, latlng) {
            if (latlng.lng === incident[0][0] && latlng.lat === incident[0][1]) {
                return "blue"
            } else {
                return "orange-dark"
            }
        },

        setBoxViewMode(event) {
            console.log("bTabClicked event:", event)
            this.boxViewMode = event
        },
        initPolygonSelection(mapObject) {
            // Fixing moving the map while adding polygon points
            // Source: https://gis.stackexchange.com/questions/341221/while-dragging-a-map-in-leaflet-it-marks-a-point-for-the-feature
            // 2nd Source: https://github.com/Leaflet/Leaflet.draw/issues/695
            const originalOnTouch = L.Draw.Polyline.prototype._onTouch;
            L.Draw.Polyline.prototype._onTouch = function (e) {
                if (e.originalEvent.pointerType !== "mouse" && e.originalEvent.pointerType !== "touch") {
                    return originalOnTouch.call(this, e);
                }
            };

            this.polygonTool = new L.Draw.Polygon(mapObject, {
                showArea: true,
                showLength: true,
            });
            this.polygonTool.enable();

            mapObject.on(window.L.Draw.Event.CREATED, (e) => {
                if (e.layerType !== 'polygon') return;

                this.polygonResult = [];
                this.polygonResultAll = null;
                this.polygonResultStart = null;
                this.polygonResultEnd = null;
                this.startDestinationResult = [];
                this.mapLayer.clearLayers();
                this.mapLayer.addLayer(e.layer);

                this.polygon = e.layer._latlngs[0].flatMap(x => `${x.lng}+${x.lat}`);
                this.polygon.push(this.polygon[0]);
                this.loadRides();

                console.log("User selected polygon area: " + this.polygon);
            });

            // Removing polygon and rides on click
            this.mapLayer.on('click', () => {
                this.polygon = null;
                this.polygonResult = [];
                this.polygonResultAll = null;
                this.polygonResultStart = null;
                this.polygonResultEnd = null;
                this.startDestinationResult = [];
                this.mapLayer.clearLayers();
                this.polygonTool.enable();
            });
        },
        loadRides() {
            let modes = [];
            if (this.subViewMode & 1 << 0 && this.polygonResultAll === null) modes.push("contains");
            if (this.subViewMode & 1 << 1 && this.polygonResultStart === null) modes.push("containsStart");
            if (this.subViewMode & 1 << 2 && this.polygonResultEnd === null) modes.push("containsEnd");

            if (modes.length > 0) this.apiWorker.postMessage(["polygon", this.polygon, modes]);
        },
        handleWorkerMessage(message) {
            switch (message.data[0]) {
                case "progress":
                    this.$emit('on-progress', message.data[1], message.data[2])
                    break;
                case "polygon":
                    if (message.data[2] === "contains") this.polygonResultAll = message.data[1];
                    if (message.data[2] === "containsStart") this.polygonResultStart = message.data[1];
                    if (message.data[2] === "containsEnd") this.polygonResultEnd = message.data[1];
                    this.mergeResults();
                    break;
            }
        },
        mergeResults() {
            let features = [];
            let startDestinationFeatures = [];
            let filenames = new Set();

            let iterationFn = (bitFlag, partialResult) => {
                if (this.subViewMode & bitFlag && partialResult !== null) {
                    partialResult.features.forEach((f, i) => {
                        if (!filenames.has(f.properties.filename)) {
                            startDestinationFeatures.push({
                                type: "Feature",
                                geometry: {
                                    type: "MultiPoint",
                                    coordinates: [f.geometry.coordinates[0], f.geometry.coordinates[f.geometry.coordinates.length - 1]]
                                },
                                properties: {
                                    startDestination: true
                                }
                            })
                            f.properties.color = parseInt(f.properties.filename.split("_")[1]) % 5;

                            features.push(f);
                            filenames.add(f.properties.filename);
                        }
                    });
                }
            }

            iterationFn(1 << 0, this.polygonResultAll);
            iterationFn(1 << 1, this.polygonResultStart);
            iterationFn(1 << 2, this.polygonResultEnd);

            this.polygonResult = {
                type: "FeatureCollection",
                features: features,
            }
            this.startDestinationResult = {
                type: "FeatureCollection",
                features: startDestinationFeatures
            }
        },
        initLeafletDrawTranslations() {
            L.drawLocal.draw.handlers.polygon.tooltip.start = this.$t('boxAnalysis.draw.polygonStart');
            L.drawLocal.draw.handlers.polygon.tooltip.cont = this.$t('boxAnalysis.draw.polygonContinue');
            L.drawLocal.draw.handlers.polygon.tooltip.end = this.$t('boxAnalysis.draw.polygonEnd');
        },
    },
    async mounted() {
        this.apiWorker = new Worker("/ApiWorker.js");
        this.apiWorker.onmessage = this.handleWorkerMessage;
        this.apiWorker.postMessage(["backendUrl", ApiService.URL_API]);
        this.initLeafletDrawTranslations();

        this.$nextTick(() => {
            // Awkwardly waiting for the map layer object to be created
            setTimeout(() => {
                this.initPolygonSelection(this.$parent.mapObject);
            }, 500);
        });
    },
    beforeDestroy() {
        // Remove listeners and disable polygon tool
        this.$parent.mapObject.off(window.L.Draw.Event.CREATED);
        this.polygonTool.disable();

        this.mapLayer.off('click');
        this.mapLayer.clearLayers();
    },
    watch: {
        subViewMode: function (newValue, oldValue) {
            if (newValue !== oldValue && this.polygon !== null) {
                this.loadRides();
                this.mergeResults();
            }
        },
        $i18n: function (newValue, oldValue) {
            if (newValue !== oldValue) this.initLeafletDrawTranslations();
        }
    }
};
</script>

<style lang="scss">
    @import '~leaflet-draw/dist/leaflet.draw.css';
    .leaflet-control {

      &.bottomcenter {
        position: absolute;
        bottom: 0;
        width: 200px !important;
        left: calc(50% - 100px) !important;
        right: calc(50% - 100px) !important;
      }

      .overlay {
        padding: 10px;
        background-color: white;
        -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);
        color: #4a4a4a;
        position: relative;
      }

      &.leaflet-control-zoom {
        display: none;
      }
    }
</style>
