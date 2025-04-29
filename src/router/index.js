import { createRouter, createWebHistory } from 'vue-router'

// 메인페이지
import StartPage from '../views/StartPage.vue'
import MainPage from '../views/MainPage.vue'
import DiaryPage from '../views/DiaryPage.vue'
import ReceivedDiaryPage from '../views/ReceivedDiaryPage.vue'
import ReportPage from '@/views/ReportPage.vue'

const routes = [

  { path: '/', component: StartPage},
  { path: '/main', component: MainPage},
  { path: '/diary', component: DiaryPage},
  { path: '/diary/received', component: ReceivedDiaryPage},
  {
    path: '/counselee-test',
    name: 'CounseleeTestPage',
    component: () => import('../views/CounseleePage.vue'),
  },
  { path: '/report', component: ReportPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router