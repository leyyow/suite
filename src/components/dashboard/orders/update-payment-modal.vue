<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import RadioGroup from "~/components/common/radio-group.vue";
import TextInput from "~/components/common/text-input.vue";

defineProps({ modelValue: Boolean, loading: Boolean, id: String });
const emit = defineEmits(["update:modelValue", "submit"]);

const form = ref({ amount: "", mode: "transfer", date: new Date().toISOString().split("T")[0] });

const onSubmit = () => {
  emit("submit", form.value);
};
</script>

<template>
  <Modal
    :open="modelValue"
    title="Add/Update Payment"
    size="md"
    centered
    @update:open="emit('update:modelValue', $event)"
  >
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <TextInput v-model="form.amount" label="Amount paid" type="number" required />

      <RadioGroup
        v-model="form.mode"
        label="Payment mode"
        :options="['Transfer', 'Cash', 'Card'].map((v) => ({ label: v, value: v.toLowerCase() }))"
      />

      <TextInput v-model="form.date" label="Date" type="date" required />

      <AppButton type="submit" label="Save" :loading="loading" class="w-full" />
    </form>
  </Modal>
</template>
