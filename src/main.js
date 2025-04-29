import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import 'vuetify/styles' // Vuetify 기본 스타일
import '@mdi/font/css/materialdesignicons.css' // ✅ MDI 아이콘 추가
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // ✅ MDI 아이콘 세트 사용 설정
  },
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')

const authStore = useAuthStore()
authStore.restoreSession()  // 로그인 상태 복원!