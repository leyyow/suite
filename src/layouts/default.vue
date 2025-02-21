<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import AppButton from "~/components/common/app-button.vue";

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const headerLinks = [
  { name: "Why Leyyow", to: "/why" },
  { name: "Features", to: "/features" },
  { name: "Pricing", to: "/pricing" },
];

const socialLinks = [
  { name: "Instagram", to: "/#" },
  { name: "Twitter", to: "/#" },
  { name: "LinkedIn", to: "/#" },
  { name: "Facebook", to: "/#" },
];
</script>

<template>
  <header class="sticky top-0 w-full z-10 bg-white">
    <nav class="flex justify-between items-center max-w-screen-xl mx-auto px-4 py-4">
      <RouterLink to="/" class="flex items-center space-x-3">
        <img src="/leyyow.png" class="h-8" alt="Leyyow" />
        <span class="text-2xl font-bold text-brand-500">Leyyow</span>
      </RouterLink>

      <div class="hidden md:flex items-center space-x-6">
        <ul class="flex space-x-5 text-sm">
          <li v-for="link in headerLinks" :key="link.name">
            <RouterLink :to="link.to" class="text-brand-500 hover:underline">
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="hidden md:flex gap-2">
        <RouterLink to="/auth/signin">
          <AppButton label="Log in" variant="outlined" />
        </RouterLink>
        <RouterLink to="/auth/signup">
          <AppButton label="Get Started" />
        </RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <AppButton icon="mdi:menu" variant="tonal" class="md:hidden" @click="toggleMobileMenu" />
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4"
    >
      <ul class="flex flex-col space-y-4">
        <li v-for="link in headerLinks" :key="link.name">
          <RouterLink :to="link.to" class="text-brand-500 block">{{ link.name }}</RouterLink>
        </li>
        <RouterLink to="/auth/signin">
          <AppButton label="Log in" variant="outlined" class="w-full" />
        </RouterLink>
        <RouterLink to="/auth/signup">
          <AppButton label="Get Started" class="w-full" />
        </RouterLink>
      </ul>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer class="bg-brand-600 text-brand-200 px-4 pt-16 pb-10 text-center">
    <h2 class="text-4xl sm:text-5xl font-semibold mb-4">Expand your business horizons with us.</h2>
    <p class="mb-4">Get started in 5 minutes</p>
    <AppButton>
      Get Started Now
      <Icon icon="mdi-arrow-right" />
    </AppButton>

    <hr class="border-t border-brand-400 my-10" />

    <div class="max-w-screen-xl mx-auto pt-2">
      <div class="flex flex-col md:flex-row justify-between text-sm space-y-3 md:space-y-0">
        <span>
          &copy; {{ new Date().getFullYear() }}
          <RouterLink to="/" class="underline text-brand-200">Leyyow</RouterLink>
        </span>
        <div>
          <RouterLink to="/privacy" class="text-brand-300 hover:underline"
            >Privacy Policy</RouterLink
          >
          <a href="mailto:hello@leyyow.com" class="text-brand-300 underline ml-4"
            >hello@leyyow.com</a
          >
        </div>
        <div class="flex justify-center md:justify-end space-x-3">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.to"
            target="_blank"
            rel="noopener noreferrer"
            class="text-brand-300 hover:underline"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
