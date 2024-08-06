<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { RouterLink } from "vue-router";

const isOpen = ref(false);

defineProps<{ transparent?: boolean }>()
</script>

<template>
  <nav class="fixed z-50 inset-0 bottom-auto grid grid-cols-2 md:flex justify-between items-center px-7 py-5 text-white"
    :class="transparent ? 'bg-black bg-opacity-10 backdrop-blur-md mix-blend-hard-light' : 'bg-primary'">
    <a href="/">
      <p class="sr-only">Back to Home</p>
      <img src="@/assets/logo.svg" alt="AAN logo" class="italic h-10 lg:h-14" />
    </a>

    <button type="button"
      class="justify-self-end md:hidden text-white hover:text-slate-100 focus-visible:text-slate-100 focus-visible:outline-none"
      @click="isOpen = !isOpen">
      <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
        <path
          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
        </path>
      </svg>
    </button>

    <ul class="flex flex-col mt-3 md:flex-row md:mt-0 gap-5" :class="isOpen ? 'flex' : 'hidden md:flex'">
      <li>
        <router-link to="/about"
          class="hover:text-blue-300 focus-visible:text-blue-300 transition-all">About</router-link>
      </li>
      <li>
        <router-link to="/ai-tools" class="hover:text-blue-300 focus-visible:text-blue-300 transition-all">AI
          Tools</router-link>
      </li>
      <li>
        <router-link to="/#resources"
          class="hover:text-blue-300 focus-visible:text-blue-300 transition-all">Resources</router-link>
      </li>
      <li>
        <router-link to="/countries"
          class="hover:text-blue-300 focus-visible:text-blue-300 transition-all">Countries</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
@-moz-document url-prefix() {
  nav {
    --tw-bg-opacity: 0.5 !important;
  }
}
</style>