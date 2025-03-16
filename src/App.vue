<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth.store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Cek token saat aplikasi pertama kali dimuat
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    authStore.token = token
  } else {
    router.push('/login') // Redirect ke halaman login jika tidak ada token
  }
})
</script>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>