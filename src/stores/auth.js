import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    memberId: null,
    point: 0,
    name: '',
    email: '',
    authority: '',
    phone: '',
    birthday: '',
    address: '',
    createdAt: '',
    profile_image_url: ''
  }),

  actions: {
    login(id, point, name, authority, email, phone, birthday, address, createdAt, profileImage) {
      this.isLogin = true
      this.memberId = id
      this.point = point
      this.name = name
      this.email = email
      this.authority = authority
      this.phone = phone
      this.birthday = birthday
      this.address = address
      this.createdAt = createdAt
      this.profile_image_url = profileImage

      localStorage.setItem('memberId', id)
      localStorage.setItem('memberPoint', point)
      localStorage.setItem('memberName', name)
      localStorage.setItem('memberAuthority', authority)
      localStorage.setItem('memberEmail', email)
      localStorage.setItem('memberPhone', phone)
      localStorage.setItem('memberBirthday', birthday)
      localStorage.setItem('memberAddress', address)
      localStorage.setItem('memberCreatedAt', createdAt)
      localStorage.setItem('memberProfile', profileImage)
    },

    restoreSession() {
      const id = localStorage.getItem('memberId')
      if (id) {
        this.memberId = Number(id)
        this.point = Number(localStorage.getItem('memberPoint')) || 0
        this.name = localStorage.getItem('memberName') || ''
        this.email = localStorage.getItem('memberEmail') || ''
        this.authority = localStorage.getItem('memberAuthority') || ''
        this.phone = localStorage.getItem('memberPhone') || ''
        this.birthday = localStorage.getItem('memberBirthday') || ''
        this.address = localStorage.getItem('memberAddress') || ''
        this.createdAt = localStorage.getItem('memberCreatedAt') || ''
        this.profile_image_url = localStorage.getItem('memberProfile') || ''
        this.isLogin = true
      }
    },

    logout() {
      this.isLogin = false
      this.memberId = null
      this.point = 0
      this.name = ''
      this.email = ''
      this.authority = ''
      this.phone = ''
      this.birthday = ''
      this.address = ''
      this.createdAt = ''
      this.profile_image_url = ''
      localStorage.clear()
    }
  }
})
