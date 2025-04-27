<template>
  <div class="diary-container">
    <h2>📓 내 다이어리</h2>

    <ul class="diary-list">
      <li v-for="diary in diaryList" :key="diary.id" @click="openModal(diary)">
        {{ diary.title }}
      </li>
    </ul>

    <div v-if="selectedDiary" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>{{ selectedDiary.title }}</h3>
        <p>{{ selectedDiary.content }}</p>
        <button @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const diaryList = ref([])
const selectedDiary = ref(null)

const authStore = useAuthStore()

const fetchDiaries = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/diary/findDiaryByMemberId', {
      params: {
        memberId: authStore.memberId,
      },
    })
    diaryList.value = response.data
  } catch (error) {
    console.error('다이어리 조회 실패:', error)
  }
}

const openModal = (diary) => {
  selectedDiary.value = diary
}

const closeModal = () => {
  selectedDiary.value = null
}

onMounted(() => {
  fetchDiaries()
})
</script>

<style scoped>
.diary-container {
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.diary-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.diary-list li {
  background: #f0f4ff;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.diary-list li:hover {
  background-color: #e0ebff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  width: 80%;
  text-align: left;
}

.modal h3 {
  margin-top: 0;
}

.modal button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
