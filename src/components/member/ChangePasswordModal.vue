<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-box">
        <h2>비밀번호 변경</h2>
        <input v-model="currentPassword" type="password" placeholder="현재 비밀번호" />
        <input v-model="newPassword" type="password" placeholder="새 비밀번호" />
        <input v-model="newPasswordCheck" type="password" placeholder="새 비밀번호 확인" />
        <div class="button-group">
          <button @click="submitChange">변경</button>
          <button @click="$emit('close')">취소</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { changePassword } from '@/api/member/memberCommand'
  
  const props = defineProps({
    memberId: Number
  })
  
  const emit = defineEmits(['close'])
  
  const currentPassword = ref('')
  const newPassword = ref('')
  const newPasswordCheck = ref('')
  
  const submitChange = async () => {
    if (newPassword.value !== newPasswordCheck.value) {
      alert('새 비밀번호가 일치하지 않습니다.')
      return
    }
  
    try {
      await changePassword(props.memberId, {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        newPasswordCheck: newPasswordCheck.value
      })
      alert('비밀번호가 변경되었습니다.')
      emit('close')
    } catch (e) {
      alert('비밀번호 변경 실패: ' + (e.response?.data?.message || '서버 오류'))
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.4);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
  }
  .modal-box {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    width: 300px;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  </style>
  