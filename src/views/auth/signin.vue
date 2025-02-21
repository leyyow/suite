<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppButton from "~/components/common/app-button.vue";
import TextInput from "~/components/common/text-input.vue";
import { useApi } from "~/composables/useApi";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const { request, loading } = useApi();
const authStore = useAuthStore();

const form = ref({ email: "", password: "" });
const error = ref(null);

const onSubmit = async () => {
  // router.push("/dashboard");
  error.value = null;
  try {
    const data = await request("post", "/account/get_auth_token/", form.value);

    authStore.setAuth(data.access, data.refresh, data);
    router.push("/dashboard/expenses"); // Redirect after login
  } catch (err) {
    error.value = "Invalid credentials";
  }
};
</script>

<template>
  <div>
    <div class="mb-4">
      <h1 class="font-medium text-brand-600 text-2xl">Start Selling Better</h1>
      <p class="text-sm text-brand-400">
        Seamlessly Track Sales, Monitor Expenses, and Cultivate Customer Relationships
      </p>
    </div>

    <h3 class="text-lg font-medium text-brand-600 mb-2">Welcome back 🙌</h3>

    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <TextInput
        v-model="form.email"
        type="email"
        label="Email"
        placeholder="Enter email address"
        required
      />

      <TextInput
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="Enter password"
        required
      />

      <div class="flex justify-end">
        <RouterLink
          to="/auth/forgot-password"
          class="text-sm text-brand-500 font-medium hover:underline"
        >
          Forgot password?
        </RouterLink>
      </div>
      <AppButton type="submit" label="Login" :loading="loading" class="w-full" />
    </form>

    <div class="mt-5">
      <p class="text-sm font-normal text-center text-gray-500">
        Don't have an account?
        <RouterLink to="/auth/signup" class="text-sm text-brand-500 font-medium underline">
          Create One
        </RouterLink>
      </p>
    </div>
  </div>
</template>
