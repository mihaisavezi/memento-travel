<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import type { NominatimResult } from "~/lib/types";

import { DEFAULT_COORDS } from "~/lib/constants";
import { InsertLocation } from "~/lib/db/schema";

import { formatNumber } from "./add.const";

const mapStore = useMapStore();
const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    name: "",
    description: "",
    long: (DEFAULT_COORDS as [number, number])[0],
    lat: (DEFAULT_COORDS as [number, number])[1],
  },
});

const { $csrfFetch } = useNuxtApp();

const router = useRouter();
const submitError = ref("");
const loading = ref(false);
const submitted = ref(false);

function searchResultSelected(result: NominatimResult) {
  setFieldValue("name", result.display_name);
  mapStore.toBeAddedPoint = {
    id: 1,
    name: "Added Point",
    description: "",
    long: Number(result.lon),
    lat: Number(result.lat),
    centerMap: true,
  };
}

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    submitError.value = "";
    loading.value = true;
    await $csrfFetch("/api/locations", {
      method: "post",
      body: values,
    });
    submitted.value = true;
    // reset the form
    actions.resetForm();

    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data)
      setErrors(error.data?.data);
    submitError.value = error.statusMessage || "An unknown error occurred";
  }
  loading.value = false;
});

effect(() => {
  if (mapStore.toBeAddedPoint) {
    setFieldValue("long", mapStore.toBeAddedPoint.long);
    setFieldValue("lat", mapStore.toBeAddedPoint.lat);
  }
});

onMounted(async () => {
  mapStore.toBeAddedPoint = {
    id: 1,
    name: "Added point",
    description: "",
    long: (DEFAULT_COORDS as [number, number])[0],
    lat: (DEFAULT_COORDS as [number, number])[1],
  };
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? All unsaved changes will be lost");
    if (!confirm)
      return false;

    return true;
  }
  mapStore.toBeAddedPoint = null;
});
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
    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <span>{{ submitError }}</span>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        name="name"
        label="Name"
        :error="errors.name"
        :disabled="loading"
      />
      <AppFormField
        name="description"
        label="Description"
        type="textarea"
        :error="errors.description"
        :disabled="loading"
      />
      <p class="text-xs text-gray-400">
        Current coordinates: {{ formatNumber(controlledValues.lat) }}, {{ formatNumber(controlledValues.long) }}
      </p>
      <p class="pt-4">
        To set the coordinates:
      </p>
      <ul class="list-disc ml-4 text-sm">
        <li>
          Drag the
          <Icon name="tabler:map-pin-filled" class="text-primary dark:text-warning" /> marker on the map.
        </li>
        <li>
          Double click the map.
        </li>
      </ul>
      <div class="divider">
        OR
      </div>
      <AppPlaceSearch @result-selected="searchResultSelected" />
      <div class="flex justify-end gap-2 pt-8">
        <button
          type="button"
          :disabled="loading"
          class="btn btn-outline"
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="24" />
          Cancel
        </button>
        <button
          :disabled="loading"
          type="submit"
          class="btn btn-primary"
        >
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
        </button>
      </div>
    </form>
  </div>
</template>
