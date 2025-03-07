<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import Chip from "~/components/common/chip.vue";
import DropdownMenu from "~/components/common/dropdown-menu.vue";
import Switch from "~/components/common/switch.vue";
import { formatNaira } from "~/utilities/formatNaira";

defineProps({
  expense: { type: Object, default: () => ({}) },
  showActions: { type: Boolean, default: true },
});
const emit = defineEmits(["view", "delete", "edit", "duplicate", "open:dropdown", "share"]);

const menuItems = computed(() => [
  { label: "View product", action: () => emit("view") },
  { label: "Edit product", action: () => emit("edit") },
  { label: "Duplicate product", action: () => emit("duplicate") },
  { label: "Copy / Share link", action: () => emit("share") },
  {
    label: "Delete product",
    class: "text-error",
    action: () => emit("delete"),
  },
]);
const enabled = ref(true);
</script>

<template>
  <div class="w-full bg-brand-50 border border-brand-200 p-3 rounded-xl cursor-pointer text-left">
    <div class="flex gap-2.5">
      <img class="h-12 w-12 bg-brand-200 rounded-lg" />
      <div class="text-sm flex-1 truncate">
        <h4 class="text-sm truncate mb-1">Derby shoes</h4>
        <p class="truncate font-medium">{{ formatNaira(20000) }}</p>
      </div>
      <div v-if="showActions">
        <DropdownMenu :items="menuItems">
          <template #label>
            <Icon icon="tabler:dots" class="text-lg" @click="emit('open:dropdown')" />
          </template>
        </DropdownMenu>
      </div>
    </div>
    <hr class="border-brand-200 my-2" />
    <div class="flex items-center justify-between gap-1">
      <span
        class="border border-brand-200 rounded-full flex items-center gap-2 text-brand-300 text-sm py-1 pl-3 pr-1"
      >
        3 in stock
        <Chip label="Low ☹️" dense variant="warning" />
      </span>

      <Switch v-model="enabled" dense label="Available" disabled />
    </div>
  </div>
</template>
