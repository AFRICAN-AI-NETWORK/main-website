<script setup lang="ts">
import FeatureCard from '@/components/simple/FeatureCard.vue';
import PartnerChip from '@/components/simple/PartnerChip.vue';
import SkeletonLoader from '@/components/simple/SkeletonLoader.vue';

import sanity from '@/lib/sanity';
import type { Feature, Partner } from '@/types';
import { Notify } from 'notiflix';
import { onMounted, ref } from 'vue';

const features = ref<Feature[]>()
const partners = ref<Partner[]>()
const loading = ref(false)

const fetchData = async () => {
  try {
    loading.value = true;

    [features.value, partners.value] = await Promise.all([
      sanity.fetch(`*[_type == "feature"] {
        "id": _id,
        stats,
        description
      }`), sanity.fetch(`*[_type == "partner"] {
        "id": _id,
        name,
        "logo": logo.asset->url
      }`)
    ])
  } catch (error) {
    Notify.failure('Error loading data, please try again later');
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData();
})
</script>

<template>
  <section v-if="loading || (!loading && (features && features.length > 0 || partners && partners.length > 0))"
    id="features-and-partners" class="p-16 lg:p-20">
    <div class="flex flex-wrap justify-center gap-5 lg:px-32" v-if="loading">
      <skeleton-loader variant="image-and-text" v-for="i in 4" :key="i" />
    </div>

    <template v-else-if="features && partners && (features.length > 0 || partners.length > 0)">
      <div v-if="partners && partners.length > 0" class=" flex flex-wrap justify-center gap-10 lg:px-32 mb-16">
        <partner-chip v-for="partner in partners" :key="partner.id" :name="partner.name" :logo="partner.logo" />
      </div>

      <div v-if="features && features.length > 0" class="grid md:grid-cols-2 gap-y-8 gap-x-16 lg:px-20">
        <feature-card v-for="feature, i in features" :key="i" :secondary="i % 2 === 0" :stats="feature.stats"
          :description="feature.description" />
      </div>
    </template>
  </section>
</template>