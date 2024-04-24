<script setup lang="ts">
import type { Category } from '@/types';

defineProps<{
  category: Category
}>()
</script>

<template>
  <div class="flex text-secondary rounded-xl p-5 gap-2 shadow-lg">
    <img src="@/assets/text.svg" class="h-16 w-16" alt="">

    <div class="flex flex-col justify-between">
      <p class="text-lg font-bold">{{ category.title }}</p>
      <p class="">{{ category.numTools }} Tools</p>
    </div>
  </div>
</template>