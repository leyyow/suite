<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import TextInput from "~/components/common/text-input.vue";

defineProps({ modelValue: Boolean, loading: Boolean, id: String });
const emit = defineEmits(["update:modelValue", "submit"]);

const date = ref(new Date().toISOString().split("T")[0]);

const onSubmit = () => {
  emit("submit", date.value);
};
</script>

<template>
  <Modal
    :open="modelValue"
    title="Edit Order Date"
    size="md"
    centered
    @update:open="emit('update:modelValue', $event)"
  >
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <TextInput v-model="date" label="Date" type="date" required />

      <AppButton type="submit" label="Send for Approval" :loading="loading" class="w-full" />
    </form>
  </Modal>
</template>
