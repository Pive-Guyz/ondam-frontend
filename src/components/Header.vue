<template>
    <v-app-bar app flat color="white">
        <v-container class="d-flex align-center justify-space-between">

            <!-- 왼쪽 로고 + 메뉴 -->
            <div class="d-flex align-center">
                <img src="@/assets/img/logo/logo.png" alt="ON:DAM 로고" class="logo" />
                <span class="ml-2 font-weight-bold logo-text">ON:DAM</span>

                <div class="d-flex align-center ml-10">
                    <v-btn text color="#2d2d5a" class="menu-btn">온:담이란?</v-btn>
                    <v-btn text color="#2d2d5a" class="menu-btn" @click="onScrollToFeature">기능 소개</v-btn>
                </div>
            </div>

            <!-- 오른쪽 로그인 사용자 영역 -->
            <div class="d-flex align-center">
                <template v-if="auth.isLogin">
                    <v-menu offset-y scroll-strategy="close">
                        <template #activator="{ props }">
                            <div v-bind="props" class="d-flex align-center user-info">
                                <div class="text-start mr-3">
                                    <div class="text-body-1 font-weight-bold">{{ auth.name }} 님</div>
                                    <div class="text-caption">{{ auth.authority }}</div>
                                </div>
                                <v-icon>mdi-chevron-down</v-icon>
                            </div>
                        </template>

                        <v-list>
                            <template v-if="auth.authority === 'ADMIN'">
                                <v-list-item to="/report">신고 관리</v-list-item>
                                <v-list-item to="/MemberList">회원 관리</v-list-item>
                                <v-list-item to="/admin-profile">프로필</v-list-item>
                            </template>

                            <template v-else>
                                <v-list-item to="/counselees">내담자 관리</v-list-item>
                                <v-list-item to="/diary">다이어리</v-list-item>
                                <v-list-item to="/mypage">프로필</v-list-item>
                            </template>
                        </v-list>
                    </v-menu>

                    <v-btn class="signout-btn ml-4" @click="auth.logout">Log Out</v-btn>
                </template>
                <template v-else>
                    <router-link to="/" class="signin-link">Sign In</router-link>
                    <router-link to="/signup">
                        <v-btn class="signup-btn ml-6">Sign Up</v-btn>
                    </router-link>
                </template>
            </div>

        </v-container>
    </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { fetchMemberById } from '@/api/member/memberQuery'
import { onMounted } from 'vue'

const props = defineProps({
    onScrollToFeature: Function
})

const auth = useAuthStore()

onMounted(async () => {
    if (auth.isLogin && !auth.name) {
        const res = await fetchMemberById(auth.memberId)
        const member = res.data
        auth.name = member.name
        auth.authority = member.authority
    }
})
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

.signup-btn,
.signout-btn {
    background-color: #344FA3;
    color: white;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    text-transform: none;
}

.user-info {
    cursor: pointer;
}
</style>
