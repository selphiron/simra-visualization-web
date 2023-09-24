<template>
    <div>
        <div class="leaflet-control topcenter rides-submode-switcher" v-if="subViewMode === config.subViewModes.RIDES_DENSITY_ALL || subViewMode === config.subViewModes.RIDES_ORIGINAL">
            <b-tabs type="is-toggle-rounded"
                    :value="subViewMode"
                    @change="$emit('update:sub-view-mode', $event)"
                    @update="$emit('update:sub-view-mode', $event)"
            >
                <b-tab-item :label="$t('ride.density')" icon="chart-area"></b-tab-item>
                <b-tab-item :label="$t('ride.originalRides')" icon="database"></b-tab-item>
            </b-tabs>
        </div>

        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_ALL
&& rideThreshold === config.rideThreshold.ONE" :url="TILE_URL + '/tiles/rides-density_all/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_ALL_5
&& rideThreshold === config.rideThreshold.FIVE" :url="TILE_URL + '/tiles/rides-density_all_5/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_ALL_10
&& rideThreshold === config.rideThreshold.TEN" :url="TILE_URL + '/tiles/rides-density_all_10/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_ALL_25
&& rideThreshold === config.rideThreshold.TWENTYFIVE" :url="TILE_URL + '/tiles/rides-density_all_20/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_RUSHHOURMORNING
&& rideThreshold === config.rideThreshold.ONE" :url="TILE_URL + '/tiles/rides-density_rushhourmorning/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_RUSHHOURMORNING_5
&& rideThreshold === config.rideThreshold.FIVE" :url="TILE_URL + '/tiles/rides-density_rushhourmorning_5/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_RUSHHOURMORNING_10
&& rideThreshold === config.rideThreshold.TEN" :url="TILE_URL + '/tiles/rides-density_rushhourmorning_10/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_RUSHHOURMORNING_20
&& rideThreshold === config.rideThreshold.TWENTYFIVE" :url="TILE_URL + '/tiles/rides-density_rushhourmorning_20/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_RUSHHOUREVENING
&& rideThreshold === config.rideThreshold.ONE" :url="TILE_URL + '/tiles/rides-density_rushhourevening/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_RUSHHOUREVENING_5
&& rideThreshold === config.rideThreshold.FIVE" :url="TILE_URL + '/tiles/rides-density_rushhourevening_5/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_RUSHHOUREVENING_10
&& rideThreshold === config.rideThreshold.TEN" :url="TILE_URL + '/tiles/rides-density_rushhourevening_10/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_RUSHHOUREVENING_25
&& rideThreshold === config.rideThreshold.TWENTYFIVE" :url="TILE_URL + '/tiles/rides-density_rushhourevening_20/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_WEEKEND
&& rideThreshold === config.rideThreshold.ONE" :url="TILE_URL + '/tiles/rides-density_weekend/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_WEEKEND_5
&& rideThreshold === config.rideThreshold.FIVE" :url="TILE_URL + '/tiles/rides-density_weekend_5/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_WEEKEND_10
&& rideThreshold === config.rideThreshold.TEN" :url="TILE_URL + '/tiles/rides-density_weekend_10/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_DENSITY_WEEKEND_25
&& rideThreshold === config.rideThreshold.TWENTYFIVE" :url="TILE_URL + '/tiles/rides-density_weekend_20/{z}/{x}/{y}.png'"/>
        <l-tile-layer v-if="subViewMode === config.subViewModes.RIDES_ORIGINAL" :url="TILE_URL + '/tiles/rides-original/{z}/{x}/{y}.png'"/>
    </div>
</template>

<script>
import { LGeoJson, LTileLayer } from "vue2-leaflet";

import Config from "@/constants";

export default {
    name: "RideView",
    components: {
        LGeoJson,
        LTileLayer,
    },
    props: {
        subViewMode: Number,
        rideThreshold: Number,
    },
    data() {
        return {
            config: Config,
        }
    },
    computed: {
        TILE_URL() {
            return process.env.VUE_APP_TILE_URL;
        },
    },
    watch: {
        subViewMode: function (newValue, oldValue) {
            console.log("subViewMode oldValue:", oldValue)
            console.log("subViewMode newValue:", newValue)
        },
        rideThreshold: function (newValue, oldValue) {
            console.log("rideThreshold oldValue:", oldValue)
            console.log("rideThreshold newValue:", newValue)
        }
    }
};
</script>

<style lang="scss">
    .rides-submode-switcher .b-tabs {
        margin-top: 16px;

        li > a {
            background-color: white;
            color: #3273dc;
        }
    }
</style>
