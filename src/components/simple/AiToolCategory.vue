<script setup lang="ts">
defineProps<{
  name: string,
  numTools: number
}>()
</script>

<template>
  <div>
    <p>{{ name }}</p>
    <p>{{ numTools }} Tools</p>
  </div>
</template>