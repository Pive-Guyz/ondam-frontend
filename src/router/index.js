import { createRouter, createWebHistory } from 'vue-router'

// 메인페이지
import MainPage from '@/views/MainPage.vue'
// import DiaryPage from '../views/DiaryPage.vue'

const routes = [
  { path: '/', component: MainPage },
  // { path: '/diary', component: DiaryPage}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router