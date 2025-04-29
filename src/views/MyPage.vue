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
                <label>포인트</label>
                <input v-model="form.point" disabled />
              </div>
              <div class="form-group">
                <label>권한</label>
                <input v-model="form.authority" disabled />
              </div>
            </div>
  
            <div class="form-row">
              <div class="form-group">
                <label>가입일</label>
                <input v-model="form.createdAt" readonly />
              </div>
              <div class="form-group toggle-group">
  <label>일기 사용 여부</label>
  <label class="switch">
    <input type="checkbox" v-model="form.diaryAllowed" />
    <span class="slider round"></span>
  </label>
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
    point: '30P',
    authority: '게스트',
    createdAt: '2025-04-24',
    diaryAllowed: true,
  })
  
  const save = () => {
    console.log('저장된 데이터:', form.value)
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
  max-width: 1100px; /* 더 넓게 */
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
  gap: 30px; /* 행 간 간격 넓힘 */
}
  
.form-row {
  display: flex;
  gap: 60px; /* 열 간 간격 넓힘 */
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
  
  .toggle-group {
    align-items: center;
  }
  
  .toggle-switch {
    width: 20px;
    height: 20px;
    accent-color: #20e3b2;
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

  .switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
  margin-top: 6px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #20e3b2;
}

input:checked + .slider:before {
  transform: translateX(24px);
}
  </style>
  