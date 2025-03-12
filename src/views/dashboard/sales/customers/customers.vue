<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import SearchBar from "~/components/common/search-bar.vue";
import AddCustomerModal from "~/components/dashboard/customers/add-customer-modal.vue";
import CustomerCard from "~/components/dashboard/customers/customer-card.vue";
import DeleteCustomerModal from "~/components/dashboard/customers/delete-customer-modal.vue";
import EmptyData from "~/components/dashboard/empty-data.vue";
import { useDeleteCustomer, useUpdateCustomer } from "~/composables/api/sales/customers";
import { useSalesStore } from "~/stores/sales";

const router = useRouter();
const salesStore = useSalesStore();

const showEdit = ref(false);
const showDelete = ref(false);
const selectedCustomer = ref(null);
const searchValue = ref("");

// API mutations
const { mutate: updateCustomer, loading: isUpdating } = useUpdateCustomer();
const { mutate: deleteCustomer, loading: isDeleting } = useDeleteCustomer();

// Computed properties
const customers = computed(() => salesStore.customers);

const filteredCustomers = computed(() => {
  if (!searchValue.value) return customers.value;
  const query = searchValue.value.toLowerCase();
  return customers.value.filter(
    (customer) =>
      customer.first_name.toLowerCase().includes(query) ||
      customer.last_name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query),
  );
});

// methods & handlers
const handleUpdateCustomer = (payload) => {
  updateCustomer({ id: selectedCustomer.value.id, payload }).then((res) => {
    toast.success("Customer updated successfully");
    salesStore.updateCustomer(res);
    showEdit.value = false;
  });
};

const handleDeleteCustomer = () => {
  deleteCustomer(selectedCustomer.value.id).then(() => {
    toast.success("Customer deleted successfully");
    salesStore.removeCustomer(selectedCustomer.value.id);
    showDelete.value = false;
  });
};
</script>

<template>
  <div>
    <!-- Empty state -->
    <EmptyData
      v-if="customers.length === 0"
      variant="customer"
      title="No Customers"
      subtitle="You have no saved customers yet."
      action-label="Add a Customer"
      @action="showEdit = true"
    />

    <!-- Customers List -->
    <section v-else>
      <h3 class="text-base font-semibold mb-2">All Customers ({{ salesStore.totalCustomers }})</h3>
      <SearchBar v-model="searchValue" placeholder="Search by name or email..." />

      <div class="space-y-4 mt-4">
        <CustomerCard
          v-for="(customer, index) in filteredCustomers"
          :key="index"
          :customer="customer"
          @open:dropdown="selectedCustomer = customer"
          @delete="showDelete = true"
          @edit="
            showEdit = true;
            isEditing = true;
          "
          @view="() => router.push(`/dashboard/sales/customers/${customer.id}`)"
        />
      </div>
    </section>

    <!-- Modals -->
    <AddCustomerModal
      v-model="showEdit"
      :edit="showEdit"
      :item="selectedCustomer"
      :loading="isUpdating"
      @submit="handleUpdateCustomer"
    />
    <DeleteCustomerModal
      v-model="showDelete"
      :customer="selectedCustomer"
      :loading="isDeleting"
      @delete="handleDeleteCustomer"
    />
  </div>
</template>
