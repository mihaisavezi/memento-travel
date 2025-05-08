<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="flex flex-1 bg-radial-[at_50%_75%] from-sky-300 via-base-500 to-indigo-950 to-90%">
    <div class="hero container mx-auto mt-4 flex flex-col">
      <div class="flex flex-1 min-w-md max-h-96">
        <HeroMain />
      </div>
      <div class="hero-content text-center min-h-96 flex-col justify-start">
        <div class="max-w-md text-base-100">
          <h1 class="text-6xl font-serif">
            Memento
          </h1>
          <h3>
            all your memories in one place
          </h3>
          <p class="py-12 text-sm text-base-200">
            Save locations,
            upload photos, and write notes to build a vivid digital journal of your journeys.
          </p>
          <NuxtLink v-if="!authStore.user">
            <NuxtLink to="sign-in">
              <button class="btn btn-secondary">
                Sign In
              </button>
            </NuxtLink>
          </NuxtLink>
          <div v-else class="flex gap-2 mx-auto justify-center">
            <NuxtLink class="btn btn-primary" to="/dashboard/add">
              Add a new place
            </NuxtLink>
            <NuxtLink class="btn btn-info btn-link" to="/dashboard">
              Check where you've been
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
