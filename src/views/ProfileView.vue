<template>
  <div class="profile-container">
    <h1>Profile</h1>
    <div v-if="profile">
      <p><strong>Username:</strong> {{ profile.username }}</p>
    </div>
    <form @submit.prevent="handleUpdate">
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input v-model="fullName" type="text" id="fullName" required />
      </div>
      <div class="form-group">
        <label for="position">Position</label>
        <input v-model="position" type="text" id="position" required />
      </div>
      <button type="submit">Update Profile</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user.store";

const profile = ref(null);
const fullName = ref("");
const position = ref("");
const error = ref("");
const userStore = useUserStore();

onMounted(async () => {
  try {
    const response = await userStore.fetchProfile();
    profile.value = response.data;
    fullName.value = profile.value.fullName;
    position.value = profile.value.position;
  } catch (err) {
    error.value = "Failed to fetch profile.";
  }
});

const handleUpdate = async () => {
  try {
    await userStore.updateProfile({
      fullName: fullName.value,
      position: position.value,
    });
    alert("Profile updated successfully!");
  } catch (err) {
    error.value = "Failed to update profile.";
  }
};
</script>

<style scoped>
.profile-container {
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
