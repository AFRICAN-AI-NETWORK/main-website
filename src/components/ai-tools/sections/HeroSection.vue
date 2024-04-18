<script setup lang="ts">
import AiTool from '@/components/simple/AiTool.vue';
import { ref } from 'vue';

const showingMore = ref(false);

const tools = [
  {
    id: "iiwiwi-wiiwd-iwndnwd-iwndnwj",
    name: "GummySearch",
    type: "Freemium",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptates dolores numquam hic. Neque repudiandae, eaque unde consequatur autem accusantium iure non suscipit maxime nihil explicabo dolores minu similique abi"
  },
  {
    id: "iikiwi-wiiwd-iwndnwd-iwndnwj",
    name: "GummySearch",
    type: "Freemium",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptates dolores numquam hic. Neque repudiandae, eaque unde consequatur autem accusantium iure non suscipit maxime nihil explicabo dolores minu similique abi"
  },
  {
    id: "iiwiwi-wiewd-iwndnwd-iwndnwj",
    name: "GummySearch",
    type: "Freemium",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptates dolores numquam hic. Neque repudiandae, eaque unde consequatur autem accusantium iure non suscipit maxime nihil explicabo dolores minu similique abi"
  },
  {
    id: "iiwiwi-wiiwd-iwnsnwd-iwndnwj",
    name: "GummySearch",
    type: "Freemium",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptates dolores numquam hic. Neque repudiandae, eaque unde consequatur autem accusantium iure non suscipit maxime nihil explicabo dolores minu similique abi"
  },
  {
    id: "iiwiwi-wiiwd-iwndnad-iwndnwj",
    name: "GummySearch",
    type: "Freemium",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptates dolores numquam hic. Neque repudiandae, eaque unde consequatur autem accusantium iure non suscipit maxime nihil explicabo dolores minu similique abi"
  },
  {
    id: "iiwiwi-wiiwd-iwndawd-iwndnwj",
    name: "GummySearch",
    type: "Freemium",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptates dolores numquam hic. Neque repudiandae, eaque unde consequatur autem accusantium iure non suscipit maxime nihil explicabo dolores minu similique abi"
  },
  {
    id: "iiwiwi-wiiwd-iwndawd-iwndnwj",
    name: "GummySearch",
    type: "Freemium",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptates dolores numquam hic. Neque repudiandae, eaque unde consequatur autem accusantium iure non suscipit maxime nihil explicabo dolores minu similique abi"
  }
]
</script>

<template>
  <section class="min-h-dvh grid mt-[120px] xl:mt-[200px] pt-10 px-5 pb-5 lg:p-0 lg:place-items-center">
    <div class="flex flex-col gap-4 items-center">
      <h1 class="text-5xl 2xl:text-7xl font-extrabold text-secondary">Discover what AI can do for you</h1>
      <h2 class="text-xl 2xl:text-2xl font-bold text-secondary">We've helped professionals leverage AI by helping
        them
        find the best
        AI tools.</h2>

      <form class="flex w-fit border-4 border-primary rounded-full p-2 my-5">
        <input type="search" placeholder="Enter name..."
          class="bg-transparent m-0 outline-none px-4 py-2 placeholder:text-secondary placeholder:opacity-70"
          aria-label="Search for AI Tool" />
        <button type="submit" class="bg-primary rounded-full font-semibold p-3 text-white">Search AI Tools</button>
      </form>

      <div class="flex flex-wrap gap-2 text-sm text-white">
        <p class="py-3 px-8 rounded-full bg-primary">Marketing</p>
        <p class="py-3 px-8 rounded-full bg-primary">Productivity</p>
        <p class="py-3 px-8 rounded-full bg-primary">Design</p>
        <p class="py-3 px-8 rounded-full bg-primary">Research</p>
        <p class="py-3 px-8 rounded-full bg-primary">More</p>
      </div>
    </div>

    <div class="mt-10 flex flex-col px-16 w-full">
      <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5">
        <ai-tool v-for="tool in tools.slice(0, showingMore ? tools.length - 1 : 5)" :key="tool.id" :tool="tool" />
      </div>

      <button v-if="!showingMore && (tools.length > 6)" @click="() => showingMore = true"
        class="mt-5 bg-primary text-white rounded-full px-8 py-2 w-fit mx-auto">More</button>
    </div>
  </section>
</template>