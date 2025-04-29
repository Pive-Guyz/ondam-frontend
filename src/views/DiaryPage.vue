<template>
  <div class="diary-container">
    <div class="header">
      <h2>📓 내 다이어리</h2>
      <button class="write-btn" @click="openWriteDiaryModal">+ 오늘의 일기 쓰기</button>
    </div>

    <div v-if="diaryList.length === 0" class="empty-message">
      아직 작성한 일기가 없습니다. ✍️
    </div>

    <ul v-else class="diary-list">
      <li v-for="diary in diaryList" :key="diary.id" @click="openDiaryModal(diary)">
        <div class="diary-item">
          <span class="diary-title">{{ diary.title }}</span>
          <span class="diary-date">{{ formatDate(diary.createdAt) }}</span>
        </div>
      </li>
    </ul>

    <div class="navigate-btn">
      <v-btn @click="goToReceivedDiary" color="primary" outlined>오늘 받은 다이어리</v-btn>
    </div>

    <DiaryModal
      v-if="selectedDiary"
      :diary="selectedDiary"
      @close="closeDiaryModal"
      @delete="deleteDiary"
    />

    <WriteDiaryModal v-if="showWriteDiaryModal" @close="closeWriteDiaryModal" @writeDiary="onDiaryWritten" />
    <button @click="goHome">홈으로 돌아가기</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import WriteDiaryModal from '../components/modal/WriteDiaryModal.vue'
import DiaryModal from '../components/modal/DiaryModal.vue'

const authStore = useAuthStore()
const diaryList = ref([])
const selectedDiary = ref(null)
const router = useRouter()

const goHome = () => router.push('/main')
const goToReceivedDiary = () => {  router.push('/diary/received')   }

// 일기 작성
const showWriteDiaryModal = ref(false)
const openWriteDiaryModal = () => (showWriteDiaryModal.value = true)
const closeWriteDiaryModal = () => (showWriteDiaryModal.value = false)

const onDiaryWritten = () => {
  fetchDiaries()
  closeWriteDiaryModal()
}

// 일기 삭제
const deleteDiary = async (diaryId) => {
  try {
    await axios.delete('http://localhost:8080/api/v1/diary/deleteDiary', {
      params: { id: diaryId }
    })
    diaryList.value = diaryList.value.filter(diary => diary.id !== diaryId)
    alert('일기가 삭제되었습니다😊')
    closeDiaryModal()
  } catch (error) {
    console.error('다이어리 삭제 실패:', error)
  }
}

// createdAt 날짜 포맷 예쁘게 보이게
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()  // YYYY-MM-DD 형태
}

// 일기 조회
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

const openDiaryModal = (diary) => {  selectedDiary.value = diary }
const closeDiaryModal = () => {  selectedDiary.value = null  }

onMounted(async () => {
  authStore.restoreSession()
  if (authStore.isLogin) {
    await fetchDiaries()
  }
})
</script>

<style scoped>
.diary-container {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9fafc;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #dbe0e6;
  padding-bottom: 15px;
}

.header h2 {
  font-size: 28px;
  color: #333;
}

.write-btn {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.write-btn:hover {
  background-color: #0056b3;
}

.empty-message {
  text-align: center;
  color: #999;
  margin-top: 80px;
  font-size: 18px;
}

.diary-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.diary-list li {
  background: white;
  margin: 12px 0;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #dbe0e6;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.diary-list li:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.diary-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.diary-title {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 8px;
}

.diary-date {
  font-size: 14px;
  color: #888;
}
</style>
