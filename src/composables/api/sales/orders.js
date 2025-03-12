import { useApiMutation, useApiQuery } from "./api";

export function useGetOrders(params = {}) {
  return useApiQuery("/inventory/order/", params);
}

export function useGetOrderItems(id) {
  return useApiQuery(`/inventory/order_items/${id}/`);
}

export function useCreateOrder() {
  return useApiMutation((data) => ({
    url: "/inventory/order/create/",
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/json" },
  }));
}

export function useUpdateOrder() {
  return useApiMutation(({ id, payload }) => ({
    url: `/inventory/order/update/${id}/`,
    method: "PATCH",
    body: payload,
    headers: { "Content-Type": "application/json" },
  }));
}

export function useDeleteOrder() {
  return useApiMutation((id) => ({
    url: `/inventory/order/delete/${id}/`,
    method: "DELETE",
  }));
}

export function useUpdateOrderItem() {
  return useApiMutation(({ id, payload }) => ({
    url: `/inventory/order_item/update/${id}/`,
    method: "PATCH",
    body: payload,
    headers: { "Content-Type": "application/json" },
  }));
}

export function useUpdateFulfilled() {
  return useApiMutation((id) => ({
    url: `/inventory/order_item/update_fulfilled/${id}/`,
    method: "PATCH",
  }));
}
