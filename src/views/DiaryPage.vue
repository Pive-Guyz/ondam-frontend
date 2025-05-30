DiaryPage.vue

<template>
  <v-app class="main-background">

    <Header />
    <MemberSidebar />

    <v-container
      fluid
      class="d-flex justify-center"
      :class="{ 'blur-background': selectedDiary || showWriteDiaryModal }"
      style="padding-top: 80px; padding-left: 280px; padding-right: 24px; padding-bottom: 32px; min-height: 100vh;"
    >
      <div
        class="d-flex flex-column align-center"
        style="width: 100%; max-width: 1000px;"
      >
        <v-card
          class="pa-6 rounded-xl"
          elevation="3"
          style="width: 100%; max-height: calc(100vh - 160px); overflow-y: auto;"
        >
          <!-- 제목 -->
          <v-row align="center" class="mb-6">
            <v-col cols="auto">
              <v-img :src="pencilMan" alt="연필맨" width="80" height="80" cover />
            </v-col>
            <v-col>
              <h2 class="text-h4 font-weight-bold">My Diary List</h2>
              <p class="text-subtitle-1 text-grey">내가 작성한 일기 목록</p>
            </v-col>
            <v-col cols="auto">
              <v-btn color="teal" @click="openWriteDiaryModal">오늘의 일기 작성하기</v-btn>
            </v-col>
          </v-row>

          <!-- 일기 목록 -->
          <v-sheet
            class="pa-4"
            elevation="1"
            rounded
            style="height: 50vh; overflow-y: auto;"
          >
            <div v-if="diaryList.length === 0" class="text-center text-grey mt-10">
              아직 작성한 일기가 없습니다 ✍️
            </div>

            <v-list v-else>
              <v-list-item
                v-for="diary in diaryList"
                :key="diary.id"
                @click="openDiaryModal(diary)"
                class="mb-2"
              >
                <v-list-item-title>{{ diary.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ formatDate(diary.createdAt) }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-sheet>

          <!-- 하단 버튼 -->
          <v-row justify="center" class="mt-6">
            <v-btn outlined color="primary" class="mx-2" @click="goToReceivedDiary">오늘 받은 다이어리</v-btn>
            <v-btn outlined color="primary" class="mx-2" @click="goToMyReplies">내가 보낸 답장 보기</v-btn>
            <v-btn text color="grey" class="mx-2" @click="goHome">홈으로 돌아가기</v-btn>
          </v-row>

          
        </v-card>
      </div>
    </v-container>
    <!-- 모달 -->
    <DiaryModal v-if="selectedDiary" :diary="selectedDiary" @close="closeDiaryModal" @delete="deleteDiary" />
    <WriteDiaryModal v-if="showWriteDiaryModal" @close="closeWriteDiaryModal" @writeDiary="fetchDiaries" />
  </v-app>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DiaryModal from '@/components/modal/DiaryModal.vue'
import WriteDiaryModal from '@/components/modal/WriteDiaryModal.vue'
import { fetchDiariesByMemberId as fetchDiariesByMemberIdAPI, deleteDiary as deleteDiaryAPI } from '@/api/diary/diaryCommand'
import pencilMan from '@/assets/img/pencilMan.jpeg'
import MemberSidebar from '@/components/sidebar/MemberSidebar.vue'
import Header from '../components/Header.vue'

const authStore = useAuthStore()
const router = useRouter()

const diaryList = ref([])
const selectedDiary = ref(null)

const showWriteDiaryModal = ref(false)
const openWriteDiaryModal = () => showWriteDiaryModal.value = true
const closeWriteDiaryModal = () => showWriteDiaryModal.value = false
const openDiaryModal = (diary) => selectedDiary.value = diary
const closeDiaryModal = () => selectedDiary.value = null

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })
}

const fetchDiaries = async () => {
  try {
    const res = await fetchDiariesByMemberIdAPI(authStore.memberId)
    diaryList.value = res.data
  } catch (err) {
    console.error('다이어리 조회 실패:', err)
  }
}

const deleteDiary = async (diaryId) => {
  try {
      await deleteDiaryAPI(diaryId)
      diaryList.value = diaryList.value.filter(d => d.id !== diaryId)
      closeDiaryModal()
  } catch (e) {
    console.error('삭제 실패:', e)
  }
}

const goHome = () => router.push('/')
const goToReceivedDiary = () => router.push('/diary/received')
const goToMyReplies = () => router.push('/diary/reply')

onMounted(() => {
  authStore.restoreSession()
  if (authStore.isLogin) {
    fetchDiaries()
  }
})
</script>

<style scoped>
.main-background {
  background-color: #F5F7FA;
  min-height: 100vh;
}

.main-container {
  padding-top: 80px; /* ✅ 헤더 공간 확보 */
}

/* 모달이 열릴 때 흐림 효과 */
.blur-background {
  filter: blur(4px);
  pointer-events: none;
}

.v-application .v-app-bar {
  z-index: 100 !important;
}

.v-navigation-drawer {
  z-index: 100 !important;
}
</style>