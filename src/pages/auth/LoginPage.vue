<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import * as z from 'zod';

import NavBar from '@/components/layout/NavBar.vue';

import { Button } from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axiosInstance from '@/lib/axios';
import { storageHandler } from '@/lib/localStorage';
import { errHandler } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';
import { Notify } from 'notiflix';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const showPassword = ref(false)
const rememberMe = ref(false)

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(8),
}))

const { handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await axiosInstance.post("/auth/login", values)
    storageHandler.setToken(response.data.accessToken)
    Notify.success("Login successful")
    await router.replace("/")
  } catch (err) {
    console.error("An error occurred while trying to log in", err)
    Notify.failure(errHandler(err))
  }
})
</script>

<template>
  <header>
    <nav-bar :blue-bg="true" />
  </header>

  <main class="grid justify-items-center px-5 lg:px-20 py-[150px] xl:pt-[150px]">
    <div class="text-center">
      <h1 class="mb-1 text-xl lg:text-3xl font-semibold">Log in to Your Account</h1>
      <h2 class="lg:text-lg opacity-80">Log in to your account to be able to access the full functionalities of African
        AI
        Network</h2>
    </div>

    <form class="mt-14 w-full lg:max-w-[80%] space-y-6" @submit="onSubmit"
      :disabled="isSubmitting || Object.values(errors).length > 0">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" aria-label="Email" placeholder="Enter your email" v-bind="componentField" required />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div class="relative">
              <Input :type="showPassword ? 'text' : 'password'" aria-label="Password" placeholder="Enter your password"
                v-bind="componentField" required />
              <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2"
                :title="showPassword ? 'Hide password' : 'Show password'" @click="showPassword = !showPassword">
                <EyeOffIcon v-if="showPassword" class="w-4 h-4" />
                <EyeIcon v-else class="w-4 h-4" />
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex w-full justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" :checked="rememberMe" @update:checked="value => rememberMe = value" />
          <label htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Remember Me
          </label>
        </div>

        <Button as="a" variant="link" href="#">Forgot Password?</Button>
      </div>
      <Button :disabled="isSubmitting || Object.values(errors).length > 0" class="font-bold w-full" type="submit">
        <span class="flex gap-2 items-center" v-if="isSubmitting">
          <Loader class="animate-spin w-4 h-4" />
          Please wait
        </span>
        <span v-else>LOG IN</span>
      </Button>
    </form>
  </main>

  <footer class="bg-primary text-primary-foreground min-h-[400px] grid text-center place-items-center">
    <div class="flex flex-col gap-3 text-xl lg:text-2xl lg:max-w-[500px] px-2">
      <h3 class="font-bold">Don't have an account yet?</h3>
      <p class="text-lg lg:text-xl">Let’s get you all set up so you can have your first onboarding experience</p>

      <Button as="a" href="/auth/signup" class="font-bold w-fit mx-auto border-white bg-transparent" size="lg"
        variant="outline">SIGN
        UP</Button>
    </div>
  </footer>
</template>