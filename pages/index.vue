<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="flex flex-1 bg-radial-[at_50%_75%] from-sky-300 via-blue-500 to-indigo-950 to-90%">
    <div class="hero container mx-auto mt-4 flex flex-col">
      <div class="flex flex-1 min-w-xl min-h-96">
        <HeroMain />
      </div>
      <div class="hero-content text-center min-h-96 flex-col justify-start">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">
            Memento
          </h1>
          <p class="py-6">
            Easily document your travels and adventures with this intuitive travel log app. Save locations,
            upload photos, and write notes to build a vivid digital journal of your journeys.
          </p>
          <NuxtLink v-if="!authStore.user">
            <NuxtLink to="sign-in">
              <button class="btn btn-secondary">
                Sign In
              </button>
            </NuxtLink>
          </NuxtLink>
          <NuxtLink v-else to="/dashboard">
            Go to Dashboard
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
