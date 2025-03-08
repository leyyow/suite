<script setup>
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import Modal from "~/components/common/modal.vue";
import AppButton from "~/components/common/app-button.vue";
import TextInput from "~/components/common/text-input.vue";
import TagsInput from "~/components/common/tags-input.vue";
import AlertBox from "~/components/common/alert-box.vue";
import StepperWizard from "~/components/common/stepper-wizard.vue";
import Chip from "~/components/common/chip.vue";

defineProps({ modelValue: Boolean, loading: Boolean });
const emit = defineEmits(["update:modelValue", "submit"]);

// Stepper state
const currentStep = ref(0);
const steps = ["Variants", "Pricing & Inventory"];

// Manage variant options
const form = ref({
  variants: [{ name: "", values: [] }],
});

// Add & Remove Variants
const addVariant = () => form.value.variants.push({ name: "", values: [] });
const removeVariant = (index) => form.value.variants.splice(index, 1);

// Generate Variant Combinations (Cartesian Product)
const getCombinations = (arrays) =>
  arrays.reduce(
    (acc, values) => acc.flatMap((prev) => values.map((value) => [...prev, value])),
    [[]],
  );

const variantCombinations = computed(() => {
  const valuesArray = form.value.variants.map((v) => v.values);
  if (valuesArray.some((arr) => arr.length === 0)) return [];
  return getCombinations(valuesArray).map((combo) => ({
    name: combo.join(" / "),
    quantity: 0,
    price: 0,
  }));
});

const onSubmit = () => emit("submit", form.value.variants);
</script>

<template>
  <Modal
    :open="modelValue"
    title="Manage Variants"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <StepperWizard v-model:step="currentStep" :steps="steps">
      <template #default="{ step, onPrev, onNext }">
        <!-- Variants Management -->
        <div v-if="step === 0">
          <form class="space-y-4" @submit.prevent="onNext">
            <div v-for="(variant, index) in form.variants" :key="index" class="space-y-1">
              <div class="flex gap-2 items-center">
                <TextInput v-model="variant.name" label="Variant Name" class="w-full" />
                <button
                  v-if="form.variants.length > 1"
                  type="button"
                  class="text-error mt-3"
                  @click="removeVariant(index)"
                >
                  <Icon icon="solar:trash-bin-trash-bold-duotone" class="h-8 w-8" />
                </button>
              </div>
              <TagsInput v-model="variant.values" placeholder="Enter values..." />
            </div>

            <AppButton
              type="button"
              variant="text"
              label="Add Variant"
              icon="lets-icons:add-square-duotone"
              icon-class="h-6 w-6"
              @click="addVariant"
            />

            <AlertBox
              label="Next Step"
              text="Update available quantities and prices for each variant."
            />

            <div class="flex gap-2">
              <AppButton
                label="Cancel"
                variant="outlined"
                class="w-1/3"
                @click="emit('update:modelValue', false)"
              />
              <AppButton type="submit" label="Next" class="w-2/3" />
            </div>
          </form>
        </div>

        <!-- Pricing & Inventory Management -->
        <div v-if="step === 1">
          <div class="mb-4 flex flex-wrap gap-2">
            <Chip
              v-for="item in form.variants"
              :key="item.name"
              :label="item.name"
              class="capitalize"
            />
          </div>
          <div class="mb-4">
            <div class="grid grid-cols-8 text-sm bg-brand-50 font-medium">
              <div class="px-2 py-2 col-span-3">Variant</div>
              <div class="px-2 py-2 col-span-2">Quantity</div>
              <div class="px-2 py-2 col-span-3">Price</div>
            </div>

            <div
              v-for="(combo, index) in variantCombinations"
              :key="index"
              class="grid grid-cols-8 border-b border-brand-200 last:border-0 text-sm items-center"
            >
              <div class="px-2 py-2 col-span-3 text-sm capitalize">{{ combo.name }}</div>
              <div class="px-2 py-2 col-span-2">
                <TextInput v-model="combo.quantity" type="number" dense placeholder="0" />
              </div>
              <div class="px-2 py-2 col-span-3">
                <TextInput v-model="combo.price" type="number" dense placeholder="5000" />
              </div>
            </div>
          </div>

          <div class="flex gap-2 mt-6">
            <AppButton label="Back" variant="outlined" class="w-1/3" @click="onPrev" />
            <AppButton label="Save Changes" class="w-2/3" @click="onSubmit" />
          </div>
        </div>
      </template>
    </StepperWizard>
  </Modal>
</template>
