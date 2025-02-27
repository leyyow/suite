<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({ class: { type: String || Array, default: "" } });
</script>

<template>
  <div class="flex justify-center items-center py-16" :class="props.class">
    <Icon icon="eos-icons:bubble-loading" class="h-20 w-20 text-brand-300" />
  </div>
</template>
