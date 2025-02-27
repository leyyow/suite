<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import FileUploadInput from "~/components/common/file-upload-input.vue";
import Modal from "~/components/common/modal.vue";

defineProps({ modelValue: Boolean, loading: Boolean, id: String });
const emit = defineEmits(["update:modelValue", "submit"]);

const receipt = ref(null);

const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("receipt", receipt.value, receipt.value?.name);
  emit("submit", formData);
};
</script>

<template>
  <Modal
    :open="modelValue"
    title="Add Receipt"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <form class="flex flex-col gap-4" @submit="onSubmit">
      <FileUploadInput v-model="receipt" label="Receipt" />

      <AppButton type="submit" label="Add Receipt" :loading="loading" class="w-full" />
    </form>
  </Modal>
</template>
