<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted, inject, nextTick } from "vue";

defineProps({
  label: { type: String, default: "Options" },
  items: { type: Array, required: true },
  menuClass: { type: String || Array, default: "" },
});

const isOpen = ref(false);
const menuRef = ref(null);
const dropdownRef = ref(null);
const positionClass = ref("top-full right-0 origin-top-right");

// Inject dropdown manager
const registerDropdown = inject("registerDropdown", () => {});
const closeAllDropdowns = inject("closeAllDropdowns", () => {});

// Toggle dropdown and calculate position
const toggleMenu = async (e) => {
  e.stopPropagation();
  if (isOpen.value) {
    isOpen.value = false;
  } else {
    closeAllDropdowns();
    isOpen.value = true;
    await nextTick(); // Wait for the dropdown to be rendered
    adjustPosition();
  }
};

// Adjust dropdown position dynamically
const adjustPosition = () => {
  if (!dropdownRef.value) return;
  const rect = dropdownRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (rect.bottom > viewportHeight - 20) {
    positionClass.value = "bottom-full right-5 origin-bottom-right";
  } else {
    positionClass.value = "top-full right-0 origin-top-right";
  }
};

// Close dropdown when clicking outside
const closeMenu = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

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
    <button class="flex items-center gap-2 bg-brand-50" @click.stop="toggleMenu">
      <slot name="label">{{ label }}</slot>
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
        ref="dropdownRef"
        :class="[
          'absolute z-[100] w-max min-w-40 py-2 px-2 bg-white shadow-lg rounded-md divide-y divide-brand-100',
          'ring-1 ring-black/5 focus:outline-none',
          menuClass ? menuClass : positionClass,
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
          @click.stop="
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
            :class="item.iconClass"
          />
          {{ item.label }}
        </button>
      </div>
    </transition>
  </div>
</template>
