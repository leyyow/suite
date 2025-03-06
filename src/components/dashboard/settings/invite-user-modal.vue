<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import SelectInput from "~/components/common/select-input.vue";
import TextInput from "~/components/common/text-input.vue";

defineProps({ modelValue: Boolean, loading: Boolean, id: String });
const emit = defineEmits(["update:modelValue", "submit"]);

const form = ref({
  email: "",
  role: { label: "", value: "" },
});

const onSubmit = () => {
  emit("submit", form.value);
};
</script>

<template>
  <Modal
    :open="modelValue"
    title="Invite User"
    size="md"
    centered
    @update:open="emit('update:modelValue', $event)"
  >
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <SelectInput
        v-model="form.role"
        label="Choose Role"
        :options="['Admin', 'Manager', 'Staff'].map((v) => ({ label: v, value: v }))"
        required
      />

      <TextInput v-model="form.email" type="email" label="Email" required />

      <AppButton type="submit" label="Invite Staff" :loading="loading" class="w-full" />
    </form>
  </Modal>
</template>
