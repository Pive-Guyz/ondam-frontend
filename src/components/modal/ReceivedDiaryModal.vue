<template>
  <v-dialog v-model="showDiaryModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ diary.title }}</span>
      </v-card-title>
      <v-card-text>
        <p>{{ diary.content }}</p>
        <v-divider class="my-3"></v-divider>
        <span class="caption">작성일: {{ formatDate(diary.createdAt) }}</span>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeModal" text>닫기</v-btn>
        <v-btn @click="openReplyModal" text>답장</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import ReplyModal from './ReplyModal.vue'

const emit = defineEmits(['openReplyModal', 'close'])

const props = defineProps({
  diary: Object,
})

const showDiaryModal = ref(true)

// 답장 모달 열기
const openReplyModal = () => {
  emit('openReplyModal')
}

// 다이어리 모달 닫기
const closeModal = () => {
  emit('close')
}

// 날짜 포맷 함수 직접 정의
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}
</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
}
</style>
