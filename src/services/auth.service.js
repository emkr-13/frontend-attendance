import api from "./api";

export const AuthService = {
  async login(credentials) {
    try {
      const response = await api.post("/api/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async logout() {
    try {
      const response = await api.post("/api/auth/logout");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
