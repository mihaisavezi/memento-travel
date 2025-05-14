import type { LngLatBounds } from "maplibre-gl";

import type { MapPoint } from "~/lib/types";

export type SidebarItem = {
  label: string;
  icon: string;
  href: string;
  id: string;
  description: string;
};

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);
  const toBeAddedPoint = ref<MapPoint & { centerMap?: boolean; zoom?: number } | null>(null);
  const shouldFlyTo = ref(true);

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();
    let bounds: LngLatBounds | null = null;

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint)
        return;
      bounds = mapPoints.value.reduce((bounds, point) => {
        bounds.extend([point.long, point.lat]);
        return bounds;
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));

      map.map?.fitBounds(bounds, {
        padding: 50,
        maxZoom: 10,
      });
    });

    watch(toBeAddedPoint, (newValue, oldValue) => {
      if ((newValue && !oldValue) || newValue?.centerMap) {
        map?.map?.flyTo({
          center: [newValue.long, newValue.lat],
          zoom: 5,
          speed: 0.8,
        });
      }
    }, { immediate: true });
  }

  function selectPointWithoutAnimation(point: MapPoint) {
    shouldFlyTo.value = false;
    selectedPoint.value = point;
  }

  return {
    mapPoints,
    init,
    selectedPoint,
    selectPointWithoutAnimation,
    toBeAddedPoint,
  };
});
