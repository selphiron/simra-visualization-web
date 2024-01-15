<template>
    <div>


        <template>
            <l-geo-json v-if="stations"
                        :geojson="stations"
                        :options="stationsMarkerStyle">
                <l-popup/>
            </l-geo-json>

        </template>
    </div>
</template>

<script>
import Vue from "vue";
import { LGeoJson, LTooltip, LMarker, LTileLayer } from "vue2-leaflet";
import Vue2LeafletMarkercluster from "vue2-leaflet-markercluster"

import { ExtraMarkers } from "leaflet-extra-markers";

import { IncidentUtils } from "@/services/IncidentUtils";
import { ApiService } from "@/services/ApiService";
import MapPopup from "@/components/MapPopup";
import MapPopupAccident from "@/components/MapPopupAccident.vue";
import MapPopupNextBike from "@/components/MapPopupNextBike.vue";
export default {
    name: "NextBikeView",
    components: {
        LGeoJson,
        LTooltip,
        LMarker,
        LTileLayer
    },
    props: {
        zoom: Number,
        bounds: Object,
    },
    data() {
        return {
            // Markers
            stations: require("@/assets/nextbike_combined.json"),
            stationsMarkerStyle: {
                pointToLayer: (feature, latlng) => L.marker(latlng, {
                    icon: ExtraMarkers.icon({
                        icon: "fa-bicycle",
                        markerColor: "blue",
                        prefix: "fa",
                    }),
                }),
                onEachFeature: (feature, layer) => layer.bindPopup(() => {
                    const mapPopup = new (Vue.extend(MapPopupNextBike))({
                        propsData: {
                            station: feature.properties,
                            t: (key) => { return this.$t(key) },
                        },
                    });
                    return mapPopup.$mount().$el;
                }),
            },

        }
    },
    computed: {
        TILE_URL() {
            return process.env.VUE_APP_TILE_URL;
        },
    },
    methods: {
        clickedOnMap(event) {
            if (event.originalEvent.target.nodeName !== 'path' && this.rideHighlighted != null) {
                this.resetRideHighlight();
            }
        },
    },
};
</script>

<style lang="scss">
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>

<style lang="less">
@import "~leaflet-extra-markers/src/assets/less/leaflet.extra-markers";

.extra-marker {
    background-image: url("../../assets/markers_custom.png");

    &.extra-marker-circle-white i.fa.fa-biking {
        color: #555 !important;
    }
}

.extra-marker-shadow {
    background-image: url("../../assets/markers_shadow.png");
    opacity: 0.75;
}

@media (min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),
(-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5),(min-resolution: 1.5dppx) {
    .extra-marker {
        background-image: url("../../assets/markers_custom@2x.png");
    }

    .extra-marker-shadow {
        background-image: url("../../assets/markers_shadow@2x.png");
    }
}
</style>
