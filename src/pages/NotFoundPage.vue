<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
  <div class="min-h-dvh grid content-center text-center">
    <h2 class="text-6xl font-bold pb-5">Page not found</h2>
    <Button class="text-xl w-fit mx-auto" @click="$router.replace('/')">Go back to
      home</Button>
  </div>
</template>