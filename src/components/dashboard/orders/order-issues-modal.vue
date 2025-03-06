<script setup>
import { Icon } from "@iconify/vue";
import AppButton from "~/components/common/app-button.vue";
import Chip from "~/components/common/chip.vue";
import Modal from "~/components/common/modal.vue";

defineProps({ modelValue: Boolean, loading: Boolean, items: Array });
const emit = defineEmits(["update:modelValue", "add", "view"]);
</script>

<template>
  <Modal
    :open="modelValue"
    title="Raise Issue"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <div class="flex justify-between mb-3 items-center">
      <h4 class="font-medium">All Issues (3)</h4>
      <AppButton small label="Add Issue" @click="emit('add')" />
    </div>

    <div class="space-y-3">
      <div
        v-for="x in 3"
        :key="x"
        class="bg-brand-50 border border-brand-200 p-3 rounded-xl cursor-pointer"
        @click="emit('view')"
      >
        <h4 class="font-medium text-sm truncate mb-2">Missing button</h4>
        <div class="space-y-2">
          <div v-for="v in 2" :key="v" class="flex justify-between gap-1 text-sm">
            <div class="inline-flex gap-2 items-center text-brand-400">
              <Icon icon="solar:calendar-bold-duotone" class="h-5 w-5 text-brand-300" />
              <p>Date {{ v == 1 ? "added" : "last updated" }}</p>
            </div>
            <span class="text-right">{{ new Date().toDateString() }}</span>
          </div>
        </div>
        <hr class="border-brand-200 my-2" />
        <div class="flex justify-between gap-3">
          <span class="px-2 border flex items-center justify-center rounded-full">
            <Icon icon="bxs:like" class="text-brand-500" />
          </span>
          <Chip label="Low" dense />
          <div class="flex-1" />
          <Chip label="Adebola" dense />
        </div>
      </div>
    </div>
  </Modal>
</template>
