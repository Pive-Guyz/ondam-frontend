<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2 class="title">비밀번호 찾기</h2>
      <input v-model="name" class="input" type="text" placeholder="이름 입력" />
      <input v-model="email" class="input" type="email" placeholder="이메일 입력" />

      <div class="button-group">
        <button class="submit-btn" @click="findPassword">비밀번호 찾기</button>
        <button class="close-btn" @click="$emit('close')">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { findPasswordByNameAndEmail } from '@/api/member/memberQuery'

const emit = defineEmits(['close', 'found'])

const name = ref('')
const email = ref('')

const findPassword = async () => {
  if (!name.value.trim() || !email.value.trim()) {
    alert('이름과 이메일을 모두 입력해주세요.')
    return
  }

  try {
    const res = await findPasswordByNameAndEmail(name.value, email.value)
    emit('found', res.data) // 평문 비밀번호 전달
    emit('close')
  } catch (e) {
    alert('일치하는 회원이 없습니다.')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-box {
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 350px;
  text-align: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin-bottom: 16px;
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.submit-btn {
  background-color: #3c8df3;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.close-btn {
  background-color: #eee;
  color: #333;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
