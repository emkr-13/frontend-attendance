import api from "./api";

export const UserService = {
  async fetchProfile() {
    try {
      const response = await api.get("/api/users/profile");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async updateProfile(profileData) {
    try {
      const response = await api.post("/api/users/update", profileData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
