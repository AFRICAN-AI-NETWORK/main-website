<script setup lang="ts">
import type { Category } from '@/types';
import { RouterLink } from 'vue-router';

defineProps<{
  category: Category
}>()
</script>

<template>
  <router-link :to="'/ai-tool-categories/' + encodeURI(category.title)"
    class="flex text-secondary rounded-xl p-5 gap-2 shadow-lg">
    <img src="@/assets/text.svg" class="h-16 w-16" alt="">

    <div class="flex flex-col justify-between">
      <p class="text-lg font-bold">{{ category.title }}</p>
      <p class="">{{ category.numTools }} Tools</p>
    </div>
  </router-link>
</template>