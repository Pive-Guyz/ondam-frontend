import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/main.css'


// createApp(App).mount('#app')
const app = createApp(App)

app.use(createPinia()) // Pinia 사용 등록
app.use(router)
app.mount('#app')
