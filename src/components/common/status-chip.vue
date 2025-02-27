<script setup>
import { computed } from "vue";

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const badgeClass = computed(() => {
  switch (props.value.toLowerCase()) {
    case "delivered":
    case "completed":
    case "active":
      return "bg-green-50 text-green-600";
    case "pending":
      return "bg-yellow-50 text-yellow-600";
    case "failed":
      return "bg-red-50 text-red-600";
    case "in progress":
      return "bg-blue-50 text-blue-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
});

const dotClass = computed(() => {
  switch (props.value.toLowerCase()) {
    case "delivered":
    case "completed":
    case "active":
      return "bg-green-600";
    case "pending":
      return "bg-yellow-600";
    case "failed":
      return "bg-red-600";
    case "in progress":
      return "bg-blue-600";
    default:
      return "bg-gray-600";
  }
});
</script>

<template>
  <span
    :class="badgeClass"
    class="rounded-lg px-1.5 py-0.5 text-xs inline-flex items-center gap-1 font-medium capitalize"
  >
    <span :class="dotClass" class="h-1.5 w-1.5 rounded-full" />
    {{ value }}
  </span>
</template>
