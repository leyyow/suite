<script setup>
import Chip from "./chip.vue";

const props = defineProps({
  variant: { type: String, default: "warning" },
  label: { type: String, default: "Note" },
  text: String,
  class: String || Array,
});
</script>

<template>
  <div class="bg-white p-2 rounded-lg" :class="props.class">
    <Chip :variant="variant" dense :label="label" />
    <p class="text-sm mt-2 px-1">{{ text }}</p>
  </div>
</template>
