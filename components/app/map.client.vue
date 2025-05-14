<script lang="ts" setup>
import "maplibre-gl/dist/maplibre-gl.css";

import type { LngLat, LngLatLike } from "maplibre-gl";

import { MglMap, MglMarker, MglNavigationControl, MglPopup } from "@indoorequal/vue-maplibre-gl";

import type { MapPoint } from "~/lib/types";

import { DEFAULT_COORDS } from "~/lib/constants";

function isPointSelected(item: Pick<MapPoint, "id" | "lat" | "long"> | null | undefined, selectedPoint: MapPoint | null | undefined) {
  if (!item || !selectedPoint)
    return false;
  return item.id === selectedPoint.id
    && item.lat === selectedPoint.lat
    && item.long === selectedPoint.long;
}

const center = ref<LngLatLike>(DEFAULT_COORDS);

const colorMode = useColorMode();
const mapStore = useMapStore();

const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty");
const zoom = 3;

function updateAddedPoint(location: LngLat) {
  if (mapStore.toBeAddedPoint) {
    mapStore.toBeAddedPoint.lat = location.lat;
    mapStore.toBeAddedPoint.long = location.lng;
  }
};

function onDoubleClick(mglEvent: MglEvent<"dblclick">) {
  if (mapStore.toBeAddedPoint) {
    mapStore.toBeAddedPoint.lat = mglEvent.event.lngLat.lat;
    mapStore.toBeAddedPoint.long = mglEvent.event.lngLat.lng;
  }
}

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <div>
    <MglMap
      :map-style="style"
      :center="center"
      :zoom="zoom"
      @map:dblclick="onDoubleClick"
    >
      <MglNavigationControl />
      <MglMarker
        v-if="mapStore.toBeAddedPoint"
        draggable
        class-name="z-50"
        :coordinates="[mapStore.toBeAddedPoint.long, mapStore.toBeAddedPoint.lat]"
        @update:coordinates="updateAddedPoint"
      >
        <template #marker>
          <div class="tooltip tooltip-top tooltip-open hover:cursor-pointer" data-tip="Drag to your desired location">
            <Icon
              name="tabler:map-pin-filled"
              size="35"
              class="text-primary dark:text-warning"
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
            class="tooltip tooltip-top hover:cursor-pointer"
            :data-tip="point.name"
            :class="{
              'tooltip-open': isPointSelected(point, mapStore.selectedPoint),
            }"
            @mouseenter="mapStore.selectedPoint = point"
            @mouseleave="mapStore.selectedPoint = null"
          >
            <Icon
              name="tabler:map-pin-filled"
              size="30"
              :class="isPointSelected(point, mapStore.selectedPoint) ? 'text-accent' : 'text-secondary'"
            />
          </div>
        </template>
        <MglPopup :close-button="false">
          <div class="p-4">
            <h3 class="text-lg">
              {{ point.name }}
            </h3>
            <p v-if="point.description" class="text-xs">
              {{ point.description }}
            </p>
            <div class="flex justify-end mt-4">
              <NuxtLink
                v-if="point.to"
                :to="point.to"
                class="btn btn-sm btn-outline"
              >
                {{ point.toLabel }}
              </NuxtLink>
            </div>
          </div>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>
