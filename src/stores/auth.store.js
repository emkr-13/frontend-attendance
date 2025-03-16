import { defineStore } from "pinia";
import { useApi } from "../services/api";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await useApi().post("/api/auth/login", credentials);
        this.token = response.data.data.token;
        this.refreshToken = response.data.data.refreshToken;

        // Simpan token ke localStorage
        localStorage.setItem("token", this.token);
        localStorage.setItem("refreshToken", this.refreshToken);

        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
    async logout() {
      try {
        await useApi().post("/api/auth/logout");
        this.token = null;
        this.refreshToken = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        // Redirect ke halaman login
        const router = useRouter();
        router.push("/login");
      } catch (error) {
        throw error.response.data;
      }
    },
  },
});
