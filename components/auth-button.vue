<script lang="ts" setup>
const props = defineProps<{
  provider: "github" | "google";
}>();

const authStore = useAuthStore();
</script>

<template>
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
  </div>
  <button
    v-else
    :disabled="authStore.loading"
    class="btn btn-outline"
    @click="authStore.signIn(props.provider)"
  >
    Sign In With<span class="capitalize">{{ props.provider }}</span>
    <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
    <Icon
      v-else
      :name="`tabler:brand-${props.provider}`"
      size="24"
    />
  </button>
</template>
