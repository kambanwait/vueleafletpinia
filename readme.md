# Demo of issue with Laflet and Pinia and Vue dev tools crashing

I'm using LeafletJS to create a map application that listens for around 500+ messages via a web socket.

It takes each message and displays a marker on the Leaflet map, after adding it to a `L.layerGroup()` based on what the 'Type' property is in the message.

I'm able to add/remove/update markers as each message comes in and the marker's positions are then updated on the map - think of each Marker as a drone on a map that's moving around and detected by a sensor. This sensor's sending the messages to the system and the UI is displaying them as markers.

The issue is that when I open Vue dev-tools (has to be on the Pinia tab) to debug or build out new features, it crashes. I believe it's to do with storing the many `L.layerGroup()` in the Pinia store, and it's struggling to keep up with the messages and adding new or editing markers. I have around 10 of these `L.Layergroups` in my store (1 for each Type).

It all works fine when dev tools is closed.

My user's need to be able to click a marker and see the last time it was updated as well as other meta data we send in the message(s). When marking the `L.layerGroup()` as raw/shallowReactive (markRaw or shallowReactive) the marker data isn't updated as it's a nested property in the `L,layerGroup` so the updates don't trigger an update. You don't see these changes even when you subscribe to the store.

Any help or insight would be appreciated. As you can imagine, this is a massive issue when trying to develop and a work around is to disable Pinia in the Vue dev tools 😭.

----

## To run
- Clone project
- Run `yarn` to install
- Run `yarn dev` to start
- In Chrome (only browser I have to support for my client)
  - open dev tools
  - open 'Vue' devtools (install extension if needed)
  - open Pinia tab and ensure stores appear
- Click button in top left of map (send in mock object)
- Now try interacting with map (zoom and panning)
- Notice slow down


## To confrm it's a DevTools issue:

- Reload tab
- Close dev tools
- Notice how app runs fine when adding loads of markers
- App will also stay perfomant when you open dev tool but will slow down when you open the Vue tab


Looking in the console, you'll spot warnings and some errors around message length/violation and eventually when you keep clicking and adding loads more markers:

![Errors in console](./errors.png)
