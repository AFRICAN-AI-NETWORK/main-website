<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import type { Event } from '@/types';
import { formatDate } from '@vueuse/core';
import { ExternalLinkIcon } from 'lucide-vue-next';

defineProps<{
  event: Event,
}>()
</script>

<template>
  <div class="shadow-lg rounded-xl p-5">
    <div class="flex flex-col lg:flex-row w-full gap-5">
      <img :src="event.imageUrl" class="self-center h-52 min-h-0 min-w-0 rounded-xl bg-black bg-opacity-70" alt="">
      <div class="w-full flex flex-col justify-center gap-1 lg:text-lg">
        <p><span class="font-bold">Time:</span> <span class="text-primary">{{ formatDate(new Date(event.date), 'HH:mm')
            }}</span></p>
        <p><span class="font-bold">Location:</span> {{ event.location }}</p>
        <p><span class="font-bold">Date:</span> {{ new Date(event.date).toDateString() }}</p>
        <p class="mt-1 text-lg lg:text-xl flex gap-1">
          <span class="text-primary max-w-[40ch]">{{ event.title }}:</span> {{ event.description }}
        </p>
        <Button as="a" :href="event.linkToEvent" target="_blank" class="flex gap-2 self-end ml-auto capitalize">Purchase
          Tickets <external-link-icon /></Button>
      </div>
    </div>
  </div>
</template>