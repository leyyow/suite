<script setup>
import { VsxIcon } from "vue-iconsax";

defineProps({ items: { type: Array, default: () => [] } });
</script>

<template>
  <div class="grid grid-cols-2 border border-brand-200 rounded-lg bg-brand-50">
    <div
      v-for="(item, i) in items"
      :key="i"
      :class="[
        'py-3 px-3.5',
        { 'border-b border-brand-200': i < 2 },
        { 'border-l border-brand-200': i && i % 2 },
      ]"
    >
      <div class="inline-flex gap-1 items-center">
        <span
          :class="[
            'flex justify-center items-center h-6 w-6 text-sm border border-brand-200 bg-white rounded-md',
            item.iconColor,
          ]"
        >
          <VsxIcon :icon-name="item.icon" :size="18" type="bulk" />
        </span>
        <h4 class="text-sm text-brand-400">{{ item.label }}</h4>
      </div>
      <p class="text-brand-600 font-bold text-xl">{{ item.value }}</p>
    </div>
  </div>
</template>
