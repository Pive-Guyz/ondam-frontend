// src/api/counselCommand.js

import axios from '../config/axios';

/**
 * 상담 일지 생성
 * @param {object} data - CreateRequest 형태
 */
export const createCounsel = (data) => {
    return axios.post('/api/v1/counsels', data);
};

/**
 * 상담 일지 수정
 * @param {string} counselId
 * @param {object} data - UpdateRequest 형태
 */
export const updateCounsel = (counselId, data) => {
    return axios.put(`/api/v1/counsels/${counselId}`, data);
};

/**
 * 다음 상담일 수정
 * @param {string} counselId
 * @param {object} data - { next_created_at: 'YYYY-MM-DD' }
 */
export const updateNextCounselDate = (counselId, data) => {
    return axios.patch(`/api/v1/counsels/${counselId}/next-date`, data);
};

/**
 * 상담 일지 삭제
 * @param {string} counselId
 */
export const deleteCounsel = (counselId) => {
    return axios.delete(`/api/v1/counsels/${counselId}`);
};
