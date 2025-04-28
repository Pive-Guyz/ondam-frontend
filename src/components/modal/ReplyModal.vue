<template>
    <v-dialog v-model="showReplyModal" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">답장 작성</span>
        </v-card-title>
        <v-card-text>
          <v-textarea v-model="replyContent" label="답장 내용" outlined rows="4"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="sendReply" color="primary">답장 보내기</v-btn>
          <v-btn @click="closeModal" text>닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const replyContent = ref('')
  const showReplyModal = ref(false)
  
  // 답장 보내기
  const sendReply = async () => {
    try {
      // 답장 내용 서버로 전송
      await axios.post('http://localhost:8080/api/v1/diary/reply', {
        content: replyContent.value,
        diaryId: props.diary.id,
      })
      alert('답장이 전송되었습니다!')
      closeModal()
    } catch (error) {
      console.error('답장 보내기 실패:', error)
    }
  }
  
  // 답장 모달 닫기
  const closeModal = () => {
    showReplyModal.value = false
  }
  </script>
  
  <style scoped>
  .headline {
    font-size: 24px;
    font-weight: bold;
  }
  </style>
  