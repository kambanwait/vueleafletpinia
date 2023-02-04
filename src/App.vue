<template>
  <main class="sa">
    <section class="sa__left-panel">
      <button @click="sendMockObjectMessage" style="margin: 1rem;padding: 1rem;">Send In mock object</button>
    </section>

    <section class="sa__map">
      <MapContainer />
    </section>
  </main>
</template>

<script setup>
import MapContainer from '@/components/MapContainer.vue'
import { useTargetsStore } from '@/stores/targets'
const targetStore = useTargetsStore()

const sendMockObjectMessage = () => targetStore.sendMockObjectMessage()
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

.sa {
  grid-template-columns: 450px auto auto;
  grid-template-rows: calc(100% - 60px) 60px;
  overflow: hidden;
  height: 100vh;
  display: grid;
  z-index: 0;
  gap: 0;
}

.sa__left-panel {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  z-index: 1;
}

.sa__map {
  /* Setting map to take over whole page */
  grid-row-start: 1;
  grid-row-end: -1;

  grid-column-start: 1;
  grid-column-end: -1;
  height: 100vh;
  z-index: 0;
}
</style>