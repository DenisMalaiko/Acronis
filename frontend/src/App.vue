<script setup lang="ts">
import AppHeader from './shared/components/header/AppHeader.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <AppHeader />

    <main class="p-4 sm:p-6 lg:p-8">
      <router-view />
    </main>
  </div>
</template>
