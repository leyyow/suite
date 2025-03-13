import { useApiMutation, useApiQuery } from "./api";

export function useGetExpenses(params = {}, { skip = false } = {}) {
  return useApiQuery(`/expenses/`, params, skip);
}

export function useGetExpenseSummary(params) {
  return useApiQuery(`/expenses/period-summary/`, params);
}

export function useGetSingleExpense(id) {
  return useApiQuery(`/expenses/${id}`);
}

export function useCreateExpense() {
  return useApiMutation((data) => ({
    url: "/expenses/",
    method: "POST",
    body: data,
    headers: { "Content-Type": "multipart/form-data" },
  }));
}

export function useUpdateExpense() {
  return useApiMutation(({ id, payload }) => ({
    url: `/expenses/${id}/`,
    method: "PUT",
    body: payload,
    headers: { "Content-Type": "multipart/form-data" },
  }));
}

export function useDeleteExpense() {
  return useApiMutation((id) => ({
    url: `/expenses/${id}/`,
    method: "DELETE",
  }));
}

export function useGetExpenseCategories({ skip = false }) {
  return useApiQuery("/expenses/categories/", {}, skip);
}

export function useGetExpenseSubCategories({ skip = false }) {
  return useApiQuery("/expenses/subcategories/", {}, skip);
}

export function useGetExpenseRecipients({ skip = false }) {
  return useApiQuery("/expenses/recipients/", {}, skip);
}

export function useCreateRecipient() {
  return useApiMutation((data) => ({
    url: "/expenses/recipients/",
    method: "POST",
    body: data,
  }));
}
