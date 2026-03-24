import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Ecosystem
import router from "./app/router";
import { createPinia } from 'pinia';
import { i18n } from './app/i18n'

// Toast
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(i18n)
app.use(Toast)
app.mount('#app')
