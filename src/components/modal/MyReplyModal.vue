<template>
    <v-dialog v-model="dialogVisible" max-width="600px" scrollable>
      <v-card>
        <v-card-title class="headline" style="background-color: #0277bd; color: white;">
          <span>{{ reply.title }}</span>
          <v-spacer></v-spacer>
        </v-card-title>
  
        <v-divider></v-divider>
  
        <v-card-text>
          <p>{{ reply.content }}</p>
          <p class="created-at">작성일: {{ formattedDate }}</p>
        </v-card-text>
  
        <v-card-actions>
          <v-btn color="error" @click="deleteReply">삭제</v-btn>
          <v-btn color="secondary" @click="close">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  import axios from 'axios'
  
  const props = defineProps({
    reply: Object
  })
  
  const emit = defineEmits(['close', 'deleted'])
  
  const dialogVisible = ref(true)
  
  watch(() => props.reply, () => {
    dialogVisible.value = true
  })
  
  const close = () => {
    dialogVisible.value = false
    emit('close')
  }
  
  const formattedDate = computed(() => {
    return props.reply.createdAt ? new Date(props.reply.createdAt).toLocaleString() : ''
  })
  
  // 답장 삭제
  import { deleteReply as deleteReplyAPI } from '../../api/diary/replyCommand'
  const deleteReply = async () => {
    try {
      await deleteReplyAPI(props.reply.id);
      alert('답장이 삭제되었습니다.')
      emit('deleted', props.reply.id)
    } catch (error) {
      console.error('답장 삭제 실패:', error)
      alert('삭제에 실패했습니다.')
    }
  }
  </script>
  
  <style scoped>
  .headline {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .created-at {
    margin-top: 20px;
    font-size: 14px;
    color: #777;
  }
  </style>
  