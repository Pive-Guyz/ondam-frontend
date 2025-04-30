import axios from '../config/axios';

// 답장 전체 조회
export const fetchAllReplies = () => {
    return axios.get('/api/v1/reply/findAllReply');
}

// id로 답장 조회
export const fetchReplyById = (id) => {
    return axios.get('/api/v1/reply/findReplyById', {
        params: {id: id},
    });
}

// 일기id로 답장 조회
export const fetchReplyByDiaryId = (diaryId) => {
    return axios.get('/api/v1/reply/findReplyByDiaryId', {
        params: { diaryId },
    })
}

// 작성자id로 답장 조회
export const fetchReplyBySenderId = (senderId) => {
    return axios.get('/api/v1/reply/findReplyBySenderId', {
        params: { senderId },
    });
};

/**
 * 답장 작성
 * POST /api/v1/reply/writeReply
 * @param {Object} data - 답장 데이터 (title, content, diaryRecordId 포함)
 */
export const writeReply = (data) => {
    return axios.post('/reply/writeReply', data);
  };

/*
답장 삭제
POST /api/v1/reply/deleteReply
 */
export const deleteReply = (replyId) => {
    return axios.delete('/reply/deleteReply', {
        params: { replyId },
    });
}