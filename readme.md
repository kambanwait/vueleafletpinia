# Demo of issue with Laflet and Pinia and Vue dev tools crashing

## To run
- Clone project
- Run `yarn` to install
- Run `yarn dev` to start
- In Chrome (only browser supported for client's app), open dev tools and open the 'Vue' devtools (install extension if needed) and ensure Pinia appears too
- Click button in top left of map (send in mock object)
- Now try interacting with map (zoom and panning)
- Notice slow down
- Reload tab
- Close dev tools
- Notice how app runs fine

Looking in the console, you'll spot warnings and some errors around message length/violation and eventually when you keep clicking and adding loads more markers.
