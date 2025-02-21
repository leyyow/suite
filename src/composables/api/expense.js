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
    url: `/expenses/${id}`,
    method: "DELETE",
  }));
}

export function useGetExpenseCategories() {
  return useApiQuery("/expenses/categories/");
}

export function useGetExpenseSubCategoris() {
  return useApiQuery("/expenses/subcategories/");
}

/*


===== Example ========
======================

<script setup>
import { useLoginApi, useUserProfile } from "~/api/auth";
import { useExpenses, useCreateExpense } from "~/api/expenses";

const { mutate: login, loading: loginLoading, error: loginError } = useLoginApi();
const { data: user, loading: userLoading } = useUserProfile();
const { data: expenses, loading: expensesLoading, refetch: refreshExpenses } = useExpenses();
const { mutate: createExpense, loading: creatingExpense } = useCreateExpense();

const handleLogin = async () => {
  try {
    await login({ email: "test@example.com", password: "password" });
    console.log("Login successful");
  } catch (err) {
    console.error("Login failed", err);
  }
};

const addExpense = async () => {
  try {
    await createExpense({ name: "New Expense", amount: 100 });
    refreshExpenses(); // Refetch updated list
  } catch (err) {
    console.error("Failed to add expense", err);
  }
};
</script>

*/
