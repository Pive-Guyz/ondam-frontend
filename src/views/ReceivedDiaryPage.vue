<template>
  <v-app class="main-background">
    <!-- 헤더 추가 -->
    <Header />

    <!-- 사이드바 -->
    <MemberSidebar /> 

    <v-main>
      <v-container class="diary-container" fluid>
        <div class="diary-content">
          <div class="card-box">
            <div class="text-zone">
              <h2 class="main-title">Today’s Diary</h2>
              <p class="sub-text">오늘의 일기를 읽고 답장을 보내보세요!</p>
            </div>
            <div class="pencil-wrapper">
              <v-img
                :src="pencilMan"
                alt="연필맨"
                width="80"
                height="80"
                cover
              ></v-img>
            </div>
          </div>

          <div v-if="receivedDiaryList.length === 0" class="empty-message">
            아직 받은 다이어리가 없습니다. 📨
          </div>

          <div v-else class="card-list">
            <div
              class="diary-card"
              v-for="diary in receivedDiaryList"
              :key="diary.id"
              @click="openDiaryDetail(diary)"
            >
              <div class="card-header">
                <img
                  class="profile"
                  :src="diary.profileImage || basicImage"
                  alt="profile"
                />
                <span class="card-title">{{ truncateTitle(diary.title) }}</span>
              </div>
              <p class="card-preview">
                {{ diary.content }}
              </p>
              <p class="card-preview">
                {{ truncateContent(diary.content) }}
              </p>
              <button class="read-button">상세 보기</button>
            </div>
          </div>
          <button class="back-btn" @click="goBack">돌아가기</button>
        </div>

        <!-- ReceivedDiaryModal을 사용하여 모달 띄우기 -->
        <ReceivedDiaryModal
          v-if="selectedDiary"
          :diary="selectedDiary"
          :diaryId="selectedDiary.diaryId"
          @close="closeDiaryModal"
        />
      </v-container>
    </v-main>
  </v-app>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ReceivedDiaryModal from '../components/modal/ReceivedDiaryModal.vue'
import pencilMan from '@/assets/img/pencilMan.jpeg'
import basicImage from '@/assets/img/profile/counselorProfile.png'
import MemberSidebar from '@/components/sidebar/MemberSidebar.vue'
import Header from '../components/Header.vue'


const router = useRouter()
const authStore = useAuthStore()  // ✅ Pinia store 가져오기
const receivedDiaryList = ref([])
const selectedDiary = ref(null)

const truncateTitle = (title) => title.length > 10 ? title.slice(0, 10) + '...' : title
const truncateContent = (content) => {
  if (!content) return ''
  const result = content.length > 80 ? content.slice(0, 80) + '...' : content
  return result
}


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
            content: diaryData.content // ✅ 이 줄 빠졌을 수도 있음
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

/* 헤더 스타일 */
.v-app-bar {
  position: fixed; /* 고정 위치 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000; /* 헤더가 콘텐츠 위에 표시되도록 */
}

/* 사이드바와 콘텐츠가 헤더 아래에 배치되도록 margin-top 추가 */
.diary-container {
  display: flex;
  justify-content: center;
  padding-top: 100px; /* Header 고려 */
  padding-bottom: 60px;
  box-sizing: border-box;
}

.diary-content {
  max-width: 800px;
  width: 100%;
}

/* 카드 박스 스타일 */
.card-box {
  background: white;
  max-width: 1000px;
  margin: 0 auto 40px;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
}


.text-zone {
  text-align: left;
}

.main-title {
  font-size: 32px;
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 10px;
}

.sub-text {
  font-size: 16px;
  color: #555;
}

.empty-message {
  margin-top: 60px;
  font-size: 18px;
  color: #999;
}

.card-list {
  display: flex;
  flex-wrap: nowrap; /* 줄 바꿈 안 되게 */
  justify-content: space-between;
  gap: 16px;
  max-width: 1000px;
  margin: 0 auto 60px;
}

.diary-card {
  background-color: #2f1c82;
  color: white;
  border-radius: 16px;
  width: 312px; /* 3개가 정확히 들어가는 너비 */
  padding: 20px;
  text-align: left;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.diary-card:hover {
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-preview {
  font-size: 14px;
  margin: 10px 0 20px;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.read-button {
  background-color: #33e6b2;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}

.back-btn {
  margin-top: 20px;
  background-color: #0277bd;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #01579b;
}

.pencil-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}
</style>