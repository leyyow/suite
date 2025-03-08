<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import Chip from "~/components/common/chip.vue";
import Dropdown from "~/components/common/dropdown.vue";
import { formatNaira } from "~/utilities/formatNaira";

defineProps({ expense: { type: Object, default: () => ({}) } });
const emit = defineEmits(["view", "delete", "edit", "open:dropdown"]);

const menuItems = computed(() => [
  { label: "View expense", icon: "mdi:eye", action: () => emit("view") },
  { label: "Edit expense", icon: "mdi:pencil", action: () => emit("edit") },
  {
    label: "Delete expense",
    class: "text-error",
    iconClass: "text-error",
    icon: "mdi:delete",
    action: () => emit("delete"),
  },
]);
</script>

<template>
  <div class="bg-brand-50 border border-brand-200 p-3 rounded-xl cursor-pointer">
    <div class="flex justify-between text-sm">
      <h4 class="font-medium">{{ expense.name }}</h4>
      <span class="font-medium">{{ formatNaira(expense.amount) }}</span>
    </div>
    <div class="flex justify-between text-sm text-brand-400 mt-0.5">
      <p>{{ expense.recipient_name || "Unknown" }}</p>
      <span>{{ new Date(expense.date).toDateString() }}</span>
    </div>
    <hr class="border-brand-200 my-2" />
    <div class="flex justify-between gap-1">
      <div class="flex flex-wrap gap-1">
        <Chip :label="expense.channel" dense />
        <Chip :label="expense.category_name" dense class="max-w-40 truncate" />
      </div>
      <Dropdown :items="menuItems">
        <template #label>
          <Icon icon="tabler:dots" class="text-lg" @click="emit('open:dropdown')" />
        </template>
      </Dropdown>
    </div>
  </div>
</template>
