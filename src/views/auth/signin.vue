<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import TextInput from "~/components/common/text-input.vue";
import { useLoginApi } from "~/composables/api/auth";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { mutate: loginFn, loading } = useLoginApi();

const form = ref({ email: "", password: "" });

const onSubmit = () => {
  loginFn(form.value).then((data) => {
    authStore.setAuth(data.access, data.refresh, data);
    toast.success("Login successful");
    router.push("/dashboard/expenses");
  });
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
