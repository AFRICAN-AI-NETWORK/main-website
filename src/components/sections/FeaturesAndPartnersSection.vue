<script setup lang="ts">
import FeatureCard from '@/components/simple/FeatureCard.vue';
import PartnerChip from '@/components/simple/PartnerChip.vue';
</script>

<template>
  <section id="features-and-partners" class="p-16 lg:p-20">
    <div class="flex flex-wrap justify-center gap-10 lg:px-32 mb-16">
      <partner-chip v-for="i in 4" :key="i" :metric="i" :description="`Resource ${i}`" />
    </div>

    <div class="grid md:grid-cols-2 gap-y-8 gap-x-16 lg:px-20">
      <feature-card :metric="425" description="A partner that decided to partner with us because they wanted to"
        v-for="i in 6" :key="i" :secondary="i % 2 === 0" />
    </div>
  </section>
</template>