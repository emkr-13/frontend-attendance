import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import ProfileView from './views/ProfileView.vue';
import AttendanceView from './views/AttendanceView.vue';
import { useAuthStore } from './stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    {
      path: '/profile',
      component: ProfileView,
      meta: { requiresAuth: true }, // Halaman ini memerlukan autentikasi
    },
    {
      path: '/attendance',
      component: AttendanceView,
      meta: { requiresAuth: true }, // Halaman ini memerlukan autentikasi
    },
  ],
});

// Middleware Auth Guard
router.beforeEach((to) => {
  const authStore = useAuthStore();

  // Jika halaman memerlukan autentikasi dan token tidak ada, redirect ke login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login';
  }

  // Jika sudah login dan mencoba akses halaman login, redirect ke halaman utama
  if (to.path === '/login' && authStore.isAuthenticated) {
    return '/attendance'; // Redirect ke halaman absensi atau lainnya
  }
});

export default router;