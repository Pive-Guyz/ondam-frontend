<template>
  <v-dialog v-model="isModalOpen" max-width="600px" scrollable>
    <v-card class="modal-card">
      <v-card-title class="modal-header">
        <span class="modal-title">{{ diary.title }}</span>
        <v-spacer></v-spacer>
        <v-btn class="report-btn" @click="onReport">🚩 신고하기</v-btn>
      </v-card-title>

      <div class="divider"></div>

      <v-card-text class="modal-content">
        <p class="diary-content">{{ diary.content }}</p>
        <p class="created-at">🕒 작성일: {{ formattedCreatedAt }}</p>
      </v-card-text>

      <v-card-actions class="modal-actions">
        <v-btn @click="() => openReplyModal(props.diary)" color="primary" class="action-btn">답장하기</v-btn>
        <v-btn @click="closeModal" color="grey" class="action-btn">닫기</v-btn>
      </v-card-actions>
    </v-card>

    <ReplyModal v-model="showReplyModal" :diaryRecord="selectedDiaryRecord" />
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import ReplyModal from '@/components/modal/ReplyModal.vue'

const props = defineProps({
  diary: Object,
  diaryId: Number
})

const emit = defineEmits(['close', 'openReplyModal'])

const isModalOpen = ref(true)
const diary = ref({
  title: '',
  content: '',
  createdAt: '',
  memberId: ''
})

const formattedCreatedAt = computed(() => {
  return diary.value.createdAt ? new Date(diary.value.createdAt).toLocaleDateString('ko-KR') : ''
})

const fetchDiaryDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/diary/findDiaryById`, {
      params: { id: props.diaryId }
    })
    diary.value = response.data
  } catch (error) {
    console.error('다이어리 상세 정보 불러오기 실패:', error)
  }
}

const closeModal = () => {
  isModalOpen.value = false
  emit('close')
}

// 신고 기능
const onReport = () => {
  const confirmed = confirm('이 다이어리를 신고하시겠습니까?')
  if (confirmed) {
    alert('신고가 접수되었습니다. 검토 후 조치하겠습니다.')
    // TODO: 신고 API 연동 예정
  }
}

// 답장 모달
const selectedDiaryRecord = ref(null)
const showReplyModal = ref(false)

const openReplyModal = (record) => {
  if (!record) return
  selectedDiaryRecord.value = record
  showReplyModal.value = true
}

onMounted(() => {
  fetchDiaryDetails()
})
</script>

<style scoped>
.modal-card {
  background-color: #f9fafc;
  font-family: 'Roboto', sans-serif;
}

.modal-header {
  background-color: #0277bd;
  color: white;
  font-weight: bold;
  padding: 20px;
  display: flex;
  align-items: center;
}

.modal-title {
  font-size: 1.5rem;
}

.report-btn {
  background-color: #ffe5e5;
  color: #d33;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: none;
}

.report-btn:hover {
  background-color: #ffd6d6;
}

.divider {
  width: 40%;
  height: 2px;
  background-color: #dbe0e6;
  margin: 10px auto;
}

.modal-content {
  padding: 24px;
}

.diary-content {
  font-size: 16px;
  margin-bottom: 20px;
  white-space: pre-wrap;
}

.created-at {
  font-size: 14px;
  color: #888;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}

.action-btn {
  margin-left: 10px;
  text-transform: none;
}
</style>
