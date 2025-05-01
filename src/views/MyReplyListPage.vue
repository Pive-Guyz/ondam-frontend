<template>
  <v-app class="main-background">
    <Header />
    <MemberSidebar />

    <v-main>
      <v-container
        class="reply-page-container"
        :class="{ 'blur-background': selectedReply }"
        fluid
      >
        <div class="reply-content">
          <div class="reply-box">
            <h2 class="reply-title-header">📬 내가 보낸 답장 목록</h2>

            <div v-if="replyList.length === 0" class="empty-message">
              보낸 답장이 없습니다.
            </div>

            <v-list v-else class="reply-list" lines="two">
              <v-list-item
                v-for="reply in replyList"
                :key="reply.id"
                @click="openReplyModal(reply)"
                class="reply-card"
              >
                <v-list-item-title class="reply-title">{{ reply.title }}</v-list-item-title>
                <v-list-item-subtitle class="reply-date">{{ formatDate(reply.createdAt) }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <div class="footer-btn-wrapper">
              <v-btn class="back-btn" @click="goBack" color="primary" variant="outlined">← 뒤로가기</v-btn>
            </div>
          </div>
        </div>
      </v-container>

      <MyReplyModal
        v-if="selectedReply"
        :reply="selectedReply"
        @close="closeModal"
        @deleted="onReplyDeleted"
      />
    </v-main>
  </v-app>
</template>

  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import MyReplyModal from '@/components/modal/MyReplyModal.vue'
  import MemberSidebar from '@/components/sidebar/MemberSidebar.vue'
  import Header from '../components/Header.vue'

  
  const authStore = useAuthStore()
  const replyList = ref([])
  const selectedReply = ref(null)
  const router = useRouter()

  
  import { fetchReplyBySenderId } from '../api/diary/replyCommand'
  const fetchReplies = async () => {
    try {
      const response = await fetchReplyBySenderId(authStore.memberId);

      replyList.value = response.data.filter(reply => !reply.deletedAt && reply.isBlinded !== 'Y')
    } catch (error) {
      console.error('답장 목록 불러오기 실패:', error)
    }
  }

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString()
}

const openReplyModal = (reply) => {
  selectedReply.value = reply
}

const closeModal = () => {
  selectedReply.value = null
}

const onReplyDeleted = (deletedId) => {
  replyList.value = replyList.value.filter(reply => reply.id !== deletedId)
  closeModal()
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  authStore.restoreSession()
  if (authStore.isLogin) {
    fetchReplies()
  }
})
</script>

<style scoped>
.main-background {
  background-color: #eef3f7;
  min-height: 100vh;
}

.reply-page-container {
  display: flex;
  justify-content: center;
  padding-top: 120px; /* 헤더 높이만큼 여백 */
  padding-bottom: 60px;
  box-sizing: border-box;
  transition: filter 0.3s ease;
}

/* 모달이 열릴 때 흐림 효과 */
.blur-background {
  filter: blur(4px);
  pointer-events: none;
}

.reply-content {
  max-width: 800px;
  width: 100%;
}

.reply-box {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  padding: 40px;
  box-sizing: border-box;
  z-index: 1;
  position: relative;
}

.reply-title-header {
  font-size: 24px;
  font-weight: bold;
  color: #1f1f1f;
  margin-bottom: 24px;
}

.empty-message {
  text-align: center;
  margin-top: 80px;
  font-size: 18px;
  color: #999;
}

.reply-list {
  background: transparent;
  padding: 0;
}

.reply-card {
  background-color: #fff;
  margin-bottom: 12px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.2s;
  cursor: pointer;
}

.reply-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.reply-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.reply-date {
  font-size: 14px;
  color: #888;
}

.footer-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.back-btn {
  text-transform: none;
  font-weight: 600;
}
</style>