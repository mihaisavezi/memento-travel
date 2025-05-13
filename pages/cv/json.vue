<script setup lang="ts">
// Let's add more detailed logging for the server-side execution
const { data: page } = await useAsyncData(`cv-data-page`, async () => {
  try {
    return await queryCollection("cvJSON").first(); ;
  }
  catch (e) {
    console.error("Error during queryCollection('content').first():", e);
    return null; // Ensure a fallback in case of error
  }
});
</script>

<template>
  <div v-if="page" class="flex flex-1 flex-col">
    <pre class="max-h-96 overflow-scroll"> {{ page }} </pre>
    <!-- <pre class="h-96 overflow-scroll">{{ JSON.stringify(page?.body?.toc, null, 2) }}</pre> -->
    <div class="flex-1 flex bg-gray-950 justify-center">
      <CvMain v-bind="page" />
    </div>
  </div>
</template>
