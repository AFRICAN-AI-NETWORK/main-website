<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import type { Course } from '@/types';
import { ExternalLinkIcon } from 'lucide-vue-next';
import VueMarkdown from 'vue-markdown-render';

defineProps<{
  course: Course,
}>()
</script>

<template>
  <div class="shadow-lg rounded-xl p-5">
    <div class="flex flex-col lg:flex-row w-full gap-5">
      <img :src="course.imageUrl" class="self-start h-52 min-h-0 min-w-0 rounded-xl bg-black bg-opacity-70" alt="">
      <div class="w-full flex flex-col justify-center gap-1 lg:text-lg">
        <p><span class="font-bold">Categories:</span> <span class="text-primary">{{ course.categories.map((c) =>
          c.title).join(", ")
            }}</span></p>
        <p v-if="course.instructor"><span class="font-bold">Instructor:</span> {{ course.instructor }}</p>
        <p><span class="font-bold">Duration:</span> {{ course.duration }}</p>
        <div class="mt-1">
          <div class="max-w-[40ch]">
            <p class="text-primary w-max">{{ course.title }}:</p>
          </div>

          <vue-markdown class="unreset text-base" :source="course.description" />
        </div>
        <Button as="a" :href="course.linkToCourse" target="_blank" class="flex gap-2 self-end ml-auto capitalize">Start
          Course <external-link-icon /></Button>
      </div>
    </div>
  </div>
</template>