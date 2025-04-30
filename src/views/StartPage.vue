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
import { ref } from 'vue'
import FindEmailModal from '@/components/member/FindEmailModal.vue'
import EmailFoundModal from '@/components/member/EmailFoundModal.vue'
import FindPasswordModal from '@/components/member/FindPasswordModal.vue'
import PasswordFoundModal from '@/components/member/PasswordFoundModal.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'  // ✅ Pinia 사용 시 필요
import axios from 'axios'                     // ✅ API 요청에 필요

const router = useRouter()
const authStore = useAuthStore()             // ✅ 로그인한 사용자 정보 저장

const email = ref('')
const password = ref('')

const showEmailModal = ref(false)
const showPasswordModal = ref(false)
const showEmailFoundModal = ref(false)
const showPasswordFoundModal = ref(false)

// ✅ 로그인 함수
const login = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/v1/member/findAllMembers')
    const members = res.data

    const found = members.find(
      (member) => member.email === email.value && member.password === password.value
    )

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

// 회원가입 페이지로 이동
const goToSignUp = () => {
  router.push('/SignUp')
}

// 모달 연결
const handleEmailFound = () => {
  showEmailModal.value = false
  showEmailFoundModal.value = true
}

const handlePasswordFound = () => {
  showPasswordModal.value = false
  showPasswordFoundModal.value = true
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
