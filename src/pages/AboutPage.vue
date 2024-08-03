<script setup lang="ts">
import AboutImage from '@/assets/about-img.svg';
import NavBar from '@/components/layout/NavBar.vue';
</script>

<template>
  <header>
    <nav-bar />
  </header>

  <main class="min-h-dvh pt-[150px] xl:pt-[150px] px-10 pb-10">
    <h1 class="mb-2 text-2xl lg:text-4xl xl:text-6xl font-bold" aria-describedby="about-us">About Us</h1>
    <img class="w-full" :src="AboutImage" alt="The AAN logo">

    <p class="mt-10" id="about-us">In a world marked by rapid technological advancement and global
      interconnectedness, Africa stands at a crossroads of immense potential. The
      continent, endowed with abundant natural resources, a youthful population, and a rich
      cultural tapestry, possesses the raw materials for a transformative digital revolution.
      Artificial Intelligence (AI) emerges as a powerful catalyst for unlocking this
      potential. It offers the promise of addressing critical challenges such as poverty,
      disease, and inequality while driving economic growth, innovation, and social
      development.
      The African AI Network (AAN) is a visionary initiative that recognizes the
      imperative of a united African front in harnessing the power of AI. By bringing
      together the collective wisdom, resources, and aspirations of African nations, the AAN
      aims to create a vibrant ecosystem for AI research, development, and application.</p>

    <h2 class="mt-10 text-xl lg:text-3xl xl:text-5xl font-bold" aria-describedby="mission">Mission</h2>
    <p class="mt-5" id="mission">To foster a culture of innovation and collaboration around AI in Africa, and to address
      the
      challenges and opportunities that AI presents for the continent.</p>

    <h2 class="mt-10 text-xl lg:text-3xl xl:text-5xl font-bold" aria-describedby="vision">Vision</h2>
    <p class="mt-5" id="vision">To see Africa as a leader and a beneficiary of AI innovation, research, and education,
      and to
      improve the health and well-being of its people through the use of AI.</p>
  </main>
</template>