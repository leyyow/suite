<script setup>
import { computed, ref, onMounted } from "vue";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import SelectInput from "~/components/common/select-input.vue";
import TextInput from "~/components/common/text-input.vue";
import { useApi } from "~/composables/useApi";

defineProps({ modelValue: Boolean, loading: Boolean });
const emit = defineEmits(["update:modelValue", "submit"]);

const paymentChannels = computed(() =>
  ["Cash", "Transfer", "Card"].map((v) => ({ label: v, value: v.toLowerCase() })),
);

const subCategories = ref([]);
const form = ref({
  amount_max: "",
  amount_min: "",
  recipient: "",
  category: { label: "", value: "" },
  channel: { label: "", value: "" },
});

const { request } = useApi();

const onSubmit = (e) => {
  e.preventDefault();
  emit("submit", form.value);
};

const onReset = () => {
  form.value = {
    amount_max: "",
    amount_min: "",
    recipient: "",
    category: { label: "", value: "" },
    channel: { label: "", value: "" },
  };
};

onMounted(async () => {
  try {
    const { data } = await request("get", "/expenses/subcategories/");
    subCategories.value = data.results || [];
  } catch (error) {
    console.error("Error fetching subcategories:", error);
  }
});
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

      <TextInput v-model="form.recipient" label="To (Recipient)" placeholder="e.g. Debola" />

      <SelectInput
        v-model="form.category"
        label="Expense Type"
        :options="subCategories.map((x) => ({ label: x.name, value: x.id }))"
      />

      <SelectInput
        v-model="form.channel"
        label="Payment Channel"
        placeholder="Select"
        :options="paymentChannels"
      />

      <div class="flex gap-1">
        <!-- pevent closing modal, add a clear button instead to the expensse -page  -->
        <AppButton variant="tonal" label="Reset" @click="onReset" />
        <AppButton type="submit" label="Filter Expense" :loading="loading" class="w-full" />
      </div>
    </form>
  </Modal>
</template>
