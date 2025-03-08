<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  steps: { type: Array, required: true }, // Step array from parent
  initialStep: { type: Number, default: 0 }, // Default start step
});

const emit = defineEmits(["update:step"]); // Event to notify parent
const currentStep = ref(props.initialStep);

// Move to next step
const onNext = () => {
  if (currentStep.value < props.steps.length - 1) {
    currentStep.value++;
    emit("update:step", currentStep.value);
  }
};

// Move to previous step
const onPrev = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    emit("update:step", currentStep.value);
  }
};

// Dynamic step status
const isActive = (index) => index === currentStep.value;
const isCompleted = (index) => index < currentStep.value;

const stepPercentage = computed(() => ((currentStep.value + 1) / props.steps.length) * 100);
</script>

<template>
  <div class="w-full">
    <!-- Stepper Header -->
    <div class="relative flex items-center justify-between mb-6">
      <div class="absolute w-full bg-brand-200 h-0.5"></div>
      <div
        class="absolute h-0.5 bg-brand-500 transition-all"
        :style="{ width: stepPercentage + '%' }"
      ></div>

      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="[
          'relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all',
          isActive(index)
            ? 'bg-brand-50 border border-brand-500 text-brand-500'
            : isCompleted(index)
              ? 'bg-brand-500 text-white'
              : 'bg-brand-50 border border-brand-200 text-brand-300/60',
          index > 0 ? 'ml-10' : '',
        ]"
      >
        {{ index + 1 }}
      </div>
    </div>

    <!-- Step Content Slot -->
    <div class="p-1 transition-opacity duration-300">
      <slot :step="currentStep" :on-prev="onPrev" :on-next="onNext"></slot>
    </div>
  </div>
</template>
