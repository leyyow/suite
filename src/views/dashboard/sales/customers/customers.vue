<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import SearchBar from "~/components/common/search-bar.vue";
import AddCustomerModal from "~/components/dashboard/customers/add-customer-modal.vue";
import CustomerCard from "~/components/dashboard/customers/customer-card.vue";
import DeleteCustomalModal from "~/components/dashboard/customers/delete-customal-modal.vue";
import EmptyData from "~/components/dashboard/empty-data.vue";

const router = useRouter();

const empty = ref(false);
const showAdd = ref(false);
const showDelete = ref(false);
const isEditing = ref(false);
const selectedCustomer = ref(null);
const searchValue = ref("");

watch(showAdd, (val) => {
  if (!val) isEditing.value = false;
});
</script>

<template>
  <div>
    <EmptyData
      v-if="empty"
      variant="customer"
      title="No Customer"
      subtitle="You have no saved customer yet"
      action-label="Add a Customer"
    />

    <section>
      <h3 class="text-base font-semibold mb-2">All Customers ({{ 4 }})</h3>
      <SearchBar v-model="searchValue" placeholder="Search by name..." />
      <!-- tabs -->

      <!--  -->

      <div class="space-y-4 mt-4">
        <CustomerCard
          v-for="v in 4"
          :key="v"
          @delete="showDelete = true"
          @edit="
            showAdd = true;
            isEditing = true;
          "
          @view="() => router.push('/dashboard/sales/customers/' + v)"
          @open:dropdown="
            selectedCustomer = {
              id: v,
              name: 'Seyi Makinde',
              gender: 'Male',
              phone: '08012345678',
              email: 'seyimankinde@mailsac.com',
              birthday: '1998-12-12',
              address: 'No 12, Ikorodu Road, Lagos',
              image: '',
            }
          "
        />
      </div>
    </section>

    <!--  -->
    <AddCustomerModal v-model="showAdd" :edit="isEditing" :item="selectedCustomer" />
    <DeleteCustomalModal v-model="showDelete" @delete="showDelete = false" />
  </div>
</template>
