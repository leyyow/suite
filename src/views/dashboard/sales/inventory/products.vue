<script setup>
import { computed, ref } from "vue";
import SearchBar from "~/components/common/search-bar.vue";
import EmptyData from "~/components/dashboard/empty-data.vue";
import SummaryCard from "~/components/dashboard/sales/summary-card.vue";
import { formatNaira } from "~/utilities/formatNaira";
import ProductCard from "~/components/dashboard/inventory/product-card.vue";
import DeleteProductModal from "~/components/dashboard/inventory/delete-product-modal.vue";

const empty = ref(false);

const summaryStats = computed(() => [
  { label: "Total Inventory", value: "500", icon: "BagHappy", iconColor: "text-[#f98636]" },
  {
    label: "Inventory Value",
    value: formatNaira(2400000),
    icon: "ChartSquare",
    iconColor: "text-[#2277f7]",
  },
  { label: "New Product", value: 30, icon: "User", iconColor: "text-[#c212d1]" },
  { label: "Low Stock", value: 20, icon: "TruckTick", iconColor: "text-brand-500" },
]);

const searchValue = ref("");

// const selectedOrder = ref(null);

const showView = ref(false);
const showEdit = ref(false);
const showDuplicate = ref(false);
const showShare = ref(false);
const showDelete = ref(false);
</script>

<template>
  <div>
    <EmptyData
      v-if="empty"
      variant="product"
      title="No product"
      subtitle="You have no product yet"
      action-label="Add Product"
    />

    <div v-else>
      <div class="flex justify-end mb-4">
        <button type="button" class="underline text-brand-500 font-medium text-sm">
          Show more
        </button>
      </div>

      <SummaryCard :items="summaryStats" />

      <section class="mt-6">
        <h3 class="text-base font-semibold mb-2">All Products ({{ 12 }})</h3>
        <SearchBar v-model="searchValue" placeholder="Search by name..." />

        <div class="space-y-4 mt-4">
          <ProductCard
            v-for="v in 12"
            :key="v"
            @view="showView = true"
            @edit="showEdit = true"
            @duplicate="showDuplicate = true"
            @share="showShare = true"
            @delete="showDelete = true"
          />
        </div>
      </section>
    </div>

    <!--  -->
    <DeleteProductModal v-model="showDelete" />
  </div>
</template>
