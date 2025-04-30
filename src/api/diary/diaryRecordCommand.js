import axios from '../config/axios';

/**
 * 전체 다이어리 레코드 조회
 * GET /diaryRecord/findAllDiaryRecord
 */
export const fetchAllDiaryRecords = () => {
  return axios.get('/api/v1/diaryRecord/findAllDiaryRecord');
};

/**
 * ID로 다이어리 레코드 조회
 * GET /diaryRecord/findDiaryRecordById
 * @param {number} id
 */
export const fetchDiaryRecordById = (id) => {
  return axios.get('/api/v1/diaryRecord/findDiaryRecordById', {
    params: { id }
  });
};

/**
 * diaryId로 다이어리 레코드 조회
 * GET /diaryRecord/findDiaryRecordByDiaryId
 * @param {number} diaryId
 */
export const fetchDiaryRecordsByDiaryId = (diaryId) => {
  return axios.get('/api/v1/diaryRecord/findDiaryRecordByDiaryId', {
    params: { diaryId }
  });
};

/**
 * receiverId로 다이어리 레코드 조회
 * GET /diaryRecord/findDiaryRecordByReceiverId
 * @param {number} receiverId
 */
export const fetchDiaryRecordsByReceiverId = (receiverId) => {
  return axios.get('/api/v1/diaryRecord/findDiaryRecordByReceiverId', {
    params: { receiverId }
  });
};

/**
 * diaryId + receiverId로 다이어리 레코드 조회
 * GET /diaryRecord/findDiaryRecordByDiaryIdAndReceiverId
 * @param {number} diaryId
 * @param {number} receiverId
 */
export const fetchDiaryRecordByDiaryIdAndReceiverId = (diaryId, receiverId) => {
  return axios.get('/api/v1/diaryRecord/findDiaryRecordByDiaryIdAndReceiverId', {
    params: { diaryId, receiverId }
  });
};

/**
 * 다이어리 전송
 * POST /diaryRecord/sendDiary
 * @param {number} diaryId
 */
export const sendDiary = (diaryId) => {
  return axios.post('/api/v1/diaryRecord/sendDiary', null, {
    params: { diaryId }
  });
};
