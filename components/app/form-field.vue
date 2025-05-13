<script lang="ts" setup>
const props = defineProps<{
  label: string;
  name: string;
  error?: string;
  type?: "text" | "textarea" | "email";
  as?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="as || 'input'"
      :name="props.name"
      :type="type || 'text'"
      :disabled="disabled"
      class="w-full"
      :class="{
        'input-error': props.error,
        'input': !type || type === 'text' || type === 'email',
        'textarea': type === 'textarea',
      }"
    />
    <p v-if="props.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
