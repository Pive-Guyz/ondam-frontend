<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2 class="title">임시 비밀번호 발급 완료!</h2>
      <p class="result-message">
        임시 비밀번호는 <strong>{{ password }}</strong> 입니다.<br />
        로그인 후 반드시 비밀번호를 변경해주세요.
      </p>
      <button class="confirm-btn" @click="$emit('confirm')">확인</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ password: String })
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
  white-space: pre-line;
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
