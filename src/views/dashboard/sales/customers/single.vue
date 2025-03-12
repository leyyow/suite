<script setup>
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { Line } from "vue-chartjs";
import { toast } from "vue3-toastify";
import { useSalesStore } from "~/stores/sales";
import { useUpdateCustomer } from "~/composables/api/sales/customers";
import AppButton from "~/components/common/app-button.vue";
import AddCustomerModal from "~/components/dashboard/customers/add-customer-modal.vue";
import SummaryCard from "~/components/dashboard/sales/summary-card.vue";
import { formatNaira } from "~/utilities/formatNaira";

// Chart.js registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Store & router
const route = useRoute();
const salesStore = useSalesStore();

// Fetch selected customer from store using route ID
const selectedCustomer = computed(
  () => salesStore.customers.find((c) => c.id == route.params.id) || {},
);

// Editable state
const showEdit = ref(false);

// Update customer logic
const { mutate: updateCustomer, loading: isUpdating } = useUpdateCustomer();

const handleUpdateCustomer = (payload) => {
  updateCustomer({ id: selectedCustomer.value.id, payload })
    .then((res) => {
      salesStore.updateCustomer(res);
      showEdit.value = false;
      toast.success("Customer updated successfully");
    })
    .catch(() => {
      toast.error("Failed to update customer");
    });
};

// Chart data
const chartData = computed(() => ({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Orders",
      data: [40, 39, 10, 40, 39, 80, 40],
      tension: 0.4,
      backgroundColor: "#008060",
      borderColor: "#00806066",
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: true } },
};

// Summary statistics
const summaryStats = computed(() => [
  {
    label: "Net Sales",
    value: selectedCustomer.value.lifetime_orders || 0,
    icon: "solar:tag-bold-duotone",
    color: "text-brand-500",
  },
  {
    label: "Purchase Vol.",
    value: formatNaira(selectedCustomer.value.net_spend || 0),
    icon: "uim:graph-bar",
    color: "text-blue-600",
  },
  { label: "Returns", value: "0%", icon: "jam:refresh-reverse", color: "text-indigo-500" },
  {
    label: "Buying Pattern",
    value: "0%",
    icon: "solar:bag-heart-bold-duotone",
    color: "text-purple-500",
  },
]);

// Customer details
const customerDetails = computed(() =>
  [
    {
      icon: "solar:phone-bold-duotone",
      label: "Phone number",
      value: selectedCustomer.value.phone || "N/A",
    },
    { icon: "ic:twotone-mail", label: "Email", value: selectedCustomer.value.email || "N/A" },
    {
      icon: "duo-icons:location",
      label: "Address 1",
      value: selectedCustomer.value.line1 || "N/A",
    },
    selectedCustomer.value.line2
      ? { icon: "duo-icons:location", label: "Address 2", value: selectedCustomer.value.line2 }
      : null,
    {
      icon: "solar:city-bold-duotone",
      label: "City / State",
      value: `${selectedCustomer.value.city || "N/A"} / ${selectedCustomer.value.state || "N/A"}`,
    },
    {
      icon: "solar:calendar-bold-duotone",
      label: "Date of Birth",
      value: selectedCustomer.value.birthday
        ? new Date(selectedCustomer.value.birthday).toLocaleDateString("en-US", {
            dateStyle: "medium",
          })
        : "N/A",
    },
    {
      icon: "icon-park-twotone:instagram",
      label: "Instagram",
      value: selectedCustomer.value.instagram || "N/A",
    },
    {
      icon: "uim:box",
      label: "Total Orders",
      value: `${selectedCustomer.value.lifetime_orders || 0} Orders`,
    },
  ].filter(Boolean),
);
</script>

<template>
  <div>
    <!-- Edit Button -->
    <div class="flex justify-end mb-1">
      <AppButton small @click="showEdit = true">
        <Icon icon="mdi:pencil" class="h-5 w-5" />
        Edit
      </AppButton>
    </div>

    <!-- Customer Info -->
    <div class="flex flex-col items-center justify-center gap-1 mb-6">
      <span class="h-20 w-20 rounded-lg bg-brand-200 flex items-center justify-center">
        <Icon icon="duo-icons:user" class="text-brand-500 h-14 w-14" />
      </span>
      <h3 class="text-lg font-semibold text-center">
        {{ selectedCustomer?.first_name }} {{ selectedCustomer?.last_name || "Unknown" }}
      </h3>
    </div>

    <!-- Summary Card -->
    <SummaryCard :items="summaryStats" />

    <!-- Customer Details -->
    <div class="mt-4 mb-6 text-sm">
      <div
        v-for="(item, v) in customerDetails"
        :key="v"
        class="flex justify-between gap-1 py-2.5 items-start"
        :class="v === customerDetails.length - 1 ? 'border-y border-brand-200' : ''"
      >
        <div class="inline-flex gap-2 items-center text-brand-400 min-w-32">
          <Icon :icon="item.icon" class="h-5 w-5 text-brand-300" />
          <p>{{ item.label }}</p>
        </div>
        <span
          class="text-right font-medium"
          :class="{ 'text-brand-500 underline': item.label === 'Total Orders' }"
        >
          {{ item.value }}
        </span>
      </div>
    </div>

    <!-- Purchase Timeline Chart -->
    <div class="bg-brand-50 border border-brand-200 mt-4 rounded-lg py-2 px-2">
      <h3 class="text-sm mb-1 font-medium">Purchase timeline</h3>
      <p class="mb-2 text-sm text-brand-400">
        Net Spend: <b>{{ formatNaira(selectedCustomer.net_spend || 0) }}</b>
      </p>
      <div class="h-72">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Edit Customer Modal -->
    <AddCustomerModal
      v-model="showEdit"
      :edit="true"
      :item="selectedCustomer"
      :loading="isUpdating"
      @submit="handleUpdateCustomer"
    />
  </div>
</template>
