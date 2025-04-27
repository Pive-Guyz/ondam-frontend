import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'


// createApp(App).mount('#app')
const app = createApp(App)

app.use(createPinia()) // Pinia 사용 등록
app.use(router)
app.use(BootstrapVue3)
app.mount('#app')
