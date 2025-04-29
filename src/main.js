import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import 'vuetify/styles'  // ✅ Vuetify 스타일
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
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


