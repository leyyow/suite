<script setup>
import { Icon } from "@iconify/vue";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import ProductCard from "./product-card.vue";

defineProps({
  modelValue: Boolean,
  loading: Boolean,
  product: { type: Object, default: () => ({}) },
});
const emit = defineEmits(["update:modelValue", "delete"]);
</script>

<template>
  <Modal
    :open="modelValue"
    title="Delete Product"
    size="md"
    centered
    @update:open="emit('update:modelValue', $event)"
  >
    <div class="flex flex-col items-center justify-center gap-2 text-center">
      <Icon icon="solar:trash-bin-trash-bold-duotone" class="text-error h-14 w-14" />
      <p class="text-base font-medium">Do you want to delete this product?</p>
      <p class="text-sm text-brand-400 mb-4">
        This will completely remove all records of this product.
      </p>

      <ProductCard :show-actions="false" :product="product" />

      <div class="grid grid-cols-2 gap-3 w-full mt-4">
        <AppButton
          label="Cancel"
          variant="outlined"
          class="border-error text-error w-full focus:ring-error/20"
          @click="emit('update:modelValue', false)"
        />
        <AppButton
          label="Delete Product"
          :loading="loading"
          class="bg-error w-full focus:ring-error/20"
          @click="emit('delete')"
        />
      </div>
    </div>
  </Modal>
</template>
