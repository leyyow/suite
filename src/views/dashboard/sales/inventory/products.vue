<script setup>
import { computed, ref } from "vue";
import SearchBar from "~/components/common/search-bar.vue";
import EmptyData from "~/components/dashboard/empty-data.vue";
import SummaryCard from "~/components/dashboard/sales/summary-card.vue";
import { formatNaira } from "~/utilities/formatNaira";
import ProductCard from "~/components/dashboard/inventory/product-card.vue";
import DeleteProductModal from "~/components/dashboard/inventory/delete-product-modal.vue";
import { useRouter } from "vue-router";

const empty = ref(false);

const summaryStats = computed(() => [
  {
    label: "Total Inventory",
    value: "500",
    icon: "solar:shop-bold-duotone",
    color: "text-pink-600",
  },
  {
    label: "Inventory Value",
    value: formatNaira(2400000),
    icon: "solar:wallet-money-bold-duotone",
    color: "text-cyan-500",
  },
  {
    label: "New Product",
    value: 30,
    icon: "solar:shop-bold-duotone",
    color: "text-purple-600",
  },
  {
    label: "Low Stock",
    value: 20,
    icon: "solar:graph-down-bold-duotone",
    color: "text-yellow-600",
  },
]);

const searchValue = ref("");

// const selectedOrder = ref(null);
const showShare = ref(false);
const showDelete = ref(false);

const router = useRouter();
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
            @view="() => router.push(`/dashboard/sales/inventory/${v}`)"
            @edit="() => router.push(`/dashboard/sales/inventory/edit?id=${v}`)"
            @duplicate="
              () => router.push(`/dashboard/sales/inventory/create?action=duplicate&id=${v}`)
            "
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
