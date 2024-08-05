<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';
import EventCard from '@/components/simple/EventCard.vue';
import Button from '@/components/ui/button/Button.vue';
import sanity from '@/lib/sanity';
import type { Country } from '@/types';
import { PortableText } from '@portabletext/vue';
import { Loading, Notify } from 'notiflix';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const country = ref<Country>();
const loading = ref(false);

const fetchData = (name: string) => {
  Loading.hourglass();
  loading.value = true;

  sanity.fetch(`*[_type == "country" && name == '${name}'][0] {
    "id": _id,
    name,
    numMembers,
    socials,
    "events": *[_type == 'event' && references(^._id)] {
      title,
      description,
      linkToEvent,
      slug,
      "imageUrl": image.asset->url,
      location,
      date
    },
    "projects": *[_type == 'project' && references(^._id)] {
      name,
      description,
      linkToProject
    },
    "imageUrl": image.asset->url,
}`).then((responseData) => {
    country.value = responseData;
  }).catch(() => {
    Notify.failure('Error fetching country information, please try again later');
  }).finally(() => {
    Loading.remove();
    loading.value = false;
  })
}

onBeforeRouteUpdate(async (to) => {
  const name = to.params.name;
  if (!name || Array.isArray(name)) return history.replaceState({}, '', '/'); // Redirect to home page if name is missing or invalid

  fetchData(name);
})

onMounted(() => {
  const name = useRoute().params.name;
  if (!name || Array.isArray(name)) return history.replaceState({}, '', '/'); // Redirect to home page if name is missing or invalid

  fetchData(name);
})
</script>

<template>
  <header>
    <nav-bar :blue-bg="true" />
  </header>

  <main class="min-h-dvh pt-[150px] xl:pt-[150px] px-10 pb-10">
    <div v-if="country">
      <div class="grid gap-5 xl:grid-cols-2">
        <div class="flex flex-col justify-between gap-5 xl:gap-2 xl:py-14">
          <div class="flex gap-4">
            <img :src="country.imageUrl" class="h-24 w-24 min-h-0 min-w-0 bg-black bg-opacity-70" alt="">
            <div class="flex flex-col justify-center">
              <h1 class="text-xl lg:text-3xl xl:text-4xl font-bold">{{ country.name }}</h1>
            </div>
          </div>

          <div class="text-lg">
            <p><span class="font-bold">Members:</span> {{ country.numMembers }}</p>
            <p><span class="font-bold">Projects:</span> {{ country.projects?.length || 0 }}</p>
            <p><span class="font-bold">Events:</span> {{ country.events?.length || 0 }}</p>
          </div>

          <div class="flex gap-5">
            <Button as="a" v-if="country.socials.find((social) => social.platform.toLowerCase() === 'telegram')"
              :href="country.socials.find((social) => social.platform.toLowerCase() === 'telegram')?.handle"
              class="flex gap-1 items-center border-2 border-primary text-primary hover:bg-slate-200 focus-visible:bg-slate-200 bg-white">Telegram
              Group</Button>
            <Button as="a" class="flex gap-1 items-center"
              v-if="country.socials.find((social) => social.platform.toLowerCase() === 'whatsapp')"
              :href="country.socials.find((social) => social.platform.toLowerCase() === 'whatsapp')?.handle">Whatsapp
              Group</Button>
          </div>
        </div>

        <div class="hidden xl:block">
          <img :src="country.imageUrl" class="h-96 w-full object-cover" alt="Country flag" />
        </div>
      </div>

      <div class="mt-14" v-if="country.events && country.events.length > 0">
        <h2 class="mb-2 text-xl lg:text-3xl font-bold">
          Events</h2>

        <div class="mt-5 grid gap-5">
          <event-card v-for="event in country.events" :key="event.title" :event="event" />
        </div>
      </div>

      <div class="mt-14" v-if="country.projects && country.projects.length > 0">
        <h2 class="mb-8 text-xl lg:text-3xl font-bold">
          Projects</h2>

        <div v-for="project, i in country.projects" :key="project.name" class="mb-5">
          <h3 class="font-bold lg:text-xl">{{ i + 1 }}. {{ project.name }}</h3>
          <div class="unreset">
            <PortableText :value="project.description" />
          </div>
        </div>
      </div>
    </div>

    <div class="min-h-[inherit] grid content-center text-center" v-if="!loading && !country">
      <h2 class="text-6xl font-bold pb-5">Country not found</h2>
      <Button class="text-xl w-fit mx-auto" @click="$router.replace('/')">Go back to
        home</Button>
    </div>
  </main>
</template>