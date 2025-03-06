<script setup>
import { computed, ref } from "vue";
import SearchBar from "~/components/common/search-bar.vue";
import EmptyData from "~/components/dashboard/empty-data.vue";
import AddIssueModal from "~/components/dashboard/orders/add-issue-modal.vue";
import DeleteOrderModal from "~/components/dashboard/orders/delete-order-modal.vue";
import EditOrderDateModal from "~/components/dashboard/orders/edit-order-date-modal.vue";
import MarkCompleteModal from "~/components/dashboard/orders/mark-complete-modal.vue";
import OrderAnalyticsModal from "~/components/dashboard/orders/order-analytics-modal.vue";
import OrderCard from "~/components/dashboard/orders/order-card.vue";
import OrderIssuesModal from "~/components/dashboard/orders/order-issues-modal.vue";
import PaymentHistoryModal from "~/components/dashboard/orders/payment-history-modal.vue";
import ReturnItemsModal from "~/components/dashboard/orders/return-items-modal.vue";
import ShareOrderInvoiceModal from "~/components/dashboard/orders/share-order-invoice-modal.vue";
import SummaryCard from "~/components/dashboard/orders/summary-card.vue";
import UpdatePaymentModal from "~/components/dashboard/orders/update-payment-modal.vue";
import ViewIssueModal from "~/components/dashboard/orders/view-issue-modal.vue";
import { formatNaira } from "~/utilities/formatNaira";

const empty = ref(false);

const summaryStats = computed(() => [
  { label: "Total orders", value: "1,000", icon: "BagHappy", iconColor: "text-[#f98636]" },
  {
    label: "Total volume",
    value: formatNaira(240000),
    icon: "ChartSquare",
    iconColor: "text-[#2277f7]",
  },
  { label: "Customers", value: 4, icon: "User", iconColor: "text-[#c212d1]" },
  { label: "Fulfilled orders", value: 100, icon: "TruckTick", iconColor: "text-brand-500" },
]);

const showAnalytics = ref(false);
const searchValue = ref("");

// const selectedOrder = ref(null);

const showDelete = ref(false);
const showEditDate = ref(false);
const showPayment = ref(false);
const showUpdatePayment = ref(false);
const showShare = ref(false);
const showComplete = ref(false);
const showReturn = ref(false);
const showIssue = ref(false);
const showAddIssue = ref(false);
const showSingleIssue = ref(false);
</script>

<template>
  <div>
    <EmptyData
      v-if="empty"
      variant="order"
      title="No Orders"
      subtitle="You have no pending order"
      action-label="Record Order"
    />

    <div v-else>
      <div class="flex justify-end mb-4">
        <button
          type="button"
          class="underline text-brand-500 font-medium text-sm"
          @click="showAnalytics = true"
        >
          Show more
        </button>
      </div>

      <SummaryCard :items="summaryStats" />

      <section class="mt-6">
        <h3 class="text-base font-semibold mb-2">All orders ({{ 4 }})</h3>
        <SearchBar v-model="searchValue" placeholder="Search by name..." />
        <!-- tabs -->

        <!--  -->

        <div class="space-y-4 mt-4">
          <OrderCard
            v-for="v in 12"
            :key="v"
            @delete="showDelete = true"
            @edit:date="showEditDate = true"
            @edit:payment="showPayment = true"
            @share="showShare = true"
            @complete="showComplete = true"
            @return="showReturn = true"
            @issue="showIssue = true"
          />
        </div>
      </section>
    </div>

    <!--  -->
    <OrderAnalyticsModal v-model="showAnalytics" :items="summaryStats" />

    <DeleteOrderModal v-model="showDelete" />

    <EditOrderDateModal v-model="showEditDate" />

    <PaymentHistoryModal
      v-model="showPayment"
      @add="
        showUpdatePayment = true;
        showPayment = false;
      "
    />

    <UpdatePaymentModal v-model="showUpdatePayment" />

    <ShareOrderInvoiceModal v-model="showShare" />

    <MarkCompleteModal v-model="showComplete" />

    <ReturnItemsModal v-model="showReturn" />

    <OrderIssuesModal
      v-model="showIssue"
      @add="
        showIssue = false;
        showAddIssue = true;
      "
      @view="
        showIssue = false;
        showSingleIssue = true;
      "
    />

    <AddIssueModal v-model="showAddIssue" />

    <ViewIssueModal v-model="showSingleIssue" />
  </div>
</template>
