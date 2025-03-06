<script setup>
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div>
    <h2 class="font-semibold text-base mb-3">Settings</h2>

    <ul class="mt-4 border-t border-brand-200">
      <li
        :class="[
          'px-4 py-3 text-sm cursor-pointer hover:bg-brand-500/10 hover:text-brand-500',
          'flex justify-between items-center',
        ]"
        @click="router.push('/dashboard/settings/user-roles')"
      >
        Staff & User Roles
        <Icon icon="formkit:right" class="h-5 w-5 text-brand-400" />
      </li>
    </ul>
  </div>
</template>
