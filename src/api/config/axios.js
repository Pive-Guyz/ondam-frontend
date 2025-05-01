import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});

// 요청 인터셉터 (필요시)
instance.interceptors.request.use(
    (config) => {
        // 예: 토큰 추가 같은 작업 가능
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 (필요시)
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // 예: 에러 로깅, 에러 메시지 가공 등
        return Promise.reject(error);
    }
);

export default instance;
