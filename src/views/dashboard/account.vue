<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import StatusChip from "~/components/common/status-chip.vue";
import TextInput from "~/components/common/text-input.vue";
import PageTitle from "~/components/dashboard/page-title.vue";

const form = ref({ email: "", firstName: "", lastName: "", phone: "" });
</script>

<template>
  <div>
    <PageTitle
      title="Account Settings"
      subtitle="Upgrade plan, change password & update profile information"
    />

    <div
      class="bg-white p-4 rounded-xl border mt-4 mb-6 flex flex-col md:flex-row gap-6 items-center"
    >
      <span
        class="bg-white border text-xl font-bold text-brand-500 rounded-full h-20 w-20 flex items-center justify-center"
      >
        MK
      </span>
      <div>
        <h3 class="text-lg font-semibold mb-1">Michael King</h3>
        <p class="text-gray-500 text-sm">Growth Investor | michaelking@gmail.com</p>
      </div>
      <div class="ml-auto">
        <StatusChip value="active" />
      </div>
    </div>

    <div class="flex bg-gray-100 rounded-lg p-0.5">
      <button
        v-for="v in ['profile', 'plan', 'password']"
        :key="v"
        type="button"
        :class="[
          'px-3 py-2 text-sm font-medium focus:outline-none capitalize flex-1',
          'first:rounded-l-lg last:rounded-r-lg',
          v == 'profile' ? 'bg-white text-black' : 'text-gray-500',
        ]"
      >
        {{ v }}
      </button>
    </div>

    <div class="bg-white p-4 rounded-xl border mt-4">
      <h3 class="text-lg font-semibold mb-4">Personal Information</h3>
      <form class="max-w-md grid gap-4">
        <TextInput v-model="form.firstName" label="First Name" placeholder="e.g. John" required />

        <TextInput v-model="form.lastName" label="Last Name" placeholder="e.g. Doe" required />

        <TextInput
          v-model="form.email"
          type="email"
          label="Email"
          placeholder="Enter email address"
          required
        />

        <TextInput
          v-model="form.phone"
          type="phone"
          label="Phone"
          placeholder="e.g. +44712345678"
          required
        />

        <AppButton type="submit" label="Save Changes" />
      </form>
    </div>
  </div>
</template>
