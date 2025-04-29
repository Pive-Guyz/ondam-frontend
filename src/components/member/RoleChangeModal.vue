<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-title">ON:DAM<br /><small>권한 변경</small></span>
          <button @click="close" class="close-button">✕</button>
        </div>
  
        <div class="role-options">
          <label v-for="option in roles" :key="option" class="role-label">
            <input
              type="radio"
              :value="option"
              v-model="selectedRole"
            />
            {{ option }}
          </label>
        </div>
  
        <button class="confirm-button" @click="confirm">완료</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  const props = defineProps({
    currentRole: String,
  });
  const emit = defineEmits(['close', 'updateRole']);
  
  const selectedRole = ref(props.currentRole);
  const roles = ['Guest', 'User', 'Admin'];
  
  const close = () => {
    emit('close');
  };
  
  const confirm = () => {
    emit('updateRole', selectedRole.value);
    close();
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-box {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 260px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  .modal-title {
    font-weight: bold;
  }
  .close-button {
    background: none;
    border: none;
    font-size: 20px;
  }
  .role-options {
    margin: 20px 0;
  }
  .role-label {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .confirm-button {
    width: 100%;
    padding: 10px;
    background-color: #3452c2;
    color: white;
    border: none;
    border-radius: 5px;
  }
  </style>
  