<script lang="ts" setup>
import type { InsertLocation } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();
const route = useRoute();
const locationStore = useLocationStore();

async function onSubmit(values: InsertLocation) {
  console.log("🚀 ~ onSubmit ~ values:", values);
  await $csrfFetch(`/api/locations/${route.params.slug}`, {
    method: "put",
    body: values,
  });
}

function onSubmitComplete() {
  navigateTo({
    name: "dashboard-location-slug",
    params: {
      slug: route.params.slug,
    },
  });
}
</script>

<template>
  <LocationForm
    v-if="locationStore.currentLocationStatus !== 'pending'"
    :on-submit
    :initial-values="locationStore?.currentLocation"
    submit-label="Update"
    submit-icon="tabler:map-pin-up"
    @submit-complete="onSubmitComplete"
  />
</template>
