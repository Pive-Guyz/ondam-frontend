<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <div class="profile">
        <img :src="profileImageUrl" alt="프로필 이미지" />
      </div>

      <div class="info-grid">
        <div><label>회원 ID</label><input :value="member.id" readonly /></div>
        <div><label>이름</label><input :value="member.name" readonly /></div>
        <div><label>이메일</label><input :value="member.email" readonly /></div>
        <div><label>비밀번호</label><input value="********" readonly /></div>
        <div><label>생년월일</label><input :value="member.birthday" readonly /></div>
        <div><label>가입일</label><input :value="member.joinedAt || '2025-04-24'" readonly /></div>
        <div><label>전화번호</label><input :value="member.phone" readonly /></div>
        <div><label>주소</label><input :value="member.address || '없음'" readonly /></div>
        <div><label>권한</label><input :value="member.authority" readonly /></div>
        <div><label>일기 사용 여부</label><input :value="member.diaryAllowed ?? 'Y'" readonly /></div>
        <div><label>정지 여부</label><input :value="member.banned ?? 'N'" readonly /></div>
      </div>

      <div class="btn-wrapper">
        <button @click="$emit('close')">확인</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['member'])
defineEmits(['close'])

const profileImageUrl = computed(() =>
  props.member.profileImage && props.member.profileImage.trim() !== ''
    ? `/images/profile/${props.member.profileImage}`
    : new URL('@/assets/img/logo/logo.png', import.meta.url).href
)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 600px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.profile {
  text-align: center;
  margin-bottom: 20px;
}

.profile img {
  width: 100px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #3c8df3;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-grid label {
  font-size: 12px;
  color: #666;
}

.info-grid input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  background: #f9f9f9;
}

.btn-wrapper {
  text-align: center;
  margin-top: 20px;
}

.btn-wrapper button {
  padding: 8px 20px;
  background-color: #3c8df3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
