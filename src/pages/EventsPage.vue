<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';
import EventCard from '@/components/simple/EventCard.vue';
import sanity from '@/lib/sanity';
import type { Event } from '@/types';
import { Loading, Notify } from 'notiflix';
import { onMounted, ref } from 'vue';

const events = ref<Event[]>([])
const loading = ref(false);

onMounted(() => {
  const fetchData = () => {
    Loading.hourglass();
    loading.value = true;

    sanity.fetch(`*[_type == "event"] | order(date desc) {
      title,
      description,
      linkToEvent,
      slug,
      "imageUrl": image.asset->url,
      location,
      date
}`).then((responseData) => {
      events.value = responseData;
    }).catch(() => {
      Notify.failure('Error fetching events, please try again later');
    }).finally(() => {
      Loading.remove();
      loading.value = false;
    })
  }

  fetchData();
})
</script>

<template>
  <header>
    <nav-bar :blue-bg="true" />
  </header>

  <main class="min-h-dvh pt-[100px] lg:pt-[150px] px-5 pb-10">
    <h1 class="text-xl sm:text-3xl font-bold">
      Events</h1>

    <div class="mt-5 grid gap-5">
      <event-card v-for="event in events" :key="event.title" :event="event" />
    </div>
  </main>
</template>