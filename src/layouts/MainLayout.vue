<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav-bar />
  </header>

  <main class="min-h-dvh pt-[200px] xl:pt-[100px] 2xl:pt-[150px]">
    <RouterView />
  </main>
</template>