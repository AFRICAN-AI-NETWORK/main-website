<script setup lang="ts">
import AiToolCard from '@/components/simple/AiToolCard.vue';
import SkeletonLoader from '@/components/simple/SkeletonLoader.vue';
import sanity from '@/lib/sanity';
import type { AiTool } from '@/types';
import { Notify } from 'notiflix';
import { onMounted, ref } from 'vue';

const showingMore = ref(false);

const tools = ref<AiTool[]>([])
const loading = ref(false)

onMounted(() => {
  loading.value = true;

  sanity.fetch(`*[_type == "aiTool"] | order(createdAt) {
    "id": _id,
    name,
     categories[]->,
    pricingModel,
    description,
    body,
    stars,
    "slug": slug.current,
    "authorName": author->name,
    "authorImageUrl": author->image.asset->url,
    ytVideoUrl,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt
  }`).then((responseData) => {
    tools.value = responseData
  }).catch(() => {
    Notify.failure('Error fetching tools, please try again later');
  }).finally(() => {
    loading.value = false;
  })
})
</script>

<template>
  <section class="mt-[150px] md:mt-[200px] min-h-dvh grid pt-10 px-5 pb-5 lg:p-0 lg:place-items-center">
    <div class="flex flex-col gap-4 items-center">
      <h1 class="text-5xl 2xl:text-7xl font-extrabold text-secondary">Discover what AI can do for you</h1>
      <h2 class="text-xl 2xl:text-2xl font-bold text-secondary">We've helped professionals leverage AI by helping
        them
        find the best
        AI tools.</h2>

      <form
        class="flex w-fit max-w-[100%] p-1 lg:p-2 my-5 border-4 border-primary rounded-full text-xs md:text-sm lg:text-base">
        <input type="search" placeholder="Enter name..."
          class="bg-transparent m-0 outline-none px-4 py-2 placeholder:text-secondary placeholder:opacity-70"
          aria-label="Search for AI Tool" />
        <button type="submit" class="bg-primary rounded-full font-semibold p-3 text-white">Search AI Tools</button>
      </form>

      <div class="flex flex-wrap gap-2 text-sm text-white">
        <p class="py-3 px-8 rounded-full bg-primary">Marketing</p>
        <p class="py-3 px-8 rounded-full bg-primary">Productivity</p>
        <p class="py-3 px-8 rounded-full bg-primary">Design</p>
        <p class="py-3 px-8 rounded-full bg-primary">Research</p>
        <p class="py-3 px-8 rounded-full bg-primary">More</p>
      </div>
    </div>

    <div class="mt-20 xl:mt-32 flex flex-col lg:px-16 w-full">
      <div class="flex flex-wrap gap-2 text-sm text-white">
        <label
          class="py-3 px-8 rounded-full bg-secondary cursor-pointer has-[input:checked]:bg-primary has-[input:checked]:outline has-[input:checked]:outline-1 has-[input:checked]:outline-secondary">
          <p>Featured</p>
          <input type="radio" name="classification" aria-label="Featured" hidden checked />
        </label>
        <label
          class="py-3 px-8 rounded-full bg-secondary cursor-pointer has-[input:checked]:bg-primary has-[input:checked]:outline has-[input:checked]:outline-1 has-[input:checked]:outline-secondary">
          <p>Popular</p>
          <input type="radio" name="classification" aria-label="Popular" hidden />
        </label>
        <label
          class="py-3 px-8 rounded-full bg-secondary cursor-pointer has-[input:checked]:bg-primary has-[input:checked]:outline has-[input:checked]:outline-1 has-[input:checked]:outline-secondary">
          <p>New</p>
          <input type="radio" name="classification" aria-label="New" hidden />
        </label>
      </div>

      <div v-if="loading" class="mt-5 flex flex-wrap gap-5">
        <skeleton-loader variant="image" v-for="i in 3" :key="i" />
      </div>

      <template v-else-if="tools.length > 0">
        <div class="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
          <ai-tool-card v-for="tool in tools.slice(0, showingMore ? tools.length - 1 : 5)" :key="tool.id"
            :tool="tool" />
        </div>

        <button v-if="!showingMore && (tools.length > 6)" @click="() => showingMore = true"
          class="mt-5 bg-primary text-white rounded-full px-8 py-2 w-fit mx-auto">More</button>
      </template>

      <p v-else class="font-semibold text-lg mt-5">No tool found</p>
    </div>
  </section>
</template>