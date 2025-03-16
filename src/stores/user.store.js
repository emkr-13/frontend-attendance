import { defineStore } from 'pinia'
import { useApi } from '../services/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null,
  }),
  actions: {
    async fetchProfile() {
      try {
        const response = await useApi().get('/api/users/profile')
        this.profile = response.data.data
        return response.data
      } catch (error) {
        throw error.response.data
      }
    },
    async updateProfile(profileData) {
      try {
        const response = await useApi().post('/api/users/update', profileData)
        this.profile = response.data.data
        return response.data
      } catch (error) {
        throw error.response.data
      }
    },
  },
})