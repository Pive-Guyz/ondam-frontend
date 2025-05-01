<template>
  <div class="page-container">
    <div class="login-box">
      <h2 class="title">로그인</h2>

      <div class="form-group">
        <label>이메일</label>
        <input v-model="email" type="text" placeholder="이메일 입력" />
      </div>

      <div class="form-group">
        <label>비밀번호</label>
        <input v-model="password" type="password" placeholder="비밀번호 입력" />
      </div>

      <div class="button-group">
        <button class="sub-btn" @click="showEmailModal = true">이메일 찾기</button>
        <button class="sub-btn" @click="showPasswordModal = true">비밀번호 찾기</button>
        <button class="sub-btn" @click="goToSignUp">회원가입</button>
      </div>

      <button class="login-btn" @click="login">로그인</button>
    </div>

    <!-- 모달 연결 -->
    <FindEmailModal
      v-if="showEmailModal"
      @close="showEmailModal = false"
      @found="handleEmailFound"
    />
    <EmailFoundModal
      v-if="showEmailFoundModal"
      :email="foundEmail"
      @confirm="goToStartPage"
    />
    <FindPasswordModal
      v-if="showPasswordModal"
      @close="showPasswordModal = false"
      @found="handlePasswordFound"
    />
    <PasswordFoundModal
      v-if="showPasswordFoundModal"
      :password="foundPassword"
      @confirm="goToStartPage"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { loginMember } from '@/api/member/memberQuery'

import FindEmailModal from '@/components/member/FindEmailModal.vue'
import EmailFoundModal from '@/components/member/EmailFoundModal.vue'
import FindPasswordModal from '@/components/member/FindPasswordModal.vue'
import PasswordFoundModal from '@/components/member/PasswordFoundModal.vue'

const router = useRouter()
const authStore = useAuthStore()

// 로그인 관련 상태
const email = ref('')
const password = ref('')

// 모달 상태
const showEmailModal = ref(false)
const showPasswordModal = ref(false)
const showEmailFoundModal = ref(false)
const showPasswordFoundModal = ref(false)

// 찾은 결과 상태
const foundEmail = ref('')
const foundPassword = ref('')

// 로그인 처리
const login = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    alert('이메일과 비밀번호를 모두 입력해주세요.')
    return
  }

  try {
    const res = await loginMember({
      email: email.value,
      password: password.value,
    })

    const { id, point } = res.data
    authStore.login(id, point)

    alert('로그인 성공!')
    router.push('/main')
  } catch (error) {
    if (error.response?.status === 401) {
      alert('로그인 실패: 이메일 또는 비밀번호 오류')
    } else {
      alert('서버 오류 발생')
    }
    console.error(error)
  }
}

// 이메일 찾기 성공 처리
const handleEmailFound = (email) => {
  foundEmail.value = email
  showEmailModal.value = false
  showEmailFoundModal.value = true
}

// 비밀번호 찾기 성공 처리
const handlePasswordFound = (password) => {
  foundPassword.value = password
  showPasswordModal.value = false
  showPasswordFoundModal.value = true
}

// 확인 버튼 눌렀을 때 이동
const goToStartPage = () => {
  showEmailFoundModal.value = false
  showPasswordFoundModal.value = false
  router.push('/')
}

// 회원가입 페이지 이동
const goToSignUp = () => router.push('/SignUp')
</script>

<style scoped>
.page-container {
  background-color: #f7f9fc;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  width: 400px;
  text-align: center;
}

.title {
  font-size: 22px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 30px;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #2c3e50;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 2px solid #3c8df3;
  border-radius: 8px;
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.sub-btn {
  border: 1px solid #3c8df3;
  border-radius: 20px;
  padding: 5px 10px;
  background: white;
  color: #3c8df3;
  cursor: pointer;
  font-size: 12px;
}

.sub-btn:hover {
  background: #e6f0ff;
}

.login-btn {
  background-color: #3c8df3;
  color: white;
  padding: 12px 0;
  width: 100%;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #2f76ce;
}
</style>
