<script setup>
import Modal from "~/components/common/modal.vue";
import SummaryCard from "./summary-card.vue";
import { ref, computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

defineProps({ modelValue: Boolean, loading: Boolean, items: Array });
const emit = defineEmits(["update:modelValue"]);

// Register required Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Get current year and create an array from 2024 to the current year
const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);

// Dummy earnings data for different years
const earningsData = {
  2024: [1000, 1500, 2000, 1800, 2200, 2500, 2800, 3000, 3200, 3500, 4000, 4500],
  2025: [1200, 1800, 2200, 1500, 2000, 2500, 3000, 2800, 3100, 4000, 4500, 5000],
};

// Labels for the months
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Computed property to dynamically update chart data based on selected year
const chartData = computed(() => ({
  labels,
  datasets: [
    {
      label: `Earnings (${selectedYear.value})`,
      data: earningsData[selectedYear.value] || [],
      backgroundColor: "#1e7a6b",
      borderColor: "#1e7a6b",
      borderWidth: 1,
    },
  ],
}));

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
  },
});
</script>

<template>
  <Modal
    :open="modelValue"
    title="Order Analytics"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <SummaryCard :items="items" />

    <div class="bg-brand-50 border border-brand-200 mt-4 rounded-lg py-2 px-2">
      <h3 class="text-sm mb-2">Order timeline</h3>
      <div class="h-72">
        <Bar id="earnings-chart" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </Modal>
</template>
