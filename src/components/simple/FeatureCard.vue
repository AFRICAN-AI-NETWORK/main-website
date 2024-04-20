<script setup lang="ts">
defineProps<{
  stats?: number,
  description: string,
  secondary?: boolean
}>()
</script>

<template>
  <div class="flex flex-col lg:flex-col gap-7 text-white p-5 rounded-xl content-center justify-center"
    :class="secondary ? 'bg-secondary' : 'bg-primary'">
    <p v-if="stats" class="text-3xl xl:text-5xl">{{ stats }}</p>
    <p class="text-lg xl:text-2xl">{{ description }}</p>
  </div>
</template>