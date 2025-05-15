import type { RouteLocationRaw } from "vue-router";

import type { MapPoint } from "~/lib/types";

export type SidebarItem = {
  label: string;
  icon: string;
  href?: string;
  id: string;
  mapPoint?: MapPoint | null;
  to?: RouteLocationRaw;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const sidebarTopItems = ref<SidebarItem[]>([]);
  const loading = ref(false);

  return {
    sidebarItems,
    sidebarTopItems,
    loading,
  };
});
