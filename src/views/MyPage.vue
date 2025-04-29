<template>
    <div class="page-container">
      <div class="mypage-container">
        <!-- 프로필 이미지 -->
        <div class="profile-image-section">
          <img class="profile-image" :src="profileImageUrl" alt="프로필 이미지" />
        </div>
  
        <!-- 정보 수정 폼 -->
        <div class="profile-info-section">
          <div class="form-rows">
            <div class="form-row">
              <div class="form-group">
                <label>이름</label>
                <input v-model="form.name" type="text" />
              </div>
              <div class="form-group">
                <label>비밀번호</label>
                <input v-model="form.password" type="password" />
              </div>
            </div>
  
            <div class="form-row">
              <div class="form-group">
                <label>이메일</label>
                <input v-model="form.email" type="email" />
              </div>
              <div class="form-group">
                <label>생년월일</label>
                <input v-model="form.birthday" type="text" />
              </div>
            </div>
  
            <div class="form-row">
              <div class="form-group">
                <label>전화번호</label>
                <input v-model="form.phone" type="tel" />
              </div>
              <div class="form-group">
                <label>주소</label>
                <input v-model="form.address" type="text" />
              </div>
            </div>
  
            <div class="form-row">
              <div class="form-group">
                <label>가입일</label>
                <input v-model="form.createdAt" readonly />
              </div>
              <div class="form-group">
                <label>권한</label>
                <div class="authority-box">
                  <span class="authority-role">{{ form.authority }}</span>
                  <button class="authority-btn" @click="requestUpgrade">신청</button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- 저장 버튼 -->
          <div class="save-btn-wrapper">
            <button class="save-btn" @click="save">저장</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const profileImageUrl = ref('https://via.placeholder.com/150')
  
  const form = ref({
    name: '서정훈',
    password: '********',
    email: 'charlenereed@gmail.com',
    phone: '01026437581',
    birthday: '19971216',
    address: '연희동',
    authority: '게스트',
    createdAt: '2025-04-24'
  })
  
  const save = () => {
    console.log('저장된 데이터:', form.value)
  }
  
  const requestUpgrade = () => {
    alert('권한 승급 신청이 완료되었습니다.')
    // 이후 axios 요청 등으로 서버 전송 가능
  }
  </script>
  
  <style scoped>
  .page-container {
    background-color: #f7f9fc;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-top: 200px;
    padding-bottom: 480px;
  }
  
  .mypage-container {
    display: flex;
    background: white;
    padding: 30px 30px 20px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    width: fit-content;
    max-width: 1100px;
    gap: 32px;
    align-items: flex-start;
  }
  
  .profile-image-section {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
  }
  
  .profile-image {
    width: 140px;
    height: 170px;
    object-fit: cover;
    border-radius: 10px;
    border: 2px solid #3c8df3;
  }
  
  .profile-info-section {
    display: flex;
    flex-direction: column;
  }
  
  .form-rows {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .form-row {
    display: flex;
    gap: 60px;
  }
  
  .form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    margin-bottom: 6px;
    font-weight: bold;
    color: #2c3e50;
  }
  
  .form-group input {
    padding: 10px;
    border: 2px solid #3c8df3;
    border-radius: 8px;
    font-size: 14px;
  }
  
  .authority-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid #3c8df3;
    border-radius: 12px;
    padding: 5px 6px;
    background-color: #f9fbff;
  }
  
  .authority-role {
    font-size: 14px;
    color: #3c8df3;
  }
  
  .authority-btn {
    background-color: white;
    border: 1px solid #bfbfff;
    color: #3c3caa;
    border-radius: 9999px;
    font-size: 12px;
    padding: 6px 12px;
    cursor: pointer;
  }
  
  .authority-btn:hover {
    background-color: #f0f3ff;
  }
  
  .save-btn-wrapper {
    text-align: right;
    margin-top: 16px;
  }
  
  .save-btn {
    background-color: #3c8df3;
    color: white;
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
  }
  
  .save-btn:hover {
    background-color: #2f76ce;
  }
  </style>
  