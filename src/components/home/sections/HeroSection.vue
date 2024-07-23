<template>
  <section id="hero"
    class="pt-[200px] xl:pt-[100px] 2xl:pt-0 lg:min-h-screen flex flex-col justify-between lg:flex-row gap-x-5 px-14 lg:px-20 pb-0 bg-cover bg-[url('/src/assets/hero-bg.jpg')] text-white">
    <div class="w-full h-full flex flex-col self-center gap-6 lg:gap-8 2xl:gap-12 xl:max-w-[50vw] 2xl:max-w-[50%]">
      <h1 class="text-[min(4rem,_10vw)] xl:text-8xl tracking-tighter font-bold table-caption"
        style="word-spacing: 999rem;">DISCOVER CONNECT
        IMPACT</h1>
      <p class="text-[min(2rem,_4vw)] xl:text-2xl 2xl:text-4xl">A collaborative hub for African AI Actors to explore,
        develop and
        implement AI
        solutions.</p>

      <div class="flex flex-wrap gap-5 pb-8">
        <a class="btn" href="https://discord.gg/hR4GsHSXkJ">Join the Network</a>
        <a class="btn" href="#resources">Explore our Solutions</a>
      </div>
    </div>

    <img src="@/assets/futuristic-robot.svg" class="mt-auto w-[clamp(20vw,_500px,_50vw)] 2xl:max-w-none self-center"
      alt="">
  </section>
</template>