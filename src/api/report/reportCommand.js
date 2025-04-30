import axios from '../config/axios'

const API_BASE = '/api/v1/report'

/**
 * 일기 신고 등록
 * @param {object} data - 신고 내용 (ReportDiaryCommandDTO 형태)
 */
export const reportDiary = (data) => {
    return axios.post(`${API_BASE}/diary`, data)
}

/**
 * 답장 신고 등록
 * @param {object} data - 신고 내용 (ReportReplyCommandDTO 형태)
 */
export const reportReply = (data) => {
    return axios.post(`${API_BASE}/reply`, data)
}