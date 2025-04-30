<template>
  <div class="page-container">
    <div class="login-box">
      <h2 class="title">로그인</h2>

      <div class="form-group">
        <label>이메일</label>
        <input v-model="email" type="text" placeholder="Value" />
      </div>

      <div class="form-group">
        <label>비밀번호</label>
        <input v-model="password" type="password" placeholder="Value" />
      </div>

      <div class="button-group">
        <button class="sub-btn" @click="showEmailModal = true">이메일 찾기</button>
        <button class="sub-btn" @click="showPasswordModal = true">비밀번호 찾기</button>
        <button class="sub-btn" @click="goToSignUp">회원가입</button>
      </div>

      <button class="login-btn" @click="login">로그인</button>
    </div>

    <!-- ✅ 모달 연결 -->
    <FindEmailModal
  v-if="showEmailModal"
  @close="showEmailModal = false"
  @found="handleEmailFound"
/>
<EmailFoundModal
  v-if="showEmailFoundModal"
  @close="showEmailFoundModal = false"
/>

<FindPasswordModal
  v-if="showPasswordModal"
  @close="showPasswordModal = false"
  @found="handlePasswordFound"
/>
<PasswordFoundModal
  v-if="showPasswordFoundModal"
  @close="showPasswordFoundModal = false"
/>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import FindEmailModal from '@/components/member/FindEmailModal.vue'
import EmailFoundModal from '@/components/member/EmailFoundModal.vue'
import FindPasswordModal from '@/components/member/FindPasswordModal.vue'
import PasswordFoundModal from '@/components/member/PasswordFoundModal.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'  // ✅ Pinia 사용 시 필요
import axios from 'axios'                     // ✅ API 요청에 필요

const router = useRouter()
const authStore = useAuthStore()             // ✅ 로그인한 사용자 정보 저장

const email = ref('')
const password = ref('')

const showEmailModal = ref(false)
const showPasswordModal = ref(false)
const showEmailFoundModal = ref(false)
const showPasswordFoundModal = ref(false)

// ✅ 로그인 함수
const login = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/v1/member/findAllMembers')
    const members = res.data

    const found = members.find(
      (member) => member.email === email.value && member.password === password.value
    )

    if (found) {
      alert('로그인 성공!')
      authStore.login(found.id)  // ✅ Pinia에 사용자 ID 저장
      router.push('/main')       // ✅ 메인페이지로 이동
    } else {
      alert('이메일 또는 비밀번호가 일치하지 않습니다.')
    }
  } catch (e) {
    console.error('로그인 오류:', e)
    alert('서버 오류가 발생했습니다.')
  }
}

// 회원가입 페이지로 이동
const goToSignUp = () => {
  router.push('/SignUp')
}

// 모달 연결
const handleEmailFound = () => {
  showEmailModal.value = false
  showEmailFoundModal.value = true
}

const handlePasswordFound = () => {
  showPasswordModal.value = false
  showPasswordFoundModal.value = true
}
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
