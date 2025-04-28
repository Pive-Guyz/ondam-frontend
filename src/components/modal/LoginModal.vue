<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-indigo-700">로그인</h2>
        <input
          v-model="email"
          type="text"
          placeholder="이메일"
          class="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          v-model="password"
          type="password"
          placeholder="비밀번호"
          class="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          @click="handleLogin"
        >
          로그인
        </button>
        <button
          class="w-full mt-4 text-indigo-500 hover:underline text-sm"
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
  