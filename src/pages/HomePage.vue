<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';

import FeaturesAndPartnersSection from '@/components/home/sections/FeaturesAndPartnersSection.vue';
import HeroSection from '@/components/home/sections/HeroSection.vue';
import ReviewsSection from '@/components/home/sections/ReviewsSection.vue';
import ResourcesSection from '@/components/home/sections/ResourcesSection.vue';
</script>

<template>
  <header>
    <nav-bar transparent />
  </header>

  <main>
    <hero-section />
    <features-and-partners-section />
    <reviews-section />
    <resources-section />
  </main>
</template>
