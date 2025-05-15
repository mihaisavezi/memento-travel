<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";

import type { NominatimResult } from "~/lib/types";

import { DEFAULT_COORDS } from "~/lib/constants";
import { InsertLocation } from "~/lib/db/schema";
import { formatNumber } from "~/pages/dashboard/add.const";

const props = defineProps<{
  onSubmit: (location: InsertLocation) => Promise<any>;
  initialValues?: InsertLocation | null;
  submitLabel: string;
  submitIcon: string;
}>();

const emit = defineEmits<{
  submitComplete: [];
}>();

const mapStore = useMapStore();
const router = useRouter();

const submitError = ref("");
const loading = ref(false);
const submitted = ref(false);

const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    name: props.initialValues?.name || "",
    description: props.initialValues?.description || "",
    long: props.initialValues?.long || (DEFAULT_COORDS as [number, number])[0],
    lat: props.initialValues?.lat || (DEFAULT_COORDS as [number, number])[0],
  },
});

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

const onSubmit = handleSubmit(async (values: InsertLocation) => {
  try {
    submitError.value = "";
    loading.value = true;
    await props.onSubmit(values);
    submitted.value = true;
    emit("submitComplete");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
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
    long: props.initialValues?.long || (DEFAULT_COORDS as [number, number])[0],
    lat: props.initialValues?.lat || (DEFAULT_COORDS as [number, number])[0],
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
      as="textarea"
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
    <div
      class="flex justify-end gap-2 pt-8 test-class"
    >
      <button
        type="
      button"
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
        {{ props.submitLabel }}
        <span v-if="loading" class="loading loading-spinner loading-sm" />
        <Icon
          v-else
          :name="props.submitIcon"
          size="24"
        />
      </button>
    </div>
  </form>
</template>
