<template>
  <div class="container">
    <button class="menu-button" @click="goTo('/my-info')">내 정보</button>
    <button class="menu-button" @click="goTo('/clients')">내담자 목록</button>
    <button class="menu-button" @click="goTo('/schedule')">상담 일정</button>
    <button class="menu-button" @click="goTo('/journal')">상담 일지</button>
    <button class="menu-button" @click="goTo('/diary')">다이어리</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goTo = (path) => {
  router.push(path)
}
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100vh;
  justify-content: center;
  background-color: #f5f5f5;
}

.menu-button {
  width: 200px;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-button:hover {
  background-color: #357ab8;
}
</style>

