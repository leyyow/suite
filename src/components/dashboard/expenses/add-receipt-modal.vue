<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import FileUploadInput from "~/components/common/file-upload-input.vue";
import Modal from "~/components/common/modal.vue";

defineProps({ modelValue: Boolean, loading: Boolean });
const emit = defineEmits(["update:modelValue", "submit"]);

const receipt = ref(null);

const onSubmit = (e) => {
  e.preventDefault();
  console.log("FORM", receipt.value);
  //   emit("submit", payload);
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
