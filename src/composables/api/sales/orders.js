import { useApiQuery } from "./api";

export function useGetOrdersApi(params) {
  return useApiQuery(`/inventory/order/`, params);
}

export function useGetOrdersSummaryApi(params) {
  return useApiQuery(`/inventory/order/metrics/`, params);
}
