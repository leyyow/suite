<script setup>
import { Icon } from "@iconify/vue";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import CustomerCard from "./customer-card.vue";

defineProps({
  modelValue: Boolean,
  loading: Boolean,
  customer: { type: Object, default: () => ({}) },
});
const emit = defineEmits(["update:modelValue", "delete"]);
</script>

<template>
  <Modal :open="modelValue" size="md" centered @update:open="emit('update:modelValue', $event)">
    <div class="flex flex-col items-center justify-center gap-2 text-center">
      <Icon icon="solar:trash-bin-trash-bold-duotone" class="text-error h-14 w-14" />
      <p class="text-base font-medium">Do you want to delete this customer?</p>
      <p class="text-sm text-brand-400">
        This customer will be entirely removed from the list, and all purchase history will be
        erased.
      </p>

      <CustomerCard :customer="customer" :show-actions="false" />

      <AppButton
        label="Delete Customer"
        :loading="loading"
        class="bg-error w-full focus:ring-error/20"
        @click="emit('delete')"
      />
    </div>
  </Modal>
</template>
