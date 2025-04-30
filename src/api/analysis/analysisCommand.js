import axios from '../config/axios';

/**
 * GPT 프롬프트 요청 (상담 일지 분석 요청)
 * @param {object} data - ChatCompletionDTO 형태 (messages 배열 필요)
 */
export const requestGptPrompt = (data, options = {}) => {
    return axios({
        method: 'post',
        url: '/api/v1/analysis/gpt/prompt',
        data,
        timeout: options.timeout || 10000,
    });
};