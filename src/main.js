import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Buat instance Vue
const app = createApp(App)

// Gunakan Pinia untuk state management
app.use(createPinia())

// Gunakan Vue Router untuk routing
app.use(router)

// Mount aplikasi ke elemen dengan id 'app'
app.mount('#app')