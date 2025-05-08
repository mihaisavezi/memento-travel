<script lang="ts" setup>
import "maplibre-gl/dist/maplibre-gl.css";

import type { LngLat, LngLatLike } from "maplibre-gl";

import { MglMap, MglMarker, MglNavigationControl, MglPopup } from "@indoorequal/vue-maplibre-gl";

import { DEFAULT_COORDS } from "~/lib/constants";

const center = ref<LngLatLike>(DEFAULT_COORDS);

const colorMode = useColorMode();
const mapStore = useMapStore();
const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty");
const zoom = ref(3);

function updateAddedPoint(location: LngLat) {
  if (mapStore.toBeAddedPoint) {
    mapStore.toBeAddedPoint.lat = location.lat;
    mapStore.toBeAddedPoint.long = location.lng;
  }
}

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
      v-if="mapStore.toBeAddedPoint"
      draggable
      :coordinates="center"
      class="text-warning"
      @update:coordinates="updateAddedPoint"
    >
      <template #marker>
        <div class="tooltip tooltip-top" data-tip="Drag to your desired location">
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            class="text-primary"
          />
        </div>
      </template>
    </MglMarker>
    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div
          class="tooltip tooltip-top"
          :class="{ 'tooltip-open': mapStore.selectedPoint === point }"
          :data-tip="point.name"
          @mouseenter="mapStore.selectPointWithoutAnimation(point)"
          @mouseleave="mapStore.selectPointWithoutAnimation(point)"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            :class="mapStore.selectedPoint === point ? 'text-secondary' : 'text-content'"
          />
        </div>
      </template>
      <MglPopup :close-button="false">
        <div
          class="p-6"
          :class="{ 'text-base-300 bg-white': colorMode.value === 'light', 'bg-base-300': colorMode.value === 'dark' }"
        >
          <h3 class="text-2xl">
            {{ point.name }}
          </h3>
          <p v-if="point.description">
            {{ point.description }}
          </p>
        </div>
      </MglPopup>
    </MglMarker>
  </Mglmap>
</template>
