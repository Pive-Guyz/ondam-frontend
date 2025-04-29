import { createRouter, createWebHistory } from 'vue-router'

// 메인페이지
import StartPage from '../views/StartPage.vue'
import MainPage from '../views/MainPage.vue'
import DiaryPage from '../views/DiaryPage.vue'
import ReceivedDiaryPage from '../views/ReceivedDiaryPage.vue'

import SignUpPage from '../views/SignUpPage.vue'
import MyPage from '../views/MyPage.vue'
import AdminPage from '../views/AdminPage.vue'
import MemberList from '../views/MemberList.vue'
import ReportPage from '@/views/ReportPage.vue'


// 상담 페이지
import CounselingReport from '@/views/counsel/CounselingReport.vue';



import MyReplyListPage from '../views/MyReplyListPage.vue'


import ReportPage from '@/views/ReportPage.vue'

const routes = [

  { path: '/', component: StartPage},
  { path: '/main', component: MainPage},
  { path: '/diary', component: DiaryPage},
  { path: '/diary/received', component: ReceivedDiaryPage},
  { path: '/diary/reply', component: MyReplyListPage},
  {
    path: '/counselees',
    name: 'CounseleePage',
    component: () => import('../views/CounseleePage.vue'),
  },

  { path: '/SignUp', component: SignUpPage},
  { path: '/MyPage', component: MyPage},
  { path: '/AdminPage', component: AdminPage},
  { path: '/MemberList', component: MemberList},

  { path: '/MyPage', component: MyPage},

  {
    // 상담 일지 페이지
    path: '/counsel/:counselId',
    name: 'CounselingReport',
    component:  () => import('@/views/counsel/CounselingReport.vue'),
    props: true
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router