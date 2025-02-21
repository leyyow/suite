<!-- components/ui/DropdownMenu.vue -->
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { Icon } from "@iconify/vue";

defineProps({
  label: { type: String, default: "Options" }, // Default button text
  items: { type: Array, required: true }, // Array of menu items
  menuClass: { type: String || Array, default: "" },
});
</script>
<template>
  <div class="relative inline-block text-left">
    <Menu as="div">
      <MenuButton as="div">
        <slot name="label">
          {{ label }}
          <Icon icon="mdi:chevron-down" class="ml-2 h-5 w-5" />
        </slot>
      </MenuButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          :class="[
            'absolute right-0 mt-2 z-50 origin-top-right py-1 divide-y divide-brand-200',
            'rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none w-auto min-w-[8rem]',
            menuClass,
          ]"
        >
          <MenuItem v-for="item in items" :key="item.label" v-slot="{ active }">
            <button
              :class="[
                'flex w-full items-center gap-2 px-4 py-2 text-sm whitespace-nowrap text-brand-400',
                { 'bg-brand-500/20 text-brand-500': active },
                item.class,
              ]"
              @click="item.action"
            >
              <Icon v-if="item.icon" :icon="item.icon" />
              {{ item.label }}
            </button>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
