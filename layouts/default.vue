<script lang="ts" setup>
const authStore = useAuthStore();

await authStore.init(); // uses suspense - prevents everything to render until it resolves
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavBar />
    <main class="flex-1 flex flex-col bg-">
      <slot />
    </main>
  </div>
</template>
