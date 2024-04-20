<script setup lang="ts">
import AiToolCategory from '@/components/simple/AiToolCategory.vue';

const categories = [
  {
    id: 'uwqwi-qjwnqw-wqiqw-qjna',
    name: "Business and Productivity",
    numTools: 234
  },
  {
    id: 'uwqwi-qjw2qw-wqiqw-qjna',
    name: "Business and Productivity",
    numTools: 256
  },
  {
    id: 'uwqwi-qjw2qw-wqiqw-oojna',
    name: "Business and Productivity",
    numTools: 256
  },
  {
    id: 'uegqwi-qjw2qw-wqiqw-qjna',
    name: "Business and Productivity",
    numTools: 256
  },
  {
    id: 'uwqwi-qjw2qw-wqiqw-qlna',
    name: "Business and Productivity",
    numTools: 256
  },
  {
    id: 'uwqwi-qjw2qw-wqiqw-qwjna',
    name: "Business and Productivity",
    numTools: 256
  },
]
</script>

<template>
  <section class="py-20 px-5 2xl:px-0">
    <div class="flex flex-col gap-4 items-center">
      <h1 class="text-5xl 2xl:text-7xl font-extrabold text-secondary">AI Tool Categories</h1>
      <h2 class="text-lg 2xl:text-xl text-secondary">We've categorized 10,000 AI tools into 23 categories
      </h2>
    </div>

    <div class="mt-5 grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5 lg:px-16">
      <ai-tool-category v-for="category in categories" :key="category.id" :category="category" />
    </div>
  </section>
</template>