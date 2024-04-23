<script setup lang="ts">
import { FacebookIcon, LinkedinIcon } from 'lucide-vue-next';
import DiscordIcon from '../simple/icons/DiscordIcon.vue';
import TiktokIcon from '../simple/icons/TiktokIcon.vue';
import WhatsappIcon from '../simple/icons/WhatsappIcon.vue';
</script>

<template>
  <footer class="bg-secondary text-white">
    <div
      class="py-14 px-10 grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] content-center lg:justify-items-end lg:grid-cols-[45%_18%_18%_18%] gap-y-10">
      <div>
        <img src="@/assets/logo.png" alt="AAN logo" class="italic mb-2" width="100" height="100" />

        <p class="self-start mb-8 2xl:mr-0">African AI Network is a community-driven network that brings together
          AI
          enthusiasts
          from
          all 54
          African
          countries. Join this vibrant network to share knowledge, collaborate on projects and stay updated with the
          latest AI developers in the world.</p>

        <div class="w-fit">
          <a class="mb-5 text-center block bg-primary text-white rounded-full px-8 py-2 w-full"
            href="/#about-us">More</a>

          <div class="flex gap-6">
            <a href="https://www.facebook.com/groups/1490131391564053/?ref=share" title="Visit our Facebook Page">
              <p class="sr-only">Visit our Facebook Page</p>
              <facebook-icon height="20" width="20" />
            </a>
            <a href="https://www.linkedin.com/groups/9802179" title="Visit our LinkedIn Account">
              <p class="sr-only">Visit our LinkedIn Account</p>
              <linkedin-icon height="20" width="20" />
            </a>
            <a href="https://discord.gg/zytPSazu6S" title="Join our Discord Channel">
              <p class="sr-only">Join our Discord Channel</p>
              <discord-icon height="20" width="20" />
            </a>
            <a href="https://chat.whatsapp.com/G2khjYh9eVOKOGXaoXEDDZ" title="Join our Whatsapp community">
              <p class="sr-only">Join our Whatsapp community</p>
              <whatsapp-icon height="20" width="20" />
            </a>
            <a href="https://tiktok.com/@african.ai.network" title="Visit our Tiktok Channel">
              <p class="sr-only">Visit our Tiktok Channel</p>
              <tiktok-icon height="20" width="20" />
            </a>
          </div>
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