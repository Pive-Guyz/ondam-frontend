<template>
    <div class="reply-list-page">
      <h2>📬 내가 보낸 답장 목록</h2>
      <button class="back-btn" @click="goBack">← 뒤로가기</button>
  
      <div v-if="replyList.length === 0" class="empty-message">
        보낸 답장이 없습니다.
      </div>
  
      <ul v-else class="reply-list">
        <li v-for="reply in replyList" :key="reply.id" @click="openReplyModal(reply)">
          <div class="reply-item">
            <span class="reply-title">{{ reply.title }}</span>
            <span class="reply-date">{{ formatDate(reply.createdAt) }}</span>
          </div>
        </li>
      </ul>
  
      <MyReplyModal v-if="selectedReply" :reply="selectedReply" @close="closeModal" @deleted="onReplyDeleted" />
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
.reply-list-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f9fafc;
  min-height: 100vh;
}

h2 {
  font-size: 26px;
  margin-bottom: 20px;
  text-align: center;
}

.back-btn {
  margin-bottom: 20px;
  background-color: #0277bd;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.empty-message {
  text-align: center;
  margin-top: 80px;
  font-size: 18px;
  color: #999;
}

.reply-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.reply-list li {
  background: white;
  margin: 12px 0;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #dbe0e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.reply-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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