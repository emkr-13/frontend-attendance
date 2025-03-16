<template>
  <div class="report-container">
    <h1>Attendance Report</h1>
    <table v-if="attendances.length > 0">
      <thead>
        <tr>
          <th>Location</th>
          <th>IP Address</th>
          <th>Photo</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendance in attendances" :key="attendance.id">
          <td>{{ attendance.location }}</td>
          <td>{{ attendance.ipAddress }}</td>
          <td>
            <img :src="attendance.photo" alt="Attendance Photo" class="photo" />
          </td>
          <td>{{ formatDate(attendance.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No attendance records found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAttendanceStore } from "../stores/attendance.store";
import { format } from "date-fns";

const attendances = ref([]);
const attendanceStore = useAttendanceStore();

onMounted(async () => {
  try {
    const response = await attendanceStore.fetchAttendances();
    attendances.value = response.data;
  } catch (err) {
    console.error("Failed to fetch attendances:", err);
  }
});

const formatDate = (dateString) => {
  return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
};
</script>

<style scoped>
.report-container {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.photo {
  max-width: 100px;
  max-height: 100px;
}
</style>
