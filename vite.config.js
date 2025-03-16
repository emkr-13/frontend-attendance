import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // Plugin Vue.js
  server: {
    port: 4000, // Port untuk frontend
    open: true, // Secara otomatis membuka browser saat server dijalankan
    proxy: {
      // Proxy API untuk menghindari CORS jika backend berjalan di port berbeda
      '/api': {
        target: 'http://localhost:3080', // Backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Menghapus prefix "/api" jika perlu
      },
    },
  },
  resolve: {
    alias: {
      // Alias untuk direktori src agar lebih mudah diimpor
      '@': '/src',
    },
  },
});