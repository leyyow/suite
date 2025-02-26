import { useApiMutation, useApiQuery } from "./api";

export function useGetExpenses(params) {
  return useApiQuery(`/expenses/`, params);
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
  }));
}

export function useUpdateExpense() {
  return useApiMutation(({ id, payload }) => ({
    url: `/expenses/${id}/`,
    method: "PUT",
    body: payload,
  }));
}

export function useDeleteExpense() {
  return useApiMutation((id) => ({
    url: `/expenses/${id}/`,
    method: "DELETE",
  }));
}

export function useGetExpenseCategories() {
  return useApiQuery("/expenses/categories/");
}

export function useGetExpenseSubCategoris() {
  return useApiQuery("/expenses/subcategories/");
}

export function useGetExpenseRecipients() {
  return useApiQuery("/expenses/recipients/");
}

export function useCreateRecipient() {
  return useApiMutation((data) => ({
    url: "/expenses/recipients/",
    method: "POST",
    body: data,
  }));
}
