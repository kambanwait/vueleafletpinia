import L from 'leaflet'
import { defineStore } from 'pinia'
import { mockMessage } from '@/mockMessage'

export const useTargetsStore = defineStore('targets-store', {
  state: () => {
    return {
      selectedObjects: [],
      targetLayers: {
        LayerGroup1: L.layerGroup(),
        LayerGroup2: L.layerGroup(),
        LayerGroup3: L.layerGroup(),
        LayerGroup4: L.layerGroup(),
        LayerGroup5: L.layerGroup(),
        LayerGroup6: L.layerGroup(),
        LayerGroup7: L.layerGroup(),
        LayerGroup8: L.layerGroup(),
        LayerGroup9: L.layerGroup(),
        LayerGroup10: L.layerGroup(),
      },
    }
  },

  getters: {
    getSelectedObjects(state) {
      return state.selectedObjects
    },
  },

  actions: {
    sendMockObjectMessage() {
      this.handleTargetPoint(mockMessage)
    },

    handleTargetPoint(point) {
      // Check Type and add target to local state
      switch (point.Type) {
        case 'LayerGroup1':
          this.handleTarget(point, this.targetLayers.LayerGroup1)
          break

        case 'LayerGroup2':
          this.handleTarget(point, this.targetLayers.LayerGroup2)
          break

        case 'LayerGroup3':
          this.handleTarget(point, this.targetLayers.LayerGroup3)
          break

        case 'LayerGroup4':
          this.handleTarget(point, this.targetLayers.LayerGroup4)
          break

        case 'LayerGroup5':
          this.handleTarget(point, this.targetLayers.LayerGroup5)
          break

        case 'LayerGroup6':
          this.handleTarget(point, this.targetLayers.LayerGroup6)
          break

        case 'LayerGroup7':
          this.handleTarget(point, this.targetLayers.LayerGroup7)
          break

        case 'LayerGroup8':
          this.handleTarget(point, this.targetLayers.LayerGroup8)
          break

        case 'LayerGroup9':
          this.handleTarget(point, this.targetLayers.LayerGroup9)
          break

        case 'LayerGroup10':
          this.handleStrobe(point, this.targetLayers.LayerGroup10)
          break

        default:
          console.info(`No valid object data in websocket message for: ${point}`)
          break
      }
    },

    handleTarget(target, targetLayer) {
      // checking leaflet layer to see if we already have the same ID
      let existingTarget = this.findExistingObject(target.ID, targetLayer)

      // if we find an existingPoint then we want to update that object with the target's latest latlon
      if (existingTarget) {
        // merge the latest target with our existingTarget
        const initialDateTime = existingTarget.DetectionDateTime
        existingTarget = Object.assign(existingTarget, target)
        existingTarget.DetectionDateTime = initialDateTime
        // update the existingTarget with the new LatLon
        const newLatLon = {
          LatInDegrees: target.Shape.Points[0].LatInDegrees,
          LonInDegrees: target.Shape.Points[0].LonInDegrees,
        }
        // restrict the latlon array length based on userSetTailLength
        existingTarget.latLon = this.createLatLonArray(existingTarget.latLon, newLatLon)
        // Update existingTarget with a new DateTime
        existingTarget.datetimeAddedUpdated = new Date().toISOString()

        this.updateTarget(existingTarget, targetLayer)
      } else {
        // if we don't have an existing target then we'll push in a new target with a new key:value of the latlon
        // do a deep copy of the target object from the WS target
        let newTarget = JSON.parse(JSON.stringify(target))

        // set up a key on the target object to store the latlon & add a latLon key to our newTarget and pass in the WS target latlon
        newTarget.latLon = [
          {
            LatInDegrees: target.Shape.Points[0].LatInDegrees,
            LonInDegrees: target.Shape.Points[0].LonInDegrees,
          },
        ]

        // add a datetime of when the target has been added
        newTarget.datetimeAddedUpdated = new Date().toISOString()

        this.addTarget(newTarget, targetLayer)
      }
    },

    updateTarget(existingTarget, targetLayer) {
      // update the target's 1st latlong (the main head position) with the 1st latlong
      existingTarget.setLatLng([
        existingTarget.latLon[0].LatInDegrees,
        existingTarget.latLon[0].LonInDegrees,
      ])
    },

    addTarget(newTarget, targetLayer) {
      // create a new marker for the lead latlng
      const target = L.circleMarker([newTarget.latLon[0].LatInDegrees, newTarget.latLon[0].LonInDegrees])

      Object.assign(target, newTarget)

      // add this new target to the layerGroup
      targetLayer.addLayer(target)
    },

    findExistingObject(objectID, layer) {
      const array = layer.getLayers()

      for (let i = 0; i < array.length; i++) {
        if (array[i].ID === objectID) {
          return array[i]
        }
      }
      return null
    },

    /**
     * Create an array of LatLon's for an object to display its trails.
     * This method returns an array of objects,
     * we make sure that the newLatLon being passed in isn't the same as the last existing LatLon
     * @param existingLatLon
     * @param newLatLon
     * @returns {*[]}
     */
    createLatLonArray(existingLatLon, newLatLon) {
      if (
        existingLatLon[0].LatInDegrees === newLatLon.LatInDegrees &&
        existingLatLon[0].LonInDegrees === newLatLon.LonInDegrees
      ) {
        return [...existingLatLon]
      } else {
        return [newLatLon, ...existingLatLon.slice(0, 20 - 1)]
      }
    },

    getAllObjects() {
      // create an array of all layers objects
      return [
        ...this.targetLayers.LayerGroup1.getLayers(),
        ...this.targetLayers.LayerGroup2.getLayers(),
        ...this.targetLayers.LayerGroup3.getLayers(),
        ...this.targetLayers.LayerGroup4.getLayers(),
        ...this.targetLayers.LayerGroup5.getLayers(),
        ...this.targetLayers.LayerGroup6.getLayers(),
        ...this.targetLayers.LayerGroup7.getLayers(),
        ...this.targetLayers.LayerGroup8.getLayers(),
        ...this.targetLayers.LayerGroup9.getLayers(),
        ...this.targetLayers.LayerGroup10.getLayers(),
      ]
    },

    getObject(objectID, objectType) {
      switch (objectType.toLowerCase()) {
        case 'LayerGroup1':
          return this.targetLayers.LayerGroup1.getLayers().find((object) => object.ID === objectID)

        case 'LayerGroup2':
          return this.targetLayers.LayerGroup2.getLayers().find((object) => object.ID === objectID)

        case 'LayerGroup3':
          return this.targetLayers.LayerGroup3.getLayers().find((object) => object.ID === objectID)

        case 'LayerGroup4':
          return this.targetLayers.LayerGroup4.getLayers().find((object) => object.ID === objectID)

        case 'LayerGroup5':
          return this.targetLayers.LayerGroup5.getLayers().find((object) => object.ID === objectID)

        case 'LayerGroup6':
          return this.targetLayers.LayerGroup6.getLayers().find((object) => object.ID === objectID)

        case 'LayerGroup7':
          return this.targetLayers.LayerGroup7.getLayers().find((object) => object.ID === objectID)

        case 'LayerGroup8':
          return this.targetLayers.LayerGroup8.getLayers().find((object) => object.ID === objectID)

        case 'LayerGroup9':
          return this.targetLayers.LayerGroup9.getLayers().find((object) => object.ID === objectID)

        case 'LayerGroup10':
          return this.targetLayers.LayerGroup10.getLayers().find((object) => object.ID === objectID)

        default:
          return
      }
    },

    updateObjectDeclaration(objectID, objectType, declaration, state) {
      // get object we need to update
      const objectToUpdate = this.getObject(objectID, objectType)

      // jump out if we don't find an object
      if (!objectToUpdate) return

      // update found Object with new declaration state
      objectToUpdate[declaration] = state
    },
  },
})
