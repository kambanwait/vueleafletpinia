import { shallowRef, markRaw } from 'vue'
import L from 'leaflet'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map-store', {
  state: () => {
    return {
      SAMap: shallowRef(null),
      mapLayers: markRaw({
        DetectionGeofenceLayer: L.layerGroup(),
        BlankingGeofenceLayer: L.layerGroup(),
        SensorPositionsFOVLayer: L.layerGroup(),
        SensorPositionsLayer: L.layerGroup(),
        UserToursLayer: L.layerGroup(),
        ReferencesLayer: L.layerGroup(),
        GeodiodeLayer: L.layerGroup(),
        RadiusMarkers: L.layerGroup(),
      }),
    }
  },

  actions: {
    setSAMap(map) {
      this.SAMap = map
    },
  },
})