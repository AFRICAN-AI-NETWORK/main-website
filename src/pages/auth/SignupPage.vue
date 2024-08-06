<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
import { EyeIcon, EyeOffIcon, Loader } from 'lucide-vue-next';
import { Notify } from 'notiflix';

const router = useRouter()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const termsAccepted = ref(false)

const formSchema = toTypedSchema(z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords don't match",
      fatal: true,
      path: ["confirmPassword"]
    });

    return z.NEVER;
  }
}))

const { handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      name: `${values.firstName.trim()} ${values.lastName.trim()}`,
      email: values.email,
      password: values.password
    })
    storageHandler.setToken(response.data.accessToken)
    Notify.success("Signup successful")
    router.replace("/")
  } catch (err) {
    console.error("An error occurred while trying to sign up", err)
    Notify.failure(errHandler(err))
  }
})
</script>

<template>
  <header>
    <nav-bar :blue-bg="true" />
  </header>

  <main class="grid justify-items-center px-5 lg:px-20 py-[150px] xl:pt-[100px] pb-[200px]">
    <div class="text-center">
      <h1 class="mb-1 text-xl lg:text-3xl font-semibold">Sign Up for an Account</h1>
      <h2 class="lg:text-lg opacity-80">Let’s get you all set so you can start creating your first onboarding experience
      </h2>
    </div>

    <form class="mt-14 w-full lg:max-w-[80%] space-y-6" @submit="onSubmit" :disabled="isSubmitting || Object.values(errors).length > 0 ||
      !termsAccepted">
      <div class="grid gap-y-6 gap-x-3 lg:grid-flow-col">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input type="text" aria-label="First name" placeholder="Your first name" v-bind="componentField"
                required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input type="text" aria-label="Last name" placeholder="Your last name" v-bind="componentField" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="text" aria-label="Email" placeholder="Enter your email" v-bind="componentField" required />
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
      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <div class="relative">
              <Input :type="showConfirmPassword ? 'text' : 'password'" aria-label="Confirm Password"
                placeholder="Confirm your password" v-bind="componentField" required />
              <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2"
                :title="showConfirmPassword ? 'Hide password' : 'Show password'"
                @click="showConfirmPassword = !showConfirmPassword">
                <EyeOffIcon v-if="showConfirmPassword" class="w-4 h-4" />
                <EyeIcon v-else class="w-4 h-4" />
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" :checked="termsAccepted" @update:checked="value => termsAccepted = value" required />
        <label htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I accept African AI Network’s Terms and Conditions
        </label>
      </div>

      <Button :disabled="isSubmitting || Object.values(errors).length > 0 || !termsAccepted" class="font-bold w-full"
        type="submit">
        <span class="flex gap-2 items-center" v-if="isSubmitting">
          <Loader class="animate-spin w-4 h-4" />
          Please wait
        </span>
        <span v-else>SIGN UP</span>
      </Button>
    </form>
  </main>

  <footer class="bg-primary text-primary-foreground min-h-[400px] grid text-center place-items-center">
    <div class="flex flex-col gap-3 text-xl lg:text-2xl lg:max-w-[500px] px-2">
      <h3 class="font-bold">Already Signed Up?</h3>
      <p class="text-lg lg:text-xl">Log in to your account so you can continue your AI Onboarding experience</p>

      <Button as="a" href="/auth/login" class="font-bold w-fit mx-auto border-white bg-transparent" size="lg"
        variant="outline">LOG
        IN</Button>
    </div>
  </footer>
</template>