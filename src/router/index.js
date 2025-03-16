import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../components/AppLayout.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import AttendanceView from "../views/AttendanceView.vue";
import ProfileView from "../views/ProfileView.vue";
import ReportView from "../views/ReportView.vue";
import { useAuthStore } from "../stores/auth.store";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false }, // Halaman login tidak memerlukan autentikasi
  },
  {
    path: "/",
    component: AppLayout,
    meta: { requiresAuth: true }, // Semua route di dalamnya memerlukan autentikasi
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardView,
      },
      {
        path: "/attendance",
        name: "Attendance",
        component: AttendanceView,
      },
      {
        path: "/profile",
        name: "Profile",
        component: ProfileView,
      },
      {
        path: "/report",
        name: "Report",
        component: ReportView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route untuk 404
    redirect: "/dashboard", // Redirect ke dashboard jika route tidak ditemukan
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard untuk proteksi route
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Cek apakah route memerlukan autentikasi
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect ke halaman login jika pengguna belum login
    next({ name: "Login" });
  } else if (to.name === "Login" && authStore.isAuthenticated) {
    // Redirect ke dashboard jika pengguna sudah login dan mencoba mengakses halaman login
    next({ name: "Dashboard" });
  } else {
    // Lanjutkan navigasi
    next();
  }
});

export default router;
