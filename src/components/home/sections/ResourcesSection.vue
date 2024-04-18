<script setup lang="ts">
import type { Resource } from '@/types';
import { onMounted, ref } from 'vue';

import ResourceCard from '@/components/simple/ResourceCard.vue';
import SkeletonLoader from '@/components/simple/SkeletonLoader.vue';

import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import sanity from '@/lib/sanity';
import { Notify } from 'notiflix';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Navigation, Pagination, A11y];

const resources = ref<Resource[]>([])
const loading = ref(false)

const screenWidth = ref(window.innerWidth);
window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth
})

onMounted(() => {
  loading.value = true;

  sanity.fetch(`*[_type == "resource"] | order(createdAt) {
    "id": _id,
    title,
    "category": categories[0]->title,
    body,
    "slug": slug.current,
    "authorName": author->name,
    "authorImageUrl": author->image.asset->url,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt
  }`).then((responseData) => {
    resources.value = responseData
  }).catch(() => {
    Notify.failure('Error fetching resources, please try again later');
  }).finally(() => {
    loading.value = false;
  })
})
</script>

<template>
  <section id="resources" class="p-16 lg:p-20">
    <h2 class="uppercase text-primary font-bold text-4xl">Resources:</h2>

    <div class="mt-10">
      <div v-if="loading" class="flex flex-wrap gap-5">
        <skeleton-loader variant="image" v-for="i in 3" :key="i" />
      </div>

      <swiper v-else-if="resources.length > 0" :modules="modules" :slides-per-view="screenWidth < 1024 ? 1 : 2.6"
        :space-between="50" navigation :pagination="{ clickable: true }" :scrollbar="{ draggable: true }">
        <swiper-slide v-for="resource in resources" :key="resource.id">
          <resource-card :resource="resource" />
        </swiper-slide>
        <swiper-slide v-for="resource in resources" :key="resource.id">
          <resource-card :resource="resource" />
        </swiper-slide>
      </swiper>

      <p v-else class="text-2xl text-secondary font-bold">No resources found, check again later.</p>
    </div>
  </section>
</template>