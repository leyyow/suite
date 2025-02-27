<script setup>
defineProps({
  modelValue: String, // Selected value
  options: Array, // Array of { value, label }
  name: String,
  label: String,
  required: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <!-- Group Label -->
    <label class="mb-1 block text-sm text-brand-400">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Radio Group -->
    <div class="flex flex-wrap gap-2">
      <div
        v-for="option in options"
        :key="option.value"
        class="bg-brand-50 flex items-center gap-1 h-10 pl-3 pr-4 border border-brand-200 rounded-lg cursor-pointer transition-all"
        :class="{
          'border-brand-500': modelValue === option.value,
        }"
        @click="emit('update:modelValue', option.value)"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          :class="[
            'w-4 h-4 text-brand-500 bg-brand-50 border-brand-300',
            'focus:outline-none focus:ring-0 accent-brand-500',
          ]"
          :required="required"
          @change="emit('update:modelValue', option.value)"
        />
        <label
          class="w-full text-sm cursor-pointer"
          :class="modelValue === option.value ? 'text-brand-500' : 'text-brand-400'"
        >
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>
