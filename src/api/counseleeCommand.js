// src/api/counseleeCommand.js

import axios from './config/axios';

/**
 * 내담자 등록
 * @param {Object} counseleeData
 */
export const createCounselee = (counseleeData) => {
    return axios.post('/api/v1/counselees', counseleeData);
};

/**
 * 내담자 수정
 * @param {string} id
 * @param {Object} counseleeData
 */
export const updateCounselee = (id, counseleeData) => {
    return axios.put(`/api/v1/counselees/${id}`, counseleeData);
};

/**
 * 내담자 삭제
 * @param {string} id
 */
export const deleteCounselee = (id) => {
    return axios.delete(`/api/v1/counselees/${id}`);
};

/**
 * 내담자 상담 종료 처리
 * @param {string} id
 * @param {string} endReason
 */
export const endCounseling = (id, endReason) => {
    return axios.put(`/api/v1/counselees/${id}/end`, null, {
        params: { endReason },
    });
};
