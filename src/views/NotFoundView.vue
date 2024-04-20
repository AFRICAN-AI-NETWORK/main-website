<template>
  <div class="min-h-dvh grid content-center text-center" v-if="!loading && !resource">
    <h2 class="text-6xl font-bold pb-5">Page not found</h2>
    <button class="btn text-xl w-fit mx-auto" @click="$router.replace('/')">Go back to
      home</button>
  </div>
</template>