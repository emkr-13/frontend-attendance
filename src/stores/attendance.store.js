import { defineStore } from "pinia";
import { useApi } from "../services/api";

export const useAttendanceStore = defineStore("attendance", {
  state: () => ({
    attendances: [],
  }),
  actions: {
    async getIpAddress() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
      } catch (error) {
        throw new Error("Failed to fetch IP address");
      }
    },
    async createAttendance(formData) {
      try {
        const response = await useApi().post(
          "/api/attendance/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
    async fetchAttendances() {
      try {
        const response = await useApi().get("/api/attendance");
        this.attendances = response.data.data;
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
    async getCurrentLocation() {
      // Hanya mengembalikan alamat IP tanpa lokasi geografis
      const ipAddress = await this.getIpAddress();
      return `IP: ${ipAddress}`;
    },
  },
});