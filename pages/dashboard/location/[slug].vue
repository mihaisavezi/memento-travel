<script lang="ts" setup>
const route = useRoute();
const mapStore = useMapStore();
const { slug } = route.params;
const { data: location, status } = await useFetch(`/api/locations/${slug}`, {
  lazy: true,
});

effect(() => {
  if (location.value) {
    mapStore.mapPoints = [location.value];
  }
});

// zoom in to location
// remove other markers associated with this.
</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="status === 'pending'">
      <div class="loading" />
    </div>
    <div v-if="location && status !== 'pending'" class="flex flex-col gap-4">
      <h2 class="text-2xl">
        {{ location.name }}
      </h2>
      <p class="text-sm">
        {{ location.description }}
      </p>
      <div v-if="!location.locationLogs.length" class="mt-4">
        <p class="text-sm italic">
          Add a location log to get started.
        </p>
        <btn
          class="btn btn-primary mt-2"
        >
          Add Location Log
          <Icon name="tabler:map-pin-plus" size="24" />
        </btn>
      </div>
    </div>
  </div>
</template>
