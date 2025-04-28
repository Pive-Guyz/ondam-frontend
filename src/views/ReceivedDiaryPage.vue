<template>
  <div class="received-diary-view">
    <div class="header">
      <h2>오늘 받은 다이어리</h2>
      <v-btn @click="goBack" outlined color="primary">뒤로가기</v-btn>
    </div>

    <v-divider class="my-4"></v-divider>

    <div v-if="receivedDiaryList.length === 0" class="empty-message">
      받은 다이어리가 없습니다.
    </div>

    <v-list v-else>
      <v-list-item v-for="diary in receivedDiaryList" :key="diary.id" @click="openDiaryDetail(diary)">
        <v-list-item-content>
          <v-list-item-title>{{ diary.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <ReceivedDiaryModal
      v-if="selectedDiary"
      :diary="selectedDiary"
      @close="closeDiaryModal"
      @openReplyModal="openReplyModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import ReceivedDiaryModal from '../components/modal/ReceivedDiaryModal.vue'

const router = useRouter()
const receivedDiaryList = ref([])
const selectedDiary = ref(null)

// 받은 다이어리 목록 조회
const fetchReceivedDiaries = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/diary/received', {
      params: { memberId: 1 }, // 예시: 회원 ID를 사용
    })
    receivedDiaryList.value = response.data
  } catch (error) {
    console.error('받은 다이어리 조회 실패:', error)
  }
}

// 다이어리 상세보기 모달 열기
const openDiaryDetail = (diary) => {
  selectedDiary.value = diary
}

// 다이어리 모달 닫기
const closeDiaryModal = () => {
  selectedDiary.value = null
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
  background-color: #f9fafc;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.empty-message {
  text-align: center;
  color: #999;
  font-size: 18px;
  margin-top: 80px;
}

v-list-item {
  cursor: pointer;
}

v-list-item:hover {
  background-color: #f1f1f1;
}
</style>
