<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection("content").path(route.path).first();
}, { server: false });
console.log("🚀 ~ const{data:page}=awaituseAsyncData ~ page:", page.value);
</script>

<template>
  <div class="flex-1 flex">
    <div class="flex-1 overflow-auto">
      <div class="flex size-full flex-col">
        <div class="p-16 flex flex-col gap-4">
          <ContentRenderer
            v-if="page"
            class="font-serif gap-4 flex flex-col"
            :value="page"
          />
          <div v-else>
            Home not found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
