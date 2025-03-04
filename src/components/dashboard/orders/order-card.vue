<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import Chip from "~/components/common/chip.vue";
import DropdownMenu from "~/components/common/dropdown-menu.vue";
import { formatNaira } from "~/utilities/formatNaira";

defineProps({ expense: { type: Object, default: () => ({}) } });
const emit = defineEmits(["view", "delete", "edit", "open:dropdown"]);

const menuItems = computed(() => [
  { label: "Mark as complete", action: () => {} },
  { label: "Mark as issue", action: () => {} },
  { label: "Copy order link", action: () => {} },
  {
    label: "Cancel order",
    class: "text-error",
    action: () => {},
  },
]);
</script>

<template>
  <div class="bg-brand-50 border border-brand-200 p-3 rounded-xl cursor-pointer">
    <div class="flex gap-2.5">
      <img class="h-12 w-12 bg-brand-200 rounded-lg" />
      <div class="text-sm flex-1 truncate">
        <h4 class="font-medium text-sm truncate">Abdulraheem</h4>
        <p class="mb-1 truncate">Derby shoes & 1 other item</p>
        <p class="text-brand-300 text-xs flex items-center">
          <span>#169877</span>
          <Icon icon="mdi:dot" class="text-brand-500 h-4 w-4" />
          <span>
            {{ new Date().toDateString() }}
          </span>
        </p>
      </div>
      <div class="flex flex-col items-end">
        <img class="h-8 w-8 bg-brand-200 rounded-lg" />
        <span class="font-medium text-sm">{{ formatNaira(20000) }}</span>
      </div>
    </div>
    <hr class="border-brand-200 my-2" />
    <div class="flex justify-between gap-1">
      <Chip label="Paid" dense />
      <DropdownMenu :items="menuItems">
        <template #label>
          <Icon icon="tabler:dots" class="text-lg" @click="emit('open:dropdown')" />
        </template>
      </DropdownMenu>
    </div>
  </div>
</template>
