<script setup lang="ts">
import { RouterView } from 'vue-router';

import NavBar from '@/components/layout/NavBar.vue';
</script>

<template>
  <header>
    <nav-bar />
  </header>

  <RouterView />
</template>
