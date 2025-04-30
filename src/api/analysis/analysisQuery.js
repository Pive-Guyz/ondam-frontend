import axios from '../config/axios';

/**
 * 분석 기록 조회
 * @param {string} counselId
 */
export const getAnalysisResult = (counselId) => {
    return axios.get(`/api/v1/analysis/${counselId}/analysis`);
};