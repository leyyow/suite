<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: String || Number,
  type: { type: String, default: "text" },
  placeholder: String,
  label: String,
  required: Boolean,
  dense: Boolean,
  min: String || Number,
  max: String || Number,
});

const emit = defineEmits(["update:modelValue", "enter"]);
const showPassword = ref(false);
const inputType = computed(() =>
  props.type === "password" ? (showPassword.value ? "text" : "password") : props.type,
);
</script>

<template>
  <div>
    <label v-if="label" class="mb-1 block text-sm text-brand-400">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        :class="[
          'w-full rounded-lg bg-brand-50 border border-brand-200',
          dense ? 'h-10 px-3 py-1.5' : 'h-12 px-4 py-2.5',
          'text-sm text-brand-600 placeholder:text-brand-300 placeholder:font-light',
          'focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10',
        ]"
        :required="required"
        :min="min"
        :max="max"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute inset-y-0 right-3 text-base text-brand-300 outline-none"
        @click="showPassword = !showPassword"
      >
        <Icon :icon="showPassword ? 'mdi:hide' : 'mdi:show'" />
      </button>
    </div>
  </div>
</template>
