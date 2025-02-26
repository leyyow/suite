<script setup>
import { capitalize, toRefs } from "vue";
import { computed, onMounted, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import FileUploadInput from "~/components/common/file-upload-input.vue";
import Modal from "~/components/common/modal.vue";
import SelectInput from "~/components/common/select-input.vue";
import TextArea from "~/components/common/text-area.vue";
import TextInput from "~/components/common/text-input.vue";
import { useCreateRecipient, useGetExpenseRecipients } from "~/composables/api/expense";
import { useApi } from "~/composables/useApi";

const props = defineProps({
  modelValue: Boolean,
  loading: Boolean,
  edit: Boolean,
  item: { type: Object, default: () => ({}) },
});

const { edit, item } = toRefs(props);
const emit = defineEmits(["update:modelValue", "submit"]);
const { request } = useApi();

const form = ref({
  category: { label: "", value: "" },
  parentCategory: { label: "", value: "" },
  name: "",
  amount: "",
  recipient: { label: "", value: "" },
  date: new Date().toISOString().split("T")[0],
  channel: { label: "", value: "" },
  description: "",
});
const newRecipient = ref("");
const showAddRpt = ref(false);

const closeNewRpt = () => {
  newRecipient.value = "";
  showAddRpt.value = false;
};

const categories = ref([]);
const subCategories = ref([]);

const paymentChannels = computed(() =>
  ["Cash", "Transfer", "Card"].map((v) => ({ label: v, value: v.toLowerCase() })),
);

const filteredSubCategories = computed(() =>
  subCategories.value
    .filter((x) => x.category === form.value.parentCategory?.value)
    .map((x) => ({ label: x.name, value: x.id })),
);

const editSub = ref();
// populate info editing
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      if (val && item.value.id && props.edit) {
        const sub = subCategories.value.find((x) => x.id === item.value?.category);
        editSub.value = sub;
        if (sub) {
          form.value = {
            parentCategory: { label: sub.category_name, value: sub.category },
            category: { label: sub.name, value: sub.id },
            name: item.value.name,
            amount: item.value.amount,
            recipient: { label: item.value.recipient_name, value: item.value.recipient },
            date: item.value.date.slice(0, 10),
            channel: { label: capitalize(item.value.channel), value: item.value.channel },
            description: item.value.description || "",
          };
        }
      }
    } else {
      form.value = {
        category: { label: "", value: "" },
        parentCategory: { label: "", value: "" },
        name: "",
        amount: "",
        recipient: { label: "", value: "" },
        date: new Date().toISOString().split("T")[0],
        channel: { label: "", value: "" },
        description: "",
      };
    }
  },
);

// reset subcategory when selected parent category changes
watch(
  () => form.value.parentCategory,
  (v) => {
    const editPrepopulated =
      props.edit &&
      editSub.value?.category === v.value &&
      form.value.category.value == item.value?.category;
    if (!editPrepopulated) {
      form.value.category = { label: "", value: "" };
    }
  },
);

const onSubmit = (e) => {
  e.preventDefault();

  let payload = {
    ...form.value,
    category: form.value.category?.value,
    channel: form.value.channel?.value,
    recipient: form.value.recipient?.value,
  };
  delete payload.parentCategory;

  if (props.edit) {
    payload = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => {
        if (key === "date") return value !== item.value[key].slice(0, 10);
        else return value !== item.value[key];
      }),
    );
  }
  if (Object.keys(payload).length) {
    emit("submit", payload);
  } else {
    toast("Nothing changed");
    emit("update:modelValue", false);
  }
};

const { data: recipients, refetch } = useGetExpenseRecipients();
const { mutate: createRecipient, loading: loadingRpt } = useCreateRecipient();
const onAddRecipient = () => {
  if (!newRecipient.value) return toast.error("Recipient Name is required");
  createRecipient({ name: newRecipient.value }).then(() => {
    toast.success("Recipient Added");
    refetch();
    closeNewRpt();
  });
};
const allRecipients = computed(() => {
  return recipients.value?.map((x) => ({ label: x.name, value: x.id })) || [];
});
watch(allRecipients, (v) => console.log("REC", v));

onMounted(async () => {
  try {
    const [catResponse, subResponse] = await Promise.all([
      request("get", "/expenses/categories/"),
      request("get", "/expenses/subcategories/"),
    ]);

    categories.value = catResponse.data.results || [];
    subCategories.value = subResponse.data.results || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});
</script>

<template>
  <Modal
    :open="modelValue"
    :title="edit ? 'Edit Expense ' : 'Add Expense'"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <form class="flex flex-col gap-4" @submit="onSubmit">
      <TextInput v-model="form.name" label="Expense Name" placeholder="e.g. Food" required />

      <TextInput
        v-model="form.amount"
        type="number"
        label="Amount (NGN)"
        placeholder="e.g. 5000"
        required
      />

      <div>
        <SelectInput
          v-model="form.recipient"
          label="To (Recipient)"
          placeholder="Select ..."
          required
          :options="allRecipients"
        />
        <button
          v-if="!showAddRpt"
          type="button"
          class="text-brand-500 font-medium underline text-sm mt-2"
          @click="showAddRpt = true"
        >
          Add New
        </button>
        <div v-else class="bg-white py-2 px-3 rounded-lg mt-1">
          <h5 class="text-sm mb-2">New Recipient</h5>
          <TextInput v-model="newRecipient" dense label="Name" placeholder="e.g. Debola" required />
          <div class="flex justify-end gap-2 mt-1">
            <AppButton variant="outlined" small label="Cancel" @click="closeNewRpt" />
            <AppButton label="Add Recipient" small :loading="loadingRpt" @click="onAddRecipient" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <TextInput v-model="form.date" type="date" label="Date" required />

        <SelectInput
          v-model="form.channel"
          label="Payment Channel"
          placeholder="Select"
          required
          :options="paymentChannels"
        />
      </div>

      <SelectInput
        v-model="form.parentCategory"
        label="Category"
        required
        :options="categories.map((x) => ({ label: x.name, value: x.id }))"
      />

      <SelectInput
        v-model="form.category"
        label="Subcategory"
        required
        :options="filteredSubCategories"
      />

      <FileUploadInput v-model="form.receipt" label="Receipt" />

      <TextArea v-model="form.description" label="Purpose / Description" placeholder="e.g. bread" />

      <AppButton
        type="submit"
        :label="edit ? 'Save Changes' : 'Add Expense'"
        :loading="loading"
        class="w-full"
      />
    </form>
  </Modal>
</template>
