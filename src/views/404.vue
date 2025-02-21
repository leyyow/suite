<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppButton from "~/components/common/app-button.vue";

const router = useRouter();
const route = useRoute();

const isDashboard = computed(() => route.fullPath.includes("dashboard"));

const links = [
  {
    title: "Get Started",
    description: "Create an account to start growing your business with Leyyow.",
    href: "/auth/signup",
  },
  {
    title: "Pricing",
    description:
      "Explore our investment plans and discover the best investment options to fit your financial goals.",
    href: "/pricing",
  },
  {
    title: "Homepage",
    description:
      "Return to the main page and explore our investment opportunities and platform features.",
    href: "/",
  },
];
</script>

<template>
  <div
    class="flex items-center mx-auto max-w-screen-sm"
    :class="isDashboard ? 'pt-20' : 'p-6 pb-12'"
  >
    <div>
      <p class="text-lg font-semibold text-red-500">404 Error</p>
      <h1 class="mt-1 text-3xl font-bold text-gray-800 md:text-4xl">Oops! Page Not Found</h1>
      <p class="mt-3 text-gray-600">Sorry, we couldn't find the page you were looking for.</p>

      <div class="flex items-center mt-4 gap-x-3">
        <AppButton variant="outlined" @click="router.go(-1)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 rtl:rotate-180"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Go Back
        </AppButton>

        <AppButton label="Take Me Home" @click="router.push(isDashboard ? '/dashboard' : '/')" />
      </div>

      <div v-if="!isDashboard">
        <h4 class="mt-6 text-gray-600 mb-4">Here are some helpful links:</h4>
        <div class="space-y-6">
          <div v-for="link in links" :key="link.title">
            <RouterLink
              :to="link.href"
              class="inline-flex items-center text-sm font-medium text-brand-500 gap-x-2 hover:underline"
            >
              <span>{{ link.title }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 rtl:rotate-180"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </RouterLink>
            <p class="mt-0 text-sm text-gray-600">
              {{ link.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
