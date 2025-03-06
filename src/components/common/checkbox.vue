<script setup>
defineProps({
  modelValue: Boolean, // Boolean value for checkbox state
  label: String,
  required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex items-center space-x-2">
    <!-- Checkbox -->
    <input
      type="checkbox"
      :checked="modelValue"
      class="w-5 h-5 rounded border-brand-300 text-brand-500 focus:ring-brand-400 accent-brand-500"
      @change="emit('update:modelValue', $event.target.checked)"
    />

    <!-- Label -->
    <label
      v-if="label"
      class="text-sm text-brand-600 cursor-pointer"
      @click="emit('update:modelValue', !modelValue)"
    >
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
  </div>
</template>
