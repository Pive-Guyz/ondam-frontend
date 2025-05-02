<template>
  <v-dialog v-model="isModalOpen" max-width="600px" scrollable persistent>
    <v-card class="modal-card">
      <div class="modal-header">
        <h2 class="modal-title">Today’s Diary</h2>
        <v-spacer></v-spacer>

        <v-btn class="report-btn" @click="onReport">🚩 신고하기</v-btn>
      </div>

      <div class="modal-inputs">
        <v-text-field
          label="제목"
          :model-value="diary.title"
          readonly
          hide-details
          class="input-title"
        />
        <v-text-field
          label="날짜"
          :model-value="formattedCreatedAt"
          readonly
          hide-details
          class="input-date"
        />
      </div>

      <v-card-text class="modal-content">
        <v-textarea
          class="diary-textarea"
          auto-grow
          :model-value="diary.content"
          readonly
          hide-details
        />
      </v-card-text>

      <v-card-actions class="modal-actions">
        <v-btn @click="() => openReplyModal(props.diary)" color="primary" class="action-btn">답장하기</v-btn>
        <v-btn @click="closeModal" color="black" class="action-btn">닫기</v-btn>
      </v-card-actions>
    </v-card>

    <ReplyModal v-model="showReplyModal" :diaryRecord="selectedDiaryRecord" />
  </v-dialog>
  <DiaryReportModal v-if="diary.memberId" v-model="isReportModalOpen" :diaryId="props.diaryId"
    :createdAt="formattedCreatedAt" :reportedMemberId="diary.memberId" />
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import ReplyModal from '@/components/modal/ReplyModal.vue'
import DiaryReportModal from '@/components/report/DiaryReportModal.vue'

const isReportModalOpen = ref(false)

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

import { fetchDiaryById } from '../../api/diary/diaryCommand'
const fetchDiaryDetails = async () => {
  try {
    const response = await fetchDiaryById(props.diaryId);
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
    isReportModalOpen.value = true
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000; /* 헤더와 사이드바보다 높은 z-index */
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-card {
  background-color: #ffffff;
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  border-radius: 12px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
}

.modal-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #1f1f1f;
}

.report-btn {
  background-color: #ffe5e5;
  color: #d33;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  text-transform: none;
  padding: 6px 12px;
}

.report-btn:hover {
  background-color: #ffd6d6;
}

.modal-inputs {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 16px 0;
}

.input-title,
.input-date {
  flex: 1;
}

.modal-content {
  padding: 0;
}

.diary-textarea {
  width: 100%;
  min-height: 200px;
  font-size: 16px;
  white-space: pre-wrap;
  background-color: #f9f9f9;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 20px;
}

.action-btn {
  text-transform: none;
  min-width: 120px;
  background-color: #33e6b2;
}
</style>
