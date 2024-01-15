<template>
    <div class="sidebar" :class="{ small: small }">
        <div class="entries">
            <!-- Rides -->
            <SidebarEntry
                :title="$t('sidebar.rides')"
                icon="fa-biking"
                :icon-color="'#156ec7'"
                :is-small="small"
                :class="{ selected: value === config.viewModes.RIDES }"
                @entryClicked="switchToView(config.viewModes.RIDES)"
            >
                <div class="field">
                    <b-radio
                        v-model="computedSubViewMode"
                        :native-value="determineNativeValue('all')"
                    >
                        {{ $t("ride.all") }}
                    </b-radio>
                </div>
                <div class="field">
                    <b-radio
                        v-model="computedSubViewMode"
                        :native-value="
                            config.subViewModes.RIDES_DENSITY_RUSHHOURMORNING
                        "
                    >
                        {{ $t("ride.rushHourMorning") }}
                    </b-radio>
                </div>
                <div class="field">
                    <b-radio
                        v-model="computedSubViewMode"
                        :native-value="
                            config.subViewModes.RIDES_DENSITY_RUSHHOUREVENING
                        "
                    >
                        {{ $t("ride.rushHourEvening") }}
                    </b-radio>
                </div>
                <div class="field">
                    <b-radio
                        v-model="computedSubViewMode"
                        :native-value="
                            config.subViewModes.RIDES_DENSITY_WEEKEND
                        "
                    >
                        {{ $t("ride.weekend") }}
                    </b-radio>
                </div>
                <b-field label="Anzahl der Fahrten">
<!--                    <b-slider v-model="filterRideHours" @change="ridesChanged"
                              :min="1" :max="20" :step="5">
                        <template v-for="h in [1, 5, 10, 15, 20]">
                            <b-slider-tick :value="h" :key="h">{{ h }}</b-slider-tick>
                        </template>
                    </b-slider>-->
                    <b-slider :min="0" :max="6" v-model="sliderTick" @change="minRidesChanged" label="Anzahl der Fahrten" :tooltip="false">
                        <b-slider-tick :value="0">1</b-slider-tick>
                        <b-slider-tick :value="1">5</b-slider-tick>
                        <b-slider-tick :value="2">10</b-slider-tick>
                        <b-slider-tick :value="3">25</b-slider-tick>
                        <b-slider-tick :value="4">50</b-slider-tick>
                        <b-slider-tick :value="5">100</b-slider-tick>
                        <b-slider-tick :value="6">200</b-slider-tick>

                    </b-slider>
                </b-field>
            </SidebarEntry>

            <SidebarEntry
                :title="$t('sidebar.startFinish')"
                icon="fa-route"
                :icon-color="'#1d917c'"
                :is-small="small"
                :class="{ selected: value === config.viewModes.START_FINISH }"
                @entryClicked="switchToView(config.viewModes.START_FINISH)"
            >
                <div class="entry-subtext">
                    {{ $t("sidebar.startFinishDescription") }}
                </div>
            </SidebarEntry>

            <!-- Incidents -->
            <SidebarEntry
                :title="$t('sidebar.incidents')"
                icon="fa-car-crash"
                :icon-color="'#d63e12'"
                :is-small="small"
                :class="{ selected: value === config.viewModes.INCIDENTS }"
                @entryClicked="switchToView(config.viewModes.INCIDENTS)"
            >
                <div class="entry-subtext">
                    {{ $t("sidebar.incidentsDescription") }}
                </div>
            </SidebarEntry>

            <!-- Surface quality -->
            <SidebarEntry
                :title="$t('sidebar.surfaceQuality')"
                icon="fa-road"
                :icon-color="'#156ec7'"
                :is-small="small"
                :class="{
                    selected: value === config.viewModes.SURFACE_QUALITY
                }"
                @entryClicked="switchToView(config.viewModes.SURFACE_QUALITY)"
            >
                <div class="entry-subtext">
                    {{ $t("sidebar.surfaceQualityDescription") }}
                </div>
            </SidebarEntry>

            <!-- Speed -->
            <SidebarEntry
                :title="$t('sidebar.relativeSpeed')"
                icon="fa-tachometer-alt"
                :icon-color="'#1d917c'"
                :is-small="small"
                :class="{ selected: value === config.viewModes.RELATIVE_SPEED }"
                @entryClicked="switchToView(config.viewModes.RELATIVE_SPEED)"
            >
                <div class="entry-subtext">
                    {{ $t("sidebar.relativeSpeedDescription") }}
                </div>
            </SidebarEntry>

            <!-- Stop times -->
            <SidebarEntry
                :title="$t('sidebar.stopTimes')"
                icon="fa-traffic-light"
                :icon-color="'#d63e12'"
                :is-small="small"
                :class="{ selected: value === config.viewModes.STOP_TIMES }"
                @entryClicked="switchToView(config.viewModes.STOP_TIMES)"
            >
                <div class="entry-subtext">
                    {{ $t("sidebar.stopTimesDescription") }}
                </div>
            </SidebarEntry>

            <!-- Popularity of street segments -->
            <SidebarEntry
                :title="$t('sidebar.popularity')"
                :icon="'fa-tools'"
                :icon-color="'#156ec7'"
                :is-small="small"
                :class="{ selected: value === config.viewModes.POPULARITY }"
                @entryClicked="switchToView(config.viewModes.POPULARITY)"
            >
                <div class="entry-subtext">
                    {{ $t("sidebar.popularityDescription") }}
                </div>

                <div class="field" style="margin-top: 10px">
                    <b-checkbox
                        v-model="checked"
                        value="true"
                        unchecked-value="false"
                        @input="$emit('update:incidents-visible', checked)">
                        {{ $t("popularity.showIncidents") }}
                    </b-checkbox>
                </div>
            </SidebarEntry>

            <!-- Box analysis -->
            <SidebarEntry
                :title="$t('sidebar.boxAnalysis')"
                icon="fa-draw-polygon"
                :icon-color="'#1d917c'"
                :is-small="small"
                :class="{ selected: value === config.viewModes.BOX_ANALYSIS }"
                @entryClicked="
                    switchToView(config.viewModes.BOX_ANALYSIS, 1 << 0)
                "
            >
                <div class="entry-subtext">
                    {{ $t("sidebar.boxAnalysisDescription") }}
                </div>

                <div class="field" style="margin-top: 10px">
                    <b-checkbox v-model="computedBoxAnalysisHelper1">
                        {{ $t("boxAnalysis.all") }}
                    </b-checkbox>
                </div>
                <div class="field">
                    <b-checkbox v-model="computedBoxAnalysisHelper2">
                        {{ $t("boxAnalysis.start") }}
                    </b-checkbox>
                </div>
                <div class="field">
                    <b-checkbox v-model="computedBoxAnalysisHelper3">
                        {{ $t("boxAnalysis.end") }}
                    </b-checkbox>
                </div>
            </SidebarEntry>

            <!-- Tools -->
            <SidebarEntry
                :title="$t('sidebar.tools')"
                :icon="'fa-tools'"
                :icon-color="'#d63e12'"
                :is-small="small"
                :class="{ selected: value === config.viewModes.TOOLS }"
                @entryClicked="switchToView(config.viewModes.TOOLS)"
            >
                <div class="entry-subtext">
                    {{ $t("sidebar.toolsDescription") }}
                </div>
            </SidebarEntry>

            <SidebarEntry
                :title="'NextBike'"
                :icon="'fa-bicycle'"
                :icon-color="'#156ec7'"
                :is-small="small"
                :class="{ selected: value === config.viewModes.NEXT_BIKE }"
                @entryClicked="switchToView(config.viewModes.NEXT_BIKE)"
            >
                <div class="entry-subtext">
                    {{ $t("sidebar.nextbikeDescription") }}
                </div>
            </SidebarEntry>
        </div>

        <div
            class="bottom-expand-button"
            @click="small = false"
            :title="$t('sidebar.expandMenu')"
        >
            <i class="fas fa-lg fa-angle-double-right"></i>
        </div>
        <div class="bottom">
            <div
                class="bottom-statistics"
                :title="small ? $t('sidebar.statistics') : ''"
                :class="{ selected: value === config.viewModes.STATISTICS }"
                @click="switchToView(config.viewModes.STATISTICS)"
            >
                <div class="bottom-icon">
                    <i class="fas fa-lg fa-chart-pie"></i>
                </div>
                <div class="bottom-text">
                    {{ $t("sidebar.statistics") }}
                </div>
            </div>
            <div class="bottom-reduce-button" @click="small = true">
                <i class="fas fa-lg fa-angle-double-left"></i>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarEntry from "@/components/SidebarEntry";
import Config from "@/constants";

export default {
    name: "Sidebar",
    components: { SidebarEntry },
    props: ["value", "subViewMode", "rideThreshold"],
    data() {
        return {
            config: Config,
            small: false,
            checked: false,
            sliderTick: 0
        };
    },
    methods: {
        determineNativeValue(name) {
            let nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL;
            if (name === "all") {
                console.log("determineNativeValue name:",name)
                switch (this.subViewMode) {
                    case this.config.subViewModes.RIDES_ORIGINAL:
                        nativeValue = this.config.subViewModes.RIDES_ORIGINAL;
                        console.log("set nativeValue to RIDES_ORIGINAL:", nativeValue);
                        break;
                    case this.config.subViewModes.RIDES_DENSITY_ALL:
                        nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL;
                        console.log("set nativeValue to RIDES_DENSITY_ALL:", nativeValue);
                        break;
                    case this.config.subViewModes.RIDES_DENSITY_ALL_5:
                        nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL_5;
                        console.log("set nativeValue to RIDES_DENSITY_ALL_5:", nativeValue);
                        break;
                    case this.config.subViewModes.RIDES_DENSITY_ALL_10:
                        nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL_10;
                        console.log("set nativeValue to RIDES_DENSITY_ALL_10:", nativeValue);
                        break;
                    case this.config.subViewModes.RIDES_DENSITY_ALL_25:
                        nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL_25;
                        console.log("set nativeValue to RIDES_DENSITY_ALL_25:", nativeValue);
                        break;
                    case this.config.subViewModes.RIDES_DENSITY_ALL_50:
                        nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL_50;
                        console.log("set nativeValue to RIDES_DENSITY_ALL_50:", nativeValue);
                        break;
                    case this.config.subViewModes.RIDES_DENSITY_ALL_100:
                        nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL_100;
                        console.log("set nativeValue to RIDES_DENSITY_ALL_100:", nativeValue);
                        break;
                    case this.config.subViewModes.RIDES_DENSITY_ALL_200:
                        nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL_200;
                        console.log("set nativeValue to RIDES_DENSITY_ALL_200:", nativeValue);
                        break;
                    default:
                        nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL;
                        console.warn("this.subViewMode is unexpected:", this.subViewMode);
                        break;
                }
                /*if (this.subViewMode === this.config.subViewModes.RIDES_DENSITY_ALL) {
                    nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL;
                    console.log("set nativeValue to RIDES_DENSITY_ALL:", nativeValue);
                }

                if (this.subViewMode === this.config.subViewModes.RIDES_ORIGINAL) {
                    nativeValue = this.config.subViewModes.RIDES_ORIGINAL;
                    console.log("set nativeValue to RIDES_ORIGINAL:", nativeValue);
                } else {
                    nativeValue = this.config.subViewModes.RIDES_DENSITY_ALL;
                    console.log("set nativeValue to RIDES_DENSITY_ALL:", nativeValue);
                }*/
            } else {
                console.log("determineNativeValue name is: ",name)
            }

            return nativeValue;
        },
        switchToView(viewId, defaultSubViewMode = Config.subViewModes.DEFAULT) {
            if (this.value === viewId) {
                this.$emit("input", Config.viewModes.NONE);
            } else {
                this.$emit("input", viewId);
            }

            this.$emit("update:sub-view-mode", defaultSubViewMode);
        },
        minRidesChanged(value) {
            switch (value) {
                case 0:
                    this.computedRideThreshold = this.config.rideThreshold.ONE
                    this.rideThreshold = this.config.rideThreshold.ONE
                    this.computedSubViewMode = this.config.subViewModes.RIDES_DENSITY_ALL
                    this.subViewMode = this.config.subViewModes.RIDES_DENSITY_ALL
                    console.log("set slider to ONE (0)")
                    break;
                case 1:
                    this.computedRideThreshold = this.config.rideThreshold.FIVE
                    this.rideThreshold = this.config.rideThreshold.FIVE
                    this.computedSubViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_5
                    this.subViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_5
                    console.log("set slider to FIVE (1)")
                    break;
                case 2:
                    this.computedRideThreshold = this.config.rideThreshold.TEN
                    this.rideThreshold = this.config.rideThreshold.TEN
                    this.computedSubViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_10
                    this.subViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_10
                    console.log("set slider to TEN (2)")
                    break;
                case 3:
                    this.computedRideThreshold = this.config.rideThreshold.TWENTYFIVE
                    this.rideThreshold = this.config.rideThreshold.TWENTYFIVE
                    this.computedSubViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_25
                    this.subViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_25
                    console.log("set slider to TWENTYFIVE (3)")
                    break;
                case 4:
                    this.computedRideThreshold = this.config.rideThreshold.FIFTY
                    this.rideThreshold = this.config.rideThreshold.FIFTY
                    this.computedSubViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_50
                    this.subViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_50
                    console.log("set slider to FIFTY (4)")
                    break;
                case 5:
                    this.computedRideThreshold = this.config.rideThreshold.ONEHUNDRED
                    this.rideThreshold = this.config.rideThreshold.ONEHUNDRED
                    this.computedSubViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_100
                    this.subViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_100
                    console.log("set slider to ONEHUNDRED (5)")
                    break;
                case 6:
                    this.computedRideThreshold = this.config.rideThreshold.TWOHUNDRED
                    this.rideThreshold = this.config.rideThreshold.TWOHUNDRED
                    this.computedSubViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_200
                    this.subViewMode = this.config.subViewModes.RIDES_DENSITY_ALL_200
                    console.log("set slider to TWOHUNDRED (6)")
                    break;
                default:
                    console.warn("WARNING! Unexpected value for slider. Default branch selected: ",value)
                    break;

            }
        }
    },
    watch: {
        small: function(newValue, oldValue) {
            if (newValue !== oldValue) this.$emit("size-changed");
        }
    },
    computed: {
        computedRideThreshold: {
            get() {
                console.log("get rideThreshold:",this.rideThreshold)
                return this.rideThreshold;
            },
            set(value) {
                console.log("set rideThreshold:",value)
                this.$emit("update:ride-threshold", value);
            }
        },
        computedSubViewMode: {
            get() {
                console.log("get subviewMode:",this.subViewMode)
                return this.subViewMode;
            },
            set(value) {
                console.log("set subviewMode:",value)
                this.$emit("update:sub-view-mode", value);
            }
        },
        computedBoxAnalysisHelper1: {
            get() {
                return (this.subViewMode & (1 << 0)) > 0;
            },
            set(value) {
                this.$emit(
                    "update:sub-view-mode",
                    value
                        ? this.subViewMode | (1 << 0)
                        : this.subViewMode & ~(1 << 0)
                );
            }
        },
        computedBoxAnalysisHelper2: {
            get() {
                return (this.subViewMode & (1 << 1)) > 0;
            },
            set(value) {
                this.$emit(
                    "update:sub-view-mode",
                    value
                        ? this.subViewMode | (1 << 1)
                        : this.subViewMode & ~(1 << 1)
                );
            }
        },
        computedBoxAnalysisHelper3: {
            get() {
                return (this.subViewMode & (1 << 2)) > 0;
            },
            set(value) {
                this.$emit(
                    "update:sub-view-mode",
                    value
                        ? this.subViewMode | (1 << 2)
                        : this.subViewMode & ~(1 << 2)
                );
            }
        }
    }
};
</script>

<style lang="scss">
$sidebar-width: 304px;

.sidebar {
    width: $sidebar-width;
    flex-shrink: 0;
    background-color: #fafafa; //#eaeaea;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    overflow-y: scroll;
    height: calc(100vh - 57px);
}

.entries {
    padding-top: 8px;
    height: calc(100% - 53px);
    overflow-y: auto;
    overflow-x: hidden;
}

.bottom {
    height: 52px;
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .bottom-statistics {
        display: flex;
        align-items: center;
        padding: 12px 8px;
        width: 100%;

        &:hover,
        &:active {
            background-color: #eaeaea;
            cursor: pointer;
        }

        .bottom-icon {
            width: 60px;
            flex-shrink: 0;
            padding-right: 6px;
            text-align: center;
            color: slategray;
        }

        .bottom-text {
            width: 100%;
            color: black;
            font-size: 18px;
            font-family: "Segoe UI VSS (Regular)", "Segoe UI", "-apple-system",
                BlinkMacSystemFont, Roboto, "Helvetica Neue", Helvetica, Ubuntu,
                Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                "Segoe UI Symbol";
            user-select: none;
        }

        &.selected {
            font-weight: bold;
            background-color: #dcdcdc !important;
            border-bottom: 1px solid #e0e0e0;

            &::before {
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.2);
                content: "";
                left: 0;
                position: absolute;
                top: 0;
                width: 3px;
            }
        }
    }

    .bottom-reduce-button {
        height: 100%;
        width: 60px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover,
        &:active {
            background-color: #eaeaea;
            cursor: pointer;
            color: #156ec7;
        }
    }
}

.bottom-expand-button {
    height: 52px;
    width: 70px;
    display: none;
    align-items: center;
    justify-content: center;

    &:hover,
    &:active {
        background-color: #eaeaea;
        cursor: pointer;
        color: #156ec7;
    }
}

.sidebar.small {
    width: 71px;
    overflow: hidden;

    .entries {
        height: calc(100% - 104px);
    }

    .entry {
        .entry-label .entry-text,
        .entry-content {
            display: none;
        }
    }

    .bottom .bottom-statistics .bottom-text {
        display: none;
    }

    .bottom .bottom-reduce-button {
        display: none;
    }

    .bottom-expand-button {
        display: flex;
    }
}
</style>
