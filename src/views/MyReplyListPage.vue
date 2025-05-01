<template>
  <div class="reply-page-wrapper">
    <div class="reply-box">
      <div class="box-header">
        <h2>📬 내가 보낸 답장 목록</h2>
        <v-btn class="back-btn" @click="goBack" color="primary" variant="outlined">← 뒤로가기</v-btn>
      </div>

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
    </div>

    <MyReplyModal
      v-if="selectedReply"
      :reply="selectedReply"
      @close="closeModal"
      @deleted="onReplyDeleted"
    />
  </div>
</template>

  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { useAuthStore } from '@/stores/auth'
  import MyReplyModal from '@/components/modal/MyReplyModal.vue'
  
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
  
  .reply-page-wrapper {
  background-color: #eef3f7;
  min-height: 100vh;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.reply-box {
  background-color: #fff;
  width: 100%;
  max-width: 800px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  padding: 40px;
  box-sizing: border-box;
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  color: #1f1f1f;
}

.back-btn {
  text-transform: none;
  font-weight: 600;
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

</style>