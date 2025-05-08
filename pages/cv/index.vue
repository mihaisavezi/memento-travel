<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection("content").path(route.path).first();
}, { server: false });
</script>

<template>
  <div class="p-24 font-serif text-md overflow-auto">
    <ContentRenderer v-if="page" :value="page" />
    <div v-else>
      Home not found
    </div>
  </div>
</template>
