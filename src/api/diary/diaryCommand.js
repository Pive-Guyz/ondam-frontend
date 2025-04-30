import axios from '../config/axios';

/**
 * 전체 일기 조회
 * GET /diary/findAllDiary
 */
export const fetchAllDiaries = () => {
  return axios.get('/api/v1/diary/findAllDiary');
};

/**
 * 활성화된 일기 조회
 * GET /diary/findActivatedDiary
 */
export const fetchActivatedDiaries = () => {
  return axios.get('/api/v1/diary/findActivatedDiary');
};

/**
 * 일기 ID로 조회
 * GET /diary/findDiaryById
 * @param {number} diaryId
 */
export const fetchDiaryById = (diaryId) => {
  return axios.get('/api/v1/diary/findDiaryById', {
    params: { id: diaryId },
  });
};

/**
 * 작성자 ID로 일기 조회
 * GET /diary/findDiaryByMemberId
 * @param {number} memberId
 */
export const fetchDiariesByMemberId = (memberId) => {
  return axios.get('/api/v1/diary/findDiaryByMemberId', {
    params: { memberId },
  });
};

/**
 * 일기 작성
 * POST /diary/writeDiary
 * @param {object} data - { title, content, memberId }
 */
export const writeDiary = (data) => {
  return axios.post('/api/v1/diary/writeDiary', data);
};

/**
 * 일기 삭제
 * DELETE /diary/deleteDiary
 * @param {number} diaryId
 */
export const deleteDiary = (diaryId) => {
  return axios.delete('/api/v1/diary/deleteDiary', {
    params: { id: diaryId },
  });
};
