<template>
    <div class="modal-overlay" @click.self="confirm">
      <div class="modal-box">
        <p class="message">비밀번호 찾기가</p>
        <p class="message">완료 되었습니다!</p>
        <button class="confirm-btn" @click="confirm">확인</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['close'])
  const confirm = () => emit('close')
  
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
    text-align: center;
    width: 300px;
  }
  .message {
    color: #c3c3c3;
    font-size: 16px;
    margin: 6px 0;
  }
  .confirm-btn {
    margin-top: 20px;
    background: white;
    border: 1px solid #c3c3c3;
    border-radius: 9999px;
    padding: 8px 20px;
    font-size: 14px;
    color: #999;
    cursor: pointer;
  }
  </style>
  