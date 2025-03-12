import { useApiMutation, useApiQuery } from "../api";

export function useGetCustomerStats(params = {}) {
  return useApiQuery("/account/customer/stats/", params);
}

export function useBulkUploadCustomers() {
  return useApiMutation((data) => ({
    url: "/account/customer/create/bulk/",
    method: "POST",
    body: data,
    headers: { "Content-Type": "multipart/form-data" },
  }));
}

export function useCreateCustomer() {
  return useApiMutation((data) => ({
    url: "/account/customer/create/",
    method: "POST",
    body: data,
  }));
}

export function useUpdateCustomer() {
  return useApiMutation(({ id, payload }) => ({
    url: `/account/customer/${id}/`,
    method: "PATCH",
    body: payload,
  }));
}

export function useDeleteCustomer() {
  return useApiMutation((id) => ({
    url: `/account/customer/${id}/delete`,
    method: "DELETE",
  }));
}
