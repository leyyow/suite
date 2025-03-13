<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import Chip from "~/components/common/chip.vue";
import Dropdown from "~/components/common/dropdown.vue";
import { useExpenseStore } from "~/stores/expense";
import { formatNaira } from "~/utilities/formatNaira";

const props = defineProps({ expense: { type: Object, default: () => ({}) } });
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

const expenseStore = useExpenseStore();
// latest and not more than 1 min
const isLatest = computed(() => {
  return (
    expenseStore.latest.id == props.expense.id &&
    expenseStore.latest.timestamp > Date.now() - 60 * 1000
  );
});
</script>

<template>
  <div
    class="bg-brand-50 border border-brand-200 p-3 rounded-xl cursor-pointer"
    :class="{ relative: isLatest }"
  >
    <div class="flex justify-between text-sm">
      <h4 class="font-medium capitalize">{{ expense.name }}</h4>
      <span class="font-medium">{{ formatNaira(expense.amount) }}</span>
    </div>
    <div class="flex justify-between text-sm text-brand-400 mt-0.5">
      <p>{{ expense.recipient_name || "Unknown" }}</p>
      <span>{{ new Date(expense.date).toDateString() }}</span>
    </div>
    <hr class="border-brand-200 my-2" />
    <div class="flex justify-between gap-1">
      <div class="flex flex-wrap gap-1">
        <Chip :label="expense.channel" dense class="capitalize" />
        <Chip :label="expense.category_name" dense class="max-w-40 truncate" />
      </div>
      <Dropdown :items="menuItems">
        <template #label>
          <Icon icon="tabler:dots" class="text-lg" @click="emit('open:dropdown')" />
        </template>
      </Dropdown>
    </div>

    <Icon
      v-if="isLatest"
      icon="clarity:new-solid"
      class="text-purple-600 absolute top-0 left-0.5 text-2xl animate-ping"
    />
  </div>
</template>
