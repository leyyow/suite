<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import SearchBar from "~/components/common/search-bar.vue";
import EmptyData from "~/components/dashboard/empty-data.vue";
import SummaryCard from "~/components/dashboard/sales/summary-card.vue";
import ProductCard from "~/components/dashboard/inventory/product-card.vue";
import DeleteProductModal from "~/components/dashboard/inventory/delete-product-modal.vue";
import { formatNaira } from "~/utilities/formatNaira";
import { useSalesStore } from "~/stores/sales";
import { useDeleteProduct } from "~/composables/api/sales/inventory";

const router = useRouter();
const salesStore = useSalesStore();

const searchValue = ref("");
const selectedProduct = ref(null);
const showShare = ref(false);
const showDelete = ref(false);

const products = computed(() => salesStore.products);
const filteredProducts = computed(() => {
  if (!searchValue.value) return products.value;
  const query = searchValue.value.toLowerCase();
  return products.value.filter((product) => product.name.toLowerCase().includes(query));
});

const summaryStats = computed(() => {
  const currentDate = new Date();
  const newProductThreshold = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

  const newProductCount = products.value.filter((product) => {
    const createdDate = new Date(product.created);
    return currentDate - createdDate <= newProductThreshold;
  }).length;

  const lowStockCount = products.value.filter((product) => product.total_stock < 5).length;

  return [
    {
      label: "Total Inventory",
      value: salesStore.totalProducts || 0,
      icon: "solar:shop-bold-duotone",
      color: "text-pink-600",
    },
    {
      label: "Inventory Value",
      value: formatNaira(products.value.reduce((acc, p) => acc + p.price * p.total_stock, 0)),
      icon: "solar:wallet-money-bold-duotone",
      color: "text-cyan-500",
    },
    {
      label: "New Product",
      value: newProductCount,
      icon: "solar:shop-bold-duotone",
      color: "text-purple-600",
    },
    {
      label: "Low Stock",
      value: lowStockCount,
      icon: "solar:graph-down-bold-duotone",
      color: "text-yellow-600",
    },
  ];
});

const { mutate: deleteProduct, loading: isDeleting } = useDeleteProduct();
const handleDeleteProduct = () => {
  deleteProduct(selectedProduct.value.id).then(() => {
    toast.success("Product deleted successfully");
    salesStore.removeProduct(selectedProduct.value.id);
    showDelete.value = false;
  });
};

console.log("PP", products.value);
</script>

<template>
  <div>
    <EmptyData
      v-if="products.length === 0"
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
        <h3 class="text-base font-semibold mb-2">All Products ({{ salesStore.totalProducts }})</h3>
        <SearchBar v-model="searchValue" placeholder="Search by name..." />

        <div class="space-y-4 mt-4">
          <ProductCard
            v-for="(product, v) in filteredProducts"
            :key="v"
            :product="product"
            @open:dropdown="selectedProduct = product"
            @view="() => router.push(`/dashboard/sales/inventory/${product.id}`)"
            @edit="() => router.push(`/dashboard/sales/inventory/edit?id=${product.id}`)"
            @duplicate="
              () =>
                router.push(`/dashboard/sales/inventory/create?action=duplicate&id=${product.id}`)
            "
            @share="showShare = true"
            @delete="showDelete = true"
          />
        </div>
      </section>
    </div>

    <!--  -->
    <DeleteProductModal
      v-model="showDelete"
      :product="selectedProduct"
      :loading="isDeleting"
      @delete="handleDeleteProduct"
    />
  </div>
</template>
