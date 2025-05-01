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

/**
 * 신고 상태 수정
 * @param {number} reportId
 * @param {number} status
 */
export const updateReportStatus = (reportId, status) => {
    return axios.put(`${API_BASE}/status`, {
        reportId,
        status
    })
}

/**
 * 신고 승인 및 블라인드 처리
 * @param {number} reportId
 */
export const approveReport = (reportId) => {
    return axios.put(`${API_BASE}/approve/${reportId}`)
}