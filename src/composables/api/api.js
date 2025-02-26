import { ref, watch, watchEffect } from "vue";
import axios from "axios";
import { useAuthStore } from "~/stores/auth";
import { toast } from "vue3-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach access token to each request
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
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
    const authStore = useAuthStore();
    if (error.response?.status === 401 && authStore.refreshToken) {
      try {
        const newToken = await refreshToken(authStore);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config); // Retry the original request
      } catch {
        authStore.logout();
        window.location.reload(); // Redirect to login page
      }
    }
    handleApiError(error);
    return Promise.reject(error);
  },
);

// Refresh Token Logic
async function refreshToken(authStore) {
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

// Handle API errors globally
function handleApiError(error) {
  console.error("API Error:", error);
  const message =
    error.code === "ERR_NETWORK"
      ? "Network Error: Unable to reach the server"
      : error.response?.data?.message || "Oops! Something went wrong!";
  toast.error(message);
}

// General API request function
async function apiRequest(config) {
  try {
    const response = await api(config);
    return response.data.data || response.data;
  } catch (error) {
    throw error.response?.data || error.message || "An error occurred";
  }
}

// Reusable API Query (GET Requests)
export function useApiQuery(endpoint, params = {}, enabled = true) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const fetchData = async () => {
    if (!enabled) return;
    loading.value = true;
    error.value = null;

    try {
      data.value = await apiRequest({
        method: "GET",
        url: endpoint,
        params: params.value || params,
      });
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  watchEffect(fetchData); // Auto-fetch when component mounts
  watch(() => params, fetchData, { deep: true }); // Refetch when params change

  return { data, error, loading, refetch: fetchData };
}

// Reusable API Mutation (POST, PUT, PATCH, DELETE)
export function useApiMutation(endpointFn) {
  const loading = ref(false);
  const error = ref(null);

  const mutate = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const { url, method, body } = endpointFn(data);
      return await apiRequest({ method, url, data: body });
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { mutate, loading, error };
}
