<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: String,
  placeholder: String,
  label: String,
  required: Boolean,
  rows: { type: [String, Number], default: 2 },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label v-if="label" class="mb-1 block text-sm text-brand-400">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>

    <textarea
      :placeholder="placeholder"
      :value="modelValue"
      :rows="rows"
      :required="required"
      class="w-full rounded-lg bg-brand-50 border border-brand-200 px-4 py-2.5 text-sm text-brand-600 placeholder:text-brand-300 placeholder:font-light focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10"
      @input="emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>
