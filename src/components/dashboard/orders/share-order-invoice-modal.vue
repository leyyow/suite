<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import Chip from "~/components/common/chip.vue";
import Modal from "~/components/common/modal.vue";
import { formatNaira } from "~/utilities/formatNaira";

defineProps({ modelValue: Boolean, loading: Boolean, items: Array });
const emit = defineEmits(["update:modelValue", "add"]);

const orderDetails = computed(() => [
  { icon: "mingcute:card-pay-fill", label: "Order number", value: "#0920833" },
  { icon: "mingcute:card-pay-fill", label: "Email", value: "shop@leyyow.com" },
  { icon: "mingcute:card-pay-fill", label: "Date", value: new Date().toDateString() },
  { icon: "mingcute:card-pay-fill", label: "Orders", value: "Derby shoes & 1 other item" },
  { icon: "mingcute:card-pay-fill", label: "Total amount", value: formatNaira(10000) },
]);

const actionList = [
  { label: "Copy invoice link", icon: "mingcute:card-pay-fill" },
  { label: "Email invoice", icon: "mingcute:card-pay-fill" },
  { label: "Download as pdf", icon: "mingcute:card-pay-fill" },
];
</script>

<template>
  <Modal
    :open="modelValue"
    title="Share Invoice/Receipt"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <div class="mb-4 flex gap-2 items-center border-b border-brand-200 pb-3">
      <img class="h-12 w-12 rounded bg-brand-200" />
      <div class="flex-1 text-sm">
        <h3 class="font-medium">Debola Adeola</h3>
        <p class="text-brand-400">08012345678</p>
      </div>
      <Chip label="View profile" variant="success" dense />
    </div>

    <div class="mb-6 text-sm">
      <div
        v-for="(item, v) in orderDetails"
        :key="v"
        class="flex justify-between gap-1 py-3"
        :class="v == 4 ? 'border-y border-brand-200' : ''"
      >
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon :icon="item.icon" class="h-5 w-5 text-brand-300" />
          <p>{{ item.label }}</p>
        </div>
        <span class="text-right">{{ item.value }}</span>
      </div>
    </div>

    <div class="bg-white p-1.5 rounded-lg divide-y divide-brand-200">
      <button
        v-for="act in actionList"
        :key="act.label"
        type="button"
        class="flex items-center gap-2 text-brand-500 text-sm py-3 px-2 w-full hover:bg-brand-50"
      >
        <Icon :icon="act.icon" class="h-5 w-5 text-brand-300" />
        {{ act.label }}
      </button>
    </div>
  </Modal>
</template>
