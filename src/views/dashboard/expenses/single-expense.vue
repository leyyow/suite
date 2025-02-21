<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import Chip from "~/components/common/chip.vue";
import AddExpenseModal from "~/components/dashboard/expenses/add-expense-modal.vue";
import AddReceiptModal from "~/components/dashboard/expenses/add-receipt-modal.vue";
import DeleteExpenseModal from "~/components/dashboard/expenses/delete-expense-modal.vue";
import { useApi } from "~/composables/useApi";

const { request, loading } = useApi();
const route = useRoute();
const router = useRouter();

const expense = ref();
const showEditModal = ref(false);
const showReceiptModal = ref(false);
const showDeleteModal = ref(false);

const fetchExpense = () => {
  request("get", `/expenses/${route.params.id}`).then(({ data }) => {
    expense.value = data;
  });
};

onMounted(() => {
  fetchExpense();
});

const editExpense = async (payload) => {
  try {
    await request("put", `/expenses/${expense.value?.id}/`, payload);
    toast.success("Expenses UPDATED successfully");
    showEditModal.value = false;
    fetchExpense();
  } catch (err) {
    console.log("Error adding expense:", err);
  }
};

const handleDelete = async () => {
  try {
    await request("delete", `/expenses/${expense.value?.id}/`);
    toast.success("Expenses DELETED successfully");
    showDeleteModal.value = false;
    router.push("/dashboard/expenses");
  } catch (err) {
    console.log("Error deleting expense:", err);
  }
};

const onClickReceipt = () => {
  if (!expense.value?.receipt) showReceiptModal.value = true;
};
</script>

<template>
  <div>
    <button
      type="button"
      class="inline-flex gap-1 font-medium text-brand-500 items-center text-sm mb-4 underline"
      @click="router.push('/dashboard/expenses')"
    >
      <Icon icon="mdi:chevron-left" class="h-5 w-5" />
      Back
    </button>
    <div class="flex items-center gap-2 border-b border-brand-200 pb-2">
      <img v-if="expense?.receipt" src="" class="h-14 w-14 rounded-lg" />
      <Icon v-else icon="fluent-emoji-high-contrast:receipt" class="h-10 w-10 text-brand-300" />
      <h2 class="flex-1 text-base font-medium">{{ expense?.name }}</h2>
      <Chip
        :label="expense?.receipt ? 'View receipt' : 'Add receipt'"
        variant="success"
        @click="onClickReceipt"
      />
    </div>

    <div class="flex justify-end gap-2 mt-3">
      <AppButton small variant="outlined" @click="showEditModal = true">
        <Icon icon="mage:edit-pen-fill" />
        Edit
      </AppButton>
      <AppButton
        small
        variant="outlined"
        class="text-error focus:ring-error/20"
        @click="showDeleteModal = true"
      >
        <Icon icon="fluent:delete-12-regular" />
        Delete
      </AppButton>
    </div>

    <div class="space-y-5 mt-4 text-sm">
      <div class="flex justify-between gap-1">
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon icon="mdi:clipboard-account" class="h-5 w-5 text-brand-300" />
          <p>To (Recipient)</p>
        </div>
        <span class="text-right">{{ expense?.recipient }}</span>
      </div>
      <!--  -->
      <div class="flex justify-between gap-1">
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon icon="mdi:cash-multiple" class="h-5 w-5 text-brand-300" />
          <p>Amount</p>
        </div>
        <span class="text-right">NGN {{ Number(expense?.amount).toLocaleString() }}</span>
      </div>
      <!--  -->
      <div class="flex justify-between gap-1">
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon icon="mingcute:card-pay-fill" class="h-5 w-5 text-brand-300" />
          <p>Payment Channel</p>
        </div>
        <span
          class="text-brand-300 text-sm border border-brand-200 px-4 py-1.5 rounded-full capitalize"
        >
          {{ expense?.channel }}
        </span>
      </div>
      <!--  -->
      <div class="flex justify-between gap-1">
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon icon="duo-icons:dashboard" class="h-5 w-5 text-brand-300" />
          <p>Category</p>
        </div>
        <span class="text-brand-300 text-sm border border-brand-200 px-4 py-1.5 rounded-full">
          {{ expense?.category_name }}
        </span>
      </div>
      <!--  -->
      <div class="flex justify-between gap-1">
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon icon="mage:calendar-2-fill" class="h-5 w-5 text-brand-300" />
          <p>Date</p>
        </div>
        <span class="text-right">{{ new Date(expense?.date).toDateString() }}</span>
      </div>
      <!--  -->
      <div class="flex flex-col gap-1">
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon icon="tabler:file-description-filled" class="h-5 w-5 text-brand-300" />
          <p>Purpose / Description</p>
        </div>
        <div class="ml-6">
          {{
            expense?.description
              ? expense?.description.charAt(0).toUpperCase() + expense?.description.slice(1)
              : "N/A"
          }}
        </div>
      </div>
    </div>

    <!--  -->
    <DeleteExpenseModal v-model="showDeleteModal" :loading="loading" @delete="handleDelete" />

    <AddExpenseModal
      v-model="showEditModal"
      :loading="loading"
      :item="expense"
      :edit="true"
      @submit="editExpense"
    />

    <AddReceiptModal v-model="showReceiptModal" :loading="loading" @submit="console.log" />
  </div>
</template>
