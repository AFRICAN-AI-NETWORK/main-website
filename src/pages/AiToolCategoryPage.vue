<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';
import AiToolCard from '@/components/simple/AiToolCard.vue';
import sanity from '@/lib/sanity';
import type { AiTool, Category } from '@/types';
import { Loading, Notify } from 'notiflix';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const loading = ref(false);
const category = ref<Category>();
const tools = ref<AiTool[]>([])
const showing = ref(6);

const increaseShowing = () => {
  showing.value + 6 > tools.value.length ? showing.value = tools.value.length : showing.value += 6
}

const fetchData = (title: string) => {
  Loading.hourglass();
  loading.value = true;

  // Obtain AI tool from sanity using slug
  sanity.fetch(`*[_type == "aiToolCategory" && title == '${title}'][0] {
   "id": _id,
    title,
    description,
    "tools": *[_type == "aiTool" && references(^._id)],
    "createdAt": _createdAt,
}`).then(async (responseData) => {
    category.value = responseData;
    tools.value = responseData.tools;
  }).catch(() => {
    Notify.failure('Error fetching category, please try again later');
  }).finally(() => {
    Loading.remove();
    loading.value = false;
  })
}

onBeforeRouteUpdate(async (to) => {
  // Obtain category title from url
  const title = to.params.title;
  if (!title || Array.isArray(title)) return history.replaceState({}, '', '/'); // Redirect to home page if title is missing or invalid

  fetchData(decodeURI(title));
})

onMounted(() => {
  const title = useRoute().params.title;
  if (!title || Array.isArray(title)) return history.replaceState({}, '', '/'); // Redirect to home page if title is missing or invalid

  fetchData(decodeURI(title));
})
</script>

<template>
  <nav-bar :blue-bg="true" />

  <main class="min-h-dvh pt-[150px] xl:pt-[150px] px-10 pb-10">
    <template v-if="!loading && category">
      <div class="flex flex-col gap-4 items-center">
        <h1 class="text-5xl 2xl:text-7xl font-extrabold text-secondary">{{ category?.title }}</h1>
        <h2 class="text-lg 2xl:text-xl text-secondary">{{ category?.description }}</h2>
      </div>

      <div class="grid mt-16">
        <template v-if="tools.length > 0">
          <div class="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5">
            <ai-tool-card v-for="tool in tools.slice(0, showing)" :key="tool.id" :tool="tool" />
          </div>

          <button v-if="showing < tools.length" @click="increaseShowing"
            class="mt-5 bg-primary text-white rounded-full px-8 py-2 w-fit mx-auto">See More</button>
        </template>
        <p v-else class="font-semibold text-lg mt-5">No tool found</p>
      </div>
    </template>

    <p v-else-if="!loading && !category" class="text-3xl text-center">Category Not Found</p>
  </main>
</template>