<script setup>
import { Icon } from "@iconify/vue";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import OrderCard from "./order-card.vue";

defineProps({ modelValue: Boolean, loading: Boolean });
const emit = defineEmits(["update:modelValue", "delete"]);
</script>

<template>
  <Modal
    :open="modelValue"
    title="Delete Order"
    size="md"
    centered
    @update:open="emit('update:modelValue', $event)"
  >
    <div class="flex flex-col items-center justify-center gap-2 text-center">
      <Icon icon="weui:delete-on-filled" class="text-error h-14 w-14" />
      <p class="text-base font-medium">Do you want to delete this order?</p>
      <p class="text-sm text-brand-400 mb-4">
        This will completely remove all records of this order.
      </p>

      <OrderCard :show-actions="false" />

      <p class="text-xs text-brand-400 mt-4 mb-4 text-left w-full">
        To proceed, we will notify your manager for approval
      </p>

      <div class="grid grid-cols-2 gap-3 w-full">
        <AppButton
          label="Cancel"
          variant="outlined"
          class="border-error text-error w-full focus:ring-error/20"
          @click="emit('update:modelValue', false)"
        />
        <AppButton
          label="Delete Order"
          :loading="loading"
          class="bg-error w-full focus:ring-error/20"
          @click="emit('delete')"
        />
      </div>
    </div>
  </Modal>
</template>
