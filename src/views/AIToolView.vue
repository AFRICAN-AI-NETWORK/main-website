<script setup lang="ts">
import AiToolCard from '@/components/simple/AiToolCard.vue';
import sanity from '@/lib/sanity';
import type { AiTool } from '@/types';
import { PortableText } from '@portabletext/vue';
import { Star } from 'lucide-vue-next';
import { Loading, Notify } from 'notiflix';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

import DiscordIcon from '@/components/simple/icons/DiscordIcon.vue';
import { BookmarkIcon, CalendarIcon, CheckCircleIcon, ExternalLinkIcon, FacebookIcon, LinkedinIcon, VerifiedIcon } from 'lucide-vue-next';

import NavBar from '@/components/layout/NavBar.vue';

// Obtain slug from url
const tool = ref<AiTool>();
const featuredTools = ref<AiTool[]>([]);
const loading = ref(false);

const fetchData = (slug: string) => {
  Loading.hourglass();
  loading.value = true;

  // Obtain AI tool from sanity using slug
  sanity.fetch(`*[_type == "aiTool" && slug.current == '${slug}'][0] {
    "id": _id,
    name,
    title,
    categories[]->,
    pricingModel,
    description,
    stars,
    body,
    siteUrl,
    verified,
    featured,
    "slug": slug.current,
    "authorName": author->name,
    "authorBio": author->bio,
    "authorImageUrl": author->image.asset->url,
    ytVideoUrl,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt
}`).then((responseData) => {
    tool.value = responseData;
  }).catch(() => {
    Notify.failure('Error fetching tool, please try again later');
  }).finally(() => {
    Loading.remove();
    loading.value = false;
  })

  // Obtain featured AI tools
  sanity.fetch(`*[_type == "aiTool" && featured == true] {
    "id": _id,
    name,
    title,
    categories[]->,
    pricingModel,
    description,
    stars,
    body,
    verified,
    siteUrl,
    featured,
    "slug": slug.current,
    "authorName": author->name,
    "authorBio": author->bio,
    "authorImageUrl": author->image.asset->url,
    ytVideoUrl,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt
}`).then((responseData) => {
    featuredTools.value = responseData;
  }).catch(() => {
    Notify.failure('Error fetching tool, please try again later');
  }).finally(() => {
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
    <div v-if="tool" class="pt-40 xl:pt-36 p-16">

      <div class="grid gap-5 xl:grid-cols-2">
        <div class="flex flex-col justify-between">
          <div class="flex gap-4">
            <img :src="tool.imageUrl" class="h-24 w-24 min-h-0 min-w-0 bg-black bg-opacity-70" alt="">
            <div class="flex flex-col justify-center">
              <p class="text-5xl font-bold">{{ tool.name }}</p>
              <p class="flex flex-wrap gap-1">
                <star v-for="i in tool.stars" :key="i" class="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span v-if="tool.verified" class="inline-flex text-primary"><verified-icon
                    class="fill-primary stroke-white" />Verified</span>
              </p>
            </div>
          </div>

          <p class="text-3xl line-clamp-2 overflow-ellipsis">{{ tool.description }}</p>

          <div>
            <p class="mt-2"><span class="font-semibold">AI Categories: </span><span class="text-primary">{{
              tool.categories.map((category) => toTitleCase(category.title)).join(", ") }}</span></p>
            <p class="mt-2"><span class="font-semibold">Pricing Model: </span>{{ tool.pricingModel }}</p>
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
          </div>

          <div class="flex gap-5">
            <button
              class="btn flex gap-1 items-center border-2 border-primary text-primary hover:bg-slate-200 focus-visible:bg-slate-200 bg-white"><bookmark-icon />
              0</button>
            <a class="btn flex gap-1 items-center" :href="tool.siteUrl">Visit Site <external-link-icon /></a>
          </div>
        </div>

        <div>
          <iframe v-if="tool.ytVideoUrl" :src="tool.ytVideoUrl" class="h-96 w-full" title="Play video" />
          <img v-else :src="tool.imageUrl" class="h-96 w-full object-cover" :alt="tool.imageAlt" />
        </div>
      </div>

      <div class="grid gap-10 xl:grid-cols-[65%_35%] mt-20">
        <div class="pr-10">
          <p class="flex gap-2 text-slate-500">
            <calendar-icon /> Updated {{ new Date(tool.updatedAt).toLocaleDateString() }}
          </p>
          <div class="mt-3 unreset">
            <PortableText :value="tool.body" />
          </div>
        </div>

        <div>
          <div v-if="featuredTools.length > 0">
            <h2 class="text-3xl font-bold">Featured AI Tools</h2>

            <div class="grid gap-5 mt-5">
              <ai-tool-card v-for="tool in featuredTools" :key="tool.id" :tool="tool" :featured="true" />
            </div>
          </div>

          <div class="mt-10 rounded-xl p-5 bg-primary text-white">
            <h2 class="text-3xl font-bold">Become an AI expert of your office</h2>
            <h3 class="text-lg font-semibold">Join 200 professionals adopting AI tools for work</h3>

            <ul class="flex flex-col gap-2 my-4">
              <li class="flex items-center gap-2">
                <check-circle-icon />Bookmark 100s of AI tools that interest you
              </li>
              <li class="flex items-center gap-2">
                <check-circle-icon />Get personalized AI tool recommendations every week
              </li>
              <li class="flex items-center gap-2">
                <check-circle-icon />Free weekly newsletter with practical news, trending tools, tutorials and more
              </li>
            </ul>

            <button class="w-full font-semibold rounded-full text-primary bg-white p-3">Subscribe for our
              premium</button>
          </div>
        </div>
      </div>
    </div>

    <div class="min-h-[inherit] grid content-center text-center" v-if="!loading && !tool">
      <h2 class="text-6xl font-bold pb-5">Resource not found</h2>
      <button class="btn text-xl w-fit mx-auto" @click="$router.replace('/')">Go back to
        home</button>
    </div>
  </main>
</template>