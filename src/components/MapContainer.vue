<template>
  <div id="mapRoot"></div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'

import { onMounted } from 'vue'
import { useMapStore } from '@/stores/map'
import { useTargetsStore } from '@/stores/targets'

const mapStore = useMapStore()
const targetStore = useTargetsStore()

const setupMap = () => {
  const openStreetMaps = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attributions: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  })

  const map = L.map('mapRoot', {
    renderer: L.canvas(),
    preferCanvas: true,
    layers: [openStreetMaps],
    markerZoomAnimation: true,
    attributionControl: false,
    zoomAnimation: false,
    fadeAnimation: true,
    zoomControl: false,
    minZoom: 5,
  }).setView([51.509865, -0.118092], 10)

  mapStore.setSAMap(map)

  // adding object layers to map
  for (let i = 0; i < Object.entries(targetStore.targetLayers).length; ++i) {
    if (Object.entries(targetStore.targetLayers)[i] !== undefined) {
      mapStore.SAMap.addLayer(Object.entries(targetStore.targetLayers)[i][1])
    }
  }

  // adding other layers to map
  for (let i = 0; i < Object.entries(mapStore.mapLayers).length; ++i) {
    if (Object.entries(mapStore.mapLayers)[i] !== undefined) {
      mapStore.SAMap.addLayer(Object.entries(mapStore.mapLayers)[i][1])
    }
  }

  // Create the control layer in bottom right of map
  const targetControlLayers = {
    LayerGroup1: targetStore.targetLayers.LayerGroup1,
    LayerGroup2: targetStore.targetLayers.LayerGroup2,
    LayerGroup3: targetStore.targetLayers.LayerGroup3,
    LayerGroup4: targetStore.targetLayers.LayerGroup4,
    LayerGroup5: targetStore.targetLayers.LayerGroup5,
    LayerGroup6: targetStore.targetLayers.LayerGroup6,
    LayerGroup7: targetStore.targetLayers.LayerGroup7,
    LayerGroup8: targetStore.targetLayers.LayerGroup8,
    LayerGroup9: targetStore.targetLayers.LayerGroup9,
    LayerGroup10: targetStore.targetLayers.LayerGroup10,
  }

  // Create the target layer in the bottom right of the map
  L.control
    .layers(null, targetControlLayers, {
      position: 'bottomright',
    })
    .addTo(mapStore.SAMap)

  addMapOptionsButton(mapStore.mapLayers, openStreetMaps)
}

const addMapOptionsButton = (mapLayers, openStreetMaps) => {
  // Create the map option layer in bottom right of map
  const MapOptionsLayers = {
    "Sensor FOV's": mapLayers.SensorPositionsFOVLayer,
    'Sensor Locations': mapLayers.SensorPositionsLayer,
    Tours: mapLayers.UserToursLayer,
    Geofences: mapLayers.DetectionGeofenceLayer,
    Geodiodes: mapLayers.GeodiodeLayer,
    'Radius markers': mapLayers.RadiusMarkers,
  }

  //create base layer to add map option control layer
  const MapBaseLayers = {
    'Open Street Maps': openStreetMaps,
  }

  L.Control.Layers.CustomIcon = L.Control.Layers.extend({
    options: {
      cssClassName: undefined,
    },

    _initLayout: function () {
      L.Control.Layers.prototype._initLayout.call(this)
      if (this.options.cssClassName) {
        L.DomUtil.addClass(this._layersLink, this.options.cssClassName)
      }
    },
  })

  const layerControl = new L.Control.Layers.CustomIcon(MapBaseLayers, MapOptionsLayers, {
    cssClassName: 'leaflet-map-options',
    position: 'bottomright',
  }).addTo(mapStore.SAMap)
}

onMounted(() => {
  setupMap()
})

</script>

<style>
#mapRoot {
  height: 100vh;
  width: 100vw;
}

@supports(height: 100dvh) {
  #mapRoot {
    height: 100dvh;
  }
}
</style>