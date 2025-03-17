<template>
  <div class="attendance-container">
    <h1>Create Attendance</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="photo">Take Photo</label>
        <!-- Video untuk menampilkan feed kamera -->
        <video ref="video" autoplay playsinline class="camera-feed"></video>
        <!-- Tombol untuk mengambil foto -->
        <button type="button" @click="capturePhoto">Capture Photo</button>
        <!-- Canvas untuk menangkap foto -->
        <canvas ref="canvas" style="display: none;"></canvas>
        <!-- Pratinjau foto yang diambil -->
        <img v-if="photo" :src="photo" alt="Captured Photo" class="photo-preview" />
      </div>
      <button type="submit">Submit Attendance</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAttendanceStore } from "../stores/attendance.store";

const video = ref(null); // Referensi ke elemen <video>
const canvas = ref(null); // Referensi ke elemen <canvas>
const photo = ref(null); // Untuk menyimpan foto yang diambil
const error = ref("");
const attendanceStore = useAttendanceStore();

// Fungsi untuk mengakses kamera
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.value.srcObject = stream;
  } catch (err) {
    error.value = "Failed to access camera. Please ensure you have granted camera permissions.";
    console.error("Camera error:", err);
  }
};

// Fungsi untuk mengambil foto
const capturePhoto = () => {
  const context = canvas.value.getContext("2d");
  canvas.value.width = video.value.videoWidth;
  canvas.value.height = video.value.videoHeight;
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

  // Konversi canvas ke data URL (format gambar)
  photo.value = canvas.value.toDataURL("image/png");
};

// Fungsi untuk menangani submit
const handleSubmit = async () => {
  if (!photo.value) {
    error.value = "Please take a photo.";
    return;
  }

  try {
    const formData = new FormData();
    // Konversi data URL ke Blob
    const blob = await fetch(photo.value).then((res) => res.blob());
    formData.append("photo", blob, "photo.png"); // Tambahkan foto ke FormData
    formData.append("location", await attendanceStore.getCurrentLocation());
    formData.append("ipAddress", await attendanceStore.getIpAddress());

    await attendanceStore.createAttendance(formData);
    alert("Attendance submitted successfully!");
  } catch (err) {
    error.value = "Failed to submit attendance.";
  }
};

// Mulai kamera saat komponen dimount
onMounted(() => {
  startCamera();
});

// Hentikan kamera saat komponen di-unmount
onUnmounted(() => {
  if (video.value && video.value.srcObject) {
    const tracks = video.value.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
  }
});
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

.camera-feed {
  width: 100%;
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
  margin-top: 10px;
}

button:hover {
  background-color: #34495e;
}

.photo-preview {
  display: block;
  max-width: 100%;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>