<template>
  <header class="navbar">
    <div class="navbar-brand">
      <h1>Attendance System</h1>
    </div>
    <div class="navbar-actions">
      <button @click="handleLogout" class="logout-button">Logout</button>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.store'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
}

.navbar-brand h1 {
  margin: 0;
  font-size: 24px;
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c0392b;
}
</style>