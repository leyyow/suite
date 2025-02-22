<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import SelectInput from "~/components/common/select-input.vue";
import TextInput from "~/components/common/text-input.vue";
import { useRegisterApi } from "~/composables/api/auth";
import { useAuthStore } from "~/stores/auth";

const form = ref({
  email: "",
  password: "",
  store_name: "",
  business_type: { label: "", value: "" },
});

const industryOptions = [
  { label: "Fashion & Accessories", value: "1" },
  { label: "Health & Beauty", value: "2" },
  { label: "Gadgets & Electronics", value: "3" },
  { label: "Events", value: "4" },
  { label: "Food", value: "6" },
  { label: "Others", value: "5" },
];

const { mutate: signupFn, loading } = useRegisterApi();
const authStore = useAuthStore();
const router = useRouter();

const onSubmit = () => {
  signupFn({ ...form.value, business_type: form.value.business_type.value }).then((data) => {
    authStore.setAuth(data.access, data.refresh, data);
    toast.success("Registration successful");
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

    <h3 class="text-lg font-medium text-brand-600 mb-2">Create your store 🛍️</h3>

    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <TextInput
        v-model="form.store_name"
        label="Store Name"
        placeholder="e.g. solesnshades, smileng"
        required
      />

      <SelectInput
        v-model="form.business_type"
        label="Industry"
        :options="industryOptions"
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

      <AppButton type="submit" :loading="loading" label="Sign Up" class="w-full" />
    </form>

    <div class="mt-5 pb-4">
      <p class="text-sm font-normal text-center text-gray-500">
        Already have an account?
        <RouterLink to="/auth/signin" class="text-sm text-brand-500 font-medium underline">
          Login
        </RouterLink>
      </p>
      <p class="mt-2 text-brand-400 text-sm text-center">
        By signing up, I agree to the Leyyow
        <a
          href="https://leyyow.notion.site/Refund-policy-162f3934f3148085a337fc0d3cbffb99?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
          class="underline"
        >
          Privacy Policy
        </a>
        and
        <a
          href="https://leyyow.notion.site/Refund-policy-162f3934f3148085a337fc0d3cbffb99?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
          class="underline"
        >
          Terms of Services
        </a>
      </p>
    </div>
  </div>
</template>
