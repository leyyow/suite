<script setup>
import { computed, ref, watch } from "vue";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import RadioGroup from "~/components/common/radio-group.vue";
import SelectInput from "~/components/common/select-input.vue";
import TextInput from "~/components/common/text-input.vue";
import { useGetExpenseRecipients, useGetExpenseSubCategories } from "~/composables/api/expense";

const props = defineProps({ modelValue: Boolean, loading: Boolean, reset: Boolean });
const emit = defineEmits(["update:modelValue", "submit"]);

const { data: recipients } = useGetExpenseRecipients();
const { data: allSubCategories } = useGetExpenseSubCategories();

const form = ref({
  amount_max: "",
  amount_min: "",
  recipient: { label: "", value: "" },
  category: { label: "", value: "" },
  channel: "",
  has_receipt: "",
});

const paymentChannels = computed(() =>
  ["Cash", "Transfer", "Card"].map((v) => ({ label: v, value: v.toLowerCase() })),
);

watch(
  () => props.reset,
  (v) => {
    if (v) onReset();
  },
);

const onSubmit = (e) => {
  e.preventDefault();
  emit("submit", form.value);
};

const onReset = () => {
  form.value = {
    amount_max: "",
    amount_min: "",
    recipient: { label: "", value: "" },
    category: { label: "", value: "" },
    channel: "",
    has_receipt: "",
  };
};
</script>

<template>
  <Modal
    :open="modelValue"
    title="Filter Expense"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <form class="flex flex-col gap-4" @submit="onSubmit">
      <div class="grid grid-cols-2 gap-2">
        <TextInput
          v-model="form.amount_min"
          type="number"
          label="Min. Amount (NGN)"
          placeholder="e.g. 5000"
        />
        <TextInput
          v-model="form.amount_max"
          type="number"
          label="Max. Amount (NGN)"
          placeholder="e.g. 5000"
        />
      </div>

      <SelectInput
        v-model="form.recipient"
        label="Recipient"
        :options="recipients?.map((x) => ({ label: x.name, value: x.id }))"
      />

      <SelectInput
        v-model="form.category"
        label="Expense Type"
        :options="allSubCategories?.results?.map((x) => ({ label: x.name, value: x.id }))"
      />

      <RadioGroup v-model="form.channel" label="Payment Channel" :options="paymentChannels" />

      <RadioGroup
        v-model="form.has_receipt"
        label="Receipt"
        :options="[
          { label: 'Has Receipt', value: true },
          { label: 'No Receipt', value: false },
        ]"
      />

      <div class="flex gap-1">
        <AppButton variant="tonal" label="Reset" @click="onReset" />
        <AppButton type="submit" label="Filter Expense" :loading="loading" class="w-full" />
      </div>
    </form>
  </Modal>
</template>
