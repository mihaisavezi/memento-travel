<script lang="ts" setup>
import type { InsertLocation } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();

async function onSubmit(values: InsertLocation) {
  await $csrfFetch("/api/locations", {
    method: "post",
    body: values,
  });
}

function onSubmitComplete() {
  navigateTo("/dashboard");
}
</script>

<template>
  <div class="container max-w-lg mx-auto px-12 py-8 bg-base-200">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm pt-6">
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of
        interest. You can add specific times you visited this location after adding it.
      </p>
    </div>
    <LocationForm
      :on-submit
      submit-label="Add"
      submit-icon="tabler:circle-plus-filled"
      @submit-complete="onSubmitComplete"
    />
  </div>
</template>
