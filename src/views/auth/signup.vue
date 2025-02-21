<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import TextInput from "~/components/common/text-input.vue";

const form = ref({ email: "", password: "", name: "", industry: "" });
</script>

<template>
  <div>
    <div class="mb-4">
      <h1 class="font-medium text-brand-600 text-2xl">Start Selling Better</h1>
      <p class="text-sm text-brand-400">
        Seamlessly Track Sales, Monitor Expenses, and Cultivate Customer Relationships
      </p>
    </div>

    <h3 class="text-lg font-medium text-brand-600 mb-2">Create your store 🛍️</h3>

    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <TextInput
        v-model="form.name"
        label="Store Name"
        placeholder="e.g. solesnshades, smileng"
        required
      />

      <TextInput
        v-model="form.industry"
        label="Industry"
        placeholder="e.g. Gadgets, food, skincare, etc"
        required
      />

      <TextInput
        v-model="form.email"
        type="email"
        label="Email"
        placeholder="example@gmail.com"
        required
      />

      <TextInput
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="Enter password"
        required
      />

      <AppButton type="submit" label="Sign Up" class="w-full" />
    </form>

    <div class="mt-5 pb-4">
      <p class="text-sm font-normal text-center text-gray-500">
        Already have an account?
        <RouterLink to="/auth/signin" class="text-sm text-brand-500 font-medium underline">
          Login
        </RouterLink>
      </p>
      <p class="mt-2 text-brand-400 text-sm text-center">
        By signing up, I agree to the <u>Leyyow Privacy Policy</u> and <u>Terms of Services</u>
      </p>
    </div>
  </div>
</template>
