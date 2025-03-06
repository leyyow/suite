<script setup>
import { ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import Checkbox from "~/components/common/checkbox.vue";
import Chip from "~/components/common/chip.vue";
import Modal from "~/components/common/modal.vue";
import { formatNaira } from "~/utilities/formatNaira";

defineProps({ modelValue: Boolean, loading: Boolean, items: Array });
const emit = defineEmits(["update:modelValue", "save"]);

const tab = ref("Return");
</script>

<template>
  <Modal
    :open="modelValue"
    title="Returned Items"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <div class="flex border-b border-brand-200 mb-4">
      <button
        v-for="v in ['Return', 'Returned Items']"
        :key="v"
        type="button"
        :class="[
          'flex-1 text-sm py-2 px-3 text-center font-medium',
          tab === v ? 'border-b border-brand-500 text-brand-500' : 'text-brand-300',
        ]"
        @click="tab = v"
      >
        {{ v }}
      </button>
    </div>

    <template v-if="tab === 'Returned Items'">
      <div class="flex justify-between mb-4 items-center">
        <h4>Items returned (4)</h4>
      </div>
      <div class="space-y-3 mb-4">
        <div v-for="v in 4" :key="v" class="flex gap-2 items-center">
          <img class="h-12 w-12 rounded bg-brand-200" />
          <div class="flex-1 text-sm">
            <h4>Debola Adeola</h4>
            <p class="font-medium">{{ formatNaira(3000) }}</p>
          </div>
          <Chip label="2 Units" dense />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="bg-white p-2 rounded-lg mb-4">
        <Chip variant="warning" dense label="Note" />
        <p class="text-sm mt-2">Select the items that have been returned back to store</p>
      </div>

      <section>
        <div class="flex justify-between mb-2 items-center">
          <h4>Select items</h4>
          <AppButton variant="text" label="Mark all" />
        </div>
        <div class="space-y-3 mb-4">
          <div v-for="v in 5" :key="v" class="flex gap-2 items-center">
            <Checkbox />
            <img class="h-12 w-12 rounded bg-brand-200" />
            <div class="flex-1 text-sm">
              <h4>Debola Adeola</h4>
              <p class="font-medium">{{ formatNaira(3000) }}</p>
            </div>
            <Chip label="2 Units" dense />
          </div>
        </div>

        <AppButton label="Submit" class="w-full" />
      </section>
    </template>
  </Modal>
</template>
