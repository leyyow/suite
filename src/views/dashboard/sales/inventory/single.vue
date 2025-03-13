<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppButton from "~/components/common/app-button.vue";
import Chip from "~/components/common/chip.vue";
// import Switch from "~/components/common/switch.vue";
import ManageVariantsModal from "~/components/dashboard/inventory/manage-variants-modal.vue";
import SummaryCard from "~/components/dashboard/sales/summary-card.vue";
import { useSalesStore } from "~/stores/sales";
import { formatNaira } from "~/utilities/formatNaira";

const route = useRoute();
const router = useRouter();
const salesStore = useSalesStore();

// Get selected product by ID
const selectedProduct = computed(() => salesStore.getProductById(Number(route.params.id)) || {});

// Summary stats for product
const summaryStats = computed(() => [
  {
    label: "Total Quantity",
    value: selectedProduct.value.total_stock || 0,
    icon: "solar:tag-bold-duotone",
    color: "text-brand-500",
  },
  {
    label: "Total Sold",
    value: formatNaira(selectedProduct.value.total_stock * selectedProduct.value.price || 0),
    icon: "uim:graph-bar",
    color: "text-blue-600",
  },
  {
    label: "Returns",
    value: "0%",
    icon: "jam:refresh-reverse",
    color: "text-indigo-500",
  },
  {
    label: "Variant Option",
    value: productVariants.value.length,
    icon: "solar:bag-heart-bold-duotone",
    color: "text-purple-500",
  },
]);

// Product details
const productDetails = computed(() => [
  { icon: "uim:box", label: "Price", value: formatNaira(selectedProduct.value.price || 0) },
  {
    icon: "uim:box",
    label: "Date Added",
    value: selectedProduct.value.created
      ? new Date(selectedProduct.value.created).toLocaleDateString("en-US", { dateStyle: "medium" })
      : "N/A",
  },
  {
    icon: "uim:box",
    label: "Description",
    value: selectedProduct.value.description || "N/A",
  },
]);

// Variant handling
const showManage = ref(false);
// const enabled = ref(selectedProduct.value.display ?? !!selectedProduct.value?.total_stock ?? false);

const productVariants = computed(() => {
  const variants = [];
  if (selectedProduct.value?.has_variant) {
    const variantNames = selectedProduct.value?.variants?.split(",").filter(Boolean);
    variantNames.forEach((el, i) => {
      variants.push({
        name: el,
        values: selectedProduct.value?.[`options${i + 1}`]?.split(",").filter(Boolean) || [],
      });
    });
  }
  return variants;
});

console.log(productVariants.value);
</script>

<template>
  <div>
    <div class="flex justify-end mb-4">
      <AppButton label="Show more" variant="text" />
    </div>

    <!-- Summary Stats -->
    <SummaryCard :items="summaryStats" />

    <!-- Product Info -->
    <div class="flex flex-col items-center justify-center gap-1 mt-6">
      <span class="h-16 w-16 rounded-lg bg-brand-200 flex items-center justify-center">
        <Icon icon="uim:box" class="text-brand-500 h-10 w-10" />
      </span>
      <h3 class="text-lg font-semibold text-center">
        {{ selectedProduct.product_name || "Unnamed Product" }}
      </h3>
    </div>

    <!-- Product Details -->
    <section class="mt-4 mb-6 text-sm">
      <div class="flex justify-end mb-4">
        <AppButton
          variant="outlined"
          smaller
          label="Edit"
          icon="mdi:pencil"
          @click="() => router.push(`/dashboard/sales/inventory/edit?id=${selectedProduct?.id}`)"
        />
      </div>
      <div
        v-for="(item, v) in productDetails"
        :key="v"
        class="flex justify-between gap-2 py-2.5"
        :class="item.label === 'Description' ? 'items-start' : 'items-center'"
      >
        <div class="inline-flex gap-2 text-brand-400 items-center">
          <Icon :icon="item.icon" class="h-5 w-5 text-brand-300" />
          <p>{{ item.label }}</p>
        </div>
        <span class="font-medium text-right">
          {{ item.value }}
        </span>
      </div>
    </section>

    <!-- Variants Section -->
    <section class="space-y-2.5">
      <div class="flex justify-between items-center">
        <h4 class="text-base font-medium text-center">Variants</h4>
        <AppButton
          variant="outlined"
          smaller
          label="Manage variants"
          icon="mdi:pencil"
          @click="showManage = true"
        />
      </div>

      <div v-if="productVariants.length">
        <div
          v-for="(variant, index) in productVariants"
          :key="index"
          class="w-full bg-brand-50 border border-brand-200 p-3 rounded-xl cursor-pointer text-left mb-2"
        >
          <div class="flex gap-2.5">
            <div class="text-sm flex-1 truncate">
              <h4 class="text-sm text-brand-300 truncate mb-2">{{ variant.name }}</h4>
              <div class="flex flex-wrap gap-2">
                <Chip
                  v-for="item in variant.values"
                  :key="item"
                  :label="item"
                  dense
                  class="capitalize"
                />
              </div>
              <!-- <p class="truncate font-medium">{{ formatNaira(selectedProduct.price || 0) }}</p> -->
            </div>
          </div>
          <!-- <hr v-if="false" class="border-brand-200 my-2" />
          <div v-if="false" class="flex items-center justify-between gap-1">
            <Switch
              v-model="enabled"
              dense
              :label="enabled ? 'Available' : 'Unavailable'"
              disabled
            />
            <div v-if="false" class="inline-flex gap-1 items-center">
              <AppButton icon="mdi:minus" smaller variant="tonal" />
              <span
                class="border border-brand-200 rounded-full font-medium flex items-center justify-center h-8 w-8 text-sm"
              >
                {{ selectedProduct.total_stock || 0 }}
              </span>
              <AppButton icon="mdi:plus" smaller variant="tonal" />
            </div>
          </div> -->
        </div>
      </div>
      <p v-else class="text-center text-brand-400 text-sm pt-4">No variant available.</p>
    </section>

    <!-- Manage Variants Modal -->
    <ManageVariantsModal v-model="showManage" :product="selectedProduct" />
  </div>
</template>
