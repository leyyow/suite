<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: { type: String, default: "Search..." },
  class: { type: String || Array, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const hasText = computed(() => props.modelValue?.length);
</script>

<template>
  <div class="relative w-full" :class="props.class">
    <!-- Search Icon -->
    <svg
      class="absolute left-3 top-1/2 h-5 w-5 text-brand-500 -translate-y-1/2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-4.35-4.35M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"
      />
    </svg>

    <!-- Input Field -->
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      :class="[
        'h-11 w-full rounded-lg border border-brand-200 bg-transparent pl-10 pr-10 py-2.5',
        'text-sm placeholder:text-brand-300 focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10',
      ]"
      @input="emit('update:modelValue', $event.target.value)"
    />

    <!-- Clear Button -->
    <button
      v-if="hasText"
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-brand-300"
      @click="emit('update:modelValue', '')"
    >
      <svg
        class="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
