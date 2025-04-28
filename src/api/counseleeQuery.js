// src/api/counseleeQuery.js

import axios from './config/axios';

/**
 * 내담자 목록 조회
 * @param {string} memberId
 */
export const fetchCounselees = (memberId) => {
    return axios.get('/api/v1/counselees', {
        params: { memberId },
    });
};

/**
 * 내담자 상세 조회
 * @param {string} id
 */
export const fetchCounseleeById = (id) => {
    return axios.get(`/api/v1/counselees/${id}`);
};

/**
 * 내담자 이름 검색
 * @param {string} memberId
 * @param {string} name
 */
export const searchCounseleesByName = (memberId, name) => {
    return axios.get('/api/v1/counselees/search', {
        params: { memberId, name },
    });
};

/**
 * 활성 내담자 목록 조회
 * @param {string} memberId
 */
export const fetchActiveCounselees = (memberId) => {
    return axios.get('/api/v1/counselees/active', {
        params: { memberId },
    });
};

/**
 * 내담자 수 조회
 * @param {string} memberId
 */
export const fetchCounseleeCount = (memberId) => {
    return axios.get('/api/v1/counselees/count', {
        params: { memberId },
    });
};
