import { useApiMutation, useApiQuery } from "./api";

export function useLoginApi() {
  return useApiMutation((data) => ({
    url: "/account/get_auth_token/",
    method: "POST",
    body: data,
  }));
}

export function useRegisterApi() {
  return useApiMutation((data) => ({
    url: "/account/signup/",
    method: "POST",
    body: data,
  }));
}

export function useLogoutApi() {
  return useApiMutation(() => ({
    url: "/account/logout",
    method: "POST",
  }));
}

export function useGetProfile() {
  return useApiQuery("/account/me");
}
