<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 class="text-8xl font-extrabold text-white mb-14 drop-shadow-2xl tracking-wide">
        On:Dam
      </h1>
      <div class="space-x-6">
        <button
          class="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl shadow-lg hover:bg-indigo-100 transition duration-300 ease-in-out"
          @click="openLoginModal"
        >
          로그인
        </button>
        <button
          class="px-8 py-4 bg-indigo-800 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-indigo-900 transition duration-300 ease-in-out"
        >
          회원가입
        </button>
      </div>
      <!-- 로그인 모달 -->
      <LoginModal v-if="showLoginModal" @close="closeLoginModal" @login="handleLogin" />
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import LoginModal from '../components/modal/LoginModal.vue';

const router = useRouter();
const authStore = useAuthStore();

const showLoginModal = ref(false);
const openLoginModal = () => {  showLoginModal.value = true;  };
const closeLoginModal = () => {  showLoginModal.value = false;  };

const handleLogin = async ({ email, password }) => {
  try {
    const res = await axios.get('http://localhost:8080/member/findAllMembers'); // 예: 모든 회원 조회
    const members = res.data;

    const found = members.find(
      (member) => member.email === email && member.password === password
    );

    if (found) {
      alert('로그인 성공!'); // ✅ 성공 시 알림
      authStore.login(found.id);
      closeLoginModal();
      router.push('/main'); // 로그인 성공 → 이동
    } else {
      alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  } catch (e) {
    console.error('로그인 오류:', e);
    alert('서버 오류가 발생했습니다.');
  }
};
</script>
  
  <style scoped>
  /* 폰트를 더 예쁘게 하고 싶으면 구글 폰트 추가도 가능해요 */
  </style>
  