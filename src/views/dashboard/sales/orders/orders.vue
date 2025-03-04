<script setup>
import { computed, ref } from "vue";
import SearchBar from "~/components/common/search-bar.vue";
import EmptyData from "~/components/dashboard/empty-data.vue";
import OrderAnalyticsModal from "~/components/dashboard/orders/order-analytics-modal.vue";
import OrderCard from "~/components/dashboard/orders/order-card.vue";
import SummaryCard from "~/components/dashboard/orders/summary-card.vue";
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
  { label: "No. of customers", value: 4, icon: "User", iconColor: "text-[#c212d1]" },
  { label: "Fulfilled orders", value: 100, icon: "TruckTick", iconColor: "text-brand-500" },
]);

const showAnalytics = ref(false);
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
          <OrderCard v-for="v in 12" :key="v" />
        </div>
      </section>
    </div>

    <OrderAnalyticsModal v-model="showAnalytics" :items="summaryStats" />
  </div>
</template>
