// src/stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    memberId: null,
    point: 0
  }),
  actions: {
    login(id, point) {
      this.isLogin = true
      this.memberId = id
      this.point = point // ✅ point 설정
      localStorage.setItem('memberId', id)
      localStorage.setItem('memberPoint', point) // ✅ 로컬스토리지에도 저장
    },
    logout() {
      this.isLogin = false
      this.memberId = null
      this.point = 0
      localStorage.removeItem('memberId')
      localStorage.removeItem('memberPoint')
    },
    restoreSession() {
      const id = localStorage.getItem('memberId')
      const point = localStorage.getItem('memberPoint')
      if (id) {
        this.memberId = Number(id)
        this.point = Number(point) || 0
        this.isLogin = true
      }
    }
  }
});
