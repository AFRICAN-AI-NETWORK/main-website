<script setup lang="ts">
defineProps<{ name: string, logo: string }>()
</script>

<template>
  <div class="border border-primary rounded-lg px-5 py-2">
    <img :src="logo" :alt="name" class="w-28 h-28 object-contain" />
  </div>
</template>