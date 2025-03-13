import { defineStore } from "pinia";
import { ref } from "vue";

export const useExpenseStore = defineStore(
  "expense",
  () => {
    const INIT_RANGE = { label: "This Month", value: "this_month" };

    const range = ref(INIT_RANGE);
    const latest = ref({ id: null, timestamp: null });

    const setRange = (newRange) => {
      range.value = newRange;
    };

    const resetRange = () => {
      range.value = INIT_RANGE;
    };

    const setLatest = (newVal) => {
      latest.value = newVal;
    };

    return { range, setRange, resetRange, latest, setLatest };
  },
  { persist: true },
);
