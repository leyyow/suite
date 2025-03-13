import { useApiMutation, useApiQuery } from "../api";

export function useGetInventory(params = {}) {
  return useApiQuery("/inventory/product/", params);
}

export function useBulkUploadProducts() {
  return useApiMutation((data) => ({
    url: "/inventory/product/create/bulk/",
    method: "POST",
    body: data,
    headers: { "Content-Type": "multipart/form-data" },
  }));
}

export function useCreateProduct() {
  return useApiMutation((data) => ({
    url: "/inventory/product/create/",
    method: "POST",
    body: data,
    headers: { "Content-Type": "multipart/form-data" },
  }));
}

export function useUpdateProduct() {
  return useApiMutation(({ id, payload }) => ({
    url: `/inventory/product/update/${id}/`,
    method: "PATCH",
    body: payload,
    headers: { "Content-Type": "application/json" },
  }));
}

export function useDeleteProduct() {
  return useApiMutation((id) => ({
    url: `/inventory/product/delete/${id}/`,
    method: "PATCH",
  }));
}

export function useUploadProductImages() {
  return useApiMutation((data) => ({
    url: "/inventory/product/image_create/",
    method: "POST",
    body: data,
    headers: { "Content-Type": "multipart/form-data" },
  }));
}

export function useUpdateProductImage() {
  return useApiMutation((data) => ({
    url: "/inventory/product/image_product_update/",
    method: "PUT",
    body: data,
  }));
}
