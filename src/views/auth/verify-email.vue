<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import TextInput from "~/components/common/text-input.vue";

const code = ref("");
</script>

<template>
  <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
    <div>
      <div class="mb-5 sm:mb-8">
        <h1 class="mb-2 font-bold text-gray-800 text-2xl">Verify Account</h1>
        <p class="text-sm text-gray-500">
          Enter the verification code sent to your email address to verify your account
        </p>
      </div>

      <form class="flex flex-col gap-5">
        <TextInput v-model="code" placeholder="e.g. ABC123" required />

        <AppButton type="submit" label="Verify Account" class="w-full" />
      </form>

      <div class="mt-5">
        <p class="text-sm font-normal text-center text-gray-500 sm:text-start">
          Didn't get verification code?
          <button
            type="button"
            to="/auth/signup"
            class="text-sm text-brand-500 font-medium hover:underline"
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
