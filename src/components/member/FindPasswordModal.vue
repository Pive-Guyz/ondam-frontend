<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2 class="title">비밀번호 찾기</h2>
      <input v-model="name" class="input" type="text" placeholder="이름 입력" />
      <input v-model="email" class="input" type="email" placeholder="이메일 입력" />

      <button class="submit-btn" @click="findPassword">비밀번호 찾기</button>
      <button class="close-btn" @click="$emit('close')">닫기</button>

      <p v-if="passwordResult" class="result-text">
        임시 비밀번호: <strong>{{ passwordResult }}</strong><br />
        <br>이메일을 확인하시고</br>
         <br>로그인 후 비밀번호를 꼭 변경해주세요.</br>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { findPasswordByNameAndEmail } from '@/api/member/memberQuery'

const name = ref('')
const email = ref('')
const passwordResult = ref('')

const findPassword = async () => {
  try {
    const res = await findPasswordByNameAndEmail(name.value, email.value)
    passwordResult.value = res.data
  } catch (e) {
    alert('입력한 정보와 일치하는 비밀번호가 없습니다.')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-box {
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 350px;
  text-align: center;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
}
.submit-btn,
.close-btn {
  padding: 10px 20px;
  margin: 8px 5px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.submit-btn {
  background-color: #3c8df3;
  color: white;
}
.close-btn {
  background-color: #ddd;
}
.result-text {
  margin-top: 20px;
  font-size: 14px;
  color: #333;
}
</style>
