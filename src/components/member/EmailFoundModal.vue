<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2 class="title">아이디 찾기 완료!</h2>
      <p class="result-message">
        회원님의 이메일은 <strong>{{ email }}</strong> 입니다.
      </p>
      <button class="confirm-btn" @click="$emit('confirm')">확인</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  email: String
})

defineEmits(['confirm'])
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
.result-message {
  font-size: 14px;
  margin-bottom: 20px;
}
.confirm-btn {
  padding: 10px 20px;
  background-color: #3c8df3;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>
