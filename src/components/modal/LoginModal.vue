<template>
  <div class="modal-container">
    <div class="modal-content">
      <h2 class="modal-title">로그인</h2>
      <input
        v-model="email"
        type="text"
        placeholder="이메일"
        class="input-field"
      />
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        class="input-field"
      />
      <button
        class="login-btn"
        @click="handleLogin"
      >
        로그인
      </button>
      <button
        class="close-btn"
        @click="$emit('close')"
      >
        닫기
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const emit = defineEmits(['close', 'login']);

  const email = ref('');
  const password = ref('');

  const handleLogin = () => {
    emit('login', {
      email: email.value,
      password: password.value,
    });
  };
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-content {
  background-color: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
  color: #4F46E5; /* Indigo color */
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #6366F1; /* Indigo focus color */
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #4F46E5; /* Indigo color */
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #4338CA; /* Darker indigo */
}

.close-btn {
  width: 100%;
  margin-top: 16px;
  text-align: center;
  font-size: 0.875rem;
  color: #4F46E5; /* Indigo color */
  cursor: pointer;
  text-decoration: underline;
}
</style>
