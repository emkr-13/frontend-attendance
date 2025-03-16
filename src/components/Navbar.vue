<template>
  <div class="navbar">
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await fetch("/api/auth/logout", { method: "POST" }); // Panggil endpoint logout
    authStore.logout(); // Logout dari Pinia store
    router.push("/login"); // Redirect ke halaman login
  } catch (error) {
    alert("Logout failed");
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
}

.navbar button {
  background-color: #fff;
  color: #007bff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.navbar button:hover {
  background-color: #ddd;
}
</style>
