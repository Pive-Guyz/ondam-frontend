<template>
  <v-app>
    <v-container class="d-flex flex-column justify-center align-center min-h-screen" style="background: linear-gradient(135deg, #4f46e5, #7e22ce, #ec4899);">
      <h1 class="display-2 font-weight-bold text-white mb-6 drop-shadow-2xl">
        On:Dam
      </h1>
      <v-row class="text-center">
        <v-btn
          color="primary"
          class="mr-4"
          @click="openLoginModal"
          large
        >
          로그인
        </v-btn>
        <v-btn
          color="deep-purple accent-4"
          class="ml-4"
          large
        >
          회원가입
        </v-btn>
      </v-row>

      <!-- 로그인 모달 -->
      <LoginModal v-if="showLoginModal" @close="closeLoginModal" @login="handleLogin" />
    </v-container>
  </v-app>
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
    const res = await axios.get('http://localhost:8080/api/v1/member/findAllMembers')
    const members = res.data

    const found = members.find(
      (member) => member.email === email && member.password === password
    )

    if (found) {
      alert('로그인 성공!')
      authStore.login(found.id, found.point) // ✅ point 같이 전달
      closeLoginModal()
      router.push('/main')
    } else {
      alert('이메일 또는 비밀번호가 일치하지 않습니다.')
    }
  } catch (e) {
    console.error('로그인 오류:', e)
    alert('서버 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
/* 배경을 설정하고, 글씨에 그림자 추가 */
.v-container {
  background: linear-gradient(135deg, #4f46e5, #7e22ce, #ec4899);
  min-height: 100vh;
}

h1 {
  font-weight: bold;
  font-size: 5rem;
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.v-btn {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.v-btn:hover {
  transform: scale(1.05);
}

.v-btn:focus {
  outline: none;
}
</style>
