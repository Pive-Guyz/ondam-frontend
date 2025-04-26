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
    },
    logout() {
      this.isLogin = false;
      this.memberId = null;
    }
  }
});
