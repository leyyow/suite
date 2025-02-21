import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { toast } from "vue3-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useApi() {
  const loading = ref(false);
  const authStore = useAuthStore();

  // Axios instance
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  // Attach access token to each request
  api.interceptors.request.use(
    (config) => {
      if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Handle 401 errors & refresh token
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && authStore.refreshToken) {
        try {
          const newToken = await refreshToken();
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api(error.config); // Retry the original request
        } catch {
          authStore.logout();
          window.location.reload(); // Redirect to login page
        }
      }
      return Promise.reject(error);
    },
  );

  // Refresh Token Logic
  async function refreshToken() {
    try {
      const response = await axios.post(`${API_BASE_URL}/account/token/refresh/`, {
        refresh: authStore.refreshToken,
      });
      const { access, refresh } = response.data;
      authStore.setAuth(access, refresh, authStore.user);
      return access;
    } catch (error) {
      console.error("Session expired, login again");
      authStore.logout();
    }
  }

  // API method with loading state handling
  async function request(method, url, data = null) {
    loading.value = true;
    try {
      const response = await api({ method, url, data });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  // Handle API errors globally
  function handleApiError(error) {
    console.error("API Error:", error);
    toast.error(error.response?.data?.message || "Oops! something went wrong!");
  }

  return { request, loading };
}
