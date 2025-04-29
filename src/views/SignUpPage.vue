<template>
  <div class="page-container">
    <div class="signup-box">
      <h2 class="title">회원가입</h2>

      <div class="form-group">
        <label>이름</label>
        <input v-model="form.name" type="text" placeholder="Value" />
      </div>

      <div class="form-group">
        <label>이메일</label>
        <input v-model="form.email" type="email" placeholder="Value" />
      </div>

      <div class="form-group">
        <label>비밀번호</label>
        <input v-model="form.password" type="password" placeholder="Value" />
      </div>

      <div class="form-group">
        <label>비밀번호 확인</label>
        <input v-model="form.passwordConfirm" type="password" placeholder="Value" />
      </div>

      <div class="form-group">
        <label>생년월일</label>
        <input v-model="form.birthday" type="date" placeholder="Value" />
      </div>

      <div class="form-group">
        <label>전화번호</label>
        <input v-model="form.phone" type="tel" placeholder="Value" />
      </div>

      <button class="signup-btn" @click="signup">가입하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  birthday: '',
  phone: '',
})

const signup = () => {
  if (form.value.password !== form.value.passwordConfirm) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }
  console.log('회원가입 정보:', form.value)
  // axios.post('/api/signup', form.value) 등 연결 가능
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
