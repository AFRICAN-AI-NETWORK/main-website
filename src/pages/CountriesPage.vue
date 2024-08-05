<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';
import CountryCard from '@/components/simple/CountryCard.vue';
import sanity from '@/lib/sanity';
import type { Country } from '@/types';
import { Loading, Notify } from 'notiflix';
import { onMounted, ref } from 'vue';

const countries = ref<Country[]>([])

onMounted(() => {
  Loading.hourglass()

  sanity.fetch(`*[_type == "country"] | order(name) {
    "id": _id,
    name,
    numMembers,
    socials,
    "imageUrl": image.asset->url,
  }`).then((responseData) => {
    countries.value = responseData
  }).catch(() => {
    Notify.failure('Error fetching countries, please try again later');
  }).finally(() => {
    Loading.remove()
  })
})
</script>

<template>
  <header>
    <nav-bar :blue-bg="true" />
  </header>

  <main class="min-h-dvh pt-[150px] xl:pt-[150px] px-10 pb-10">
    <h1 class="mb-2 text-2xl lg:text-4xl xl:text-6xl font-bold" aria-describedby="about-us">Countries</h1>
    <p class="w-min(10rem,_100%)">Explore the progress of the African AI Network's (AAN) initiatives in transforming
      individual countries through the power of artificial intelligence. From job creation to economic growth, witness
      firsthand the impact of AI on the African landscape.</p>

    <div class="mt-5 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-5">
      <country-card v-for="country in countries" :key="country.id" :country="country" />
    </div>
  </main>
</template>