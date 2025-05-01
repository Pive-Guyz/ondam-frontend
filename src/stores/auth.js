// src/stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    memberId: null,
    point: 0,
    name: '',             // ✅ 추가
    authority: ''         // ✅ 추가
  }),
  actions: {
    login(id, point, name, authority) {
      this.isLogin = true
      this.memberId = id
      this.point = point
      this.name = name          // ✅ 저장
      this.authority = authority // ✅ 저장

      localStorage.setItem('memberId', id)
      localStorage.setItem('memberPoint', point)
      localStorage.setItem('memberName', name)          // ✅ 로컬 저장
      localStorage.setItem('memberAuthority', authority) // ✅ 로컬 저장
    },
    logout() {
      this.isLogin = false
      this.memberId = null
      this.point = 0
      this.name = ''
      this.authority = ''

      localStorage.removeItem('memberId')
      localStorage.removeItem('memberPoint')
      localStorage.removeItem('memberName')
      localStorage.removeItem('memberAuthority')
    },
    restoreSession() {
      const id = localStorage.getItem('memberId')
      const point = localStorage.getItem('memberPoint')
      const name = localStorage.getItem('memberName')
      const authority = localStorage.getItem('memberAuthority')
      if (id) {
        this.memberId = Number(id)
        this.point = Number(point) || 0
        this.name = name || ''
        this.authority = authority || ''
        this.isLogin = true
      }
    }
  }
});