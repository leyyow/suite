<script setup>
import { Icon } from "@iconify/vue";
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
import { computed, ref } from "vue";
import { Line } from "vue-chartjs";
import { useRoute } from "vue-router";
import AppButton from "~/components/common/app-button.vue";
import AddCustomerModal from "~/components/dashboard/customers/add-customer-modal.vue";
import SummaryCard from "~/components/dashboard/sales/summary-card.vue";
import { formatNaira } from "~/utilities/formatNaira";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const route = useRoute();

const chartData = {
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
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
  },
};

const summaryStats = computed(() => [
  { label: "Net sales", value: "7", icon: "BagHappy", iconColor: "text-[#f98636]" },
  {
    label: "Purchase vol.",
    value: formatNaira(310000),
    icon: "ChartSquare",
    iconColor: "text-[#2277f7]",
  },
  { label: "Returns", value: "0%", icon: "User", iconColor: "text-[#c212d1]" },
  { label: "Buying pattern", value: "50%", icon: "TruckTick", iconColor: "text-brand-500" },
]);

const customerDetails = computed(() => [
  { icon: "mdi:phone", label: "Phone number", value: "08012345678" },
  { icon: "mdi:envelope", label: "Email", value: "shop@leyyow.com" },
  { icon: "uim:box", label: "Address", value: "12, Ikorodu Road, Lagos" },
  {
    icon: "uim:box",
    label: "Date of Birth",
    value: new Date().toLocaleString("en-US", { dateStyle: "medium" }),
  },
  { icon: "uim:box", label: "Gender", value: "Male" },
  { icon: "uim:box", label: "Style", value: "Casual, classy, preppy" },
  { icon: "uim:box", label: "Total Orders", value: "3 Orders" },
]);

const showEdit = ref(false);
</script>

<template>
  <div>
    <div class="flex justify-end mb-1">
      <AppButton small @click="showEdit = true">
        <Icon icon="mdi:pencil" class="h-5 w-5" />
        Edit
      </AppButton>
    </div>

    <div class="flex flex-col items-center justify-center gap-1 mb-6">
      <span class="h-20 w-20 rounded-lg bg-brand-200 flex items-center justify-center">
        <Icon icon="mdi:account" class="text-brand-500 h-16 w-16" />
      </span>
      <h3 class="text-lg font-semibold text-center">Adebola Johnson</h3>
    </div>

    <SummaryCard :items="summaryStats" />

    <div class="mt-4 mb-6 text-sm">
      <div
        v-for="(item, v) in customerDetails"
        :key="v"
        class="flex justify-between gap-1 py-2.5"
        :class="v === customerDetails.length - 1 ? 'border-y border-brand-200' : ''"
      >
        <div class="inline-flex gap-2 items-center text-brand-400">
          <Icon :icon="item.icon" class="h-5 w-5 text-brand-300" />
          <p>{{ item.label }}</p>
        </div>
        <span
          class="text-right font-medium"
          :class="{ 'text-brand-500 underline': item.label === 'Total Orders' }"
          >{{ item.value }}</span
        >
      </div>
    </div>

    <div class="bg-brand-50 border border-brand-200 mt-4 rounded-lg py-2 px-2">
      <h3 class="text-sm mb-2">Purchase timeline</h3>
      <div class="h-72">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!--  -->
    <AddCustomerModal
      v-model="showEdit"
      :edit="true"
      :item="{
        id: route.params.id,
        name: 'Adebola Johnson',
        gender: 'Male',
        phone: '08012345678',
        email: 'seyimankinde@mailsac.com',
        birthday: '1998-12-12',
        address: 'No 12, Ikorodu Road, Lagos',
        image: '',
      }"
    />
  </div>
</template>
