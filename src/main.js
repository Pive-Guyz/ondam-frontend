import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'  // ✅ 추가!
import { useAuthStore } from '@/stores/auth'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')

const authStore = useAuthStore()
authStore.restoreSession()  // 로그인 상태 복원!
