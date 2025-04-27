import { createRouter, createWebHistory } from 'vue-router'

// 메인페이지
import StartPage from '../views/StartPage.vue'
import MainPage from '../views/MainPage.vue'
import DiaryPage from '../views/DiaryPage.vue'

const routes = [
  { path: '/', component: StartPage},
  { path: '/main', component: MainPage},
  { path: '/diary', component: DiaryPage}
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router