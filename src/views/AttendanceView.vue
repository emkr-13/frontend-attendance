<template>
  <div class="attendance-container">
    <h1>Create Attendance</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="photo">Take Photo</label>
        <input
          type="file"
          id="photo"
          @change="onFileChange"
          accept="image/*"
          capture="environment"
        />
      </div>
      <button type="submit">Submit Attendance</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAttendanceStore } from "../stores/attendance.store";

const photo = ref(null);
const error = ref("");
const attendanceStore = useAttendanceStore();

const onFileChange = (e) => {
  photo.value = e.target.files[0];
};

const handleSubmit = async () => {
  if (!photo.value) {
    error.value = "Please take a photo.";
    return;
  }

  try {
    const formData = new FormData();
    formData.append("photo", photo.value);
    formData.append("location", await attendanceStore.getCurrentLocation());
    formData.append("ipAddress", await attendanceStore.getIpAddress());

    await attendanceStore.createAttendance(formData);
    alert("Attendance submitted successfully!");
  } catch (err) {
    error.value = "Failed to submit attendance.";
  }
};
</script>

<style scoped>
.attendance-container {
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
