import axios from 'axios'
import { useAuthStore } from '../stores/auth.store'

// Buat instance Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Interceptor untuk menambahkan token ke header
api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

// Interceptor untuk menangani error response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Jika token tidak valid, lakukan logout
      const authStore = useAuthStore()
      authStore.logout()
    }
    return Promise.reject(error)
  }
)

// Ekspor instance Axios sebagai named export
export const useApi = () => api