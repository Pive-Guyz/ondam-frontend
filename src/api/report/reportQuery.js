import axios from 'axios'

const API_BASE = '/api/v1/report'

// 신고 목록 조회 (status, order)
export const fetchReportList = (params = {}) => {
    return axios.get(`${API_BASE}`, { params })
}

// 신고 상세 조회
export const fetchReportDetail = (id) => {
    return axios.get(`${API_BASE}/${id}`)
}
