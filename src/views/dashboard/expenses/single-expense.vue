<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import Chip from "~/components/common/chip.vue";
import Modal from "~/components/common/modal.vue";
import AddExpenseModal from "~/components/dashboard/expenses/add-expense-modal.vue";
import AddReceiptModal from "~/components/dashboard/expenses/add-receipt-modal.vue";
import DeleteExpenseModal from "~/components/dashboard/expenses/delete-expense-modal.vue";
import { useDeleteExpense, useGetSingleExpense, useUpdateExpense } from "~/composables/api/expense";
import { formatNaira } from "~/utilities/formatNaira";

const route = useRoute();
const router = useRouter();

const showEditModal = ref(false);
const showReceiptModal = ref(false);
const showDeleteModal = ref(false);
const openReceipt = ref(false);

const { data: expense, loading, refetch } = useGetSingleExpense(route.params.id);

const { mutate: updateExpense, loading: loadingEdit } = useUpdateExpense();
const editExpense = (payload) => {
  updateExpense({ id: expense.value?.id, payload }).then(async () => {
    toast.success("Expenses UPDATED successfully");
    showEditModal.value = false;
    showReceiptModal.value = false;
    await refetch();
  });
};

const { mutate: deleteExpense, loading: loadingDelete } = useDeleteExpense();
const handleDelete = () => {
  deleteExpense(expense.value?.id).then(() => {
    toast.success("Expenses DELETED successfully");
    showDeleteModal.value = false;
    router.push("/dashboard/expenses");
  });
};

const onClickReceipt = () => {
  if (!expense.value?.receipt) showReceiptModal.value = true;
  else openReceipt.value = true;
};
</script>

<template>
  <div v-if="loading && !expense?.id" class="flex justify-center items-center py-16">
    <Icon icon="eos-icons:bubble-loading" class="h-20 w-20 text-brand-300" />
  </div>
  <div v-else>
    <button
      type="button"
      class="inline-flex gap-1 font-medium text-brand-500 items-center text-sm mb-4 underline"
      @click="router.push('/dashboard/expenses')"
    >
      <Icon icon="mdi:chevron-left" class="h-5 w-5" />
      Back
    </button>
    <div class="flex items-center gap-2 border-b border-brand-200 pb-2">
      <img v-if="expense?.receipt" :src="expense?.receipt" class="h-14 w-14 rounded-lg" />
      <Icon
        v-else
        icon="fluent-emoji-high-contrast:receipt"
        class="h-10 w-10 text-brand-300 rotate-180"
      />
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
        <span class="text-right">{{ expense?.recipient_name || "Unknown" }}</span>
      </div>
      <!--  -->
      <div class="flex justify-between gap-1">
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon icon="mdi:cash-multiple" class="h-5 w-5 text-brand-300" />
          <p>Amount</p>
        </div>
        <span class="text-right">{{ formatNaira(expense?.amount) }}</span>
      </div>
      <!--  -->
      <div class="flex justify-between gap-1">
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon icon="mingcute:card-pay-fill" class="h-5 w-5 text-brand-300" />
          <p>Payment Channel</p>
        </div>
        <Chip :label="expense?.channel" />
      </div>
      <!--  -->
      <div class="flex justify-between gap-1">
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon icon="duo-icons:dashboard" class="h-5 w-5 text-brand-300" />
          <p>Category</p>
        </div>
        <Chip :label="expense?.category_name" />
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
    <DeleteExpenseModal v-model="showDeleteModal" :loading="loadingDelete" @delete="handleDelete" />

    <AddExpenseModal
      v-model="showEditModal"
      :loading="loadingEdit"
      :item="expense"
      :edit="true"
      @submit="editExpense"
    />

    <AddReceiptModal v-model="showReceiptModal" :loading="loadingEdit" @submit="editExpense" />

    <Modal :open="openReceipt" title="View Receipt" size="md" @update:open="openReceipt = false">
      <img :src="expense?.receipt" class="w-full h-auto" />
    </Modal>
  </div>
</template>
