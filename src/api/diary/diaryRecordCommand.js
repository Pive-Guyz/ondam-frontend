import axios from '../config/axios';

/**
 * 전체 다이어리 레코드 조회
 * GET /diaryRecord/findAllDiaryRecord
 */
export const fetchAllDiaryRecords = () => {
  return axios.get('/diaryRecord/findAllDiaryRecord');
};

/**
 * ID로 다이어리 레코드 조회
 * GET /diaryRecord/findDiaryRecordById
 * @param {number} id
 */
export const fetchDiaryRecordById = (id) => {
  return axios.get('/diaryRecord/findDiaryRecordById', {
    params: { id }
  });
};

/**
 * diaryId로 다이어리 레코드 조회
 * GET /diaryRecord/findDiaryRecordByDiaryId
 * @param {number} diaryId
 */
export const fetchDiaryRecordsByDiaryId = (diaryId) => {
  return axios.get('/diaryRecord/findDiaryRecordByDiaryId', {
    params: { diaryId }
  });
};

/**
 * receiverId로 다이어리 레코드 조회
 * GET /diaryRecord/findDiaryRecordByReceiverId
 * @param {number} receiverId
 */
export const fetchDiaryRecordsByReceiverId = (receiverId) => {
  return axios.get('/diaryRecord/findDiaryRecordByReceiverId', {
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
  return axios.get('/diaryRecord/findDiaryRecordByDiaryIdAndReceiverId', {
    params: { diaryId, receiverId }
  });
};

/**
 * 다이어리 전송
 * POST /diaryRecord/sendDiary
 * @param {number} diaryId
 */
export const sendDiary = (diaryId) => {
  return axios.post('/diaryRecord/sendDiary', null, {
    params: { diaryId }
  });
};
