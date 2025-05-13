<script lang="ts" setup>
const props = defineProps<{
  sections: {
    title: string;
    description: string;
    features: string[];
    tags: string[];
  }[];
}>();

const [mainSection, contactDetails, ...contentSections] = props.sections;
const socialSection = contentSections[contentSections.length - 1];
console.log("🚀 ~ contactDetails:", contactDetails);
console.log("🚀 ~ socialSection:", socialSection);
</script>

<template>
  <div>
    <div class="p-16 flex flex-col gap-4" />
    <div class="hidden md:flex fixed right-0 top-50 pr-6">
      <ul class="flex gap-6 flex-col">
        <h1>
          {{ mainSection.description }}
        </h1>
      </ul>
    </div>
  </div>
</template>
