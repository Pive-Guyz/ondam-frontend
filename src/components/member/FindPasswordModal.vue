<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-box">
        <p class="title">비밀번호 찾기를 위해</p>
        <p class="subtitle">이름과 이메일을 입력해주세요</p>
  
        <input class="input" v-model="name" placeholder="이름" />
        <input class="input" v-model="email" placeholder="이메일" />
  
        <button class="confirm-btn" @click="confirm">확인</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const emit = defineEmits(['close', 'found'])
const confirm = () => {
  emit('found') // 비번찾기 완료 모달 열기
}
  
  const name = ref('')
  const email = ref('')
  
  const submit = () => {
    // 여기에 API 연결 가능
    emit('close')
  }
  
  const close = () => emit('close')
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-box {
    background: white;
    border: 2px solid #3c8df3;
    border-radius: 16px;
    padding: 40px 30px;
    width: 300px;
    text-align: center;
  }
  
  .title {
    color: #c3c3c3;
    font-size: 16px;
    margin-bottom: 4px;
  }
  
  .subtitle {
    color: #c3c3c3;
    font-size: 14px;
    margin-bottom: 20px;
  }
  
  .input {
    width: 100%;
    margin-bottom: 12px;
    padding: 10px 14px;
    border-radius: 999px;
    border: 1px solid #c3c3c3;
    color: #666;
    font-size: 14px;
    outline: none;
  }
  
  .confirm-btn {
    background: white;
    border: 1px solid #c3c3c3;
    color: #999;
    border-radius: 9999px;
    padding: 8px 20px;
    font-size: 14px;
    cursor: pointer;
  }
  .confirm-btn:hover {
    background: #f6f6f6;
  }
  </style>
  