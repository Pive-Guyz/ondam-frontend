import { createRouter, createWebHistory } from 'vue-router'

// 메인페이지
import MainPage from '../views/MainPage.vue'
import DiaryPage from '../views/DiaryPage.vue'
import ReceivedDiaryPage from '../views/ReceivedDiaryPage.vue'

import SignUpPage from '../views/SignUpPage.vue'
import MyPage from '../views/MyPage.vue'
import AdminPage from '../views/AdminPage.vue'
import MemberList from '../views/MemberList.vue'
import ReportPage from '@/views/ReportPage.vue'


import MyReplyListPage from '../views/MyReplyListPage.vue'



const routes = [

  { path: '/', component: MainPage },
  { path: '/diary', component: DiaryPage },
  { path: '/diary/received', component: ReceivedDiaryPage },
  { path: '/diary/reply', component: MyReplyListPage },
  {
    path: '/counselees',
    name: 'CounseleePage',
    component: () => import('../views/CounseleePage.vue'),
  },

  { path: '/SignUp', component: SignUpPage },
  { path: '/MyPage', component: MyPage },
  { path: '/AdminPage', component: AdminPage },
  { path: '/MemberList', component: MemberList },

  { path: '/MyPage', component: MyPage },

  { path: '/report', component: ReportPage },
  {
    path: '/counselees/:id/counsel-log',
    name: 'CounselingLogFormPage',
    component: () => import('../views/CounslingLogFormPage.vue'),
    props: true
  },

  {
    // 상담 일지 페이지
    path: '/counsel/:counselId',
    name: 'CounselingReport',
    component: () => import('../views/CounselingReport.vue'),
    props: true
  },

  {
    path: '/counselees/:id/logs',
    name: 'CounseleeCounselPage',
    component: () => import('../views/CounseleeCounselPage.vue')
  },
  {
    path: '/counselees/register',
    name: 'CounseleeRegisterPage',
    component: () => import('@/views/CounseleeRegisterPage.vue'),
  },

  // // 에러 페이지
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/common/ErrorPage.vue'),
  //   props: { message: '페이지를 찾을 수 없습니다.' }
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router