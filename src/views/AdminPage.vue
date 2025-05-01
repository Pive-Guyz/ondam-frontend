<template>
  <v-app>
    <Header />

    <div class="admin-page-container">
      <!-- ✅ 왼쪽 사이드바 -->
      <AdminSidebar />

      <!-- ✅ 오른쪽 본문 -->
      <div class="page-container">
        <div class="mypage-container">
          <!-- ✅ 프로필 이미지 -->
          <div class="profile-image-section">
            <img class="profile-image" :src="profileImageUrl" alt="프로필 이미지" />
          </div>

          <!-- 정보 수정 폼 -->
          <div class="profile-info-section">
            <div class="form-rows">
              <div class="form-row">
                <div class="form-group">
                  <label>이름</label>
                  <input v-model="form.name" type="text"readonly />
                </div>
                <div class="form-group">
                  <label>비밀번호</label>
                  <input v-model="form.password" type="password" readonly />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>이메일</label>
                  <input v-model="form.email" type="email" readonly />
                </div>
                <div class="form-group">
                  <label>생년월일</label>
                  <input v-model="form.birthday" type="text" readonly/>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>전화번호</label>
                  <input v-model="form.phone" type="tel" readonly />
                </div>
                <div class="form-group">
                  <label>주소</label>
                  <input v-model="form.address" type="text" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>가입일</label>
                  <input v-model="form.createdAt" readonly />
                </div>
                <div class="form-group">
                  <label>권한</label>
                  <input v-model="form.authority" disabled />
                </div>
              </div>
            </div>

            <!-- 저장 버튼 -->
            <div class="save-btn-wrapper">
              <button class="save-btn" @click="save">저장</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '@/components/Header.vue'
import AdminSidebar from '@/components/sidebar/AdminSidebar.vue'
import { useAuthStore } from '@/stores/auth.js'

const auth = useAuthStore()

// ✅ 프로필 이미지 URL 처리
const profileImageUrl = computed(() =>
  auth.profile_image_url && auth.profile_image_url.trim() !== ''
    ? `/images/profile/${auth.profile_image_url}`
    : new URL('@/assets/img/logo/logo.png', import.meta.url).href
)

const form = ref({
  name: auth.name,
  password: '********', // 또는 auth.password (보안상 보통 비워두거나 마스킹 처리)
  email: auth.email,
  phone: auth.phone,
  birthday: auth.birthday,
  address: auth.address,
  authority: auth.authority,
  createdAt: auth.createdAt
})

const save = () => {
  console.log('저장된 데이터:', form.value)
}
</script>

<style scoped>
.admin-page-container {
  display: flex;
  min-height: 100vh;
}

.page-container {
  flex: 1;
  background-color: #f7f9fc;
  display: flex;
  justify-content: center;
  padding-top: 200px;
  padding-bottom: 480px;
}

.mypage-container {
  display: flex;
  background: white;
  padding: 30px 30px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  width: fit-content;
  max-width: 1100px;
  gap: 32px;
  align-items: flex-start;
}

.profile-image-section {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
}

.profile-image {
  width: 140px;
  height: 170px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #3c8df3;
}

.profile-info-section {
  display: flex;
  flex-direction: column;
}

.form-rows {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-row {
  display: flex;
  gap: 60px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 6px;
  font-weight: bold;
  color: #2c3e50;
}

.form-group input {
  padding: 10px;
  border: 2px solid #3c8df3;
  border-radius: 8px;
  font-size: 14px;
}

.save-btn-wrapper {
  text-align: right;
  margin-top: 16px;
}

.save-btn {
  background-color: #3c8df3;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #2f76ce;
}
</style>
