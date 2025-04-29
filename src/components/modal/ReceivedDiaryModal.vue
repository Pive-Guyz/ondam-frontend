<template>
  <v-dialog v-model="isModalOpen" max-width="600px" scrollable>
    <v-card>
      <v-card-title class="headline" style="background-color: #0277bd; color: white;">
        <span>{{ diary.title }}</span>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <p>{{ diary.content }}</p>
        <p class="created-at">작성일: {{ formattedCreatedAt }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="() => openReplyModal(props.diary)" color="primary">답장하기</v-btn>
        <v-btn @click="closeModal" color="secondary">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <ReplyModal v-model="showReplyModal" :diaryRecord="selectedDiaryRecord" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { computed } from 'vue'
import ReplyModal from '@/components/modal/ReplyModal.vue'

const props = defineProps({
  diary: Object,
  diaryId: Number
})


const formattedCreatedAt = computed(() => {
  return diary.value.createdAt ? new Date(diary.value.createdAt).toLocaleDateString('ko-KR') : ''
})

const emit = defineEmits(['close', 'openReplyModal'])

const isModalOpen = ref(true)
const diary = ref({
  title: '',
  content: '',
  createdAt: '',
  memberId: ''
})
// 다이어리 상세 정보 불러오기
const fetchDiaryDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/diary/findDiaryById`, {
      params: { id: props.diaryId }
    })
    
    diary.value = response.data
    console.log('diaryId:', props.diaryId)
    console.log("Selected Diary:", JSON.stringify(diary.value, null, 2))
    
  } catch (error) {
    console.error('다이어리 상세 정보 불러오기 실패:', error)
  }
}

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false
  emit('close')
}
// 페이지 로드 시 다이어리 정보 불러오기
onMounted(() => {
  fetchDiaryDetails()
})

// 답장 모달 부분
const selectedDiaryRecord = ref(null)

const showReplyModal = ref(false);
const openReplyModal = (record) => {
  if (!record) {
    console.warn('답장 열기에 필요한 diaryRecord가 전달되지 않았습니다.')
    return
  }
  selectedDiaryRecord.value = record
  showReplyModal.value = true
}
const closeReplyModal = () => {showReplyModal.value = false};

</script>

<style scoped>
.headline {
  font-size: 1.5rem;
  font-weight: bold;
}

v-btn {
  text-transform: none;
}
</style>
