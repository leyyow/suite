<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import AppButton from "./app-button.vue";

// Props
const props = defineProps({
  open: Boolean,
  title: String,
  size: { type: String, default: "md" }, // sm, md, lg
  persistent: { type: Boolean, default: false }, // Prevent closing on overlay click
  centered: Boolean,
});

const emit = defineEmits(["update:open"]);

// Close handler (respects persistent prop)
const closeModal = () => {
  if (!props.persistent) emit("update:open", false);
};
</script>

<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <!-- Overlay -->
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal" />
      </TransitionChild>

      <!-- Modal Wrapper -->
      <div
        class="fixed inset-0 flex md:items-center justify-center md:p-4"
        :class="centered ? 'items-center p-2' : 'items-end'"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300 transform"
          enter-from="translate-y-full opacity-0"
          enter-to="translate-y-0 opacity-100"
          leave="ease-in duration-200 transform"
          leave-from="translate-y-0 opacity-100"
          leave-to="translate-y-full opacity-0"
        >
          <DialogPanel
            :class="{
              'w-full max-w-sm': size === 'sm',
              'w-full max-w-md': size === 'md',
              'w-full max-w-lg': size === 'lg',
            }"
            class="transform overflow-hidden transition-all shadow-xl"
          >
            <!-- Close Button -->
            <div class="flex justify-end p-2">
              <AppButton
                variant="outlined"
                icon="material-symbols:close-rounded"
                small
                @click="emit('update:open', false)"
              />
            </div>

            <!-- Modal Content -->
            <div
              class="max-h-[calc(100vh-120px)] overflow-auto rounded-t-2xl md:rounded-b-2xl bg-brand-100"
              :class="{ 'rounded-b-2xl': centered }"
            >
              <!-- Modal Header -->
              <DialogTitle
                v-if="title"
                as="div"
                class="py-2 px-4 border-b border-brand-200 bg-brand-100 sticky top-0 z-20"
              >
                <h2 class="text-lg font-medium">{{ title }}</h2>
              </DialogTitle>

              <!-- Slot for Dynamic Content -->
              <div class="p-4">
                <slot />
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
