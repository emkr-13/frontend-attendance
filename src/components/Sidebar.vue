<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/attendance">Attendance</router-link>
        </li>
        <li>
          <router-link to="/profile">Profile</router-link>
        </li>
        <li>
          <router-link to="/report">Report</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
// Tidak perlu logika khusus di sini
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #34495e;
  color: white;
  padding: 20px;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav ul li {
  margin-bottom: 15px;
}

.sidebar nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.sidebar nav ul li a:hover {
  color: #1abc9c;
}

.router-link-active {
  color: #1abc9c;
  font-weight: bold;
}
</style>