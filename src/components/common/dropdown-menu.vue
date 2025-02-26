<script setup>
import { ref, onMounted, onUnmounted, inject } from "vue";
import { Icon } from "@iconify/vue";

defineProps({
  label: { type: String, default: "Options" }, // Default button text
  items: { type: Array, required: true }, // Array of menu items
  menuClass: { type: String || Array, default: "" },
});

const isOpen = ref(false);
const menuRef = ref(null);

// Inject a shared function from the parent
const registerDropdown = inject("registerDropdown", () => {});
const closeAllDropdowns = inject("closeAllDropdowns", () => {});

// Toggle dropdown visibility while closing others
const toggleMenu = (e) => {
  e.stopPropagation();
  if (isOpen.value) {
    isOpen.value = false;
  } else {
    closeAllDropdowns(); // Close all other dropdowns before opening this one
    isOpen.value = true;
  }
};

// Close dropdown when clicking outside
const closeMenu = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

// Register the dropdown instance
onMounted(() => {
  registerDropdown(() => (isOpen.value = false));
  document.addEventListener("click", closeMenu);
});
onUnmounted(() => {
  document.removeEventListener("click", closeMenu);
});
</script>

<template>
  <div ref="menuRef" class="relative inline-block text-left">
    <!-- Button -->
    <button class="flex items-center gap-2 bg-brand-50" @click="toggleMenu">
      <slot name="label">
        {{ label }}
        <Icon icon="mdi:chevron-down" class="ml-2 h-5 w-5" />
      </slot>
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        :class="[
          'absolute right-0 mt-2 z-[100] origin-top-right py-2 px-2 bg-white shadow-lg',
          'ring-1 ring-black/5 focus:outline-none w-auto min-w-40 rounded-md divide-y divide-brand-100',
          menuClass,
        ]"
      >
        <button
          v-for="item in items"
          :key="item.label"
          :class="[
            'group flex w-full items-center gap-2 px-4 py-2 text-sm rounded',
            'text-brand-400 hover:text-brand-500 hover:bg-brand-100',
            item.class,
          ]"
          @click="
            () => {
              item.action();
              isOpen = false;
            }
          "
        >
          <Icon
            v-if="item.icon"
            :icon="item.icon"
            class="text-brand-300 h-4 w-4 group-hover:text-brand-500"
          />
          {{ item.label }}
        </button>
      </div>
    </transition>
  </div>
</template>
