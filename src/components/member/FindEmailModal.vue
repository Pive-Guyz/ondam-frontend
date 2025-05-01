<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2 class="title">이메일 찾기</h2>
      <input v-model="name" class="input" type="text" placeholder="이름 입력" />
      <input v-model="phone" class="input" type="text" placeholder="전화번호 입력" />

      <button class="submit-btn" @click="findEmail">이메일 찾기</button>
      <button class="close-btn" @click="$emit('close')">닫기</button>

      <p v-if="emailResult" class="result-text">
        회원님의 이메일은 <strong>{{ emailResult }}</strong> 입니다.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { findEmailByNameAndPhone } from '@/api/member/memberQuery'

const name = ref('')
const phone = ref('')
const emailResult = ref('')

const findEmail = async () => {
  try {
    const res = await findEmailByNameAndPhone(name.value, phone.value)
    emailResult.value = res.data
  } catch (e) {
    alert('일치하는 이메일이 없습니다.')
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
