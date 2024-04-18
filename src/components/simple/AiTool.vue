<script setup lang="ts">
import { Star } from 'lucide-vue-next';

defineProps<{
  tool: {
    id: string;
    name: string,
    type: string,
    description: string
  }
}>()
</script>

<template>
  <div class="bg-primary text-white rounded-xl p-5">
    <div class="flex gap-2">
      <img src="@/assets/futuristic-robot.svg" class="h-16 w-16 min-h-0 min-w-0 rounded-xl bg-black bg-opacity-70"
        alt="">
      <div>
        <p class="text-lg font-bold">{{ tool.name }}</p>
        <p class="flex gap-1">
          <star v-for="i in 5" :key="i" class="h-5 w-5 fill-yellow-400 text-yellow-400" />
        </p>
      </div>
    </div>
    <p class="mt-2 font-semibold">{{ tool.type }}</p>
    <p class="mt-3 text-sm line-clamp-2 overflow-ellipsis">{{ tool.description }}</p>
    <a class="block w-fit ml-auto mt-3 p-2 rounded-lg border-2 border-white text-sm" :href="`/resources/${tool.id}`">See
      More</a>
  </div>
</template>