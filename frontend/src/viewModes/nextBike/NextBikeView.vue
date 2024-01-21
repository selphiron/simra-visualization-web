<template>
    <div>


        <template>
            <l-geo-json v-if="stations"
                        :geojson="stations"
                        :options="stationsMarkerStyle">
                <l-popup/>
            </l-geo-json>
            <l-geo-json v-if="connections"
                        :geojson="connections"
                        :options="connectionsLineStyle"
                        >
                <l-popup/>
            </l-geo-json>

        </template>
    </div>
</template>

<script>
import Vue from "vue";
import { LGeoJson, LTooltip, LMarker, LTileLayer } from "vue2-leaflet";

import { ExtraMarkers } from "leaflet-extra-markers";


import MapPopupNextBikeMarker from "@/components/MapPopupNextBikeMarker.vue";
import MapPopupNextBikeLine from "@/components/MapPopupNextBikeLine.vue";
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
    data: function () {
        return {
            // Markers
            stations: require("@/assets/SAP Bikesharing.json"),
            stationsMarkerStyle: {
                pointToLayer: (feature, latlng) => L.marker(latlng, {
                    icon: ExtraMarkers.icon({
                        icon: "fa-bicycle",
                        markerColor: "blue",
                        prefix: "fa",
                    }),
                }),
                onEachFeature: (feature, layer) => {
                    layer.bindPopup(() => {
                        const mapPopup = new (Vue.extend(MapPopupNextBikeMarker))({
                            propsData: {
                                station: feature.properties,
                                t: (key) => {
                                    return this.$t(key)
                                },
                            },
                        });
                        return mapPopup.$mount().$el;
                    })
                    layer.on({
                        click: this.clickedOnMarker
                    })

                },

            },
            connections: null,
            connectionsLineStyle: {
                onEachFeature: (feature, layer) => {
                    layer.bindPopup(() => {
                        const mapPopup = new (Vue.extend(MapPopupNextBikeLine))({
                            propsData: {
                                connection: feature.properties,
                                t: (key) => {
                                    return this.$t(key)
                                },
                            },
                        });
                        return mapPopup.$mount().$el;
                    })

                }
            },
            lastClickedMarker: null

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
        clickedOnMarker(event) {
            if (event.target.feature.geometry.coordinates !== this.lastClickedMarker) {

                let thisConnections = {
                    "type": "FeatureCollection",
                    "features": []
                }


                let stationsArray = event.target.feature.properties.stations.split("$")


                if (event.target.feature.properties.stations.length > 0) {
                    stationsArray.forEach((item) => {
                        const itemArray = item.split(";")
                        const otherStationName = itemArray[0]
                        const otherStationLng = itemArray[1]
                        const otherStationLat = itemArray[2]
                        const ridesToOtherStation = itemArray[3]
                        const ridesFromOtherStation = itemArray[4]

                        thisConnections.features.push({
                            "type": "Feature",
                            "properties": {
                                "name": otherStationName,
                                "starts": ridesToOtherStation,
                                "ends": ridesFromOtherStation,
                            },
                            "geometry": {
                                "type": "LineString",
                                "coordinates": [[event.target.feature.geometry.coordinates[0], event.target.feature.geometry.coordinates[1]], [otherStationLng, otherStationLat]]
                            }
                        })
                    })
                    this.connections = thisConnections
                }
                this.lastClickedMarker = event.target.feature.geometry.coordinates
            } else {
                this.lastClickedMarker = null
                this.connections = null
            }
        }

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
