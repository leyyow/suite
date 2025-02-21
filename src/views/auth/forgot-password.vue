<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import TextInput from "~/components/common/text-input.vue";

const form = ref({ email: "" });

const onSubmit = () => {};
</script>

<template>
  <div>
    <h3 class="text-lg font-medium text-brand-600 mb-1">Forgot Password</h3>
    <p class="text-sm text-brand-400 mb-4">
      Enter the email address you use to sign in, and we will send you a link to reset your
      password.
    </p>

    <form class="flex flex-col gap-3" @submit.prevent="onSubmit">
      <TextInput v-model="form.email" type="email" placeholder="example@gmail.com" required />

      <AppButton type="submit" label="Send Link" class="w-full" />
    </form>

    <div class="mt-5 pb-4">
      <p class="text-sm font-normal text-center text-gray-500">
        Remember password?
        <RouterLink to="/auth/signin" class="text-sm text-brand-500 font-medium underline">
          Login
        </RouterLink>
      </p>
    </div>
  </div>
</template>
