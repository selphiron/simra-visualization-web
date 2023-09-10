<template>
    <div class="overlay legend" style="padding: 0"> <!-- :class="{viewModeIncidents: viewMode === config.viewModes.INCIDENTS}" -->

        <!--      <input type="checkbox" id="rsv" value="rsv" name="rsv" :change="$emit('rsv',$event.target.checked)"/>-->
        <div class="whitebg">
            <input type="checkbox" checked id="rsv" value="rsv" name="rsv" @click="$emit('rsv-checkbox',$event.target)"/>
            <div class="text-box">Radschnellweg</div>
        </div>
        <div class="whitebg">
            <div class="symbol-container">
                <div class="symbol symbol-line" style="background-color: #6c0085"/>
            </div>
        </div>

        <div class="graybg">
            <input type="checkbox" checked id="pp" value="pp" name="pp" @click="$emit('rsv-checkbox',$event.target)"/>
            <div class="text-box">Premiumpendlerroute</div>
        </div>
        <div class="graybg">
            <div class="symbol-container">
                <div class="symbol symbol-line" style="background-color: #ad0000"/>
            </div>
        </div>

        <div class="whitebg">
            <input type="checkbox" checked id="p" value="p" name="p" @click="$emit('rsv-checkbox',$event.target)"/>
            <div class="text-box">Pendlerroute</div>
        </div>
        <div class="whitebg">
            <div class="symbol-container">
                <div class="symbol symbol-line" style="background-color: #ff0000"/>
            </div>
        </div>


        <div class="graybg">
            <input type="checkbox" checked id="b" value="b" name="b" @click="$emit('rsv-checkbox',$event.target)"/>
            <div class="text-box">Basisroute</div>
        </div>
        <div class="graybg">
            <div class="symbol-container">
                <div class="symbol symbol-line" style="background-color: #0000ff"/>
            </div>
        </div>

        <div class="whitebg">
            <input type="checkbox" checked id="v" value="v" name="v" @click="$emit('rsv-checkbox',$event.target)"/>
            <div class="text-box">Verdichtungsroute</div>
        </div>
        <div class="whitebg">
            <div class="symbol-container">
                <div class="symbol symbol-line" style="background-color: #00b900"/>
            </div>
        </div>


        <template v-if="viewMode === config.viewModes.RIDES && subViewMode !== config.subViewModes.RIDES_ORIGINAL">
            <div class="graybg">
                <input type="checkbox" checked value="ridesBicyclists" name="ridesBicyclists"
                       @click="triggerLayerCheckBox($event.target)"/>
                <div class="text-box">{{ $t('legend.ridesBicyclists') }}</div>
            </div>
            <div class="graybg">
                <div class="symbol-container">
                  <div class="symbol symbol-box blue1 one-third">
                    <div class="symbol-text-1">0</div>
                  </div>
                    <div class="symbol symbol-box blue2 two-thirds">
                      <div class="symbol-text-2">250</div>
                    </div>
                  <div class="symbol symbol-box blue3">
                    <div class="symbol-text-3">500</div>
                  </div>
                </div>
            </div>

        </template>

        <template v-if="viewMode === config.viewModes.RIDES && subViewMode === config.subViewModes.RIDES_ORIGINAL">

            <div class="graybg">
                <input type="checkbox" class="legend-checkbox-invisible"/>
                <div class="text-box">{{ $t('legend.ridesSingle') }}</div>
            </div>
            <div class="graybg">
                <div class="symbol symbol-line" style="background-color: #3279dc"/>
            </div>
            <div class="graybg">
                <input type="checkbox" checked value="scaryIncident" name="ridesSingle"
                       @click="triggerLayerCheckBox($event.target)"/>
                <div class="text-box">{{ $t('legend.scaryIncident') }}</div>
            </div>
            <div class="graybg">
                <div class="symbol symbol-circle" style="background-color: #9e1a16"/>
            </div>

            <div class="graybg">
                <input type="checkbox" class="legend-checkbox-invisible"/>
                <div class="text-box">{{ $t('legend.regularIncident') }}</div>
            </div>
            <div class="graybg">
                <div class="symbol symbol-circle" style="background-color: #32c0dc"/>
            </div>
        </template>

        <!-- Incidents combined -->
        <template v-if="viewMode === config.viewModes.INCIDENTS">
            <template v-if="zoom > 15">
                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.scaryIncident') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol symbol-marker marker-scary"><i class="fa fa-car"/></div>
                </div>

                <div class="graybg">
                    <input type="checkbox" checked value="scaryIncident" name="incidents"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.regularIncident') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol symbol-marker marker-regular"><i class="fa fa-car"/></div>
                </div>


            </template>
            <template v-else>
                <div class="graybg">
                    <input type="checkbox" class="checkbox15" checked value="incidents" name="incidents"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.incidents') }}</div>
                </div>

                <div class="symbol-container graybg">
                    <div class="symbol symbol-circle" style="background-color: #9e1a16"/>
                    <div class="symbol symbol-circle" style="background-color: #777777"/>
                </div>
            </template>

            <div class="graybg">
                <input type="checkbox" class="legend-checkbox-invisible"/>
                <div class="text-box">{{ $t('legend.incidentGradient') }}</div>
            </div>
            <div class="graybg">
                <div class="symbol-container">
                    <div class="symbol symbol-box gradient1"/>
                    <div class="symbol symbol-box gradient2" v-if="zoom <= 15"/>
                    <div class="symbol symbol-box gradient3"/>
                    <div class="symbol symbol-box gradient4"/>
                    <div class="symbol symbol-box gradient5"/>
                    <div class="symbol symbol-box gradient6" v-if="zoom <= 15"/>
                </div>
            </div>

        </template>

        <template v-if="viewMode === config.viewModes.SURFACE_QUALITY">
            <div class="graybg">
                <input type="checkbox" checked value="surfaceQuality" name="surfaceQuality"
                       @click="triggerLayerCheckBox($event.target)"/>
                <div class="text-box">{{
                        subViewMode === config.subViewModes.SURFACE_QUALITY_AGGREGATED ? $t('legend.surfaceQualityGradientAggregated') : $t('legend.surfaceQualityGradientSingle')
                    }}
                </div>
            </div>
            <div class="graybg">
                <div class="symbol-container">
                    <div class="symbol symbol-box gradient1"/>
                    <div class="symbol symbol-box gradient2"/>
                    <div class="symbol symbol-box gradient3"/>
                    <div class="symbol symbol-box gradient4"/>
                    <div class="symbol symbol-box gradient5"/>
                    <div class="symbol symbol-box gradient6"/>
                </div>
            </div>
        </template>

        <template v-if="viewMode === config.viewModes.RELATIVE_SPEED">
            <div class="graybg">
                <input type="checkbox" class="legend-checkbox-invisible"/>
                <div class="text-box">{{ $t('legend.relativeSpeedFaster') }}</div>
            </div>
            <div class="graybg">
                <div class="symbol symbol-box gradient1"/>
            </div>

            <div class="graybg">
                <input type="checkbox" checked value="relativeSpeedAverage" name="relativeSpeedAverage"
                       @click="triggerLayerCheckBox($event.target)"/>
                <div class="text-box">{{ $t('legend.relativeSpeedAverage') }}</div>
            </div>
            <div class="graybg">
                <div class="symbol symbol-box gradient2"/>
              <div>21 km/h</div>
            </div>

            <div class="graybg">
                <input type="checkbox" class="legend-checkbox-invisible"/>
                <div class="text-box">{{ $t('legend.relativeSpeedSlower') }}</div>
            </div>
            <div class="symbol-container graybg">
                <div class="symbol symbol-box gradient3"/>
                <div class="symbol symbol-box gradient4"/>
                <div class="symbol symbol-box gradient5"/>
            </div>
        </template>

        <template v-if="viewMode === config.viewModes.STOP_TIMES">
            <div class="graybg">
                <input type="checkbox" checked value="stopTimes" name="stopTimes"
                       @click="triggerLayerCheckBox($event.target)"/>
                <div class="text-box">{{ $t('legend.stopTimes') }}</div>
            </div>

            <div class="symbol-container graybg">
              <div class="symbol symbol-box gradient1">
                <div class="symbol-text-3">0s</div>
              </div>
              <div class="symbol symbol-box gradient2">
              </div>
              <div class="symbol symbol-box gradient3">
              </div>
              <div class="symbol symbol-box gradient4">
              </div>
              <div class="symbol symbol-box gradient5">
              </div>
              <div class="symbol symbol-box gradient6">
                <div class="symbol-text-3">5min</div>
              </div>
            </div>
        </template>

        <!-- Popularity score p_score -->
        <template
            v-if="viewMode === config.viewModes.POPULARITY && (subViewMode === config.subViewModes.POPULARITY_COMBINED || subViewMode === config.subViewModes.POPULARITY_W_INCIDENTS_COMBINED)">
            <!--
            Show different incident markes, depending on zoom level.
                16 - 18 Drop formed markers with icons.
                14 - 15 Grey and red dots.
                   < 14 None.
            -->
            <template v-if="zoom >= 16 && incidentsVisible">
                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.scaryIncident') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol symbol-marker marker-scary"><i class="fa fa-car"/></div>
                </div>

                <div class="graybg">
                    <input type="checkbox" checked value="scaryIncident" name="scaryIncident"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.regularIncident') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol symbol-marker marker-regular"><i class="fa fa-car"/></div>
                </div>

                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.popularityCombined') }}</div>
                </div>
            </template>
            <template v-else-if="zoom >= 14 && incidentsVisible">
                <div class="graybg">
                    <input type="checkbox" class="checkbox15" checked value="incidents" name="incidents"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.incidents') }}</div>
                </div>
                <div class="symbol-container graybg">
                    <div class="symbol symbol-circle" style="background-color: #9e1a16"/>
                    <div class="symbol symbol-circle" style="background-color: #777777"/>
                </div>

                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.popularityCombined') }}</div>
                </div>
            </template>
            <template v-else>
                <div class="graybg">
                    <input type="checkbox" checked value="popularityCombined" name="popularityCombined"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.popularityCombined') }}</div>
                </div>
            </template>

            <div class="symbol-container graybg">
                <div class="symbol symbol-box gradient6"/>
                <div class="symbol symbol-box gradient5"/>
                <div class="symbol symbol-box gradient4"/>
                <div class="symbol symbol-box gradient3"/>
                <div class="symbol symbol-box gradient2"/>
                <div class="symbol symbol-box gradient1"/>
            </div>
        </template>

        <!-- Avoided street segment density -->
        <template
            v-if="viewMode === config.viewModes.POPULARITY && (subViewMode == config.subViewModes.POPULARITY_AVOIDED || subViewMode == config.subViewModes.POPULARITY_W_INCIDENTS_AVOIDED)">
            <!--
            Show different incident markes, depending on zoom level.
                16 - 18 Drop formed markers with icons.
                14 - 15 Grey and red dots.
                   < 14 None.
            -->
            <template v-if="zoom >= 16 && incidentsVisible">
                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.scaryIncident') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol symbol-marker marker-scary"><i class="fa fa-car"/></div>
                </div>
                <div class="graybg">
                    <input type="checkbox" checked value="regularIncident" name="regularIncident"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.regularIncident') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol symbol-marker marker-regular"><i class="fa fa-car"/></div>
                </div>

                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.avoidedStreetSegments') }}</div>
                </div>
            </template>
            <template v-else-if="zoom >= 14 && incidentsVisible">
                <div class="graybg">
                    <input type="checkbox" class="checkbox15" checked value="incidents" name="incidents"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.incidents') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol-container">
                        <div class="symbol symbol-circle" style="background-color: #9e1a16"/>
                        <div class="symbol symbol-circle" style="background-color: #777777"/>
                    </div>
                </div>
                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.avoidedStreetSegments') }}</div>
                </div>
            </template>
            <template v-else>
                <div class="graybg">
                    <input type="checkbox" checked value="avoidedStreetSegments" name="avoidedStreetSegments"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.avoidedStreetSegments') }}</div>
                </div>
            </template>

            <div class="symbol-container graybg">
                <div class="symbol symbol-box blue1 one-third"/>
                <div class="symbol symbol-box blue2 two-thirds"/>
                <div class="symbol symbol-box blue3"/>
            </div>
        </template>

        <!-- Chosen street segment density -->
        <template
            v-if="viewMode === config.viewModes.POPULARITY && (subViewMode == config.subViewModes.POPULARITY_CHOSEN || subViewMode == config.subViewModes.POPULARITY_W_INCIDENTS_CHOSEN)">
            <!--
            Show different incident markes, depending on zoom level.
                16 - 18 Drop formed markers with icons.
                14 - 15 Grey and red dots.
                   < 14 None.
            -->
            <template v-if="zoom >= 16 && incidentsVisible">
                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.scaryIncident') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol symbol-marker marker-scary"><i class="fa fa-car"/></div>
                </div>

                <div class="graybg">
                    <input type="checkbox" checked value="regularIncident" name="regularIncident"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.regularIncident') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol symbol-marker marker-regular"><i class="fa fa-car"/></div>
                </div>
                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.chosenStreetSegments') }}</div>
                </div>
            </template>
            <template v-else-if="zoom >= 14 && incidentsVisible">
                <div class="graybg">
                    <input type="checkbox" class="checkbox15" checked value="incidents" name="incidents"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.incidents') }}</div>
                </div>
                <div class="symbol-container graybg">
                    <div class="symbol symbol-circle" style="background-color: #9e1a16"/>
                    <div class="symbol symbol-circle" style="background-color: #777777"/>
                </div>
                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.chosenStreetSegments') }}</div>
                </div>
            </template>
            <template v-else>
                <div class="graybg">
                    <input type="checkbox" checked value="chosenStreetSegments" name="chosenStreetSegments"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.chosenStreetSegments') }}</div>
                </div>
            </template>

            <div class="symbol-container graybg">
                <div class="symbol symbol-box blue1 one-third"/>
                <div class="symbol symbol-box blue2 two-thirds"/>
                <div class="symbol symbol-box blue3"/>
            </div>
        </template>

        <!-- Mixed popularity score p_mscore -->
        <template
            v-if="viewMode === config.viewModes.POPULARITY && (subViewMode === config.subViewModes.POPULARITY_SCORE || subViewMode === config.subViewModes.POPULARITY_W_INCIDENTS_SCORE)">
            <!--
            Show different incident markes, depending on zoom level.
                16 - 18 Drop formed markers with icons.
                14 - 15 Grey and red dots.
                   < 14 None.
            -->
            <template v-if="zoom >= 16 && incidentsVisible">
                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.scaryIncident') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol symbol-marker marker-scary"><i class="fa fa-car"/></div>
                </div>

                <div class="graybg">
                    <input type="checkbox" checked value="regularIncident" name="regularIncident"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.regularIncident') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol symbol-marker marker-regular"><i class="fa fa-car"/></div>
                </div>
                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.popularityCombined') }}</div>
                </div>
            </template>
            <template v-else-if="zoom >= 14 && incidentsVisible">
                <div class="graybg">
                    <input type="checkbox" class="checkbox15" checked value="incidents" name="incidents"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.incidents') }}</div>
                </div>
                <div class="graybg">
                    <div class="symbol-container">
                        <div class="symbol symbol-circle" style="background-color: #9e1a16"/>
                        <div class="symbol symbol-circle" style="background-color: #777777"/>
                    </div>
                </div>
                <div class="graybg">
                    <input type="checkbox" class="legend-checkbox-invisible"/>
                    <div class="text-box">{{ $t('legend.popularityCombined') }}</div>
                </div>
            </template>
            <template v-else>
                <div class="graybg">
                    <input type="checkbox" checked value="popularityCombined" name="popularityCombined"
                           @click="triggerLayerCheckBox($event.target)"/>
                    <div class="text-box">{{ $t('legend.popularityCombined') }}</div>
                </div>
            </template>

            <div class="symbol-container graybg">
                <div class="symbol symbol-box gradient6"/>
                <div class="symbol symbol-box gradient5"/>
                <div class="symbol symbol-box gradient4"/>
                <div class="symbol symbol-box gradient3"/>
                <div class="symbol symbol-box gradient2"/>
                <div class="symbol symbol-box gradient1"/>
            </div>
        </template>
    </div>
</template>

<script>
import Config from "@/constants";

export default {
    name: "MapLegend",
    props: {
        viewMode: Number,
        subViewMode: Number,
        zoom: Number,
        incidentsVisible: Boolean,
    },
    data() {
        return {
            config: Config,
            layerCheckBoxesChecked: true,
        }
    },
    watch: {
        incidentsVisible() {
            return this.incidentsVisible;
        },
    },
    methods: {
        triggerLayerCheckBox(target) {
            this.$emit("layer-checkbox", target.checked);
        }
    }
};
</script>

<style lang="scss">
.graybg {
    display: flex;
    grid-template-columns: auto auto;
    grid-column-gap: 8px;
    justify-self: auto;
    align-items: center;
    padding: 6px 8px;
    background-color: #ececec !important;
}
.whitebg {
    display: flex;
    grid-template-columns: auto auto;
    grid-column-gap: 8px;
    justify-self: auto;
    align-items: center;
    padding: 6px 8px;
    background-color: white !important;
}
.legend {
    display: grid;
    grid-template-columns: auto auto;
    /*grid-column-gap: 8px;*/
    /*grid-row-gap: 4px;*/
    //padding: 6px 8px;
    border: 1px solid #b5b5b5cc;
    -webkit-box-shadow: none;
    box-shadow: none;
    background-color: white;
    border-radius: 4px;

    & > * {
        /*align-self: center;*/

        /*&:nth-child(odd) {
            justify-self: start; //end
        }*/

        &.text-box {
            font-size: 14px;
        }
    }
}

.symbol-text-1 {
  text-align: center;
  font-size: 75%;
  position: absolute;
  width: 100%;
  top: 5px;
}

.symbol-text-2 {
  text-align: center;
  font-size: 75%;
  position: absolute;
  width: 100%;
  top: 9px;
}

.symbol-text-3 {
  text-align: center;
  font-size: 75%;
  position: absolute;
  width: 100%;
  top: 13px;
}

.symbol {
    width: 15px;
    height: 15px;
    position: relative;

    & + .symbol {
        margin-left: 4px;
    }

    &.symbol-box {
        &.one-third {
            height: 7px;
        }

        &.two-thirds {
            height: 11px;
        }
    }

    &.symbol-circle {
        border-radius: 15px;
    }

    &.symbol-line {
        height: 3px;
        margin: 6px 0;
    }

    &.blue1 {
        background-color: hsl(190, 71%, 53%);
        opacity: 0.8;
    }

    &.blue2 {
        background-color: hsl(215, 71%, 53%);
        opacity: 0.9;
    }

    &.blue3 {
        background-color: hsl(240, 71%, 53%);
    }

    &.red1 {
        background-color: hsl(80, 80%, 48%);
    }

    &.red2 {
        background-color: hsl(55, 80%, 48%);
    }

    &.red3 {
        background-color: hsl(30, 80%, 48%);
    }

    &.gradient1 {
        background-color: rgb(68, 153, 53);
    }

    &.gradient2 {
        background-color: rgb(142, 192, 84);
    }

    &.gradient3 {
        background-color: rgb(237, 226, 4);
    }

    &.gradient4 {
        background-color: rgb(239, 125, 7);
    }

    &.gradient5 {
        background-color: rgb(227, 11, 19);
    }

    &.gradient6 {
        background-color: rgb(158, 26, 22);
    }
}

.symbol-container {
    display: flex;
    align-items: flex-end !important;
}

.legend-checkbox-invisible {
    visibility: hidden;
}

.checkbox15 {
  top: 15px;
  position: relative;
}

.checkbox2095 {
    top: 20.95px;
    position: relative;
}


.symbol-marker {
    $width: 35px;
    $height: 46px;
    $scale: 0.65;

    background: url("../assets/markers_custom.png") no-repeat 0 0;
    width: $width;
    height: $height;
    transform: scale($scale);
    margin: (-$height * (1 - $scale) / 2) (-$width * (1 - $scale) / 2);
    text-align: center;
    color: white;

    i.fa {
        margin-top: 9px;
        margin-left: 2px;
        font-size: 16px;
    }

    &.marker-scary {
        background-position: -36px 0;
    }

    &.marker-regular {
        background-position: -180px 0;
    }
}
</style>
