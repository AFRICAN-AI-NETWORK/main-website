<script setup lang="ts">
import sanity from '@/lib/sanity';
import type { Resource } from '@/types';
import { PortableText } from '@portabletext/vue';
import { Loading, Notify } from 'notiflix';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

// Obtain slug from url
const resource = ref<Resource>();
const loading = ref(false);

const fetchData = (slug: string) => {
  Loading.hourglass();
  loading.value = true;

  // Obtain resource from sanity using slug
  sanity.fetch(`*[_type == "resource" && slug.current == '${slug}'][0] {
    "id": _id,
    title,
    "category": categories[0]->title,
    body,
    "slug": slug.current,
    "authorName": author->name,
    "authorBio": author->bio,
    "authorImageUrl": author->image.asset->url,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt
}`).then((responseData) => {
    resource.value = responseData;
  }).catch(() => {
    Notify.failure('Error fetching resource, please try again later');
  }).finally(() => {
    Loading.remove();
    loading.value = false;
  })
}

onBeforeRouteUpdate(async (to) => {
  const slug = to.params.slug;
  if (!slug || Array.isArray(slug)) return history.replaceState({}, '', '/'); // Redirect to home page if slug is missing or invalid

  fetchData(slug);
})

onMounted(() => {
  const slug = useRoute().params.slug;
  if (!slug || Array.isArray(slug)) return history.replaceState({}, '', '/'); // Redirect to home page if slug is missing or invalid

  fetchData(slug);
})
</script>

<template>
  <main class="min-h-dvh bg-secondary text-white">
    <div v-if="resource" class="pt-40 xl:pt-32 p-16">
      <div class="unreset">
        <PortableText :value="resource.body" />
      </div>

      <div v-if="resource.authorName" class="mt-10 p-5 border rounded-lg">
        <div class="flex flex-col gap-3 md:gap-0 md:flex-row md:items-center">
          <img class="w-16 h-16 rounded-full mr-3 object-contain" :src="resource.authorImageUrl"
            :alt="resource.authorName">
          <div class="text-sm">
            <a href="#"
              class="font-medium leading-none text-blue-200 hover:text-indigo-600 transition duration-500 ease-in-out">
              {{ resource.authorName }}
            </a>
            <PortableText class="unreset" :value="resource.authorBio" />
          </div>
        </div>
      </div>
    </div>

    <div class="min-h-[inherit] grid content-center text-center" v-if="!loading && !resource">
      <h2 class="text-6xl font-bold pb-5">Resource not found</h2>
      <button class="btn-secondary text-xl w-fit mx-auto" @click="$router.replace('/')">Go back to
        home</button>
    </div>
  </main>
</template>