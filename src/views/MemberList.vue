<template>
    <div class="member-page">
      <div class="member-container">
        <h2 class="title">회원 관리</h2>
        <p class="sub-text">회원의 정보를 확인할 수 있습니다.</p>
  
        <!-- 검색 및 정렬 -->
        <div class="top-bar">
          <input type="text" v-model="search" placeholder="Search" class="search-input" />
          <select v-model="sort" class="sort-select">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
  
        <!-- 테이블 -->
        <table class="member-table">
          <thead>
            <tr>
              <th>회원 ID</th>
              <th>회원 이름</th>
              <th>이메일</th>
              <th>생년월일</th>
              <th>전화번호</th>
              <th>주소</th>
              <th>권한</th>
              <th>정보 보기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in filteredMembers" :key="member.id">
              <td>{{ member.id }}</td>
              <td>{{ member.name }}</td>
              <td>{{ member.email }}</td>
              <td>{{ member.birthday }}</td>
              <td>{{ member.phone }}</td>
              <td>{{ member.address ?? 'null' }}</td>
              <td>
                <span
                  class="role-badge"
                  :class="{
                    'admin': member.authority === 'Admin',
                    'guest': member.authority === 'Guest',
                    'other': member.authority !== 'Admin' && member.authority !== 'Guest'
                  }"
                >
                  {{ member.authority }}
                </span>
              </td>
              <td><button class="view-btn">🔍</button></td>
            </tr>
          </tbody>
        </table>
  
        <!-- 페이지네이션 -->
        <div class="pagination">
          <button v-for="n in 5" :key="n" class="page-btn">{{ n }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const members = ref([
    { id: 1, name: '김학순', email: 'e01fd0vb...@hotmail.com', birthday: '2000-04-24', phone: '010-4444-5854', address: null, authority: 'Admin' },
    { id: 2, name: '박성현', email: 'ckw5ng...@gmail.com', birthday: '2000-07-24', phone: '010-4444-5854', address: null, authority: 'Guest' },
    { id: 3, name: '최정용', email: 'dnty...@gmail.com', birthday: '2000-01-19', phone: '010-4444-5854', address: null, authority: 'User' },
    // ... 나머지 더미 데이터
  ])
  
  const search = ref('')
  const sort = ref('newest')
  
  const filteredMembers = computed(() => {
    return members.value
      .filter(m => m.name.includes(search.value) || m.email.includes(search.value))
      .sort((a, b) => {
        if (sort.value === 'newest') return b.id - a.id
        else return a.id - b.id
      })
  })
  </script>
  
  <style scoped>
  .member-page {
    background-color: #f7f9fc;
    min-height: 100vh;
    padding: 60px 0;
    display: flex;
    justify-content: center;
  }
  
  .member-container {
    width: 90%;
    max-width: 1200px;
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  }
  
  .title {
    font-size: 22px;
    font-weight: bold;
  }
  
  .sub-text {
    color: #666;
    margin-top: 5px;
    margin-bottom: 20px;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 200px;
  }
  
  .sort-select {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  .member-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .member-table th,
  .member-table td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    text-align: center;
  }
  
  .role-badge {
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 12px;
    display: inline-block;
    color: white;
  }
  
  .role-badge.admin {
    background-color: black;
  }
  
  .role-badge.guest {
    background-color: #4f46e5;
  }
  
  .role-badge.other {
    background-color: #10b981;
  }
  
  .view-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  
  .pagination {
    text-align: center;
  }
  
  .page-btn {
    background: white;
    border: 1px solid #ccc;
    margin: 0 4px;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .page-btn:hover {
    background-color: #f0f0f0;
  }
  </style>
  