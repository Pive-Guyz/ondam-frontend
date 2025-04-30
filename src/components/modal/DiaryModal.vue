<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <h2>📓 일기 상세보기</h2>
        <div class="modal">
          <div class="modal-content">
            <!-- 왼쪽: 일기 내용 -->
            <div class="left-section">
              <div class="section">
                <div class="section-header">제목</div> <!-- 여기 추가 -->
                <div class="box">{{ diary?.title || '제목 없음' }}</div>
              </div>
    
              <div class="section">
                <div class="section-header">작성 시간</div> <!-- 여기 추가 -->
                <div class="box">{{ formatDate(diary?.createdAt) || '작성일 정보 없음' }}</div>
              </div>
    
              <div class="section">
                <div class="section-header">내용</div> <!-- 여기 추가 -->
                <div class="box content-box">{{ diary?.content || '내용이 없습니다.' }}</div>
              </div>
    
              <div class="modal-buttons">
                <button class="delete-btn" @click="onDelete">삭제</button>
                <button class="close-btn" @click="$emit('close')">닫기</button>
              </div>
            </div>
    
          <!-- 오른쪽: 답장 리스트 -->
          <div class="right-section">
            <div class="section">
              <div class="section-header">답장 목록</div> <!-- 여기 추가 -->
              <div v-if="replies.length > 0">
                <ul class="reply-list">
                  <li v-for="reply in replies" :key="reply.id" class="reply-item" @click="openReplyModal(reply)">
                    {{ reply.title }}
                  </li>
                </ul>
              </div>
              <div v-else>
                <p>답장이 없습니다.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 답장 상세보기 모달 -->
        <div v-if="selectedReply" class="modal-overlay" @click.self="selectedReply = null">
          <div class="reply-modal">
            <h2 class="modal-title">
              답장 상세보기
              <button class="report-btn" @click="onReportReply">🚩 신고하기</button>
            </h2>
            <div class="section">
              <div class="section-header">제목</div>
              <div class="box">{{ selectedReply.title }}</div>
            </div>

            <div class="section">
              <div class="section-header">내용</div>
              <div class="box content-box">{{ selectedReply.content }}</div>
            </div>

            <div class="section">
              <div class="section-header">작성 시간</div>
              <div class="box">{{ formatDate(selectedReply.createdAt) }}</div>
            </div>

            <button class="close-btn" @click="selectedReply = null">닫기</button>
          </div>
        </div>
        <ReplyReportModal
  v-if="selectedReply"
  v-model="isReportModalOpen"
  :reply-id="selectedReply.id"
  :created-at="selectedReply.createdAt"
  :reported-member-id="selectedReply.senderId"
/>
      </div>
  </div>
  </div>
  </template>
  
  <script setup>
    import { defineEmits, defineProps, ref, onMounted } from 'vue'
    import axios from 'axios'
    import ReplyReportModal from '@/components/report/ReplyReportModal.vue'

    const isReportModalOpen = ref(false) 
  
    const onReportReply = () => {
      console.log('[선택된 답장]', selectedReply.value)
      isReportModalOpen.value = true
    }

  const props = defineProps({
    diary: Object
  })
  
  const emits = defineEmits(['close', 'delete'])
  
  const replies = ref([]) // 답장 리스트
  const selectedReply = ref(null) // 선택된 답장

    // diaryId를 사용하여 해당 일기의 답장 가져오기
    const fetchReplies = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/reply/findReplyByDiaryId`, {
            params: { diaryId: props.diary.id } // diaryId를 쿼리 파라미터로 전송
            })
            replies.value = response.data // 답장 데이터 저장
        } catch (error) {
            console.error('답장 데이터를 불러오는 데 실패했습니다.', error)
        }
    }

    // 답장 상세보기 모달 열기
    const openReplyModal = (reply) => {
        selectedReply.value = reply
    }   

    // 컴포넌트가 마운트되면 답장 데이터를 가져옴
    onMounted(() => {
        if (props.diary?.id) {
            fetchReplies() // 답장 리스트를 가져옴
        }
    })
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString() // "2025. 4. 27. 오후 10:19:36" 이런 식
  }
  
  const onDelete = () => {
  // 삭제 확인 창이 취소되었을 때, 아무 동작도 하지 않음
  const confirmDelete = confirm('정말 이 일기를 삭제할까요?')

  if (confirmDelete && props.diary?.id) {
    // 삭제가 확인되었을 때만 삭제 실행
    emits('delete', props.diary.id)
  }
}
  </script>
  
  <style scoped>
.section-header {
  background-color: #d0e4ff; /* 연한 파란색 */
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  color: #333;
  margin-bottom: 8px;
}

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  
  .modal-container {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 60%; /* 줄였음: 원래 80% */
  max-width: 900px;
  display: flex;
  flex-direction: column; /* 제목 위, 내용 아래 */
  align-items: center;
  text-align: center;
}

.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
}

.report-btn:hover {
  background-color: #ffd6d6;
}

.modal {
  width: 100%;
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}
  
  .modal-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .left-section {
    width: 60%; /* 왼쪽 부분의 너비 */
    margin-right: 20px;
  }
  
  .right-section {
    width: 35%; /* 오른쪽 부분의 너비 */
    background-color: #f5f8ff;
    padding: 15px;
    border-radius: 8px;
  }
  
  .section {
    margin-bottom: 20px;
  }
  
  .section h3 {
    margin-bottom: 8px;
    font-size: 16px;
    color: #333;
  }
  
  .box {
    background-color: #f5f8ff;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
  }
  
  .content-box {
    min-height: 100px;
    white-space: pre-wrap;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .delete-btn {
    background-color: #ff6b6b;
    border: none;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .delete-btn:hover {
    background-color: #ff4d4d;
  }
  
  .close-btn {
    background-color: #ccc;
    border: none;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .close-btn:hover {
    background-color: #bbb;
  }
  
  /* 답장 리스트 스타일링 */
  .reply-list {
    list-style-type: none;
    padding: 0;
    cursor: pointer;
  }
  
  .reply-item {
    background-color: #fff;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease; /* 부드러운 전환 효과 추가 */
  }
  
  /* 마우스를 올렸을 때 강조 효과 */
  .reply-item:hover {
    background-color: #f5f8ff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 강조 */
    transform: scale(1.02); /* 약간 확대되는 효과 */
  }
  
  /* 답장 상세보기 모달 */
  .reply-modal {
    background: white;
    padding: 20px;
    border-radius: 12px;
    max-width: 500px;
    width: 80%;
    text-align: left;
  }
  
  .reply-modal .section {
    margin-bottom: 15px;
  }
  </style>
  