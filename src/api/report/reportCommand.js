import axios from 'axios'

const API_BASE = '/api/v1/report'

// 신고 상태 변경
export const updateReportStatus = (reportId, status) => {
    return axios.put(`${API_BASE}/status`, {
        reportId,
        status // 숫자여야 함: 0, 1, 2
    })
}