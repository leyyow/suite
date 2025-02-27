<script setup>
import { provide, ref } from "vue";

// ============ Prevent Multiple Dropdown ===== //
// ============================================//
const dropdowns = ref([]);
// Register a dropdown to allow centralized control
const registerDropdown = (closeFn) => {
  dropdowns.value.push(closeFn);
};
// Close all open dropdowns
const closeAllDropdowns = () => {
  dropdowns.value.forEach((closeFn) => closeFn());
};
// Provide these functions to all child components
provide("registerDropdown", registerDropdown);
provide("closeAllDropdowns", closeAllDropdowns);
</script>

<template>
  <RouterView />
</template>
