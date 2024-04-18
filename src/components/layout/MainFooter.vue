<script setup lang="ts">
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-vue-next';
</script>

<template>
  <footer class="bg-secondary text-white">
    <div
      class="py-14 px-10 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] justify-items-start 2xl:grid-cols-[40%_20%_20%_20%] gap-x-5 gap-y-10 2xl:justify-items-center">
      <div>
        <img src="@/assets/logo.png" alt="AAN logo" class="italic mb-2" width="100" height="100" />

        <p class="mb-2">African AI Network is a community-driven network that brings together AI enthusiasts from all 54
          African
          countries. Join this vibrant network to share knowledge, collaborate on projects and stay updated with the
          latest AI developers in the world.</p>
        <div class="flex gap-3">
          <a href="#">
            <p class="sr-only">Visit our Facebook Page</p>
            <facebook />
          </a>
          <a href="#">
            <p class="sr-only">Visit our Instagram Account</p>
            <instagram />
          </a>
          <a href="#">
            <p class="sr-only">Visit our Twitter Account</p>
            <twitter />
          </a>
          <a href="#">
            <p class="sr-only">Visit our Youtube Channel</p>
            <youtube />
          </a>
        </div>
      </div>
      <div>
        <h3 class="mb-4 font-bold text-lg">AI Tool Categories</h3>
        <ul class="flex flex-col gap-y-2">
          <li>
            <a href="#">Business & Productivity</a>
          </li>
          <li>
            <a href="#">Design</a>
          </li>
          <li>
            <a href="#">Education</a>
          </li>
          <li>
            <a href="#">Research</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="mb-4 font-bold text-lg">Resources</h3>
        <ul class="flex flex-col gap-y-2">
          <li>
            <a href="#">Courses</a>
          </li>
          <li>
            <a href="#">Blog Posts</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="mb-4 font-bold text-lg">Company</h3>
        <ul class="flex flex-col gap-y-2">
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex flex-wrap p-5 gap-3 border border-white border-r-0 border-l-0">
      <p>2024 African AI Network LLC, All rights reserved.</p>
      <a href="#" class="underline hover:text-blue-300 focus-visible:text-blue-300 transition-colors">Privacy Policy</a>
      <a href="#" class="underline hover:text-blue-300 focus-visible:text-blue-300 transition-colors">Terms of
        Service</a>
    </div>
  </footer>
</template>