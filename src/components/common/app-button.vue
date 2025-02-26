<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  label: String,
  icon: String,
  type: {
    type: String,
    default: "button",
    validator: (v) => ["button", "submit", "reset"].includes(v),
  },
  small: { type: Boolean, default: false }, // small size button
  smaller: { type: Boolean, default: false }, // small size button
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }, // New loading state
  class: { type: String || Array, default: "" },
  iconClass: { type: String || Array, default: "" },
  variant: {
    type: String,
    default: "filled",
    validator: (v) => ["filled", "outlined", "tonal"].includes(v),
  },
});

const emit = defineEmits(["click"]);

const emitClick = (event) => {
  if (!props.loading && !props.disabled) {
    emit("click", event);
  }
};
</script>

<template>
  <button
    :class="[
      'inline-flex justify-center gap-2 items-center rounded-lg font-medium',
      'transition-all ease-in-out duration-200 relative',
      'focus:outline-none focus:ring-2 hover:opacity-85',
      variant === 'filled' && 'bg-brand-500 text-white focus:ring-brand-500/50',
      variant === 'outlined' &&
        'border border-brand-200 text-brand-500 bg-brand-50 focus:ring-brand-500/50',
      variant === 'tonal' &&
        'border border-brand-200 text-brand-500 bg-brand-500/20 focus:ring-brand-500/50',
      icon && !label
        ? 'h-9 w-9'
        : smaller
          ? 'h-8 text-sm px-4'
          : small
            ? 'h-10 text-sm px-4'
            : 'h-12 text-sm px-6',
      disabled || loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      props.class,
      props.iconClass,
    ]"
    :disabled="disabled || loading"
    :type="type"
    @click="emitClick"
  >
    <Icon
      v-if="loading || (icon && !label)"
      :icon="loading ? 'eos-icons:bubble-loading' : icon"
      :class="[
        'h-5 w-5',
        ['outlined', 'tonal'].includes(variant) ? 'text-brand-500' : 'text-white',
        props.iconClass,
      ]"
    />
    <slot v-else>{{ label }}</slot>
  </button>
</template>
