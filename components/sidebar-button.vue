<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  label: string;
  icon: string;
  href?: string;
  to?: RouteLocationRaw;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div
    class="tooltip-right"
    :data-tip="showLabel ? undefined : props.label"
    :class="{ tooltip: !showLabel }"
  >
    <NuxtLink
      :to="props.href || props.to"
      :class="{ 'bg-blend-color bg-base-300': route.path === props.href }"
      class="flex gap-2 p-2 hover:bg-base-200 hover:cursor-pointer flex-nowrap"
    >
      <Icon
        class="flex-initial mx-auto"
        :name="props.icon"
        size="24"
        v-bind="$attrs"
      />
      <Transition name="grow">
        <div v-if="showLabel" class="flex flex-1">
          <span> {{ props.label }}</span>
        </div>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style lang="css" scoped>
.grow-enter-active {
  animation: grow 0.3s;
  animation-delay: 1s;
}

.grow-leave-active {
  animation: grow 0.1s reverse;
}

@keyframes grow {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
