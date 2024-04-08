<script setup lang="ts">
defineProps<{ name: string, logo: string }>()
</script>

<template>
  <div class="border border-primary rounded-lg px-20 py-2">
    <img :src="logo" :alt="name" class="w-12 h-12 object-contain" />
  </div>
</template>