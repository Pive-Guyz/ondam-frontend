<template>
    <v-app-bar app flat color="white">
        <v-container class="d-flex align-center justify-space-between">
            <!-- 왼쪽 로고 + 메뉴 -->
            <div class="d-flex align-center">
                <img src="@/assets/img/logo/logo.png" alt="ON:DAM 로고" class="logo" />
                <span class="ml-2 font-weight-bold logo-text">ON:DAM</span>

                <!-- 메뉴 박스 (온:담이란, 기능소개) -->
                <div class="d-flex align-center ml-10">
                    <v-btn text color="#2d2d5a" class="menu-btn">온:담이란?</v-btn>
                    <v-btn text color="#2d2d5a" class="menu-btn" @click="onScrollToFeature">기능 소개</v-btn>
                </div>
            </div>

            <!-- 오른쪽 SignIn / SignUp -->
            <div class="d-flex align-center">
                <template v-if="isLoggedIn">
                    <v-avatar size="32" class="mr-2">
                        <img :src="profileImage" alt="프로필" />
                    </v-avatar>
                    <div class="text-start mr-4">
                        <div class="text-body-2 font-weight-bold">{{ name }}</div>
                        <div class="text-caption grey--text">{{ role }}</div>
                    </div>
                    <v-btn class="signup-btn" @click="logout">Sign Out</v-btn>
                </template>
                <template v-else>
                    <!-- Sign In -->
                    <router-link to="/" class="signin-link">Sign In</router-link>

                    <!-- Sign Up -->
                    <router-link to="/signup">
                        <v-btn class="signup-btn ml-6">Sign Up</v-btn>
                    </router-link>
                </template>
            </div>
        </v-container>
    </v-app-bar>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    onScrollToFeature: Function
})

const isLoggedIn = ref(false); // 로그인 여부
const name = ref('김수민'); // 이름
const role = ref('Counselor'); // 권한
const profileImage = ref('@/assets/img/profile/counselorProfile.png'); // 프로필 이미지

function logout() {
    isLoggedIn.value = false;
    alert('로그아웃 완료!');
}
</script>

<style scoped>
.logo {
    width: 40px;
    height: 40px;
}

.logo-text {
    color: #344FA3;
    font-size: 18px;
}

.menu-btn {
    font-weight: 500;
    font-size: 16px;
    margin-left: 24px;
}

.signin-link {
    color: #344FA3;
    font-weight: 500;
    font-size: 16px;
    text-decoration: none;
}

.signup-btn {
    background-color: #344FA3;
    color: white;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    text-transform: none;
}
</style>