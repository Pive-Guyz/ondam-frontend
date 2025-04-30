import axios from '../config/axios'

// 일기 신고 등록
export const reportDiary = (data) => {
    return axios.post('/api/v1/report/diary', data)
}

// 답장 신고 등록
export const reportReply = (data) => {
    return axios.post('/api/v1/report/reply', data)
}

// 신고 상태 수정
export const updateReportStatus = (reportId, status) => {
    return axios.put('/api/v1/report/status', {
        reportId,
        status
    })
}

// 블라인드 처리 (승인 시)
export const approveReport = (reportId) => {
    return axios.put(`/api/v1/report/approve/${reportId}`)
}