<script setup lang="ts">
import { RouterView } from 'vue-router';

import MainFooter from '@/components/layout/MainFooter.vue';
import { Toaster } from '@/components/ui/toast';
</script>

<template>
  <RouterView />
  <main-footer />
  <Toaster />
</template>
