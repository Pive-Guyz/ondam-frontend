<template>
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

    <!-- ✅ 회원가입 완료 모달 -->
    <CompleteModal v-if="showModal" @close="closeModalAndRedirect" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CompleteModal from '@/components/member/SignupModal.vue' // 🛑 경로 확인!
import { registerMember } from '@/api/member/memberCommand'

const router = useRouter()
const showModal = ref(false)

const form = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  birthday: '',
  phone: '',
})

const signup = async () => {
  if (form.value.password !== form.value.passwordConfirm) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  try {
    // API 요청 데이터 구성
    const memberData = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      birthday: form.value.birthday,
      phone: form.value.phone
    }

    // 회원가입 요청
    const res = await registerMember(memberData)

    console.log('회원가입 성공:', res.data)
    showModal.value = true  // 모달 열기
  } catch (error) {
    console.error('회원가입 실패:', error)
    if (error.response?.status === 409) {
      alert('이미 가입된 이메일입니다.')
    } else {
      alert('회원가입 중 오류가 발생했습니다.')
    }
  }
}

const closeModalAndRedirect = () => {
  showModal.value = false
  router.push('/') // ✅ 로그인/시작 페이지로 이동
}
</script>

<style scoped>
.page-container {
  background-color: #f7f9fc;
  height: 100vh;
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
