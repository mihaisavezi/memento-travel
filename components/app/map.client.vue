<script lang="ts" setup>
import "maplibre-gl/dist/maplibre-gl.css";

import type { LngLatLike } from "maplibre-gl";

import { MglMap, MglMarker, MglNavigationControl } from "@indoorequal/vue-maplibre-gl";

const center = ref<LngLatLike>([45, 47.21322]);

const colorMode = useColorMode();
const mapStore = useMapStore();
const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty");
const zoom = ref(3);

onMounted(() => {
  mapStore.init();

  if (mapStore?.mapPoints?.length > 0)
    return;

  if (!navigator.geolocation) {
    // eslint-disable-next-line no-alert
    window.alert("Geolocation is not supported by your browser");
  }
  else {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        const { latitude, longitude } = result.coords;
        center.value = [longitude, latitude];
        zoom.value = 6;
      },
      () => {},
    );
  }
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div class="tooltip tooltip-top" :data-tip="point.label">
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            class="text-secondary"
          />
        </div>
      </template>
    </MglMarker>
  </Mglmap>
</template>
