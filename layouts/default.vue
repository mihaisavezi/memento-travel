<script lang="ts" setup>
const authStore = useAuthStore();

await authStore.init(); // uses suspense - prevents everything to render until it resolves
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavBar />
    <main>
      <slot />
    </main>
  </div>
</template>
