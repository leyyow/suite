<script setup>
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import { formatNaira } from "~/utilities/formatNaira";

defineProps({ modelValue: Boolean, loading: Boolean, items: Array });
const emit = defineEmits(["update:modelValue", "add"]);
</script>

<template>
  <Modal
    :open="modelValue"
    title="Payment History"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <div class="mb-4">
      <h3 class="text-sm text-brand-400">Order price</h3>
      <p class="font-semibold text-xl">{{ formatNaira(20000) }}</p>
    </div>

    <section>
      <div class="flex justify-between mb-2 items-center">
        <h4>Payment history</h4>
        <AppButton small label="Add" @click="emit('add')" />
      </div>
      <table class="table-auto border-collapse w-full border border-brand-200" cellpadding="8">
        <thead>
          <tr class="text-sm text-brand-300">
            <th class="px-2 py-1.5 border border-brand-200">Date</th>
            <th class="px-2 py-1.5 border border-brand-200">Amount</th>
            <th class="px-2 py-1.5 border border-brand-200">Method</th>
            <th class="px-2 py-1.5 border border-brand-200">Outstanding</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 2" :key="i" class="text-sm">
            <td class="px-2 py-1.5 border border-brand-200">20/08/24</td>
            <td class="px-2 py-1.5 border border-brand-200">{{ formatNaira(12000) }}</td>
            <td class="px-2 py-1.5 border border-brand-200">Cash</td>
            <td class="px-2 py-1.5 border border-brand-200 text-error">{{ formatNaira(8000) }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </Modal>
</template>
