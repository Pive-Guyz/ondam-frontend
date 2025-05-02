// src/api/memberCommand.js

import axios from '../config/axios';

/**
 * 회원가입
 * @param {Object} memberData - 회원 가입 정보 (name, email, password 등)
 */
export const registerMember = (memberData) => {
  return axios.post('/api/v1/member/regist', memberData)
}

/**
 * 회원 탈퇴
 * @param {number|string} id - 회원 ID
 */
export const deleteMember = (id) => {
  return axios.delete(`/api/v1/member/${id}/delete`);
};

/**
 * 비밀번호 변경
 * @param {number|string} id - 회원 ID
 * @param {Object} passwordData - 비밀번호 정보 (currentPassword, newPassword, newPasswordCheck)
 */
export const changePassword = (id, passwordData) => {
  return axios.put(`/api/v1/member/${id}/password`, passwordData);
};
