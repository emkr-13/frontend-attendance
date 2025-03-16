<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    })
    router.push('/dashboard') // Redirect ke dashboard setelah login berhasil
  } catch (err) {
    error.value = 'Login failed. Please check your credentials.'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #34495e;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>