<template>
  <div class="bg-[#dbe7ff] min-h-screen flex justify-center items-start px-6 py-12">
    <div class="bg-white rounded-3xl shadow-2xl w-full max-w-6xl p-12 relative flex flex-col">

      <!-- 타이틀 -->
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-purple-700">My Diary List</h1>
        <p class="text-gray-500 mt-2">내가 작성한 일기 목록</p>
      </div>

      <!-- 일기 리스트 -->
      <div class="grid gap-4 max-h-[400px] overflow-y-auto pr-1">
        <div
          v-for="diary in diaries"
          :key="diary.id"
          class="bg-white rounded-xl shadow-md px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
        >
          <span class="text-gray-800 font-medium text-base">{{ diary.title }}</span>
          <span class="text-sm text-gray-400">{{ diary.date }}</span>
        </div>
      </div>

      <!-- 오른쪽 상단 버튼 -->
      <div class="absolute top-12 right-12">
        <button class="bg-emerald-400 hover:bg-emerald-500 text-white font-semibold px-6 py-2 rounded-xl shadow">
          오늘의 일기 작성하기
        </button>
      </div>

      <!-- 연필 아이콘 자리 -->
      <div class="absolute top-10 right-56 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
        <!-- 여기에 이미지 삽입 -->
        <!-- <img src="@/assets/pencil.png" alt="pencil" class="w-10 h-10" /> -->
      </div>

      <!-- 헬프 박스 오른쪽 하단 고정 -->
      <div class="absolute bottom-10 right-10 w-72 bg-gray-50 p-5 rounded-xl shadow text-sm text-gray-600">
        <h3 class="font-semibold text-gray-700 mb-2">Help</h3>
        <p>
          Need help? Email us at
          <a href="mailto:info@ondam.com" class="text-blue-500 underline">info@ondam.com</a><br />
          or call 010-1234-5678.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const diaries = [
  { id: 1, title: '오늘의 이유..', date: '25.04.24' },
  { id: 2, title: '너무 힘들지만 불평보단 성장!', date: '25.04.23' },
  { id: 3, title: '네트워크에서 무슨 신호~><', date: '25.04.21' },
  { id: 4, title: '상담 끝! 고민', date: '25.04.20' },
  { id: 5, title: '오늘의 하루', date: '25.04.17' },
  { id: 6, title: '너무 힘들었다..ㅠ', date: '25.04.12' },
  { id: 7, title: '헐랭~><', date: '25.04.05' },
  { id: 8, title: '오늘 상담한 주제 정리', date: '25.03.28' },
];
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
</style>
