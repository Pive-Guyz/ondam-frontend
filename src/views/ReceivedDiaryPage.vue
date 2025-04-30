<template>
  <div class="diary-container">
    <div class="header">
      <h2 class="title">📨 오늘 받은 다이어리</h2>
      <button class="back-btn" @click="goBack">뒤로가기</button>
    </div>

    <div class="divider"></div>

    <div v-if="receivedDiaryList.length === 0" class="empty-message">
      아직 받은 다이어리가 없습니다. 📨
    </div>

    <ul v-else class="diary-list">
      <li v-for="diary in receivedDiaryList" :key="diary.id" @click="openDiaryDetail(diary)">
        <div class="diary-item">
          <span class="diary-title">{{ diary.title }}</span>
        </div>
      </li>
    </ul>

    <ReceivedDiaryModal
      v-if="selectedDiary"
      :diary="selectedDiary"
      :diaryId="selectedDiary.diaryId"
      @close="closeDiaryModal"
      @openReplyModal="openReplyModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ReceivedDiaryModal from '../components/modal/ReceivedDiaryModal.vue'

const router = useRouter()
const authStore = useAuthStore()  // ✅ Pinia store 가져오기
const receivedDiaryList = ref([])
const selectedDiary = ref(null)

// 받은 다이어리 목록 조회
import { fetchDiaryRecordsByReceiverId } from '../api/diary/diaryRecordCommand'
import { fetchDiaryById } from '../api/diary/diaryCommand'
const fetchReceivedDiaries = async () => {
  try {
    const response = await fetchDiaryRecordsByReceiverId(authStore.memberId);
  
    const diaryRecords = response.data

    const diariesWithTitle = await Promise.all(
      diaryRecords.map(async (diaryRecord) => {
        try {
          const diaryResponse = await fetchDiaryById(diaryRecord.diaryId);
          const diaryData = diaryResponse.data

          // 조건에 맞지 않으면 null 반환
          if (diaryData.deleted_at || diaryData.is_blinded === 'Y') {
            return null
          }

          return {
            ...diaryRecord,
            title: diaryData.title,
          }
        } catch (error) {
          console.warn(`다이어리 ID ${diaryRecord.diaryId} 조회 실패`, error)
          return null
        }
      })
    )

    // null 아닌 것만 필터링
    receivedDiaryList.value = diariesWithTitle.filter(
  (d) => d !== null && d.title && d.title.trim() !== ''
)

  } catch (error) {
    console.error('받은 다이어리 조회 실패:', error)
  }
}

// 다이어리 상세보기 모달 열기
const openDiaryDetail = (diary) => {
  console.log('Selected Diary:', diary)  // 로그 추가
  selectedDiary.value = diary
}

// 다이어리 모달 닫기
const closeDiaryModal = () => {
  selectedDiary.value = null
}

// 답장 모달 열기 (이 함수 추가)
const openReplyModal = () => {
  console.log("답장 모달을 여는 로직이 필요합니다.")
  // 실제 답장 모달을 여는 로직을 추가하세요.
}

// 뒤로가기
const goBack = () => {
  router.push('/diary') // 홈 화면으로 이동
}

// 페이지 로드 시 받은 다이어리 목록 가져오기
onMounted(() => {
  fetchReceivedDiaries()
})
</script>

<style scoped>
.diary-container {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9fafc;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 10px;
  position: relative;
}

.title {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 16px;
  background-color: #0277bd;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #01579b;
}

.divider {
  width: 40%;
  height: 2px;
  background-color: #dbe0e6;
  margin: 0 auto 30px auto;
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