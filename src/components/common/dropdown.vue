<!-- <script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import { nextTick, onMounted, onUnmounted, ref } from "vue";

defineProps({
  label: { type: String, default: "Options" },
  items: { type: Array, required: true },
  menuClass: { type: String || Array, default: "" },
});

const isOpen = ref(false);
const menuRef = ref(null);
const positionClass = ref("top-full right-0 origin-top-right");

// Close all open menus before opening a new one
const closeAllMenus = () => {
  window.dispatchEvent(new CustomEvent("close-all-menus"));
};

// Toggle menu state while ensuring only one menu is open
const toggleMenu = async () => {
  if (!isOpen.value) {
    closeAllMenus(); // Close other open menus before opening this one
    await nextTick(); // Ensure dropdown is in the DOM
    calculatePositionClass();
  }
  isOpen.value = !isOpen.value;
};

// Close menu when the global event is triggered
const handleGlobalClose = () => {
  isOpen.value = false;
};

// Calculate the position class dynamically
const calculatePositionClass = () => {
  if (!menuRef.value || !menuRef.value.$el) {
    console.warn("menuRef is not properly assigned:", menuRef.value);
    return;
  }

  const rect = menuRef.value.$el.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // console.log("Dropdown position:", { rect, windowHeight });
  // console.log("Condition:", rect.bottom > windowHeight - 200);

  if (rect.bottom > windowHeight - 240) {
    positionClass.value = "bottom-full right-0 origin-bottom-right"; // Open upwards if too close to the bottom
  } else {
    positionClass.value = "top-full right-0 origin-top-right"; // Open downwards by default
  }
};

// Attach event listener for global menu closing
onMounted(() => {
  window.addEventListener("close-all-menus", handleGlobalClose);
});
onUnmounted(() => {
  window.removeEventListener("close-all-menus", handleGlobalClose);
});
</script>

<template>
  <Menu
    ref="menuRef"
    v-click-outside="handleGlobalClose"
    as="div"
    class="relative inline-block text-left"
  >
    <div>
      <MenuButton as="span" @click.stop="toggleMenu">
        <slot name="label" :open="isOpen">
          <button
            class="inline-flex w-full justify-center rounded-md bg-transparent text-sm font-medium focus:outline-none focus-visible:ring-0"
          >
            {{ label }}
            <Icon
              icon="mdi:chevron-down"
              class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </button>
        </slot>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        v-show="isOpen"
        as="div"
        static
        class="absolute z-50 mt-1 min-w-40 w-max divide-y divide-brand-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        :class="menuClass ? menuClass : positionClass"
      >
        <slot name="preprend"> </slot>
        <div v-for="item in items" :key="item.label" class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-brand-200 text-brand-500 font-medium' : 'text-brand-400',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                item.class,
              ]"
              @click="item.action"
            >
              <Icon
                v-if="item.icon"
                :icon="item.icon"
                class="mr-2 h-5 w-5 text-brand-500"
                :class="item.iconClass"
                aria-hidden="true"
              />
              {{ item.label }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template> -->

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
    <button class="flex items-center gap-2 bg-transparent" @click.stop="toggleMenu">
      <slot name="label" :open="isOpen">{{ label }}</slot>
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
          'absolute z-[9999] w-max min-w-40 py-2 px-2 bg-white shadow-lg rounded-md divide-y divide-brand-200',
          'ring-1 ring-black/5 focus:outline-none',
          menuClass ? menuClass : positionClass,
        ]"
      >
        <slot name="preprend"> </slot>
        <button
          v-for="item in items"
          :key="item.label"
          :class="[
            'group flex w-full items-center gap-2 px-2 py-2 text-sm',
            'text-brand-400 hover:text-brand-500 hover:bg-brand-100 hover:rounded',
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
