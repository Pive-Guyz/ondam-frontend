<template>
    <div class="modal-overlay" @click.self="confirm">
      <div class="modal-window">
        <p class="message">회원가입이</p>
        <p class="message">완료 되었습니다!</p>
        <button class="confirm-btn" @click="confirm">확인</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['close'])
  
  const confirm = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-window {
    background: white;
    border: 2px solid #3c8df3;
    border-radius: 16px;
    padding: 40px 30px;
    text-align: center;
    width: 300px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
  
  .message {
    font-size: 18px;
    font-weight: 500;
    color: #444;
    margin: 10px 0;
  }
  
  .confirm-btn {
    margin-top: 24px;
    padding: 10px 24px;
    border-radius: 9999px;
    border: none;
    background-color: #3c8df3;
    color: white;
    font-size: 14px;
    cursor: pointer;
  }
  
  .confirm-btn:hover {
    background-color: #2f76ce;
  }
  </style>
  