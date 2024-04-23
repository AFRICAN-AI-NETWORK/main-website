<!-- <script setup lang="ts">
import sanity from '@/lib/sanity';
import type { Resource } from '@/types';
import { PortableText } from '@portabletext/vue';
import { Loading, Notify } from 'notiflix';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

import NavBar from '@/components/layout/NavBar.vue';

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
    "category": category->title,
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
  <nav-bar :blue-bg="true" />

  <main class="min-h-dvh">
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
</template> -->

<script setup lang="ts">
import sanity from '@/lib/sanity';
import type { Resource } from '@/types';
import { PortableText } from '@portabletext/vue';
import { Loading, Notify } from 'notiflix';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

import DiscordIcon from '@/components/simple/icons/DiscordIcon.vue';
import { BookmarkIcon, CalendarIcon, CheckCircleIcon, FacebookIcon, LinkedinIcon } from 'lucide-vue-next';

import NavBar from '@/components/layout/NavBar.vue';

const resource = ref<Resource>();
const loading = ref(false);

const fetchData = (slug: string) => {
  Loading.hourglass();
  loading.value = true;

  // Obtain resource from sanity using slug
  sanity.fetch(`*[_type == "resource" && slug.current == '${slug}'][0] {
    "id": _id,
    title,
    "category": category->title,
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

const toTitleCase = (str: string) => {
  return str.toLowerCase().replace(/^(.)|\s(.)/g, function ($1) {
    return $1.toUpperCase();
  });
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
  <nav-bar :blue-bg="true" />

  <main class="min-h-dvh">
    <div v-if="resource" class="pt-40 xl:pt-36 p-16">
      <div class="flex flex-col justify-between">
        <div class="flex items-center gap-5">
          <img src="@/assets/futuristic-robot.svg" class="h-full w-24 min-h-0 min-w-0 bg-black bg-opacity-70" alt="">
          <div class="flex flex-col justify-center">
            <p class="text-5xl font-bold">{{ resource.title }}</p>
            <p class="mt-2"><span class="font-semibold">Category: </span><span class="text-primary">{{
              toTitleCase(resource.category) }}</span></p>
            <p class="mt-2">
              <span class="font-semibold">Follow: </span>
              <span class="inline-flex gap-2">
                <a href="https://www.facebook.com/groups/1490131391564053/?ref=share" title="Visit our Facebook Page">
                  <p class="sr-only">Visit our Facebook Page</p>
                  <facebook-icon class="stroke-primary fill-primary" height="20" width="20" />
                </a>
                <a href="https://www.linkedin.com/groups/9802179" title="Visit our LinkedIn Account">
                  <p class="sr-only">Visit our LinkedIn Account</p>
                  <linkedin-icon class="stroke-primary" height="20" width="20" />
                </a>
                <a href="https://discord.gg/zytPSazu6S" title="Join our Discord Channel">
                  <p class="sr-only">Join our Discord Channel</p>
                  <discord-icon class="stroke-primary fill-primary" height="20" width="20" />
                </a>
              </span>
            </p>
            <button
              class="btn w-fit flex border-2 border-primary text-primary hover:bg-slate-200 focus-visible:bg-slate-200 bg-white"><bookmark-icon />
              0</button>
          </div>
        </div>
      </div>

      <div class="grid gap-10 xl:grid-cols-[65%_35%] mt-20">
        <div class="pr-10">
          <p class="flex gap-2 text-slate-500">
            <calendar-icon /> Updated {{ new Date(resource.updatedAt).toLocaleDateString() }}
          </p>
          <div class="mt-3 unreset">
            <PortableText :value="resource.body" />
          </div>
        </div>

        <div>
          <div class="mt-10 rounded-xl p-5 bg-primary text-white">
            <h2 class="text-3xl font-bold">Become an AI expert of your office</h2>
            <h3 class="text-lg font-semibold">Join 200 professionals adopting AI tools for work</h3>

            <ul class="flex flex-col gap-2 my-4">
              <li class="flex items-center gap-2">
                <check-circle-icon />Join 200 professionals adopting AI tools for work
              </li>
              <li class="flex items-center gap-2">
                <check-circle-icon />Join 200 professionals adopting AI tools for work
              </li>
              <li class="flex items-center gap-2">
                <check-circle-icon />Join 200 professionals adopting AI tools for work
              </li>
            </ul>

            <button class="w-full font-semibold rounded-full text-primary bg-white p-3">Subscribe for our
              premium</button>
          </div>
        </div>
      </div>
    </div>

    <div class="min-h-[inherit] grid content-center text-center" v-if="!loading && !resource">
      <h2 class="text-6xl font-bold pb-5">Resource not found</h2>
      <button class="btn text-xl w-fit mx-auto" @click="$router.replace('/')">Go back to
        home</button>
    </div>
  </main>
</template>