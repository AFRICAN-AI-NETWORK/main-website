<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { h } from 'vue';
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
import { toast } from '@/components/ui/toast';

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <header>
    <nav-bar :blue-bg="true" />
  </header>

  <main class="grid justify-items-center px-20 pt-[150px] xl:pt-[150px] pb-[200px]">
    <div class="text-center">
      <h1 class="mb-1 text-xl lg:text-3xl font-semibold">Sign Up for an Account</h1>
      <h2 class="lg:text-lg opacity-80">Let’s get you all set so you can start creating your first onboarding experience
      </h2>
    </div>

    <form class="mt-14 w-full lg:max-w-[80%] space-y-6" @submit="onSubmit">
      <div class="grid gap-y-6 gap-x-3 lg:grid-flow-col">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input type="text" aria-label="First name" placeholder="Your first name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input type="text" aria-label="Last name" placeholder="Your last name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" aria-label="Username" placeholder="Enter your username" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" aria-label="Password" placeholder="Enter your password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input type="password" aria-label="Confirm Password" placeholder="Confirm your password"
              v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I accept African AI Network’s Terms and Conditions
        </label>
      </div>

      <Button class="font-bold w-full" type="submit">
        SIGN UP
      </Button>
    </form>
  </main>

  <footer class="bg-primary text-primary-foreground min-h-[400px] grid text-center place-items-center">
    <div class="flex flex-col gap-3 text-2xl lg:max-w-[500px]">
      <h3 class="font-bold">Already Signed Up?</h3>
      <p>Log in to your account so you can continue your AI Onboarding experiencee</p>

      <Button as="a" href="/auth/login" class="font-bold w-fit mx-auto border-white bg-transparent" size="lg"
        variant="outline">LOG
        IN</Button>
    </div>
  </footer>
</template>