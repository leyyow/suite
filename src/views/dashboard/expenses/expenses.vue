<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import LoadingIcon from "~/components/common/loading-icon.vue";
import SearchBar from "~/components/common/search-bar.vue";
import SelectInput from "~/components/common/select-input.vue";
import EmptyData from "~/components/dashboard/empty-data.vue";
import AddExpenseModal from "~/components/dashboard/expenses/add-expense-modal.vue";
import DeleteExpenseModal from "~/components/dashboard/expenses/delete-expense-modal.vue";
import ExpenseCard from "~/components/dashboard/expenses/expense-card.vue";
import FilterExpenseModal from "~/components/dashboard/expenses/filter-expense-modal.vue";
import SortExpenseModal from "~/components/dashboard/expenses/sort-expense-modal.vue";
import {
  useDeleteExpense,
  useGetExpenses,
  useGetExpenseSummary,
  useUpdateExpense,
} from "~/composables/api/expense";
import { useExpenseStore } from "~/stores/expense";
import { formatNaira } from "~/utilities/formatNaira";

const summaryPeriodOptions = computed(() => [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Month", value: "this_month" },
  { label: "This Year", value: "this_year" },
  { label: "All Time", value: "all" },
]);

const router = useRouter();
const expenseStore = useExpenseStore();

const range = computed({
  get: () => expenseStore.range,
  set: (val) => expenseStore.setRange(val),
});

const showModal = ref(false);
const showFilterModal = ref(false);
const showSortModal = ref(false);
const showDeleteModal = ref(false);
const sortedParams = ref("");
const filteredParams = ref("");

const COLORS = ["bg-blue-600", "bg-cyan-500", "bg-violet-500", "bg-fuchsia-500", "bg-brand-300"];

const categories = computed(() => {
  if (!expSummary.value?.summary?.top_5_categories) return [];

  return expSummary.value.summary.top_5_categories.map((exp, i) => {
    return {
      label: exp.category__category__name || exp.category__name || "Unknown",
      value: exp.total,
      color: COLORS[i],
    };
  });
});

const total = computed(() => expSummary.value?.summary?.total_expense);

const activeItem = ref({});
const searchValue = ref("");
const filters = ref({
  amount_min: "",
  amount_max: "",
  recipient: "",
  category: "",
  channel: "",
  search: "",
});
// Only include non-empty filters
const nonEmptyFilters = computed(() => {
  return Object.fromEntries(Object.entries(filters.value).filter(([, value]) => value !== ""));
});

const [dYear, dMonth] = [new Date().getFullYear(), new Date().getMonth() + 1];
const thisMonthStart = dYear + "-" + `${dMonth}`.padStart(2, "0") + "-01";
const thisMonthEnd = new Date(dYear, dMonth, 0).toISOString().split("T")[0];
const thisYearStart = dYear + "-01-01";
const thisYearEnd = dYear + "-12-31";

const period = computed(() => {
  if (range.value.value === "all") {
    return { period: "range", start_date: "2000-01-01", end_date: thisYearEnd };
  }
  if (range.value.value === "this_month") {
    return { period: "range", start_date: thisMonthStart, end_date: thisMonthEnd };
  }
  if (range.value.value === "this_year") {
    return { period: "range", start_date: thisYearStart, end_date: thisYearEnd };
  }
  return { period: range.value.value };
});

const combinedFilters = computed(() => ({ ...nonEmptyFilters.value, ...period.value }));

const {
  data: allExpenses,
  loading,
  error: expError,
  refetch: fetchExpenses,
} = useGetExpenses(combinedFilters);
const { data: expSummary, loading: loadingSummary } = useGetExpenseSummary(combinedFilters);

const formattedExpenseList = computed(() => {
  if (!allExpenses.value?.results) return [];
  // Find the latest expense (not more than 1 min ago)
  const latestExpense = allExpenses.value.results.find(
    (exp) =>
      exp.id === expenseStore.latest.id && expenseStore.latest.timestamp > Date.now() - 60 * 1000,
  );
  if (!latestExpense) return allExpenses.value.results;
  // Move the latest expense to the top
  const otherExpenses = allExpenses.value.results.filter((x) => x.id !== latestExpense.id);
  return [latestExpense, ...otherExpenses];
});

const { mutate: updateExpense, loading: loadingEdit } = useUpdateExpense();
const onEditExpense = async (payload) => {
  try {
    await updateExpense({ id: activeItem.value?.id, payload });
    toast.success("Expenses UPDATED successfully");
    showModal.value = false;
    fetchExpenses();
  } catch (err) {
    console.log("Error adding expense:", err);
  }
};

const { mutate: deleteExpense, loading: loadingDelete } = useDeleteExpense();
const handleDelete = async () => {
  try {
    await deleteExpense(activeItem.value.id);
    toast.success("Expenses DELETED successfully");
    showDeleteModal.value = false;
    fetchExpenses();
  } catch (err) {
    console.log("Error adding expense:", err);
  }
};

const sortExpenses = (sortData) => {
  const { key, direction } = sortData;
  allExpenses.value.results = allExpenses.value.results.sort((a, b) => {
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

const filterExpenses = async (data) => {
  filters.value = {
    ...data,
    category: data.category?.value,
    recipient: data.recipient?.value,
  };
  showFilterModal.value = false;
  filteredParams.value = Object.entries(nonEmptyFilters.value)
    .map(([key, value]) => {
      if (["category", "recipient"].includes(key)) return data[key].label;
      if (key === "has_receipt") return value ? "Has Receipt" : "No Receipt";
      return value;
    })
    .join(", ");
};

const onClearFilters = () => {
  filters.value = {
    amount_min: "",
    amount_max: "",
    recipient: "",
    category: "",
    channel: "",
    search: "",
  };
  filteredParams.value = "";
  sortedParams.value = "";
};

watch(expError, () => {
  if (filteredParams.value || sortedParams.value) {
    onClearFilters();
  }
});
watch(
  () => expenseStore.latest,
  () => {
    expenseStore.resetRange();
    fetchExpenses();
  },
  { deep: true },
);
</script>

<template>
  <div>
    <div class="flex justify-end">
      <SelectInput
        v-model="range"
        dense
        placeholder="Select Range"
        :options="summaryPeriodOptions"
      />
    </div>

    <EmptyData
      v-if="!allExpenses?.results?.length && !filteredParams && !loading"
      variant="expense"
      title="No expense recorded"
      subtitle="You have no expense yet"
      action-label="Add Expense"
      @action="showModal = true"
    />

    <div v-else>
      <section>
        <div class="w-full bg-brand-50 border border-brand-200 mt-4 rounded-xl p-4">
          <LoadingIcon v-if="loadingSummary" />
          <div v-else class="text-center">
            <h3 class="text-xl font-medium">
              {{ formatNaira(total || 0) }}
            </h3>
            <p class="text-sm text-brand-400">Total expenses</p>

            <div
              v-if="categories.length"
              class="flex w-full h-6 rounded overflow-hidden border border-brand-200 my-4"
            >
              <div
                v-for="(item, index) in categories"
                :key="index"
                :style="{ width: `${(item.value / total) * 100}%` }"
                class="h-full transition-all"
                :class="item.color"
              ></div>
            </div>
            <ul v-if="categories.length" class="space-y-2 mt-4">
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
          <h3 class="text-base font-medium">All expenses ({{ allExpenses?.count || 0 }})</h3>
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
          <div
            v-if="sortedParams || filteredParams"
            class="flex justify-between items-center gap-4 mt-3"
          >
            <p v-if="sortedParams" class="text-sm text-brand-300">
              Sorted By: <span class="text-brand-400 font-medium">{{ sortedParams }}</span>
            </p>
            <p v-if="filteredParams" class="text-sm text-brand-300">
              Filtered by: <span class="text-brand-400 font-medium">{{ filteredParams }}</span>
            </p>
            <AppButton
              smaller
              label="Clear all"
              variant="outlined"
              class="flex-shrink-0"
              @click="onClearFilters"
            />
          </div>
        </section>

        <LoadingIcon v-if="loading" />

        <template v-else>
          <div class="space-y-4">
            <ExpenseCard
              v-for="exp in formattedExpenseList"
              :key="exp.id"
              :expense="exp"
              @view="router.push(`/dashboard/expenses/${exp.id}`)"
              @edit="showModal = true"
              @delete="showDeleteModal = true"
              @open:dropdown="activeItem = exp"
            />
          </div>

          <div
            v-if="filteredParams && !allExpenses?.results?.length"
            class="flex flex-col justify-center items-center gap-1 py-4"
          >
            <Icon icon="mdi:file-outline" class="text-brand-300 h-10 w-10" />
            <p class="text-sm text-brand-400">No expenses found for the selected filters</p>
          </div>
        </template>
      </section>
    </div>

    <!--  -->
    <AddExpenseModal
      v-model="showModal"
      :loading="loadingEdit"
      :item="activeItem"
      :edit="showModal"
      @submit="onEditExpense"
    />
    <DeleteExpenseModal v-model="showDeleteModal" :loading="loadingDelete" @delete="handleDelete" />
    <FilterExpenseModal
      v-model="showFilterModal"
      :loading="loading"
      :reset="!filteredParams"
      @submit="filterExpenses"
    />
    <SortExpenseModal v-model="showSortModal" :loading="loading" @submit="sortExpenses" />
  </div>
</template>
