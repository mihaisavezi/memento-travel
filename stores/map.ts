import type { MapPoint } from "~/lib/types";

export type SidebarItem = {
  label: string;
  icon: string;
  href: string;
  id: string;
};

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint)
        return;
      const bounds = mapPoints.value.reduce((bounds, point) => {
        bounds.extend([point.long, point.lat]);
        return bounds;
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));

      map.map?.fitBounds(bounds, {
        padding: 100,
      });
    });
  }

  return {
    mapPoints,
    init,
  };
});
