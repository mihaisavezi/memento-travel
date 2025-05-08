<script lang="ts" setup>
const authStore = useAuthStore();
const colorMode = useColorMode();
const isDark = computed(() =>
  colorMode.value === "dark");
</script>

<template>
  <div
    class="navbar"
    :class="{
      'bg-indigo-950/60': isDark,
      'bg-sky-200/50': !isDark,
    }"
  >
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl tracking-wide font-light text-base-content font-serif">
        Memento
      </NuxtLink>
    </div>
    <div class="navbar-end">
      <div v-if="!authStore.loading && authStore.user" class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="btn m-1"
        >
          <div v-if="authStore.user.image" class="avatar">
            <div class="w-8 rounded-full">
              <img :src="authStore.user.image" :alt="authStore.user.name">
            </div>
          </div>
          {{ authStore.user.name }}
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
          <li>
            <NuxtLink to="/sign-out">
              <Icon name="tabler:logout-2" size="24" />
              Sign Out
            </NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink v-else to="sign-in">
        <button class="btn btn-primary">
          Sign In
        </button>
      </NuxtLink>
      <AppThemeToggle />
    </div>
  </div>
</template>
