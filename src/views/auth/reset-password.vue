<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import TextInput from "~/components/common/text-input.vue";

const form = ref({ password: "", confirmPassword: "" });
</script>

<template>
  <div class="w-full max-w-md pt-10 mx-auto">
    <RouterLink
      to="/auth/signin"
      class="inline-flex items-center font-medium text-sm text-brand-500 hover:underline"
    >
      <svg
        class="stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
          stroke=""
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Back to Login
    </RouterLink>
  </div>
  <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
    <div>
      <div class="mb-5 sm:mb-8">
        <h1 class="mb-2 font-bold text-gray-800 text-2xl">Reset Password</h1>
        <p class="text-sm text-gray-500">Enter and confirm your new password</p>
      </div>

      <form class="flex flex-col gap-5">
        <TextInput
          v-model="form.password"
          type="password"
          label="New Password"
          placeholder="Enter new password"
          required
        />

        <TextInput
          v-model="form.confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Enter password again"
          required
        />

        <AppButton type="submit" label="Reset Password" class="w-full" />
      </form>
    </div>
  </div>
</template>
