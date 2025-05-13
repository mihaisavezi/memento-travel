<script lang="ts" setup>
const { backgroundColorClasses } = useUIColors();
</script>

<template>
  <div
    class="hero flex flex-col justify-center align-center mx-auto flex-1 bg-radial-[at_50%_75%] from-sky-300 via-base-500 to-indigo-950 to-90%"
  >
    <div class="card card-border border-base-300 card-sm overflow-hidden" :class="backgroundColorClasses">
      <div class="border-base-300 border-b border-dashed">
        <div class="flex items-center gap-2 p-4">
          <div class="grow">
            <div class="flex items-center gap-2 text-sm font-medium">
              <Icon name="tabler:user" size="24" />
              Sign in to your account
            </div>
          </div>
        </div>
      </div>
      <div class="card-body pt-12">
        <AuthButton provider="github" />
        <div class="divider px-4" />
        <AuthButton provider="google" />
      </div>
    </div>
  </div>
</template>
