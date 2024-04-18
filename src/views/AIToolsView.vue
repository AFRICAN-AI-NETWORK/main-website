<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';

import HeroSection from '@/components/ai-tools/sections/HeroSection.vue';
</script>

<template>
  <header>
    <nav-bar :blue-bg="true" />
  </header>

  <main>
    <hero-section />
  </main>
</template>