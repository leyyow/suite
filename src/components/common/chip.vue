<script setup>
import { computed } from "vue";

const props = defineProps({
  label: { type: String },
  class: { type: String || Array, default: "" },
  variant: { type: String },
  dense: Boolean,
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
      return "bg-brand-50 text-brand-400 border border-brand-200";
  }
});
</script>

<template>
  <span
    :class="[
      variantClass,
      'rounded-full capitalize',
      dense ? 'px-2.5 py-1 text-xs' : 'px-3 py-2 text-sm',
      props.class,
    ]"
    @click="emit('click')"
  >
    <slot>{{ label }}</slot>
  </span>
</template>
