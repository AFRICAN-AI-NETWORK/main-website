<script setup lang="ts">
import AiToolCard from '@/components/simple/AiToolCard.vue';
import SkeletonLoader from '@/components/simple/SkeletonLoader.vue';
import sanity from '@/lib/sanity';
import type { AiTool } from '@/types';
import { Notify } from 'notiflix';
import { onMounted, ref, watch } from 'vue';

const tools = ref<AiTool[]>([])
const showing = ref(0);

const increaseShowing = () => {
  showing.value + 5 > tools.value.length ? showing.value = tools.value.length : showing.value += 5
}

const searchQuery = ref('')
const filteredTools = ref<AiTool[]>([])
const classifiedTools = ref<AiTool[]>([])

watch(searchQuery, () => {
  if (searchQuery.value) {
    filteredTools.value = classification.value === "all" ? tools.value.filter((tool) => {
      return tool.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    }) : classifiedTools.value.filter((tool) => {
      return tool.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  }
})

type Classification = "all" | "featured" | "popular" | "new"
const classification = ref<Classification>("all")
const classifyTools = (newClassification: Classification) => {
  classification.value = newClassification

  if (classification.value === "featured") {
    classifiedTools.value = tools.value.filter((tool) => {
      return tool.featured
    })
  } else if (classification.value === "popular") {
    classifiedTools.value = tools.value.filter((tool) => {
      return tool.stars && tool.stars > 0
    })
  } else if (classification.value === "new") {
    classifiedTools.value = tools.value.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }).slice(0, 5)
  }

  showing.value = classification.value !== 'all' ? classifiedTools.value.length > 5 ? 5 : classifiedTools.value.length : tools.value.length > 5 ? 5 : tools.value.length
}
const handleClassificationChange = (e: Event) => {
  const newClassification = (e.target as HTMLSelectElement).value
  classifyTools(newClassification as Classification)
}

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
    featured,
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
    showing.value = tools.value.length > 5 ? 5 : tools.value.length
  }).catch(() => {
    Notify.failure('Error fetching tools, please try again later');
  }).finally(() => {
    loading.value = false;
  })
})
</script>

<template>
  <section class="min-h-dvh grid pt-10 px-5 pb-5 lg:place-items-center">
    <div class="flex flex-col gap-4 items-center">
      <h1 class="text-5xl 2xl:text-7xl font-extrabold">Discover what AI can do for you</h1>
      <h2 class="text-xl 2xl:text-2xl font-bold">We've helped professionals leverage AI by helping
        them
        find the best
        AI tools.</h2>

      <div
        class="flex self-start lg:self-auto w-fit max-w-[90%] p-1 lg:p-2 my-5 border-4 border-primary rounded-full text-xs md:text-sm lg:text-base">
        <input v-model="searchQuery" type="search" placeholder="Enter name..."
          class="bg-transparent min-w-0 m-0 outline-none px-4 py-2 placeholder:text-secondary placeholder:opacity-70"
          aria-label="Search for AI Tool" />
        <button type="submit" class="bg-primary rounded-full font-semibold p-3 text-white">Search AI Tools</button>
      </div>

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
          <p>All</p>
          <input type="radio" name="classification" aria-label="All" value="all" @change="handleClassificationChange"
            checked hidden />
        </label>
        <label
          class="py-3 px-8 rounded-full bg-secondary cursor-pointer has-[input:checked]:bg-primary has-[input:checked]:outline has-[input:checked]:outline-1 has-[input:checked]:outline-secondary">
          <p>Featured</p>
          <input type="radio" name="classification" aria-label="Featured" value="featured"
            @change="handleClassificationChange" hidden />
        </label>
        <label
          class="py-3 px-8 rounded-full bg-secondary cursor-pointer has-[input:checked]:bg-primary has-[input:checked]:outline has-[input:checked]:outline-1 has-[input:checked]:outline-secondary">
          <p>Popular</p>
          <input type="radio" name="classification" aria-label="Popular" value="popular"
            @change="handleClassificationChange" hidden />
        </label>
        <label
          class="py-3 px-8 rounded-full bg-secondary cursor-pointer has-[input:checked]:bg-primary has-[input:checked]:outline has-[input:checked]:outline-1 has-[input:checked]:outline-secondary">
          <p>New</p>
          <input type="radio" name="classification" aria-label="New" value="new" @change="handleClassificationChange"
            hidden />
        </label>
      </div>

      <div v-if="loading" class="mt-5 flex flex-wrap gap-5">
        <skeleton-loader variant="image" v-for="i in 3" :key="i" />
      </div>

      <template v-else-if="searchQuery">
        <div v-if="filteredTools.length > 0" class="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
          <ai-tool-card v-for="tool in filteredTools" :key="tool.id" :tool="tool" />
        </div>

        <p v-else class="font-semibold text-lg mt-5">No search result</p>
      </template>

      <template v-else-if="classification !== 'all'">
        <template v-if="classifiedTools.length > 0">
          <div class="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
            <ai-tool-card v-for="tool in classifiedTools.slice(0, showing)" :key="tool.id" :tool="tool" />
          </div>

          <button v-if="showing !== classifiedTools.length" @click="increaseShowing"
            class="mt-5 bg-primary text-white rounded-full px-8 py-2 w-fit mx-auto">See More</button>
        </template>
        <p v-else class="font-semibold text-lg mt-5">No tool fits the filter</p>
      </template>

      <template v-else>
        <template v-if="tools.length > 0">
          <div class="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
            <ai-tool-card v-for="tool in tools.slice(0, showing)" :key="tool.id" :tool="tool" />
          </div>

          <button v-if="showing !== tools.length" @click="increaseShowing"
            class="mt-5 bg-primary text-white rounded-full px-8 py-2 w-fit mx-auto">See More</button>
        </template>
        <p v-else class="font-semibold text-lg mt-5">No tool found</p>
      </template>

    </div>
  </section>
</template>