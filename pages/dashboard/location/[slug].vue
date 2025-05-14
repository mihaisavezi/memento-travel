<script lang="ts" setup>
const locationStore = useLocationStore();
const { currentLocation: location, currentLocationStatus: status } = storeToRefs(locationStore);
console.log("🚀 ~ location:", location);

onMounted(() => {
  locationStore.currentLocationRefresh();
});
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
