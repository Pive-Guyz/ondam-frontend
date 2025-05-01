<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-box">
        <h2 class="modal-title">회원 탈퇴</h2>
        <p class="modal-message">정말로 회원을 탈퇴하시겠습니까?<br />이 작업은 되돌릴 수 없습니다.</p>
        <div class="button-group">
          <button class="confirm-btn" @click="$emit('confirm')">탈퇴</button>
          <button class="cancel-btn" @click="$emit('close')">취소</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineEmits(['close', 'confirm'])
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
  }
  
  .modal-box {
    background: white;
    width: 320px;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .modal-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  
  .modal-message {
    font-size: 14px;
    color: #555;
    margin-bottom: 24px;
    line-height: 1.6;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  .confirm-btn {
    background-color: #e74c3c;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    flex: 1;
    margin-right: 10px;
    font-weight: 600;
  }
  
  .cancel-btn {
    background-color: #ecf0f1;
    color: #2c3e50;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    flex: 1;
    font-weight: 600;
  }
  </style>
  