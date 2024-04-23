<script setup lang="ts">
import type { AiTool } from '@/types';
import { BookmarkIcon, ExternalLinkIcon, Star, VerifiedIcon } from 'lucide-vue-next';

defineProps<{
  tool: AiTool,
  featured?: boolean
}>()
</script>

<template>
  <div class="bg-primary text-white rounded-xl p-5" :class="featured ? 'shadow-lg !bg-white !text-black' : ''">
    <div class="flex gap-2">
      <img src="@/assets/futuristic-robot.svg"
        class="self-center h-16 w-16 min-h-0 min-w-0 rounded-xl bg-black bg-opacity-70" alt="">
      <div>
        <p class="text-lg font-bold">{{ tool.name }}</p>
        <p class="flex gap-1">
          <star v-for="i in tool.stars" :key="i" class="h-5 w-5 fill-yellow-400 text-yellow-400" />
        </p>
        <p class="mt-2 flex text-primary" v-if="featured && tool.verified"><verified-icon
            class="fill-primary stroke-white" />Verified
        </p>
      </div>
    </div>
    <p class="mt-2 font-semibold"><span class="font-semibold" v-if="featured">Pricing Model: </span>{{ tool.pricingModel
      }}</p>
    <p class="mt-3 text-sm line-clamp-2 overflow-ellipsis">{{ tool.description }}</p>

    <div v-if="featured" class="mt-3 flex gap-2">
      <button
        class="btn text-sm flex border-2 border-primary text-primary hover:bg-slate-200 focus-visible:bg-slate-200 bg-white"><bookmark-icon />
        0</button>
      <a class="btn text-sm flex" :href="tool.siteUrl">Visit Site <external-link-icon /></a>
    </div>
    <a v-else class="block w-fit ml-auto mt-3 p-2 rounded-lg border-2 border-white text-sm"
      :href="`/ai-tools/${tool.slug}`">See
      More</a>
  </div>
</template>