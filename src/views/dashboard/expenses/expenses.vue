<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, watch, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import DropdownMenu from "~/components/common/dropdown-menu.vue";
import SearchBar from "~/components/common/search-bar.vue";
import SelectInput from "~/components/common/select-input.vue";
import EmptyData from "~/components/dashboard/empty-data.vue";
import AddExpenseModal from "~/components/dashboard/expenses/add-expense-modal.vue";
import DeleteExpenseModal from "~/components/dashboard/expenses/delete-expense-modal.vue";
import FilterExpenseModal from "~/components/dashboard/expenses/filter-expense-modal.vue";
import SortExpenseModal from "~/components/dashboard/expenses/sort-expense-modal.vue";
import { useApi } from "~/composables/useApi";
import { formatNaira } from "~/utilities/formatNaira";

const now = new Date();
const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

const thisYearStart = new Date(now.getFullYear(), 0, 1).toISOString().split("T")[0];
const thisYearEnd = new Date(now.getFullYear(), 11, 31).toISOString().split("T")[0];

const summaryPeriodOptions = computed(() => [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Month", value: `range&start_date=${thisMonthStart}&end_date=${thisMonthEnd}` },
  { label: "This Year", value: `range&start_date=${thisYearStart}&end_date=${thisYearEnd}` },
]);

// Default range set to "This Month"
const range = ref(summaryPeriodOptions.value[2]);

const router = useRouter();
const showModal = ref(false);
const showFilterModal = ref(false);
const showSortModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const sortedParams = ref("");
const filteredParams = ref("");

const COLORS = ["bg-blue-600", "bg-cyan-500", "bg-violet-500", "bg-fuchsia-500", "bg-brand-300"];

const categories = computed(() => {
  if (!expenseSummary.value?.summary?.top_5_categories) return [];

  return expenseSummary.value.summary.top_5_categories.map((exp, i) => {
    return {
      label: exp.category__category__name || exp.category__name || "Unknown",
      value: exp.total,
      color: COLORS[i],
    };
  });
});

const total = computed(() => expenseSummary.value?.summary?.total_expense);

const menuItems = computed(() => [
  {
    label: "View expense",
    icon: "mdi:eye",
    action: () => router.push(`/dashboard/expenses/${activeItem.value.id}`),
  },
  {
    label: "Edit expense",
    icon: "mdi:pencil",
    action: () => {
      isEditing.value = true;
      showModal.value = true;
    },
  },
  {
    label: "Remove",
    class: "text-error",
    icon: "mdi:delete",
    action: () => {
      showDeleteModal.value = true;
    },
  },
]);

const { request, loading } = useApi();
const expenses = ref({ count: 0, results: [] });
const expenseSummary = ref();
const activeItem = ref({});
const searchValue = ref("");

const fetchExpenses = async (searchQuery = "") => {
  try {
    const [expenseResponse, summaryResponse] = await Promise.all([
      request("get", `/expenses/?search=${searchQuery}`),
      request("get", `/expenses/period-summary?period=${range.value.value}`),
    ]);
    expenses.value = expenseResponse.data;
    expenseSummary.value = summaryResponse.data;
    sortedParams.value = "";
    filteredParams.value = "";
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
};

// Watch for changes in search input and fetch expenses
watch(searchValue, (newValue) => {
  fetchExpenses(newValue);
});

onMounted(fetchExpenses);

// Watch for changes in range and update summary accordingly
watch(range, fetchExpenses);

const addExpense = async (payload) => {
  try {
    await request("post", "/expenses/", payload);
    toast.success("Expenses added successfully");
    showModal.value = false;
    fetchExpenses();
  } catch (err) {
    console.log("Error adding expense:", err);
  }
};

const editExpense = async (payload) => {
  try {
    await request("put", `/expenses/${activeItem.value?.id}/`, payload);
    toast.success("Expenses UPDATED successfully");
    showModal.value = false;
    fetchExpenses();
  } catch (err) {
    console.log("Error adding expense:", err);
  }
};

const handleSubmit = (v) => {
  if (isEditing.value) editExpense(v);
  else addExpense(v);
};

const handleDelete = async () => {
  try {
    await request("delete", `/expenses/${activeItem.value.id}/`);
    toast.success("Expenses DELETED successfully");
    showDeleteModal.value = false;
    fetchExpenses();
  } catch (err) {
    console.log("Error adding expense:", err);
  }
};

const sortExpenses = (sortData) => {
  const { key, direction } = sortData;
  expenses.value.results = expenses.value.results.sort((a, b) => {
    if (key.value === "amount") {
      return direction.value === "low_high" ? a.amount - b.amount : b.amount - a.amount;
    }
    if (key.value === "date") {
      return direction.value === "latest_earliest"
        ? new Date(b.date) - new Date(a.date) // Latest first
        : new Date(a.date) - new Date(b.date); // Earliest first
    }
    return 0; // Default case (no sorting applied)
  });
  if (key.value) sortedParams.value = key.label + " - " + direction.label;
  else sortedParams.value = "";
  showSortModal.value = false;
};

const filterExpenses = async (filters) => {
  try {
    let queryParams = [];

    if (filters.amount_min) queryParams.push(`amount_min=${filters.amount_min}`);
    if (filters.amount_max) queryParams.push(`amount_max=${filters.amount_max}`);
    if (filters.recipient) queryParams.push(`recipient=${filters.recipient}`);
    if (filters.category?.value) queryParams.push(`category=${filters.category.value}`);
    if (filters.channel?.value) queryParams.push(`channel=${filters.channel.value}`);

    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    const { data } = await request("get", `/expenses/${queryString}`);
    expenses.value = data;
    filteredParams.value = queryParams.join(", ");
    showFilterModal.value = false;
  } catch (error) {
    console.error("Error fetching filtered expenses:", error);
  }
};
</script>

<template>
  <div>
    <div v-if="loading && !expenses.results?.length" class="flex justify-center items-center py-16">
      <Icon icon="eos-icons:bubble-loading" class="h-20 w-20 text-brand-300" />
    </div>

    <EmptyData
      v-else-if="!expenses.results?.length && !filteredParams"
      variant="expense"
      title="No expense recorded"
      subtitle="You have no expense yet"
      action-label="Add Expense"
      @action="showModal = true"
    />

    <div v-else>
      <section>
        <div class="flex justify-end">
          <SelectInput
            v-model="range"
            dense
            placeholder="Select Range"
            :options="summaryPeriodOptions"
          />
        </div>
        <div class="w-full border border-brand-200 mt-4 rounded-xl p-4">
          <div class="text-center">
            <h3 class="text-xl font-medium">
              {{ formatNaira(total || 0) }}
            </h3>
            <p class="text-sm text-brand-400">Total expense</p>

            <div class="flex w-full h-6 rounded overflow-hidden border my-4">
              <div
                v-for="(item, index) in categories"
                :key="index"
                :style="{ width: `${(item.value / total) * 100}%` }"
                class="h-full transition-all"
                :class="item.color"
              ></div>
            </div>
            <ul class="space-y-2 mt-4">
              <li v-for="v in categories" :key="v.label" class="flex justify-between gap-2 text-sm">
                <span class="text-brand-600 flex-1 flex items-center gap-1.5 overflow-hidden">
                  <span class="h-3 w-3 block rounded-sm shrink-0" :class="v.color" />
                  <span class="truncate">{{ v.label }}</span>
                </span>
                <span class="font-medium shrink-0">{{ formatNaira(v.value) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mt-6">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-base font-medium">All expenses ({{ expenses.count }})</h3>
          <AppButton label="Add" small @click="showModal = true" />
        </div>
        <!-- Filters and sortings  -->
        <section class="mb-4">
          <div class="flex gap-2 items-end">
            <div class="flex-1">
              <SearchBar v-model="searchValue" />
            </div>
            <AppButton
              icon="mdi:sort"
              :variant="sortedParams ? 'tonal' : 'outlined'"
              @click="showSortModal = true"
            />
            <AppButton
              icon="mdi:filter"
              :variant="filteredParams ? 'tonal' : 'outlined'"
              @click="showFilterModal = true"
            />
          </div>
          <p v-if="sortedParams" class="text-sm mt-2 text-brand-400">
            Sorted By: <span class="text-brand-500 font-medium">{{ sortedParams }}</span>
          </p>
          <!-- <p v-if="filteredParams" class="text-sm mt-2 text-brand-400">
            Filtered By: <span class="text-brand-500 font-medium">{{ filteredParams }}</span>
          </p> -->
        </section>
        <!--  -->
        <div
          v-for="exp in expenses.results"
          :key="exp.id"
          class="border border-brand-200 p-3 rounded-xl mb-4"
        >
          <div class="flex justify-between text-sm">
            <h4 class="font-medium">{{ exp.name }}</h4>
            <span class="font-medium">{{ formatNaira(exp.amount) }}</span>
          </div>
          <div class="flex justify-between text-sm text-brand-400 mt-0.5">
            <p>{{ exp.recipient }}</p>
            <span>{{ new Date(exp.date).toDateString() }}</span>
          </div>
          <hr class="border-brand-200 my-2" />
          <div class="flex justify-between gap-1">
            <div class="flex flex-wrap gap-1">
              <span
                class="text-brand-300 text-xs border border-brand-200 px-2 py-1 rounded-xl capitalize"
              >
                {{ exp.channel }}
              </span>
              <span class="text-brand-300 text-xs border border-brand-200 px-2 py-1 rounded-xl">
                {{ exp.category_name }}
              </span>
            </div>
            <DropdownMenu :items="menuItems">
              <template #label>
                <Icon icon="tabler:dots" class="text-lg" @click="activeItem = exp" />
              </template>
            </DropdownMenu>
          </div>
        </div>

        <div
          v-if="filteredParams && !expenses.results.length"
          class="flex flex-col justify-center items-center gap-1 py-4"
        >
          <Icon icon="mdi:file-outline" class="text-brand-300 h-10 w-10" />
          <p class="text-sm text-brand-400">No expenses found for the selected filters</p>
        </div>
      </section>
    </div>

    <!--  -->
    <AddExpenseModal
      v-model="showModal"
      :loading="loading"
      :item="activeItem"
      :edit="isEditing"
      @submit="handleSubmit"
    />
    <DeleteExpenseModal v-model="showDeleteModal" :loading="loading" @delete="handleDelete" />
    <FilterExpenseModal v-model="showFilterModal" :loading="loading" @submit="filterExpenses" />
    <SortExpenseModal v-model="showSortModal" :loading="loading" @submit="sortExpenses" />
  </div>
</template>
