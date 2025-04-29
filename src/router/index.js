import { createRouter, createWebHistory } from 'vue-router'

// 메인페이지
import StartPage from '../views/StartPage.vue'
import MainPage from '../views/MainPage.vue'
import DiaryPage from '../views/DiaryPage.vue'
import ReceivedDiaryPage from '../views/ReceivedDiaryPage.vue'
import ReportPage from '@/views/ReportPage.vue'

const routes = [

  { path: '/', component: StartPage },
  { path: '/main', component: MainPage },
  { path: '/diary', component: DiaryPage },
  { path: '/diary/received', component: ReceivedDiaryPage },
  {
    path: '/counselees',
    name: 'CounseleePage',
    component: () => import('../views/CounseleePage.vue'),
  },
  { path: '/report', component: ReportPage },
  {
    path: '/counseling-log-form',
    name: 'CounselingLogFormPage',
    component: () => import('../views/CounslingLogFormPage.vue'),
  },
  {
    path: '/counselees/:id/logs',
    name: 'CounseleeCounselPage',
    component: () => import('../views/CounseleeCounselPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router