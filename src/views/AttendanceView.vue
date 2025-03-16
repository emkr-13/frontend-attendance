<template>
  <div class="attendance-container">
    <h2>Record Attendance</h2>
    <input v-model="location" placeholder="Location" required />
    <input type="file" @change="handleFileUpload" accept="image/*" />
    <button @click="capturePhoto">Take Photo</button>
    <button @click="recordAttendance">Submit Attendance</button>

    <h2>Attendance Report</h2>
    <select v-model="selectedTimezone">
      <option value="UTC">UTC</option>
      <option value="Asia/Jakarta">Asia/Jakarta</option>
    </select>
    <table>
      <tr v-for="attendance in attendances" :key="attendance.id">
        <td>{{ attendance.location }}</td>
        <td>{{ attendance.ipAddress }}</td>
        <td><img :src="attendance.photo" alt="Attendance Photo" /></td>
        <td>{{ formatTime(attendance.createdAt) }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Aktifkan plugin UTC dan Timezone
dayjs.extend(utc);
dayjs.extend(timezone);

const location = ref('');
const photoFile = ref(null);
const attendances = ref([]);
const selectedTimezone = ref('UTC');

const getIpAddress = async () => {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    return response.data.ip;
  } catch (error) {
    return 'Unknown IP';
  }
};

const capturePhoto = async () => {
  const element = document.querySelector('.attendance-container');
  const canvas = await html2canvas(element);
  photoFile.value = canvas.toDataURL('image/png');
};

const handleFileUpload = (event) => {
  photoFile.value = event.target.files[0];
};

const recordAttendance = async () => {
  if (!photoFile.value) {
    alert('Photo is required');
    return;
  }

  try {
    const ipAddress = await getIpAddress();
    const formData = new FormData();
    formData.append('photo', photoFile.value);
    formData.append('location', location.value);
    formData.append('ipAddress', ipAddress);

    await axios.post('/api/attendance/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    alert('Attendance recorded successfully');
    fetchAttendances();
  } catch (error) {
    alert('Error recording attendance');
  }
};

const fetchAttendances = async () => {
  try {
    const response = await axios.get('/api/attendance');
    console.log('Response:', response.data)
    attendances.value = response.data.data;
  } catch (error) {
    alert('Failed to fetch attendances');
  }
};

const formatTime = (dateString) => {
  const timeZone = selectedTimezone.value;
  return dayjs(dateString).tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
};

onMounted(() => {
  fetchAttendances();
});
</script>

<style scoped>
.attendance-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.attendance-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.attendance-container input,
.attendance-container select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.attendance-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.attendance-container button:hover {
  background-color: #0056b3;
}

.attendance-container table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.attendance-container td {
  padding: 10px;
  border: 1px solid #ddd;
}

.attendance-container img {
  max-width: 100px;
  max-height: 100px;
}
</style>