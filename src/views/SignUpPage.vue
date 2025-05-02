<template>
  <div>
    <Header />

    <div class="page-container">
      <div class="signup-box">
        <h2 class="title">회원가입</h2>

        <div class="form-group">
          <label>이름</label>
          <input v-model="form.name" type="text" />
        </div>

        <div class="form-group">
          <label>이메일</label>
          <input v-model="form.email" type="email" />
        </div>

        <div class="form-group">
          <label>비밀번호</label>
          <input v-model="form.password" type="password" />
        </div>

        <div class="form-group">
          <label>비밀번호 확인</label>
          <input v-model="form.passwordConfirm" type="password" />
        </div>

        <div class="form-group">
          <label>생년월일</label>
          <input v-model="form.birthday" type="date" />
        </div>

        <div class="form-group">
          <label>전화번호</label>
          <input v-model="form.phone" type="tel" />
        </div>

        <button class="signup-btn" @click="signup">가입하기</button>
      </div>

      <SignupModal v-if="showModal" @close="closeModalAndRedirect" />
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import SignupModal from '@/components/member/SignupModal.vue'
import { registerMember } from '@/api/member/memberCommand.js'

const router = useRouter()
const showModal = ref(false)

const form = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  birthday: '',
  phone: ''
})

const signup = async () => {
  // 유효성 검사
  if (
    !form.value.name.trim() ||
    !form.value.email.trim() ||
    !form.value.password ||
    !form.value.passwordConfirm ||
    !form.value.birthday ||
    !form.value.phone.trim()
  ) {
    alert('모든 항목을 입력해주세요.')
    return
  }

  if (form.value.password !== form.value.passwordConfirm) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  try {
    const payload = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      birthday: form.value.birthday,
      phone: form.value.phone
    }

    await registerMember(payload)
    showModal.value = true
  } catch (error) {
    alert('회원가입에 실패했습니다: ' + (error.response?.data?.message || '서버 오류'))
    console.error(error)
  }
}

const closeModalAndRedirect = () => {
  showModal.value = false
  router.push('/')
}
</script>

<style scoped>
.page-container {
  background-color: #f7f9fc;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-box {
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

.signup-btn {
  background-color: #3c8df3;
  color: white;
  padding: 12px 0;
  width: 100%;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.signup-btn:hover {
  background-color: #2f76ce;
}
</style>
