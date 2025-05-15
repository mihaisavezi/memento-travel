import type { LngLatLike } from "maplibre-gl";

export const DEFAULT_COORDS = [24, 44] as LngLatLike;

export const EDIT_PAGES = new Set([
  "dashboard-add",
  "dashboard-location-slug-add",
  "dashboard-location-slug-edit",
]);

export const LOCATION_PAGES = new Set(["dashboard", "dashboard-add"]);
export const CURRENT_LOCATION_PAGES = new Set(["dashboard-location-slug", "dashboard-location-slug-add", "dashboard-location-slug-edit"]);
