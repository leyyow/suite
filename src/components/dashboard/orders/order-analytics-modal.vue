<script setup>
import Modal from "~/components/common/modal.vue";
import SummaryCard from "./summary-card.vue";
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
import { Line } from "vue-chartjs";

defineProps({ modelValue: Boolean, loading: Boolean, items: Array });
const emit = defineEmits(["update:modelValue"]);

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </Modal>
</template>
