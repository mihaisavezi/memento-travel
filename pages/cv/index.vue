<script setup lang="ts">
const { data: page } = await useAsyncData(`cv`, () => {
  return queryCollection("cvMD").first();
}, { server: false });
</script>

<template>
  <div>
    <div class="flex-1 flex bg-gray-950 justify-center">
      <div class="p-16 flex flex-col gap-4">
        <ContentRenderer
          v-if="page"
          class="font-serif gap-4 flex flex-col mx-auto max-w-164 writing"
          :value="page"
        />
      </div>
      <div class="hidden md:flex fixed right-0 top-50 pr-6">
        <ul class="flex gap-6 flex-col">
          <li
            v-for="item in page?.body?.toc?.links"
            :key="item.id"
            class="text-sm font-serif"
          >
            <a :href="`#${item.id}`">

              {{ item.text.toLowerCase() }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
