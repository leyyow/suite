<script setup>
import { computed, defineEmits } from "vue";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  modelValue: Object, // Two-way binding (Selected Item)
  options: { type: Array, required: true }, // List of options [{ label, value }]
  label: String, // Optional label text
  placeholder: { type: String, default: "Select an option" }, // Default placeholder
  required: Boolean, // Required field
  dense: Boolean, // Compact mode (smaller height)
});

const emit = defineEmits(["update:modelValue"]);
const selectedValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div>
    <label v-if="label" class="mb-1 block text-sm text-brand-400">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>

    <Listbox v-model="selectedValue" @update:model-value="$emit('update:modelValue', $event)">
      <div class="relative">
        <!-- Listbox Button -->
        <ListboxButton
          :class="[
            'w-full cursor-pointer rounded-lg bg-brand-50 border border-brand-200 px-4 text-left focus:border-brand-500 focus:outline-none focus:ring focus:ring-brand-500/10',
            dense ? 'h-9 py-1.5 pl-2.5 pr-1 text-xs' : 'h-12 py-2.5 pl-4 pr-2 text-sm',
            'flex items-center gap-1 min-w-[5.75rem]',
            !selectedValue?.label && placeholder ? 'text-brand-300' : 'text-brand-600',
          ]"
        >
          <span class="block truncate flex-1">{{ selectedValue?.label || placeholder }}</span>
          <Icon
            icon="mdi:menu-down"
            class="ml-1 text-brand-300"
            :class="dense ? 'h-5 w-5' : 'h-6 w-6'"
          />
        </ListboxButton>

        <!-- Hidden Select for Validation -->
        <select
          v-if="required"
          :value="selectedValue?.value"
          :name="label"
          :required="required"
          aria-hidden="true"
          autoCapitalize="off"
          autoComplete="off"
          class="w-full z-0 h-[1px] select-none text-transparent bg-transparent absolute bottom-0 left-0 !outline-none opacity-0 pointer-events-none shadow-none appearance-none"
          @click.prevent
          @change.prevent
        >
          <option value="" aria-hidden="true" disabled selected></option>
          <option v-for="(e, i) in options" :key="i" :value="e.value" aria-hidden="true">
            {{ e.label }}
          </option>
        </select>

        <!-- Listbox Options -->
        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 w-full max-h-60 overflow-auto py-2 rounded-lg bg-white shadow-md ring-1 ring-black/10 focus:outline-none"
          >
            <ListboxOption
              v-for="item in options"
              :key="item.value"
              v-slot="{ active, selected }"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active || selected ? 'bg-brand-100 text-brand-500' : 'text-brand-600',
                  'relative cursor-pointer select-none py-2 px-4',
                  dense ? 'text-xs' : 'text-sm',
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                  {{ item.label }}
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
