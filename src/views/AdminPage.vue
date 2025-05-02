<template>
  <v-app>
    <Header />
    <AdminSidebar />
    <v-main>
      <v-container class="d-flex justify-center py-12">
        <div class="profile-box">
          <!-- ✅ 프로필 이미지 추가 -->
          <div class="image-section">
            <img class="profile-img" :src="profileImageUrl" alt="프로필 이미지" />
          </div>

          <div class="form-section">
            <div class="form-row">
              <div class="form-group">
                <label>이름</label>
                <input type="text" :value="auth.name" readonly />
              </div>
              <div class="form-group">
                <label>비밀번호</label>
                <input type="password" value="********" readonly />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>이메일</label>
                <input type="email" :value="auth.email" readonly />
              </div>
              <div class="form-group">
                <label>생년월일</label>
                <input type="text" :value="auth.birthday" readonly />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>전화번호</label>
                <input type="tel" :value="auth.phone" readonly />
              </div>
              <div class="form-group">
                <label>주소</label>
                <input type="text" :value="auth.address" readonly />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>가입일</label>
                <input type="text" :value="auth.createdAt" readonly />
              </div>
              <div class="form-group">
                <label>권한</label>
                <input type="text" :value="auth.authority" readonly />
              </div>
            </div>

            <div class="btn-wrapper">
              <button class="save-btn">저장</button>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header.vue'
import AdminSidebar from '@/components/sidebar/AdminSidebar.vue'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'


const auth = useAuthStore()

// ✅ 프로필 이미지 경로 설정
const profileImageUrl = computed(() =>
  auth.profile_image_url && auth.profile_image_url.trim() !== ''
    ? `/images/profile/${auth.profile_image_url}`
    : new URL('@/assets/img/logo/logo.png', import.meta.url).href
)



</script>

<style scoped>
.profile-box {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  gap: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}
.image-section {
  flex-shrink: 0;
}
.profile-img {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 16px;
  border: 2px solid #3c8df3;
  box-shadow: 0 4px 12px rgba(60, 141, 243, 0.25);
}
.form-section {
  flex: 1;
}
.form-row {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
}
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: bold;
  margin-bottom: 6px;
}
.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.btn-wrapper {
  margin-top: 20px;
  text-align: right;
}
.save-btn {
  background-color: #3c8df3;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.save-btn:hover {
  background-color: #2f76ce;
}
</style>
