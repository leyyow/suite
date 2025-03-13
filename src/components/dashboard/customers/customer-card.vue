<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import Chip from "~/components/common/chip.vue";
import Dropdown from "~/components/common/dropdown.vue";

const props = defineProps({
  expense: { type: Object, default: () => ({}) },
  showActions: { type: Boolean, default: true },
  customer: { type: Object, default: () => ({}) },
});
const emit = defineEmits(["view", "edit", "delete", "open:dropdown"]);

const menuItems = computed(() => [
  { label: "View customer", icon: "mdi:eye", action: () => emit("view") },
  { label: "Edit customer", icon: "mdi:pencil", action: () => emit("edit") },
  {
    label: "Delete customer",
    icon: "mdi:delete",
    class: "text-error",
    iconClass: "text-error",
    action: () => emit("delete"),
  },
]);

const isLatest = computed(
  () => props.customer?.newest && props.customer?.timestamp > Date.now() - 60 * 1000,
);
</script>

<template>
  <div
    class="w-full bg-brand-50 border border-brand-200 px-2 py-2 rounded-xl cursor-pointer"
    :class="{ relative: isLatest }"
  >
    <div class="flex items-center gap-2.5 text-left">
      <!-- <img class="h-12 w-12 bg-brand-200 rounded-lg" /> -->
      <span class="h-12 w-12 rounded-lg bg-brand-200 flex items-center justify-center">
        <Icon icon="duo-icons:user" class="text-brand-500 h-8 w-8" />
      </span>
      <div class="text-sm flex-1 truncate">
        <h4 class="font-medium text-sm truncate mb-1">
          {{ (customer?.first_name + " " + customer?.last_name).trim() || "Unknown" }}
        </h4>
        <p class="text-brand-300 flex items-center gap-0.5">
          <Icon icon="solar:phone-bold-duotone" class="text-brand-500 h-4 w-4" />
          <span> {{ customer?.phone || "N/A" }} </span>
        </p>
      </div>
      <div class="flex flex-col items-end justify-end gap-1">
        <Dropdown v-if="showActions" :items="menuItems">
          <template #label>
            <Icon icon="tabler:dots" class="text-lg" @click="emit('open:dropdown')" />
          </template>
        </Dropdown>
        <Chip
          :label="`${customer?.lifetime_orders} order${customer?.lifetime_orders > 1 ? 's' : ''}`"
          dense
          variant="warning"
        />
      </div>
    </div>

    <Icon
      v-if="showActions && isLatest"
      icon="clarity:new-solid"
      class="text-purple-600 absolute top-0 left-0.5 text-2xl animate-ping"
    />
  </div>
</template>
