import axios from '../config/axios'

// 신고 목록 조회
export const fetchReportList = (params) => {
    return axios.get('/api/v1/report', { params })
}

// 신고 상세 조회
export const fetchReportDetail = (reportId) => {
    return axios.get(`/api/v1/report/${reportId}`)
}

// 신고된 콘텐츠 조회 (일기 or 답장 본문)
export const fetchReportContent = (reportId) => {
    return api.get(`/api/v1/report/content/${reportId}`)
}

// 신고 카테고리 목록
export const fetchReportCategories = () => {
    return axios.get('/api/v1/report/report-category')
}