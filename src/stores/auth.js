// src/stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    memberId: null,
  }),
  actions: {
    login(id) {
      this.isLogin = true;
      this.memberId = id;
      localStorage.setItem('memberId', id)
    },
    logout() {
      this.isLogin = false;
      this.memberId = null;
      localStorage.removeItem('memberId')
    },
    restoreSession() {
      const id = localStorage.getItem('memberId')
      if (id) {
        this.memberId = Number(id)
        this.isLogin = true
      }
    }
  }
});
