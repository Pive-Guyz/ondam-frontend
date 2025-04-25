<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 class="text-8xl font-extrabold text-white mb-14 drop-shadow-2xl tracking-wide">
        On:Dam
      </h1>
      <div class="space-x-6">
        <button
          class="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl shadow-lg hover:bg-indigo-100 transition duration-300 ease-in-out"
        >
          로그인
        </button>
        <button
          class="px-8 py-4 bg-indigo-800 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-indigo-900 transition duration-300 ease-in-out"
        >
          회원가입
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MainPage",
  };
  </script>
  
  <style scoped>
  /* 폰트를 더 예쁘게 하고 싶으면 구글 폰트 추가도 가능해요 */
  </style>
  