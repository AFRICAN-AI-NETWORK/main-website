<script setup lang="ts">
import type { Resource } from '@/types';

defineProps<{
  resource: Resource;
}>()
</script>

<template>
  <a :href="/resources/ + resource.slug">
    <img :src="resource.imageUrl" :alt="resource.imageAlt" class="h-72 w-full italic object-cover rounded-3xl">

    <h3 class="mt-8 text-2xl text-secondary font-bold">{{ resource.title }}</h3>
  </a>
</template>