<template>
  <teleport to="body">
    <div class="modal-overlay" @click.self="close">
      <div class="modal">
        <h2>📝 오늘의 일기 쓰기</h2>

        <input v-model="title" type="text" placeholder="제목을 입력하세요" />
        <textarea v-model="content" placeholder="내용을 입력하세요"></textarea>

        <div class="btns">
          <button class="submit" @click="submitDiary">작성하기</button>
          <button class="cancel" @click="close">취소</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['close', 'writeDiary'])
const authStore = useAuthStore()

const title = ref('')
const content = ref('')

const close = () => {
  emit('close')
}

import { writeDiary } from '../../api/diary/diaryCommand'
const submitDiary = async () => {
  if (!title.value || !content.value) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }
  let point = authStore.point
  if (point < 10) {
    alert(`포인트가 부족합니다. 현재 포인트는 ${point}입니다.`)
    return
  }
  
  const payload = {
    title: title.value,
    content: content.value,
    isBlinded: 'N',
    memberId: authStore.memberId
  }
  try {
    console.log({
                title: title.value,
                content: content.value,
                isBlinded: 'N',
                memberId: authStore.memberId,
                })
    await writeDiary(payload);
    point = point - 10
    authStore.point = point // ✅ Pinia 상태 업데이트
    localStorage.setItem('memberPoint', point) // ✅ 로컬에도 반영

    emit('writeDiary')
    alert(`일기가 작성되었습니다✏️ 남은 포인트는 ${point}입니다.`)
    close()
  } catch (err) {
    console.error('다이어리 작성 실패:', err)
    alert('작성에 실패했어요 😢')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000; /* ✅ 헤더/사이드바보다 위로 */
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.modal h2 {
  margin-bottom: 20px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;
}

textarea {
  height: 120px;
  resize: none;
}

.btns {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.submit {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.cancel {
  background-color: #ccc;
  color: black;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
