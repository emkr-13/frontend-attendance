<template>
  <div class="app-layout">
    <Navbar />
    <div class="layout-container">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5;
}
</style>
