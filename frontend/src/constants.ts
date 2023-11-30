let viewModes = {
    NONE: 0,
    RIDES: 1,
    INCIDENTS: 2,
    SURFACE_QUALITY: 3,
    RELATIVE_SPEED: 4,
    STOP_TIMES: 5,
    BOX_ANALYSIS: 6,
    TOOLS: 7,
    POPULARITY: 8,
    START_FINISH: 9,
    STATISTICS: 99,
}

let subViewModes = {
    DEFAULT: 0,
    RIDES_DENSITY_ALL: 0,
    RIDES_DENSITY_RUSHHOURMORNING: 2,
    RIDES_DENSITY_RUSHHOUREVENING: 3,
    RIDES_DENSITY_WEEKEND: 4,
    RIDES_DENSITY_ALL_1: 5,
    RIDES_DENSITY_ALL_5: 6,
    RIDES_DENSITY_ALL_10: 7,
    RIDES_DENSITY_ALL_25: 8,
    RIDES_DENSITY_ALL_50: 9,
    RIDES_DENSITY_ALL_100: 10,
    RIDES_DENSITY_ALL_200: 11,
    RIDES_DENSITY_RUSHHOURMORNING_1: 12,
    RIDES_DENSITY_RUSHHOURMORNING_5: 13,
    RIDES_DENSITY_RUSHHOURMORNING_10: 14,
    RIDES_DENSITY_RUSHHOURMORNING_25: 15,
    RIDES_DENSITY_RUSHHOURMORNING_50: 16,
    RIDES_DENSITY_RUSHHOURMORNING_100: 17,
    RIDES_DENSITY_RUSHHOURMORNING_200: 18,
    RIDES_DENSITY_RUSHHOUREVENING_1: 19,
    RIDES_DENSITY_RUSHHOUREVENING_5: 20,
    RIDES_DENSITY_RUSHHOUREVENING_10: 21,
    RIDES_DENSITY_RUSHHOUREVENING_25: 22,
    RIDES_DENSITY_RUSHHOUREVENING_50: 23,
    RIDES_DENSITY_RUSHHOUREVENING_100: 24,
    RIDES_DENSITY_RUSHHOUREVENING_200: 25,
    RIDES_DENSITY_WEEKEND_1: 26,
    RIDES_DENSITY_WEEKEND_5: 27,
    RIDES_DENSITY_WEEKEND_10: 28,
    RIDES_DENSITY_WEEKEND_25: 29,
    RIDES_DENSITY_WEEKEND_50: 30,
    RIDES_DENSITY_WEEKEND_100: 31,
    RIDES_DENSITY_WEEKEND_200: 32,
    RIDES_ORIGINAL: 1,
    SURFACE_QUALITY_AGGREGATED: 0,
    SURFACE_QUALITY_SINGLE: 1,
    RELATIVE_SPEED_AGGREGATED: 0,
    RELATIVE_SPEED_SINGLE: 1,
    BOX_ANALYSIS_ALL: 0,
    BOX_ANALYSIS_START: 1,
    BOX_ANALYSIS_STOP: 2,
    POPULARITY_COMBINED: 0,
    POPULARITY_AVOIDED: 1,
    POPULARITY_CHOSEN: 2,
    POPULARITY_SCORE: 3,
    POPULARITY_W_INCIDENTS_COMBINED: 9,
    POPULARITY_W_INCIDENTS_AVOIDED: 19,
    POPULARITY_W_INCIDENTS_CHOSEN: 29,
    POPULARITY_W_INCIDENTS_SCORE: 39,
}

let rideThreshold = {
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTYFIVE: 25,
    FIFTY: 50,
    ONEHUNDRED: 100,
    TWOHUNDRED: 200,
}

let osmAttribution = " &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors";

let mapStyles = {
    CARTO_POSITRON: {
        key: "CARTO_POSITRON",
        name: "Carto Light",
        hasLabelLayer: true,
        url: "https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}{r}.png",
        urlLabels: "https://{s}.basemaps.cartocdn.com/rastertiles/light_only_labels/{z}/{x}/{y}{r}.png",
        attribution: "&copy; <a href=\"https://carto.com/attributions\">CARTO</a>" + osmAttribution,
    },
    CARTO_VOYAGER: {
        key: "CARTO_VOYAGER",
        name: "Carto Default",
        hasLabelLayer: true,
        url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
        urlLabels: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
        attribution: "&copy; <a href=\"https://carto.com/attributions\">CARTO</a>" + osmAttribution,
    },
    CARTO_DARK_MATTER: {
        key: "CARTO_DARK_MATTER",
        name: "Carto Dark",
        hasLabelLayer: true,
        url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}{r}.png",
        urlLabels: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_only_labels/{z}/{x}/{y}{r}.png",
        attribution: "&copy; <a href=\"https://carto.com/attributions\">CARTO</a>" + osmAttribution,
    },
    OSM: {
        key: "OSM",
        name: "OpenStreetMaps",
        hasLabelLayer: false,
        url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
    }/*,
    WIKIPEDIA: {
        key: "WIKIPEDIA",
        name: "Wikipedia",
        hasLabelLayer: false,
        url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
        attribution: "&copy; <a href=\"https://wikimediafoundation.org/wiki/Maps_Terms_of_Use\">Wikimedia</a>" + osmAttribution
    }*/,
	ESRI_WORLDIMAGERY: {
		key: "Esri_WorldImagery",
		name: "Esri World Imagery",
		hasLabelLayer: false,
		url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
		attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community" + osmAttribution,
	},
}

export default {
    viewModes: viewModes,
    subViewModes: subViewModes,
    rideThreshold: rideThreshold,
    viewModeHasLegend(viewMode: number) {
        return viewMode === viewModes.RIDES || viewMode === viewModes.INCIDENTS || viewMode === viewModes.SURFACE_QUALITY || viewMode === viewModes.RELATIVE_SPEED || viewMode === viewModes.STOP_TIMES || viewMode === viewModes.POPULARITY;
    },
    mapStyles: mapStyles,
    getDefaultMapStyle: () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return mapStyles.CARTO_DARK_MATTER;
        } else {
            return mapStyles.CARTO_VOYAGER;
        }
    },
}
