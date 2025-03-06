<script setup>
import { ref, computed, watch, defineEmits } from "vue";

const props = defineProps({
  steps: { type: Array, required: true }, // List of step labels
  currentStep: { type: Number, default: 1 }, // Default step
});

// Declare emitted events
defineEmits(["update:currentStep"]);

// Local reactive state for animation
const activeStep = ref(props.currentStep);

// Watch for prop changes and animate
watch(
  () => props.currentStep,
  (newStep) => {
    activeStep.value = newStep;
  },
);

// Computed step width for progress bar
const stepWidth = computed(() => `${((activeStep.value - 1) / (props.steps.length - 1)) * 100}%`);
</script>

<template>
  <div class="w-full max-w-xl mx-auto">
    <!-- Stepper -->
    <div class="relative flex items-center justify-between mb-6">
      <div class="absolute top-1/2 w-full h-1 bg-gray-300 rounded transform -translate-y-1/2"></div>
      <div
        class="absolute top-1/2 h-1 bg-green-500 rounded transition-all duration-500"
        :style="{ width: stepWidth }"
      ></div>

      <div v-for="(step, index) in steps" :key="index" class="relative flex flex-col items-center">
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full font-semibold text-white transition-all duration-300"
          :class="
            activeStep > index + 1
              ? 'bg-green-500'
              : activeStep === index + 1
                ? 'bg-blue-500'
                : 'bg-gray-400'
          "
        >
          {{ index + 1 }}
        </div>
        <p class="text-sm mt-2">{{ step }}</p>
      </div>
    </div>

    <!-- Animated Step Content -->
    <transition-group name="fade" tag="div">
      <div
        v-for="(step, index) in steps"
        v-show="activeStep === index + 1"
        :key="index"
        class="text-center p-4 bg-white shadow-md rounded-lg"
      >
        <p class="text-lg font-semibold">Step {{ index + 1 }}: {{ step }}</p>
      </div>
    </transition-group>

    <!-- Controls -->
    <div class="flex justify-between mt-6">
      <button
        :disabled="activeStep === 1"
        class="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 transition-all"
        @click="$emit('update:currentStep', Math.max(1, activeStep - 1))"
      >
        Previous
      </button>
      <button
        :disabled="activeStep === steps.length"
        class="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50 transition-all"
        @click="$emit('update:currentStep', Math.min(steps.length, activeStep + 1))"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease-in-out,
    transform 0.4s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
