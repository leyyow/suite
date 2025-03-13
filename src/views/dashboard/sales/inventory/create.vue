<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import AlertBox from "~/components/common/alert-box.vue";
import AppButton from "~/components/common/app-button.vue";
import Chip from "~/components/common/chip.vue";
import StepperWizard from "~/components/common/stepper-wizard.vue";
import TagsInput from "~/components/common/tags-input.vue";
import TextAreaInput from "~/components/common/text-area-input.vue";
import TextInput from "~/components/common/text-input.vue";
import { useCreateProduct, useUpdateProduct } from "~/composables/api/sales/inventory";
import { useSalesStore } from "~/stores/sales";
import { formatNaira } from "~/utilities/formatNaira";

const route = useRoute();
const salesStore = useSalesStore();

// Determine if we are editing an existing product
const selectedProduct = computed(() =>
  route.query.id ? salesStore.getProductById(Number(route.query.id)) : null,
);

const isEditing = computed(() => route.path.includes("edit"));

const form = ref({
  name: "",
  price: "",
  quantity: "",
  SKU: "",
  description: "",
  image: {},
  variants: [{ name: "", values: [] }],
});

const imagePreview = ref({});

watch(
  selectedProduct,
  (val) => {
    if (val) {
      const variants = [];
      if (val.has_variant) {
        const variantNames = val.variants.split(",").filter(Boolean);
        variantNames.forEach((el, i) => {
          variants.push({
            name: el,
            values: val[`options${i + 1}`]?.split(",").filter(Boolean) || [],
          });
        });
      }

      form.value = {
        name: val.product_name || "",
        price: val.price || "",
        quantity: String(val.total_stock),
        SKU: val.SKU || "",
        description: val.description || "",
        image: val.image || {},
        variants: val.has_variant ? variants : [{ name: "", values: [] }],
      };

      if (val.image) imagePreview.value = val.image;
    }
  },
  { immediate: true },
);

const steps = [1, 2, 3, 4];
const currentStep = ref(0);

const addVariant = () => {
  form.value.variants.push({ name: "", values: [] });
};

const removeVariant = (index) => {
  form.value.variants.splice(index, 1);
};

const onFileChange = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    form.value.image[index] = file;
    imagePreview.value[index] = URL.createObjectURL(file);
  }
};

// Function to get all combinations of variant values
const getCombinations = (arrays) => {
  return arrays.reduce(
    (acc, values) => acc.flatMap((prev) => values.map((value) => [...prev, value])),
    [[]],
  );
};

// Computed property to generate variant combinations dynamically
const variantCombinations = computed(() => {
  const valuesArray = form.value.variants.map((v) => v.values);
  if (valuesArray.some((arr) => arr.length === 0)) return [];
  return getCombinations(valuesArray).map((combo) => ({
    name: combo.join(" / "),
    quantity: 0,
    price: form.value.price,
  }));
});

const { mutate: createProduct, loading: isCreating } = useCreateProduct();
const { mutate: updateProduct, loading: isUpdating } = useUpdateProduct();

const onSubmitProduct = () => {
  if (isEditing.value) {
    updateProduct({ id: route.query.id, payload: form.value }).then((res) => {
      console.log("res", res);
      toast.success("Product UPDATED successfully");
      salesStore.updateProduct({ id: Number(route.query.id), ...form.value });
    });
  } else {
    createProduct({ id: route.query.id, payload: form.value }).then((res) => {
      console.log("RES", res);
      toast.success("Product ADDED successfully");
      salesStore.addProduct(res);
    });
  }
};
</script>

<template>
  <div>
    <StepperWizard v-model:step="currentStep" :steps="steps">
      <!-- Product Details -->
      <template #default="{ step, onPrev, onNext }">
        <div v-if="step === 0">
          <form class="space-y-4" @submit.prevent="onNext">
            <!-- Main Product Image -->
            <div class="flex justify-center">
              <label for="main-image">
                <img v-if="imagePreview[0]" :src="imagePreview[0]" class="h-24 w-24 rounded-lg" />
                <span
                  v-else
                  class="h-20 w-20 rounded-lg bg-brand-50 border border-dashed border-brand-500 flex flex-col items-center justify-center text-brand-300"
                >
                  <Icon icon="lets-icons:add-square-duotone" class="text-brand-500 h-10 w-10" />
                </span>
                <input
                  id="main-image"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="onFileChange($event, 0)"
                />
              </label>
            </div>

            <!-- Additional Images -->
            <div class="flex justify-between px-2 py-2">
              <div v-for="i in 4" :key="i">
                <label :for="'image-' + i">
                  <img v-if="imagePreview[i]" :src="imagePreview[i]" class="h-16 w-16 rounded-lg" />
                  <span
                    v-else
                    class="h-16 w-16 rounded-lg bg-brand-50 border border-dashed border-brand-500 flex flex-col items-center justify-center text-brand-300"
                  >
                    <Icon icon="lets-icons:add-square-duotone" class="text-brand-500 h-8 w-8" />
                  </span>
                  <input
                    :id="'image-' + i"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="onFileChange($event, i)"
                  />
                </label>
              </div>
            </div>

            <TextInput
              v-model="form.name"
              label="Product Name"
              placeholder="e.g. Derby Shoes"
              required
            />
            <TextInput
              v-model="form.price"
              type="number"
              label="Price"
              placeholder="e.g. 20500"
              required
            />
            <TextInput
              v-model="form.quantity"
              type="number"
              label="Quantity"
              placeholder="e.g. 50"
              required
            />
            <TextInput v-model="form.SKU" label="SKU" placeholder="e.g. ABC123" />
            <TextAreaInput
              v-model="form.description"
              label="Description"
              rows="3"
              placeholder="Enter product details..."
            />

            <AlertBox
              label="Variants"
              text="Proceed to add and manage variants like sizes, colors, or weights."
            />

            <AppButton
              type="submit"
              :label="isEditing ? 'Edit Variants' : 'Next: Add Variants'"
              icon="bi:arrow-right"
              class="w-full flex-row-reverse gap-4"
            />
          </form>
        </div>

        <!-- Variants Management -->
        <div v-if="step === 1">
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
              <AppButton label="Back" variant="outlined" class="w-1/3" @click="onPrev" />
              <AppButton type="submit" label="Next" class="w-2/3" />
            </div>
          </form>
        </div>

        <!-- Pricing & Inventory Management -->
        <div v-if="step === 2">
          <div v-if="variantCombinations.length" class="mb-6">
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

          <div v-else class="text-center py-4 text-sm mb-4">
            No variant selected for this product
          </div>

          <AlertBox label="Next Step" text="Review all product details before submission." />

          <div class="flex gap-2 mt-6">
            <AppButton label="Back" variant="outlined" class="w-1/3" @click="onPrev" />
            <AppButton
              type="submit"
              :label="'Review' + (isEditing ? ' Changes' : '')"
              class="w-2/3"
              @click="onNext"
            />
          </div>
        </div>

        <!-- Review & Submission -->
        <div v-if="step === 3">
          <AlertBox label="Final Step" text="Review your product details before submission." />

          <div class="mt-4">
            <div class="flex justify-center items-end gap-1 mb-2">
              <img
                v-for="(item, v) in Object.values(imagePreview).filter(Boolean)"
                :key="v"
                :src="item"
                :class="[v ? 'h-12 w-12' : 'h-16 w-16', 'rounded-lg']"
              />
            </div>

            <div
              v-for="[key, value] in Object.entries(form).filter(
                ([key]) => !['image', 'variants'].includes(key),
              )"
              :key="key"
              class="flex justify-between gap-2 py-1.5 text-sm"
              :class="key === 'description' ? 'items-start' : 'items-center'"
            >
              <div class="inline-flex gap-2 text-brand-400 items-center capitalize">
                <Icon icon="uim:box" class="h-5 w-5 text-brand-300" />
                <p>{{ key }}</p>
              </div>
              <span class="font-medium text-right">
                {{ key === "price" ? formatNaira(value) : value || "--" }}
              </span>
            </div>

            <div class="bg-brand-50 border border-brand-200 rounded-lg p-2.5 px-3 mt-4">
              <h4 class="text-sm mb-1 font-medium">
                Product Variants ({{ variantCombinations.length }})
              </h4>

              <template v-if="variantCombinations.length">
                <p class="text-brand-600 text-sm capitalize mb-1 flex flex-wrap gap-1">
                  <Chip v-for="x in form.variants" :key="x" :label="x.name" dense />
                </p>

                <div class="grid grid-cols-8 text-sm bg-brand-100 font-medium mt-2">
                  <div class="px-2 py-2 col-span-3">Name</div>
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
                    {{ combo.quantity }}
                  </div>
                  <div class="px-2 py-2 col-span-3">
                    {{ formatNaira(combo.price) }}
                  </div>
                </div>
              </template>

              <div v-else class="text-center py-4 text-sm mb-4">
                No variant selected for this product
              </div>
            </div>
          </div>
          <div class="flex gap-2 mt-4">
            <AppButton label="Back" variant="outlined" class="w-1/3" @click="onPrev" />
            <AppButton
              :label="isEditing ? 'Save Changes' : 'Submit Product'"
              class="w-2/3"
              :loading="isCreating || isUpdating"
              @click="onSubmitProduct"
            />
          </div>
        </div>
      </template>
    </StepperWizard>
  </div>
</template>
