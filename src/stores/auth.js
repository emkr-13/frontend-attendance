import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "", // Menggunakan 'token' sesuai respons backend
    refreshToken: localStorage.getItem("refreshToken") || "",
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            username,
            password,
          }
        );

        // Simpan token dan refreshToken dari respons backend
        this.token = response.data.data.token; // Sesuaikan dengan nama field 'token'
        this.refreshToken = response.data.data.refreshToken;
        this.user = response.data.data.user;

        // Simpan ke localStorage
        localStorage.setItem("token", this.token);
        localStorage.setItem("refreshToken", this.refreshToken);
        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (error) {
        throw new Error("Login failed");
      }
    },
    logout() {
      this.token = "";
      this.refreshToken = "";
      this.user = null;

      // Hapus dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token, // Gunakan 'token' untuk memeriksa autentikasi
  },
});
