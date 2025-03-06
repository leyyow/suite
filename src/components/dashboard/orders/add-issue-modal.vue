<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import RadioGroup from "~/components/common/radio-group.vue";
import SelectInput from "~/components/common/select-input.vue";
import TextAreaInput from "~/components/common/text-area-input.vue";
import TextInput from "~/components/common/text-input.vue";

defineProps({ modelValue: Boolean, loading: Boolean, id: String });
const emit = defineEmits(["update:modelValue", "submit"]);

const form = ref({
  title: "",
  status: { label: "", value: "" },
  severity: "medium",
  note: "",
});

const onSubmit = () => {
  emit("submit", form.value);
};
</script>

<template>
  <Modal
    :open="modelValue"
    title="Add Issue"
    size="md"
    centered
    @update:open="emit('update:modelValue', $event)"
  >
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <TextInput v-model="form.title" label="Issue title" required />

      <SelectInput
        v-model="form.status"
        label="Status"
        :options="
          ['Merchant action required', 'Customer action required'].map((v) => ({
            label: v,
            value: v,
          }))
        "
        required
      />

      <RadioGroup
        v-model="form.severity"
        label="Severity"
        :options="['Low', 'Medium', 'High'].map((v) => ({ label: v, value: v.toLowerCase() }))"
      />

      <TextAreaInput label="Enter issue/note" rows="3" />

      <AppButton type="submit" label="Save" :loading="loading" class="w-full" />
    </form>
  </Modal>
</template>
