<script setup>
import AppButton from "~/components/common/app-button.vue";
import Checkbox from "~/components/common/checkbox.vue";
import Chip from "~/components/common/chip.vue";
import Modal from "~/components/common/modal.vue";
import { formatNaira } from "~/utilities/formatNaira";

defineProps({ modelValue: Boolean, loading: Boolean, items: Array });
const emit = defineEmits(["update:modelValue", "save"]);
</script>

<template>
  <Modal
    :open="modelValue"
    title="Mark as complete"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <div class="bg-white p-2 rounded-lg mb-4">
      <Chip variant="warning" dense label="Warning" />
      <p class="text-sm mt-2">
        Ensure the items have been delivered before marking as complete. This action cannot be
        reversed.
      </p>
    </div>

    <section>
      <div class="flex justify-between mb-2 items-center">
        <h4>Order items</h4>
        <AppButton variant="text" label="Mark all" />
      </div>
      <div class="space-y-3 mb-4">
        <div v-for="v in 5" :key="v" class="flex gap-2 items-center">
          <Checkbox />
          <img class="h-12 w-12 rounded bg-brand-200" />
          <div class="flex-1 text-sm">
            <h4>Debola Adeola</h4>
            <p class="font-medium">{{ formatNaira(3000) }}</p>
          </div>
          <Chip label="2 Units" dense />
        </div>
      </div>

      <AppButton label="Save" class="w-full" />
    </section>
  </Modal>
</template>
