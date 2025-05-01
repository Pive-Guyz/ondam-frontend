// src/api/member/memberQuery.js

import axios from '../config/axios'; // config/axios.js 경로에 맞게 조절해줘

/**
 * 전체 회원 조회
 */
export const fetchAllMembers = () => {
  return axios.get('/api/v1/member/findAllMembers');
};

/**
 * 로그인 요청
 * @param {Object} credentials { email, password }
 */
export const loginMember = (credentials) => {
  return axios.post('/api/v1/member/login', credentials);
};

/**
 * ID로 회원 조회
 * @param {number} id
 */
export const fetchMemberById = (id) => {
  return axios.get(`/api/v1/member/findMemberById`, {
    params: { id }
  });
};

/**
 * 이름 + 전화번호로 이메일(ID) 찾기
 * @param {string} name
 * @param {string} phone
 */
export const findEmailByNameAndPhone = (name, phone) => {
  return axios.get(`/api/v1/member/find-id`, {
    params: { name, phone }
  });
};

/**
 * 이름 + 이메일로 비밀번호 찾기
 * @param {string} name
 * @param {string} email
 */
export const findPasswordByNameAndEmail = (name, email) => {
  return axios.get('/api/v1/member/findPasswordByNameAndEmail', {
    params: { name, email },
  });
};

