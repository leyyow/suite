import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const accessToken = ref(null);
    const refreshToken = ref(null);
    const user = ref(null);
    const router = useRouter();

    const isAuthenticated = computed(() => !!accessToken.value);

    // Set tokens & user info
    const setAuth = (token, refresh, userInfo) => {
      accessToken.value = token;
      refreshToken.value = refresh;
      user.value = userInfo;
    };

    // Logout user and redirect to login page
    const logout = () => {
      accessToken.value = null;
      refreshToken.value = null;
      user.value = null;
      router.push("/auth/login"); // Redirect to login page
    };

    return { accessToken, refreshToken, user, isAuthenticated, setAuth, logout };
  },
  {
    persist: true, // Enables state persistence
  },
);
