<script setup>
import { computed, ref, watch } from "vue";
import AppButton from "~/components/common/app-button.vue";
import SelectInput from "~/components/common/select-input.vue";
import Modal from "~/components/common/modal.vue";

defineProps({ modelValue: Boolean, loading: Boolean });
const emit = defineEmits(["update:modelValue", "submit"]);

const sortByKeys = [
  { label: "Date", value: "date" },
  { label: "Amount", value: "amount" },
];

const sortDirections = computed(() => {
  if (!form.value.key.value) return [];
  if (form.value.key.value === "amount")
    return [
      { label: "Low to High", value: "low_high" },
      { label: "High to Low", value: "high_low" },
    ];
  else
    return [
      { label: "Latest to earliest (default)", value: "latest_earliest" },
      { label: "Earliest to latest", value: "earliest_latest" },
    ];
});

const form = ref({
  key: { label: "", value: "" },
  direction: { label: "", value: "" },
});
const errorMessage = ref("");

watch(
  () => form.value.key,
  () => (form.value.direction = { label: "", value: "" }),
);

watch(form.value, () => (errorMessage.value = ""));

const onSubmit = (e) => {
  e.preventDefault();
  if (form.value.key.value && form.value.direction.value) {
    emit("submit", form.value);
  } else {
    errorMessage.value = `Please select ${!form.value.key.value ? "sort by" : "sort direction"}`;
  }
};
</script>

<template>
  <Modal
    :open="modelValue"
    title="Sort Expense"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <form class="flex flex-col gap-4" @submit="onSubmit">
      <SelectInput
        v-model="form.key"
        label="Sort By"
        placeholder="Select"
        :options="sortByKeys"
        required
      />

      <SelectInput
        v-model="form.direction"
        label="Sort Direction"
        placeholder="Select"
        :options="sortDirections"
        required
      />

      <div v-if="errorMessage" class="bg-error/20 text-sm rounded p-2 text-error">
        {{ errorMessage }}
      </div>

      <AppButton type="submit" label="Sort Expense" :loading="loading" class="w-full" />
    </form>
  </Modal>
</template>
