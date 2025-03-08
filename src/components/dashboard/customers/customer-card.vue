<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import Chip from "~/components/common/chip.vue";
import Dropdown from "~/components/common/dropdown.vue";

defineProps({
  expense: { type: Object, default: () => ({}) },
  showActions: { type: Boolean, default: true },
});
const emit = defineEmits(["view", "edit", "delete", "open:dropdown"]);

const menuItems = computed(() => [
  { label: "View customer", icon: "mdi:eye", action: () => emit("view") },
  { label: "Edit customer", icon: "mdi:pencil", action: () => emit("edit") },
  {
    label: "Delete customer",
    icon: "mdi:delete",
    class: "text-error",
    action: () => emit("delete"),
  },
]);
</script>

<template>
  <div class="bg-brand-50 border border-brand-200 px-2 py-2 rounded-xl cursor-pointer">
    <div class="flex items-center gap-2.5">
      <!-- <img class="h-12 w-12 bg-brand-200 rounded-lg" /> -->
      <span class="h-12 w-12 rounded-lg bg-brand-200 flex items-center justify-center">
        <Icon icon="duo-icons:user" class="text-brand-500 h-8 w-8" />
      </span>
      <div class="text-sm flex-1 truncate">
        <h4 class="font-medium text-sm truncate mb-1">Abdulraheem Alade</h4>
        <p class="text-brand-300 flex items-center gap-0.5">
          <Icon icon="mdi:phone" class="text-brand-500 h-4 w-4" />
          <span> 08012345678 </span>
        </p>
      </div>
      <div class="flex flex-col items-end gap-1">
        <Dropdown v-if="showActions" :items="menuItems">
          <template #label>
            <Icon icon="tabler:dots" class="text-lg" @click="emit('open:dropdown')" />
          </template>
        </Dropdown>
        <Chip label="2 orders" dense variant="warning" />
      </div>
    </div>
  </div>
</template>
