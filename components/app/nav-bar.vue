<template>
  <div class="navbar bg-gray-700 text-white">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Memento
      </NuxtLink>
    </div>
    <div class="navbar-end">
      <AuthButton />
      <AppThemeToggle />
    </div>
  </div>
</template>
