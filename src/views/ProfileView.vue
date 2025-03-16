<template>
  <div class="profile-container">
    <h2>Edit Profile</h2>
    <form @submit.prevent="updateProfile">
      <input v-model="fullName" placeholder="Full Name" required />
      <input v-model="position" placeholder="Position" required />
      <button type="submit">Save Profile</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import { useAuthStore } from "../stores/auth";

const fullName = ref("");
const position = ref("");
const authStore = useAuthStore();

onMounted(() => {
  fetchProfile();
});

const fetchProfile = async () => {
  try {
    const response = await api.get("/api/users/profile");
    fullName.value = response.data.data.fullName;
    position.value = response.data.data.position;
  } catch (error) {
    alert("Failed to fetch profile");
  }
};

const updateProfile = async () => {
  try {
    await api.post("/api/users/update", {
      fullName: fullName.value,
      position: position.value,
    });
    authStore.user.fullName = fullName.value;
    authStore.user.position = position.value;
    alert("Profile updated successfully");
  } catch (error) {
    alert("Failed to update profile");
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.profile-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.profile-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.profile-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.profile-container button:hover {
  background-color: #0056b3;
}
</style>
