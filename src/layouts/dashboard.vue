<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import DropdownMenu from "~/components/common/dropdown-menu.vue";
import AddExpenseModal from "~/components/dashboard/expenses/add-expense-modal.vue";
import LogoutModal from "~/components/others/logout-modal.vue";
import { useCreateExpense, useGetExpenses } from "~/composables/api/expense";

const salesLinks = computed(() => [
  { title: "Production", icon: "solar:home-2-bold", to: "/dashboard/sales" },
  {
    title: "Inventory",
    icon: "fluent:clipboard-note-16-regular",
    to: "/dashboard/sales/inventory",
  },
  { title: "Orders", icon: "icon-park-solid:shopping-bag", to: "/dashboard/sales/orders" },
  { title: "Customers", icon: "fluent:person-28-filled", to: "/dashboard/sales/customers" },
]);

const headerLinks = computed(() => [
  { title: "Home", to: "/dashboard" },
  { title: "Sales", to: "/dashboard/sales" },
  { title: "Expenses", to: "/dashboard/expenses" },
  { title: "Growth 🚧", to: "/dashboard/growth" },
]);

const action = () => toast("Coming soon");
const fabMenuItems = [
  { label: "Product", icon: "uim:box", action },
  { label: "Customer", icon: "fluent:person-28-filled", action },
  { label: "Sale", icon: "icon-park-solid:shopping-bag", action },
  {
    label: "Expense",
    icon: "fluent-emoji-high-contrast:receipt",
    iconClass: "rotate-180",
    action: () => (showExpenseModal.value = true),
  },
];

const route = useRoute();
const showExpenseModal = ref(false);
const signoutModal = ref(false);

const isActive = (path) => computed(() => route.path.startsWith(path));
const isSalesActive = computed(() => route.path.startsWith("/dashboard/sales"));

const { refetch } = useGetExpenses();
const { mutate: createExpense, loading: loadingExpense } = useCreateExpense();
const onAddExpense = (payload) => {
  createExpense(payload).then(() => {
    toast.success("Expenses added successfully");
    showExpenseModal.value = false;
    refetch();
  });
};
</script>

<template>
  <div class="h-screen flex flex-col bg-brand-100">
    <!-- Header (App Bar) -->
    <header class="bg-brand-50 sticky top-0">
      <div class="flex items-center justify-between px-4 py-2">
        <img src="/leyyow.png" class="h-8" alt="Flowbite Logo" />
        <AppButton
          icon="mdi:logout"
          variant="outlined"
          class="bg-error/10"
          icon-class="!text-error"
          small
          @click="signoutModal = true"
        />
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
    </header>

    <!-- Main content area -->
    <main class="flex-1 px-2.5 py-4 sm:p-4 overflow-auto">
      <router-view />
    </main>

    <!-- Bottom Navbar (for small screens) -->
    <nav class="bg-brand-100 border-t border-brand-200 sticky bottom-0 w-full shadow-lg">
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
              'flex flex-col items-center space-y-1 visib',
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
        <!--  FAB -->
        <DropdownMenu :items="fabMenuItems" menu-class="bottom-full -right-10">
          <template #label>
            <AppButton icon="uim:plus-square" small />
          </template>
        </DropdownMenu>
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
    <!--  -->
    <LogoutModal v-model="signoutModal" />
  </div>
</template>
