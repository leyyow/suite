<script setup>
import { Icon } from "@iconify/vue";
import AppButton from "~/components/common/app-button.vue";
import Chip from "~/components/common/chip.vue";
import Modal from "~/components/common/modal.vue";
import TextInput from "~/components/common/text-input.vue";

defineProps({ modelValue: Boolean, loading: Boolean, id: String });
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <Modal
    :open="modelValue"
    title="Missing Button"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <div class="space-y-4 pb-16">
      <div v-for="x in 2" :key="x" class="flex flex-col items-end">
        <p v-if="x === 1" class="self-center text-center text-xs text-brand-300">31/20/2023</p>
        <div class="max-w-[80%] p-2 rounded-lg rounded-br-none text-white bg-brand-500 mb-1">
          <p class="text-sm mb-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro excepturi eveniet a
            assumenda quia ratione minus.
          </p>
          <span
            class="px-2 py-1 border inline-flex items-center justify-center bg-white rounded-full"
          >
            <Icon icon="bxs:like" class="text-brand-500" />
          </span>
        </div>
        <div class="flex justify-end">
          <Chip dense label="Adebola" />
        </div>
      </div>
    </div>

    <div class="bg-white fixed bottom-0 w-full -mx-4 p-2 flex gap-2">
      <TextInput class="w-full" placeholder="Enter text" />
      <AppButton>
        <Icon icon="mingcute:send-fill" class="h-8 w-8" />
      </AppButton>
    </div>
  </Modal>
</template>
