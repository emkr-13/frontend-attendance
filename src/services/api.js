import axios from "axios";
import { useAuthStore } from "../stores/auth";

// Buat instance Axios dengan baseURL dari .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Mengambil API URL dari .env
  timeout: 10000, // Timeout 10 detik
});

// Interceptor Request: Menambahkan token ke header Authorization
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    // Handle error pada request
    return Promise.reject(error);
  }
);

// Interceptor Response: Handle error global (opsional)
api.interceptors.response.use(
  (response) => {
    // Jika respons sukses, kembalikan data
    return response;
  },
  (error) => {
    // Handle error global, misalnya jika token expired atau tidak valid
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Token expired or invalid");
      const authStore = useAuthStore();
      authStore.logout(); // Logout pengguna jika token tidak valid
    }
    return Promise.reject(error);
  }
);

export default api;
