<script setup lang="ts">
import type { Country } from '@/types';
import Button from '../ui/button/Button.vue';

defineProps<{
  country: Country,
}>()
</script>

<template>
  <div class="rounded-3xl p-4 shadow-[0px_0px_10px_5px_#00000024]">
    <div class="relative">
      <img :src="country.imageUrl" class="rounded-xl w-full h-52" alt="Country Cover Image">
      <Button as="a" :href="'/countries/' + country.name" class="absolute left-1/2 -translate-x-1/2 -bottom-2">Visit
        Country</Button>
    </div>
    <p class="mt-3 text-sm lg:text-2xl font-bold text-wrap text-center object-contain">{{ country.name.toUpperCase() }}
    </p>
  </div>
</template>