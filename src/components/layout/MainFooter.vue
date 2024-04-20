<script setup lang="ts">
import { Facebook, Instagram } from 'lucide-vue-next';
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
              <facebook height="20" width="20" />
            </a>
            <a href="#" title="Visit our Instagram Account">
              <p class="sr-only">Visit our Instagram Account</p>
              <instagram height="20" width="20" />
            </a>
            <a href="https://discord.gg/zytPSazu6S" title="Join our Discord Channel">
              <p class="sr-only">Join our Discord Channel</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-discord"
                viewBox="0 0 16 16">
                <path
                  d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
              </svg>
            </a>
            <a href="https://chat.whatsapp.com/G2khjYh9eVOKOGXaoXEDDZ" title="Join our Whatsapp community">
              <p class="sr-only">Join our Whatsapp community</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-whatsapp"
                viewBox="0 0 16 16">
                <path
                  d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
            </a>
            <a href="https://tiktok.com/@african.ai.network" title="Visit our Tiktok Channel">
              <p class="sr-only">Visit our Tiktok Channel</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-tiktok"
                viewBox="0 0 16 16">
                <path
                  d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
              </svg>
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