<script lang="ts" setup>
const locationsStore = useLocationStore();
const mapStore = useMapStore();

const { locations, locationsStatus: status } = storeToRefs(locationsStore);

onMounted(() => {
  locationsStore.locationsRefresh();
});
</script>

<template>
  <div class="p-4 flex flex-col gap-4 min-h-64">
    <h2 class="text-2xl">
      Locations tests
    </h2>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <div v-else-if="locations && locations.length > 0" class="flex flex-no-wrap mt-4 gap-2 overflow-auto">
      <NuxtLink
        v-for="location in locations"
        :key="location.id"
        :to="{ name: 'dashboard-location-slug', params: { slug: location.slug } }"
        class="card card-compact bg-base-300 h-40 border-2 w-72 mb-2 shrink-0 hover:cursor-pointer"
        :class="{
          'border-accent': isPointSelected(location, mapStore.selectedPoint),
          'border-transparent': !isPointSelected(location, mapStore.selectedPoint),
        }"
        @mouseenter="mapStore.selectedPoint = createMapPointFromLocation(location)"
        @mouseleave="mapStore.selectedPoint = null"
      >
        <div class="card-body">
          <h3 class="text-xl line-clamp-1">
            {{ location.name }}
          </h3>
          <p>{{ location.description }}</p>
        </div>
      </NuxtLink>
    </div>
    <div v-else class="flex flex-col gap-4 mt-4">
      <p>Add a location to get started</p>
      <NuxtLink to="/dashboard/add" class="btn btn-primary w-40">
        Add Location
        <Icon name="tabler:tabler:circle-plus-filled" size="24" />
      </NuxtLink>
    </div>
  </div>
</template>
