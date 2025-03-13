<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import Dropdown from "~/components/common/dropdown.vue";
import AddCustomerModal from "~/components/dashboard/customers/add-customer-modal.vue";
import AddExpenseModal from "~/components/dashboard/expenses/add-expense-modal.vue";
import LogoutModal from "~/components/others/logout-modal.vue";
import { useCreateExpense } from "~/composables/api/expense";
import { useCreateCustomer } from "~/composables/api/sales/customers";
import { useAuthStore } from "~/stores/auth";
import { useExpenseStore } from "~/stores/expense";
import { useSalesStore } from "~/stores/sales";

const route = useRoute();
const router = useRouter();
const salesStore = useSalesStore();
const { user } = useAuthStore();
const expenseStore = useExpenseStore();

const showExpenseModal = ref(false);
const showCustomer = ref(false);
const signoutModal = ref(false);

const salesLinks = computed(() => [
  { title: "Production", icon: "duo-icons:building", to: "/dashboard/sales" },
  { title: "Inventory", icon: "solar:shop-bold-duotone", to: "/dashboard/sales/inventory" },
  { title: "Orders", icon: "solar:bag-smile-bold-duotone", to: "/dashboard/sales/orders" },
  { title: "Customers", icon: "duo-icons:user", to: "/dashboard/sales/customers" },
]);

const headerLinks = computed(() => [
  { title: "Home", to: "/dashboard" },
  { title: "Sales", to: "/dashboard/sales" },
  { title: "Expenses", to: "/dashboard/expenses" },
  { title: "Growth 🚧", to: "/dashboard/growth" },
]);

const headerActions = computed(() => [
  { label: "Profile", icon: "duo-icons:user", action },
  { label: "Store", icon: "uim:box", action },
  { label: "Billing", icon: "uim:box", action },
  {
    label: "Settings",
    icon: "fluent:settings-20-filled",
    action: () => router.push("/dashboard/settings"),
  },
  { label: "Help", icon: "uim:box", action },
  {
    label: "Logout",
    iconClass: "text-error",
    class: "text-error",
    icon: "fluent:sign-out-20-filled",
    action: () => (signoutModal.value = true),
  },
]);

const isActive = (path) => computed(() => route.path.startsWith(path));
const isSalesActive = computed(() => route.path.startsWith("/dashboard/sales"));
const withBackButton = computed(() => route.meta.withBackButton);
const title = computed(() => route.meta.title);

// Expense Management
const { mutate: createExpense, loading: loadingExpense } = useCreateExpense();
const onAddExpense = (payload) => {
  createExpense(payload).then((data) => {
    toast.success("Expenses ADDED successfully");
    showExpenseModal.value = false;
    expenseStore.setLatest({ id: data.id, timestamp: Date.now() });
  });
};

// Customer Management
const { mutate: createCustomer, loading: isCreatingCustomer } = useCreateCustomer();
const handleAddCustomer = (payload) => {
  createCustomer(payload).then((res) => {
    toast.success("Customer ADDED successfully");
    salesStore.addCustomer({ ...res.customer, newest: true, timestamp: Date.now() });
    showCustomer.value = false;
  });
};

// Floating Action Button Menu
const action = () => toast("Coming soon");
const fabMenuItems = [
  {
    label: "Product",
    icon: "uim:box",
    action: () => router.push("/dashboard/sales/inventory/create"),
  },
  { label: "Customer", icon: "duo-icons:user", action: () => (showCustomer.value = true) },
  { label: "Order", icon: "solar:bag-smile-bold-duotone", action },
  {
    label: "Expense",
    icon: "lets-icons:paper-duotone",
    action: () => (showExpenseModal.value = true),
  },
];
</script>

<template>
  <div class="h-screen flex flex-col bg-brand-100">
    <!-- Header (App Bar) -->
    <header class="bg-brand-50 sticky top-0 z-[10]">
      <div v-if="withBackButton" class="flex items-center gap-3 py-2 px-4">
        <AppButton
          variant="outlined"
          icon="solar:arrow-left-outline"
          small
          @click="router.go(-1)"
        />
        <h2 class="text-base font-semibold">{{ title }}</h2>
      </div>
      <template v-else>
        <div class="flex items-center justify-between px-4 py-2">
          <img src="/leyyow.png" class="h-8" alt="Flowbite Logo" />
          <Dropdown :items="headerActions">
            <template #preprend>
              <div class="flex items-center gap-2 py-2 px-3">
                <!-- <img class="h-8 w-8 bg-brand-200 rounded-lg" /> -->
                <span class="h-8 w-8 rounded-lg bg-brand-200 flex items-center justify-center">
                  <Icon icon="duo-icons:user" class="text-brand-500 h-4 w-4" />
                </span>
                <div class="text-sm truncate">
                  <h3>{{ user?.store.store_name }}</h3>
                  <p class="text-xs text-brand-300">{{ user?.store.email }}</p>
                </div>
              </div>
            </template>
            <template #label="{ open }">
              <AppButton :icon="open ? 'mdi:close' : 'mdi:menu'" small variant="outlined" />
            </template>
          </Dropdown>
        </div>
        <nav class="flex w-full border-y border-brand-200">
          <component
            :is="['Expenses', 'Sales'].includes(link.title) ? 'RouterLink' : 'span'"
            v-for="link in headerLinks"
            :key="link.title"
            :to="link.to"
            :class="[
              'flex-1',
              'text-brand-300 text-sm py-2 border-r border-brand-200 last:border-0 text-center',
              { 'text-brand-500 bg-white': isActive(link.to).value && link.title !== 'Home' },
              { 'text-brand-500 bg-white': link.title === 'Home' && route.path === link.to },
            ]"
          >
            {{ link.title }}
          </component>
        </nav>
      </template>
    </header>

    <!-- Main content area -->
    <main class="flex-1 px-2.5 py-4 sm:p-4 overflow-auto">
      <router-view />
    </main>

    <!-- Bottom Navbar (for small screens) -->
    <nav
      v-if="!withBackButton"
      class="bg-brand-100 border-t border-brand-200 sticky bottom-0 w-full shadow-lg"
    >
      <div
        class="flex p-2 h-14"
        :class="{ 'justify-around': isSalesActive, 'justify-center': !isSalesActive }"
      >
        <template v-if="isSalesActive">
          <RouterLink
            v-for="link in salesLinks.slice(0, 2)"
            :key="link.title"
            :to="link.to"
            :class="[
              'flex flex-col items-center gap-0.5',
              isActive(link.to).value && link.title !== 'Production'
                ? 'text-brand-500'
                : link.title === 'Production' && route.path === link.to
                  ? 'text-brand-500'
                  : 'text-brand-300',
            ]"
          >
            <Icon :icon="link.icon" class="h-7 w-7" />
            <span class="text-xs">{{ link.title }}</span>
          </RouterLink>
        </template>
        <!--  FAB -->
        <Dropdown :items="fabMenuItems" menu-class="bottom-full -right-10">
          <template #label>
            <AppButton icon="lets-icons:add-square-duotone" small />
          </template>
        </Dropdown>
        <!--  -->
        <template v-if="isSalesActive">
          <RouterLink
            v-for="link in salesLinks.slice(2)"
            :key="link.title"
            :to="link.to"
            :class="[
              'flex flex-col items-center space-y-1',
              isActive(link.to).value && link.title !== 'Production'
                ? 'text-brand-500'
                : link.title === 'Production' && route.path === link.to
                  ? 'text-brand-500'
                  : 'text-brand-300',
            ]"
          >
            <Icon :icon="link.icon" class="text-2xl" />
            <span class="text-xs">{{ link.title }}</span>
          </RouterLink>
        </template>
      </div>
    </nav>

    <!--  -->
    <AddExpenseModal v-model="showExpenseModal" :loading="loadingExpense" @submit="onAddExpense" />
    <AddCustomerModal
      v-model="showCustomer"
      :loading="isCreatingCustomer"
      @submit="handleAddCustomer"
    />
    <!--  -->
    <LogoutModal v-model="signoutModal" />
  </div>
</template>
