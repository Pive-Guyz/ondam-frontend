import axios from '../config/axios';

/**
 * 상담사별 상담 기록 조회
 * @param {string} memberId
 */
export const fetchCounselsByMemberId = (memberId) => {
    return axios.get(`/api/v1/counsels/member/${memberId}`);
};

/**
 * 내담자별 상담 기록 조회
 * @param {string} counseleeId
 */
export const fetchCounselsByCounseleeId = (counseleeId) => {
    return axios.get(`/api/v1/counsels/counselee/${counseleeId}`);
};

/**
 * 상담 기록 상세 조회
 * @param {string} id
 */
export const fetchCounselById = (id) => {
    return axios.get(`/api/v1/counsels/${id}`);
};

/**
 * 기간별 상담 기록 조회
 * @param {string} startDate (ISO 형식: 'YYYY-MM-DDTHH:mm:ss')
 * @param {string} endDate (ISO 형식: 'YYYY-MM-DDTHH:mm:ss')
 */
export const fetchCounselsByDateRange = (startDate, endDate) => {
    return axios.get('/api/v1/counsels/date-range', {
        params: { startDate, endDate },
    });
};

/**
 * 예정된 상담 일정 조회
 */
export const fetchUpcomingCounsels = () => {
    return axios.get('/api/v1/counsels/upcoming');
};
