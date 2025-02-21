<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  label: { type: String },
  class: { type: String || Array, default: "" },
  variant: { type: String },
});
const emit = defineEmits(["click"]);

const variantClass = computed(() => {
  switch (props.variant) {
    case "success":
      return "bg-brand-500/10 text-brand-500";
    case "warning":
      return "bg-yellow-500/10 text-yellow-600";
    case "error":
      return "bg-error/10 text-error";
    default:
      return "bg-gray-500/10 text-gray-600";
  }
});
</script>

<template>
  <span
    :class="[variantClass, 'rounded-full px-3 py-2 text-sm', props.class]"
    @click="emit('click')"
  >
    <slot>{{ label }}</slot>
  </span>
</template>
