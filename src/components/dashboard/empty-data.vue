<script setup>
import { computed } from "vue";
import AppButton from "../common/app-button.vue";

const props = defineProps({
  variant: { type: String, default: "data" },
  title: { type: String, default: "No data yet" },
  subtitle: { type: String },
  actionLabel: { type: String, default: "Add Data" },
  class: { type: String || Array, default: "" },
});

const emit = defineEmits(["action"]);

const image = computed(
  () => new URL(`../../assets/empty/${props.variant}.svg`, import.meta.url).href,
);
</script>

<template>
  <div class="py-3 flex flex-col justify-center items-center gap-1" :class="props.class">
    <img :src="image" alt="empty" />
    <h4 class="font-medium text-base capitalize">{{ title }}</h4>
    <p v-if="subtitle" class="text-sm text-brand-400 mb-1">{{ subtitle }}</p>
    <AppButton
      v-if="variant !== 'data'"
      :label="actionLabel"
      class="w-2/3"
      small
      @click="emit('action')"
    />
  </div>
</template>
