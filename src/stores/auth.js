import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const accessToken = ref(null);
    const refreshToken = ref(null);
    const user = ref(null);

    const isAuthenticated = computed(() => !!accessToken.value);

    // Set tokens & user info
    const setAuth = (token, refresh, userInfo) => {
      accessToken.value = token;
      refreshToken.value = refresh;
      user.value = userInfo;
    };

    // Logout user
    const logout = () => {
      accessToken.value = null;
      refreshToken.value = null;
      user.value = null;
    };

    return { accessToken, refreshToken, user, isAuthenticated, setAuth, logout };
  },
  {
    persist: true, // Enables state persistence
  },
);
