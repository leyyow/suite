<script setup>
import { ref, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

const emit = defineEmits(["update:modelValue"]);

const fileName = ref("");

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    fileName.value = file.name;
    emit("update:modelValue", file);
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) {
    fileName.value = file.name;
    emit("update:modelValue", file);
  }
};

const preventDefaults = (event) => {
  event.preventDefault();
};
</script>

<template>
  <div>
    <label class="mb-1 block text-sm text-brand-400">Upload File</label>
    <div
      class="relative w-full rounded-lg bg-brand-50 border border-brand-200 px-4 py-4 text-sm text-brand-600 cursor-pointer flex items-center justify-between"
      @dragover="preventDefaults"
      @drop="handleDrop"
    >
      <span v-if="fileName" class="truncate text-brand-600">
        {{ fileName }}
      </span>
      <div v-else class="flex flex-col items-center justify-center gap-2 text-center w-full">
        <Icon icon="meteor-icons:upload-cloud" class="text-brand-500 text-2xl" />
        <span class="text-sm text-brand-400">Click to upload or drag & drop</span>
        <span class="text-sm text-brand-300">Max size: (3MB)</span>
      </div>

      <input
        type="file"
        class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>
