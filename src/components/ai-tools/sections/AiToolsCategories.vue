<script setup lang="ts">
import AiToolCategory from '@/components/simple/AiToolCategory.vue';
import SkeletonLoader from '@/components/simple/SkeletonLoader.vue';
import sanity from '@/lib/sanity';
import type { Category } from '@/types';
import { Notify } from 'notiflix';
import { onMounted, ref } from 'vue';

const loading = ref(false);
const categories = ref<Category[]>([]);
const numTools = ref(0);

onMounted(() => {
  loading.value = true

  sanity.fetch(`*[_type == "aiToolCategory"] | order(createdAt) {
    "id": _id,
    title,
    description,
    "numTools": count(*[_type == 'aiTool' && references(^._id)]),
    "createdAt": _createdAt,
  }`).then((responseData) => {
    categories.value = responseData
  }).catch(() => {
    Notify.failure('Error fetching categories, please try again later');
  }).finally(() => {
    loading.value = false
  })

  sanity.fetch('count(*[_type == "aiTool"])').then((responseData) => {
    numTools.value = responseData
  })
})
</script>

<template>
  <section class="py-20 px-5 2xl:px-0">
    <div class="flex flex-col gap-4 items-center">
      <h1 class="text-5xl 2xl:text-7xl font-extrabold text-secondary">AI Tool Categories</h1>
      <h2 class="text-lg 2xl:text-xl text-secondary">We've categorized {{ numTools }} AI
        tool{{ numTools !== 1 ? 's' : '' }} into {{ categories.length }}
        {{ categories.length !== 1 ? 'categories' : 'category' }}
      </h2>
    </div>

    <div v-if="loading || categories.length > 0"
      class="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5 lg:px-16">
      <template v-if="loading">
        <skeleton-loader variant="image" v-for="i in 3" :key="i" />
      </template>
      <ai-tool-category v-else v-for="category in categories" :key="category.id" :category="category" />
    </div>

    <p v-else class="mt-5 lg:px-16 text-lg font-semibold">No category found</p>
  </section>
</template>