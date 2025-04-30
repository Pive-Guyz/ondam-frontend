<template>
    <v-dialog v-model="visible" max-width="600px" scrollable>
      <v-card class="reply-card">
        <!-- 헤더 -->
        <v-card-title class="headline" style="background-color: #0277bd; color: white;">
          <span>답장 작성</span>
          <v-spacer></v-spacer>
        </v-card-title>
  
        <v-divider></v-divider>
  
        <!-- 입력 필드 -->
        <v-card-text>
          <v-text-field
            v-model="title"
            label="답장 제목"
            outlined
            class="mb-4"
          />
          <v-textarea
            v-model="content"
            label="답장 내용"
            outlined
            rows="5"
          />
        </v-card-text>
  
        <!-- 버튼 -->
        <v-card-actions class="justify-end">
          <v-btn @click="sendReply" color="primary" class="rounded-btn">답장 보내기</v-btn>
          <v-btn @click="closeModal" color="secondary" class="rounded-btn">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import axios from 'axios'
  import { useAuthStore } from '../../stores/auth'
  const authStore = useAuthStore()
  
  // Props & emits
  const props = defineProps({
    modelValue: Boolean,
    diaryRecord: Object
  })
  const emit = defineEmits(['update:modelValue'])
  
  // 다이얼로그 표시 연결
  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })
  
  // 입력값
  const title = ref('')
  const content = ref('')
  
  // 닫기
  const closeModal = () => {
    visible.value = false
  }
  
  // 전송
  import { writeReply } from '../../api/diary/replyCommand'
  const sendReply = async () => {
    try {
      if (!title.value || !content.value) {
        alert('제목과 내용을 모두 입력하세요!')
        return
      }
  
      const payload = {
        title: title.value,
        content: content.value,
        diaryRecordId: props.diaryRecord?.id
      }
  
      await writeReply(payload);
      let point = authStore.point
      point = point + 10
      authStore.point = point
      localStorage.setItem('memberPoint', point)
      alert(`답장이 전송되었습니다! 현재 포인트는 ${point}입니다.`)

      closeModal()
    } catch (error) {
      console.error('답장 보내기 실패:', error)
      alert('답장 전송 실패')
    }
  }
  </script>
  
  <style scoped>
  .reply-card {
    font-family: 'Roboto', sans-serif;
  }
  
  .headline {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .rounded-btn {
    border-radius: 20px;
    text-transform: none;
    padding: 8px 16px;
  }
  </style>
  