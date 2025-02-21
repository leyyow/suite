import { useApiMutation, useApiQuery } from "./api";

export function useGetExpenses() {
  return useApiQuery(`/expenses/`);
}

export function useCreateExpense() {
  return useApiMutation((data) => ({
    url: "/expenses/",
    method: "POST",
    body: data,
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
