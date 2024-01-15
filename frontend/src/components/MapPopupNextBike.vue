<template>
    <div>
        <strong >{{ t('nextBike.station') }}</strong>
        <br>
        <hr>
        <template> {{ t('nextBike.name') }} {{ station.name }}</template> <br>
        <template> {{ t('nextBike.startAmount') }} {{ station.starts }}</template> <br>
        <template> {{ t('nextBike.endAmount') }} {{ station.ends }}</template> <br>

        <template v-if="isDebug && false">
            <hr>Debug information: {{ station }}<hr>
        </template>

    </div>
</template>

<script>
import { IncidentUtils } from "@/services/IncidentUtils";

export default {
    name: "MapPopupNextBike",
    props: {
        station: Object,
        t: Function, // Translations don't work in manually mounted components
    },
    data() {
        return {
            utils: IncidentUtils, // this is necessary because mixins don't work with dynamically created components
        };
    },
    methods: {
        isDebug: () => process.env.VUE_APP_DEBUG === "true",
    }
};
</script>

<style scoped lang="scss">
    hr {
        margin: 8px -20px 12px;
    }

    button {
        margin-top: 12px;
    }
</style>
