<template>
    <v-dialog v-model="visible" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">답장 작성</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="title" label="답장 제목" outlined />
          <v-textarea v-model="content" label="답장 내용" outlined rows="4" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="sendReply" color="primary">답장 보내기</v-btn>
          <v-btn @click="closeModal" text>닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import axios from 'axios'
  
  // Props & emits
  const props = defineProps({
    modelValue: Boolean,
    diaryRecord: Object // ReceivedDiaryModal에서 전달받는 diaryRecord
  })
  const emit = defineEmits(['update:modelValue'])
  
  // 반응형 연결
  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })
  
  // 입력 값
  const title = ref('')
  const content = ref('')
  
  // 닫기 함수
  const closeModal = () => {
    visible.value = false
  }
  
  // 답장 보내기
  const sendReply = async () => {
  try {
    if (!title.value || !content.value) {
      alert('제목과 내용을 모두 입력하세요!')
      return
    }

    const payload = {
      title: title.value,
      content: content.value,
      diaryRecordId: props.diaryRecord.id
    }

    await axios.post('http://localhost:8080/api/v1/reply/writeReply', payload)
    alert('답장이 전송되었습니다!')
    closeModal()
  } catch (error) {
    console.error('답장 보내기 실패:', error)
    alert('답장 전송 실패')
  }
}
  </script>
  
  <style scoped>
  .headline {
    font-size: 24px;
    font-weight: bold;
  }
  </style>
  