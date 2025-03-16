import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: Cookies.get('token') || '',
    refreshToken: Cookies.get('refreshToken') || '',
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          username,
          password,
        });

        this.token = response.data.data.token;
        this.refreshToken = response.data.data.refreshToken;
    

        // Simpan token dan user ke cookie
        Cookies.set('token', this.token, { expires: 7 }); // Expire dalam 7 hari
        Cookies.set('refreshToken', this.refreshToken, { expires: 7 });
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    logout() {
      this.token = '';
      this.refreshToken = '';
      this.user = null;

      // Hapus token dan user dari cookie
      Cookies.remove('token');
      Cookies.remove('refreshToken');

    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});