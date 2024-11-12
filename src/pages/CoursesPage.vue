<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue';
import CourseCard from '@/components/simple/CourseCard.vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import sanity from '@/lib/sanity';
import type { Course, CourseCategory } from '@/types';
import { Notify } from 'notiflix';
import { onMounted, ref, watch } from 'vue';

const courses = ref<Course[]>([])
const courseCategories = ref<CourseCategory[]>([])
const loading = ref(false);

const filter = ref('');
const filteredCourses = ref<Course[]>([]);

watch(filter, () => {
  filteredCourses.value = courses.value.filter((course) =>
    course.categories.some((category) => category.title.toLowerCase().includes(filter.value.toLowerCase())),
  );
});

onMounted(() => {
  const fetchData = () => {
    loading.value = true;

    sanity.fetch(`*[_type == "course"] | order(updatedAt desc) {
      "id": _id,
      title,
      description,
      duration,
      "instructor": instructor->name,
      "categories": categories[]->,
      linkToCourse,
      "author": author->name,
      "imageUrl": image.asset->url,
      "imageAlt": image.asset->alt,
      "createdAt": _createdAt,
      "updatedAt": _updatedAt,
      }`).then((responseData) => {
      courses.value = responseData;
    }).catch(() => {
      Notify.failure('Error fetching courses, please try again later');
    }).finally(() => {

      sanity.fetch(`*[_type == "courseCategory"] | order(updatedAt desc) {
        "id": _id,
        title,
        description,
        "author": author->name,
        "createdAt": _createdAt,
        "updatedAt": _updatedAt,
      }`).then((responseData) => {
        courseCategories.value = responseData;
      }).catch(() => {
        Notify.failure('Error fetching course categories, please try again later');
      }).finally(() => {
        loading.value = false;
      })
    })
  }

  fetchData();
})
</script>

<template>
  <header>
    <nav-bar :blue-bg="true" />
  </header>

  <main class="min-h-dvh pt-[100px] lg:pt-[150px] px-5 pb-10">
    <div class="flex justify-between">
      <h1 class="text-xl sm:text-3xl font-bold">
        Courses</h1>

      <!-- Course filter by categories -->
      <Select v-model="filter">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem v-for="category in courseCategories" :key="category.title" :value="category.title">
              {{ category.title }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>

    <div class="mt-5 grid gap-5">
      <div class="flex flex-wrap justify-center gap-5 lg:px-32" v-if="loading">
        <skeleton-loader variant="image-and-text" v-for="i in 4" :key="i" />
      </div>

      <template v-else>
        <template v-if="filter">
          <template v-if="filter && filteredCourses.length > 0">
            <course-card v-for="course in filteredCourses" :key="course.title" :course="course" />
          </template>
          <template v-else-if="!filter && courses.length > 0">
            <course-card v-for="course in courses" :key="course.title" :course="course" />
          </template>

          <div v-else>
            <p class="text-center text-lg"
              v-text="filter ? 'No course found under category.' : 'No courses found, please check back later.'" />
          </div>
        </template>
        <template v-else>
          <course-card v-for="course in courses" :key="course.title" :course="course" />
        </template>
      </template>
    </div>
  </main>
</template>