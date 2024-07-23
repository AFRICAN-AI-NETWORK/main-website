<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';

import AiToolsCategories from '@/components/ai-tools/sections/AiToolsCategories.vue';
import HeroSection from '@/components/ai-tools/sections/HeroSection.vue';
</script>

<template>
  <header>
    <nav-bar :blue-bg="true" />
  </header>

  <main class="min-h-dvh pt-[200px] xl:pt-[100px] 2xl:pt-[150px]">
    <hero-section />
    <ai-tools-categories />
  </main>
</template>