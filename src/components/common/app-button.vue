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
    validator: (v) => ["filled", "outlined", "tonal", "text"].includes(v),
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
      'inline-flex justify-center items-center rounded-lg font-semibold',
      'transition-all ease-in-out duration-200 relative',
      'focus:outline-none focus:ring-2',
      variant === 'filled' && 'bg-brand-500 text-white focus:ring-brand-500/50',
      variant === 'outlined' &&
        'border border-brand-200 text-brand-500 bg-brand-50 focus:ring-brand-500/50',
      variant === 'tonal' &&
        'border border-brand-200 text-brand-500 bg-brand-500/20 focus:ring-brand-500/50',
      variant === 'text'
        ? 'text-brand-500 text-sm underline focus:ring-brand-500/0 gap-1.5'
        : icon && !label && smaller
          ? 'h-7 w-7'
          : icon && !label && small
            ? 'h-9 w-9'
            : icon && !label
              ? 'h-11 w-11'
              : smaller
                ? 'h-8 text-sm px-3 gap-1'
                : small
                  ? 'h-10 text-sm px-4 gap-2'
                  : 'h-12 text-sm px-6 gap-2',
      disabled || loading
        ? 'cursor-not-allowed opacity-50 hover:disabled:opacity-50'
        : 'cursor-pointer hover:opacity-85',
      props.class,
    ]"
    :disabled="disabled || loading"
    :type="type"
    @click="emitClick"
  >
    <Icon
      v-if="loading || icon"
      :icon="loading ? 'eos-icons:bubble-loading' : icon"
      :class="[
        variant == 'filled' ? 'text-white' : 'text-brand-500',
        icon && !label && 'h-5 w-5',
        props.iconClass,
      ]"
    />
    <slot v-if="label">{{ label }}</slot>
  </button>
</template>
