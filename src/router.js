import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import ProfileView from './views/ProfileView.vue';
import AttendanceView from './views/AttendanceView.vue';
import { useAuthStore } from './stores/auth'; // Impor useAuthStore

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    {
      path: '/profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/attendance',
      component: AttendanceView,
      meta: { requiresAuth: true },
    },
  ],
});

// Auth Guard
router.beforeEach((to) => {
  const authStore = useAuthStore(); // Gunakan useAuthStore
  if (to.meta.requiresAuth && !authStore.token) {
    return '/login';
  }
});

export default router;