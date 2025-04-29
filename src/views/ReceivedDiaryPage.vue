<template>
  <div class="received-diary-view">
    <div class="header">
      <h2 class="page-title">오늘 받은 다이어리</h2>
      <v-btn @click="goBack" outlined color="primary" class="back-btn">뒤로가기</v-btn>
    </div>

    <v-divider class="my-4"></v-divider>

    <div v-if="receivedDiaryList.length === 0" class="empty-message">
      받은 다이어리가 없습니다.
    </div>

    <v-list v-else class="diary-list">
      <v-list-item v-for="diary in receivedDiaryList" :key="diary.id" @click="openDiaryDetail(diary)" class="diary-item">
        <v-list-item-title class="diary-title">{{ diary.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

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
const fetchReceivedDiaries = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/diaryRecord/findDiaryRecordByReceiverId', {
      params: { receiverId: authStore.memberId }, // ✅ 로그인한 사용자의 memberId 사용
    })
     // 각 다이어리에 대해 diaryId로 제목 조회
     const diariesWithTitle = await Promise.all(response.data.map(async (diaryRecord) => {
      const diaryResponse = await axios.get(`http://localhost:8080/api/v1/diary/findDiaryById`, {
        params: { id: diaryRecord.diaryId }
      })
      return {
        ...diaryRecord,
        title: diaryResponse.data.title  // 다이어리 제목 추가
      }
    }))
    
    receivedDiaryList.value = diariesWithTitle  // 다이어리 제목 포함된 목록으로 업데이트
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
.received-diary-view {
  padding: 40px;
  background-color: #f0f8ff;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.page-title {
  font-size: 2rem;
  color: #0277bd;
  font-weight: bold;
}

.back-btn {
  background-color: #0277bd;
  color: white;
  border-radius: 25px;
  padding: 8px 16px;
}

.empty-message {
  text-align: center;
  color: #999;
  font-size: 18px;
  margin-top: 80px;
}

.diary-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.diary-item {
  cursor: pointer;
  padding: 10px 16px;
}

.diary-item:hover {
  background-color: #e1f5fe;
}

.diary-title {
  font-size: 1.1rem;
  color: #01579b;
  font-weight: 600;
}
</style>