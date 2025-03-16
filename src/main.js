import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Inisialisasi Pinia store
const pinia = createPinia();

// Buat instance Vue
const app = createApp(App);

// Gunakan plugin
app.use(pinia);
app.use(router);

// Mount aplikasi ke DOM
app.mount('#app');