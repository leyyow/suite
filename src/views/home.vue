<script setup>
import AppButton from "~/components/common/app-button.vue";
import heroPng from "~/assets/images/hero.png";
import backgroundThisYouPng from "~/assets/images/background-1.png";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const pricings = [
  {
    name: "Starters Plan",
    description: "Sell instantly through social media and messaging apps or a simple online store",
    price: 0,
    rotateClass: "lg:-rotate-3",
    features: Array(8).fill("Plans features"),
  },
  {
    name: "Basic Plan",
    description: "In-person selling tools with advanced staff, inventory, and loyalty features",
    price: 2500,
    features: Array(8).fill("Plans features"),
  },
  {
    name: "Pro Plan",
    description: "Build agility, speed to deployment, and performance for enterprise organizations",
    price: 5000,
    rotateClass: "lg:rotate-3",
    features: Array(8).fill("Plans features"),
  },
];
</script>

<template>
  <section
    :style="{ backgroundImage: `url(${heroPng})` }"
    class="bg-cover rounded-2xl h-[640px] mx-4 flex items-center justify-center text-center lg:text-left"
  >
    <div class="bg-black/50 h-full w-full rounded-2xl flex items-center px-6 lg:px-20">
      <div class="max-w-3xl">
        <h2 class="text-white text-4xl md:text-6xl lg:text-8xl font-medium">
          Powering real growth for your
          <span class="underline text-success">fashion</span> business.
        </h2>
        <p class="text-lg md:text-xl text-brand-200 my-6">
          Turning your hustle to business. How bad do you want it?
        </p>
        <AppButton variant="outlined" class="w-full md:w-60">
          Get Started
          <Icon icon="mdi:arrow-right" />
        </AppButton>
      </div>
    </div>
  </section>

  <section id="why-leyyow" class="my-16 max-w-screen-lg mx-auto px-4">
    <h3 class="font-medium text-4xl md:text-6xl mb-8 text-center md:text-left">
      If this is <span class="text-brand-500">you.</span> 😟
    </h3>
    <div class="flex flex-wrap justify-center gap-4">
      <img src="../assets/images/this-you-1.png" class="w-64 md:w-80 h-auto" />
      <img src="../assets/images/this-you-2.png" class="w-64 md:w-80 h-auto" />
      <img src="../assets/images/this-you-3.png" class="w-64 md:w-80 h-auto" />
    </div>
    <div
      :style="{ backgroundImage: `url(${backgroundThisYouPng})` }"
      class="bg-cover rounded-2xl h-96 mx-4 relative mt-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left"
    >
      <div class="bg-brand-200/70 h-full rounded-2xl flex flex-col justify-center p-6 md:pl-20">
        <h3 class="text-4xl md:text-6xl font-medium mb-6">
          Then <span class="text-brand-500 font-bold">Leyyow</span> was made for you 🫵!
        </h3>
        <AppButton class="w-full md:w-60">
          Explore Now
          <Icon icon="mdi:arrow-right" />
        </AppButton>
      </div>
      <img src="../assets/images/phone.png" class="w-40 md:w-auto" />
    </div>
  </section>

  <section id="features" class="my-16 max-w-screen-lg mx-auto px-4">
    <h3 class="text-4xl md:text-5xl font-medium w-full md:w-3/5 mb-8 text-center md:text-left">
      Enhance your sales game with all the essentials.
    </h3>

    <div class="flex flex-col md:flex-row gap-8 mb-8">
      <div
        class="w-full md:w-2/5 bg-white border border-brand-200 px-8 rounded-2xl h-72 flex flex-col justify-center"
      >
        <h4 class="text-brand-500 font-medium text-2xl">Business perfomance overview</h4>
        <p class="text-brand-600 my-4">
          Know what your best sellers are, or how much you spent on your business this past month?
          Get information of the most important parts of your business at a glance
        </p>
        <RouterLink to="/auth/signup" class="text-brand-500 inline-flex items-center gap-1">
          <span class="underline"> Try it now </span>
          <Icon icon="mdi:arrow-right" />
        </RouterLink>
      </div>
      <div
        class="bg-gradient-to-b from-sky-300 to-teal-200 w-full md:w-3/5 h-96 rounded-2xl flex flex-col justify-center items-center"
      >
        <img src="../assets/images/business-performance.png" class="rounded-2xl max-h-72" />
      </div>
    </div>
    <!--  -->
    <div class="flex flex-col md:flex-row gap-8 mb-8">
      <div
        class="bg-gradient-to-b from-orange-200 to-teal-200 w-full md:w-3/5 h-96 rounded-2xl flex flex-col justify-center items-center"
      >
        <img
          src="../assets/images/know-your-customer.png"
          class="rounded-2xl w-[360px] object-contain"
        />
      </div>
      <div
        class="w-full md:w-2/5 bg-white border border-brand-200 px-8 rounded-2xl h-72 flex flex-col justify-center"
      >
        <h4 class="text-brand-500 font-medium text-2xl">Know You Customer</h4>
        <p class="text-brand-600 my-4">
          Intimately know your customers, their preferences, and never forget who supported you.
        </p>
        <RouterLink to="/auth/signup" class="text-brand-500 inline-flex items-center gap-1">
          <span class="underline"> Try it now </span>
          <Icon icon="mdi:arrow-right" />
        </RouterLink>
      </div>
    </div>
    <!--  -->
    <div class="flex flex-col md:flex-row gap-8 mb-8">
      <div
        class="w-full md:w-2/5 bg-white border border-brand-200 px-8 rounded-2xl h-72 flex flex-col justify-center"
      >
        <h4 class="text-brand-500 font-medium text-2xl">Track Expenses</h4>
        <p class="text-brand-600 my-4">
          Track your expenses. As in really track your expenses. If you mix business funds with your
          lifestyle expenses, you really shouldn’t. We can help you sort that.
        </p>
        <RouterLink to="/auth/signup" class="text-brand-500 inline-flex items-center gap-1">
          <span class="underline"> Try it now </span>
          <Icon icon="mdi:arrow-right" />
        </RouterLink>
      </div>
      <div
        class="bg-gradient-to-b from-purple-300 to-teal-200 w-full md:w-3/5 h-96 rounded-2xl flex flex-col justify-center items-center"
      >
        <img src="../assets/images/track-expenses.png" class="rounded-2xl w-80 contain" />
      </div>
    </div>
  </section>

  <section id="pricing" class="my-16 max-w-screen-lg mx-auto px-4">
    <h3 class="text-4xl md:text-5xl font-medium w-full md:w-3/5 mb-8 text-center md:text-left">
      Choose the best plan for your <span class="text-brand-500">business.</span>
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(plan, p) in pricings"
        :key="plan.name"
        class="px-4 py-6 border rounded-lg"
        :class="plan.rotateClass"
      >
        <h3 class="mb-4 text-sm uppercase text-brand-400">{{ plan.name }}</h3>
        <div class="mb-2">
          <span class="text-4xl font-medium">NGN {{ plan.price }}</span>
          <span class="text-brand-300">/ Month</span>
        </div>
        <p class="text-brand-300 text-sm mb-4">{{ plan.description }}</p>
        <AppButton
          :variant="p == 1 ? 'filled' : 'outlined'"
          label="Select Plan"
          class="w-full"
          @click="router.push('/auth/signup')"
        />
        <ul class="mt-4 space-y-4">
          <li v-for="(feature, f) in plan.features" :key="f" class="flex items-center space-x-2">
            <img src="../assets/medal-star.svg" class="h-5 w-5" />
            <span class="text-brand-600 text-sm">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
