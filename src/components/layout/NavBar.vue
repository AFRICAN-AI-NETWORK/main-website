<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <nav
    class="fixed inset-0 bottom-auto grid grid-cols-2 md:flex justify-between items-center px-7 py-5 backdrop-blur-md bg-black bg-opacity-10 mix-blend-hard-light text-white">
    <a href="/">
      <p class="sr-only">Back to Home</p>
      <img src="@/assets/logo.png" alt="AAN logo" class="italic" width="100" height="100" />
    </a>

    <button type="button"
      class="justify-self-end md:hidden text-white hover:text-slate-100 focus:text-slate-100 focus:outline-none"
      @click="isOpen = !isOpen">
      <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
        <path
          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
        </path>
      </svg>
    </button>

    <ul class="flex flex-col mt-3 md:flex-row md:mt-0 gap-5" :class="isOpen ? 'flex' : 'hidden md:flex'">
      <li>
        <a href="/#ai-tools" class="hover:text-secondary focus-visible:text-secondary transition-all">AI Tools</a>
      </li>
      <li>
        <a href="/#resources" class="hover:text-secondary focus-visible:text-secondary transition-all">Resources</a>
      </li>
      <li>
        <a href="/#courses" class="hover:text-secondary focus-visible:text-secondary transition-all">Courses</a>
      </li>
      <li>
        <a href="/#case-studies"
          class="hover:text-secondary focus-visible:text-secondary transition-all">Case-Studies</a>
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