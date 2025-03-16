import api from "./api";

export const AttendanceService = {
  async createAttendance(formData) {
    try {
      const response = await api.post("/api/attendance/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async fetchAttendances() {
    try {
      const response = await api.get("/api/attendance");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
