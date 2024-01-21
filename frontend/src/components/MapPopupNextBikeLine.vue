<template>
    <div>
        <strong >{{ t('nextBike.connectionsTo') }}  {{connection.name}}</strong>
        <br>
        <hr>
        <template> {{ t('nextBike.from') }} {{ connection.ends }}</template> <br>
        <template> {{ t('nextBike.to') }} {{ connection.starts }}</template> <br>

        <template v-if="isDebug && false">
            <hr>Debug information: {{ connection }}<hr>
        </template>

    </div>
</template>

<script>
import { IncidentUtils } from "@/services/IncidentUtils";

export default {
    name: "MapPopupNextBikeLine",
    props: {
        connection: Object,
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
