<template>
  <div class="app-container">
    <Sidebar v-if="authStore.isAuthenticated" />
    <div class="content">
      <Navbar v-if="authStore.isAuthenticated" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
