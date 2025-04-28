import './style.css'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
authStore.restoreSession()  // 로그인 상태 복원!


