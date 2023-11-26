<template>
    <div>
        <strong >{{ t('accident.accident') }}</strong>
        <br>
        <hr>
        <template> {{ t('accident.year') }} {{ accident.Jahr }}</template> <br>
        <template> {{ t('accident.weekday') }} {{ accident.Wochentag }}</template> <br>
        <template> {{ t('accident.participant') }} {{ accident.Beteiligt }}</template> <br>
        <template> {{ t('accident.accidentkind') }} {{ accident.Unfallart }}</template> <br>
        <template> {{ t('accident.accidenttype') }} {{ accident.Unfalltyp }}</template> <br>
        <template> {{ t('accident.accidentcategory') }} {{ accident.Unfallkategorie }}</template> <br>



        <template v-if="isDebug && false">
            <hr>Debug information: {{ accident }}<hr>
        </template>

    </div>
</template>

<script>
import { IncidentUtils } from "@/services/IncidentUtils";

export default {
    name: "MapPopupAccident",
    props: {
        accident: Object,
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
