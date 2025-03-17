<template>
  <div>
    <h1>Attendance Report</h1>
    <!-- Dropdown untuk memilih timezone -->
    <div class="filter-container">
      <label for="timezone">Select Timezone:</label>
      <select id="timezone" v-model="selectedTimezone">
        <option v-for="timezone in timezones" :key="timezone" :value="timezone">
          {{ timezone }}
        </option>
      </select>
    </div>
    <!-- Tabel attendance -->
    <table v-if="attendances.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Location</th>
          <th>IP Address</th>
          <th>Photo</th>
          <th>Created At ({{ selectedTimezone }})</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendance in attendances" :key="attendance.id">
          <td>{{ attendance.id }}</td>
          <td>{{ attendance.location }}</td>
          <td>{{ attendance.ipAddress }}</td>
          <td>
            <img
              :src="getPhotoUrl(attendance.photo)"
              alt="Attendance Photo"
              class="photo"
            />
          </td>
          <td>{{ formatDate(attendance.createdAt, selectedTimezone) }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No attendance records found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAttendanceStore } from "../stores/attendance.store";
import moment from "moment-timezone"; // Impor moment-timezone

const attendances = ref([]);
const attendanceStore = useAttendanceStore();
const selectedTimezone = ref("Asia/Jakarta"); // Timezone default
const timezones = ref([
  "Asia/Jakarta", // GMT+7
  "UTC", // GMT+0
  "America/New_York", // GMT-4 atau GMT-5 (tergantung daylight saving)
  "Europe/London", // GMT+0 atau GMT+1 (tergantung daylight saving)
  // Tambahkan timezone lain sesuai kebutuhan
]);

// Fungsi untuk mengambil data attendance
const fetchAttendances = async () => {
  try {
    const response = await attendanceStore.fetchAttendances();
    attendances.value = response.data;
  } catch (err) {
    console.error("Failed to fetch attendances:", err);
  }
};

// Fungsi untuk membuat URL lengkap ke foto
const getPhotoUrl = (photoPath) => {
  return `http://localhost:3080/${photoPath}`;
};

// Fungsi untuk memformat tanggal berdasarkan timezone
const formatDate = (dateString, timezone) => {
  return moment(dateString).tz(timezone).format("YYYY-MM-DD HH:mm:ss"); // Konversi dan format tanggal
};

// Ambil data saat komponen dimount
onMounted(() => {
  fetchAttendances();
});

// Watch perubahan timezone dan refresh tampilan
watch(selectedTimezone, () => {
  fetchAttendances();
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.photo {
  max-width: 100px;
  max-height: 100px;
}

.filter-container {
  margin-bottom: 20px;
}

label {
  margin-right: 10px;
}

select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>