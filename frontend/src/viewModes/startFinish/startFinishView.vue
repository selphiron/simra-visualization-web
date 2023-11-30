<template>
    <div>
        <vue2-leaflet-markercluster>
            <l-geo-json v-if="startFinishPoints"
                        :geojson="startFinishPoints"
                        :options="markerStyle"
                        >
                <l-popup/>
            </l-geo-json>
        </vue2-leaflet-markercluster>
    </div>
</template>

<script>
import Vue from "vue";
import { LGeoJson, LTooltip, LMarker, LTileLayer } from "vue2-leaflet";
import Vue2LeafletMarkercluster from "vue2-leaflet-markercluster"

import { ExtraMarkers } from "leaflet-extra-markers";
import MapPopupAccident from "@/components/MapPopupAccident.vue";

export default {
    name: "StartFinishView",
    components: {
        LGeoJson,
        LTooltip,
        LMarker,
        LTileLayer,
        Vue2LeafletMarkercluster
    },
    data() {
        return {
            // Markers
            startFinishPoints: require("@/assets/startFinishPoints.json"),
            startFinishRequestKey: null,
            markerStyle: {
              pointToLayer: (feature, latlng) => L.marker(latlng, {
                icon: ExtraMarkers.icon({
                  icon: this.getIcon(feature.properties),
                  markerColor: this.getIconColor(feature.properties),
                  prefix: "fa",
                }),
              }),

            }

        }
    },
    methods: {
        getIcon(properties) {
            // console.log("properties:",JSON.parse(JSON.stringify(properties)))
            if(properties.type === "start") {
                return "fa-step-forward"
            } else {
                return "fa-flag-checkered"
            }
        },
        getIconColor(properties) {
            if(properties.type === "start") {
                return "blue"
            } else {
                return "orange-dark"
            }
        }
    },



}
</script>
