<script setup lang="ts">
defineProps<{
  metric: number,
  description: string,
  secondary?: boolean
}>()
</script>

<template>
  <div class="flex flex-col lg:flex-col gap-7 text-white p-5 rounded-xl content-center justify-center"
    :class="secondary ? 'bg-secondary' : 'bg-primary'">
    <p class="text-5xl">{{ metric }}+</p>
    <p class="text-2xl">{{ description }}</p>
  </div>
</template>