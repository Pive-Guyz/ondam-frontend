import api from '@/api/config/axios'

const API_BASE = '/api/v1/report'

// 신고 상태 변경
export const updateReportStatus = (reportId, status) => {
    return api.put(`${API_BASE}/status`, {
        reportId,
        status
    })
}

// 블라인드 처리 API
export const approveReport = (reportId) => {
    return api.put(`${API_BASE}/approve/${reportId}`)
}