<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import Chip from "~/components/common/chip.vue";
import Dropdown from "~/components/common/dropdown.vue";
import Switch from "~/components/common/switch.vue";
import { formatNaira } from "~/utilities/formatNaira";

const props = defineProps({
  product: { type: Object, default: () => ({}) },
  showActions: { type: Boolean, default: true },
});

const emit = defineEmits(["view", "delete", "edit", "duplicate", "open:dropdown", "share"]);

// Menu options for dropdown actions
const menuItems = computed(() => [
  { label: "View product", action: () => emit("view") },
  { label: "Edit product", action: () => emit("edit") },
  { label: "Duplicate product", action: () => emit("duplicate") },
  { label: "Delete product", class: "text-error", action: () => emit("delete") },
]);

const enabled = ref(!!props.product?.total_stock ?? false);
</script>

<template>
  <div class="w-full bg-brand-50 border border-brand-200 p-3 rounded-xl cursor-pointer text-left">
    <div class="flex gap-2.5">
      <!-- Product Image Placeholder -->
      <span class="h-12 w-12 rounded-lg bg-brand-200 flex items-center justify-center">
        <Icon icon="uim:box" class="text-brand-500 h-8 w-8" />
      </span>

      <!-- Product Info -->
      <div class="text-sm flex-1 truncate mr-6">
        <h4 class="text-sm truncate mb-1">{{ product?.product_name || "Uknown" }}</h4>
        <p class="truncate font-medium">{{ formatNaira(product?.price || 0) }}</p>
      </div>

      <!-- Actions Dropdown -->
      <div v-if="showActions">
        <Dropdown :items="menuItems">
          <template #label>
            <Icon icon="tabler:dots" class="text-lg" @click="emit('open:dropdown')" />
          </template>
        </Dropdown>
      </div>
    </div>

    <hr class="border-brand-200 my-2" />

    <!-- Stock Info & Availability Toggle -->
    <div class="flex items-center justify-between gap-1">
      <span
        class="border border-brand-200 rounded-full flex items-center gap-2 text-brand-300 text-sm py-1 pl-3"
        :class="product?.total_stock < 5 ? 'pr-1' : 'pr-3'"
      >
        {{ product?.total_stock }} in stock
        <Chip
          v-if="product?.total_stock < 5"
          :label="product?.total_stock == 0 ? 'Out' : 'Low ☹️'"
          dense
          :variant="product?.total_stock == 0 ? 'error' : 'warning'"
        />
      </span>

      <Switch
        v-model="enabled"
        dense
        :label="product?.total_stock == 0 ? 'Unavailable' : 'Available'"
        disabled
      />
    </div>
  </div>
</template>
