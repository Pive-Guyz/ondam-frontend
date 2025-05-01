<template>
    <v-navigation-drawer app permanent class="sidebar">
        <div class="sidebar-wrapper">

            <!-- 위쪽 (로고 + 메뉴) -->
            <div class="top-area">
                <div class="logo-box">
                    <!-- <img src="@/assets/img/logo/logo.png" alt="ON:DAM 로고" class="logo-image" />
                    <span class="logo-text">ON:DAM</span> -->
                </div>

                <v-list class="menu-list">
                    <v-btn class="menu-item" variant="text" to="/report">
                        <v-icon class="menu-icon mr-2">mdi-alarm-light</v-icon>
                        <span class="menu-title">신고 관리</span>
                    </v-btn>
                    <v-btn class="menu-item" variant="text" to="/MemberList">
                        <v-icon class="menu-icon mr-2">mdi-account-outline</v-icon>
                        <span class="menu-title">회원 관리</span>
                    </v-btn>
                    <v-btn class="menu-item" variant="text" to="/admin-profile">
                        <v-icon class="menu-icon mr-2">mdi-cog-outline</v-icon>
                        <span class="menu-title">프로필</span>
                    </v-btn>
                </v-list>
            </div>

            <!-- 아래쪽 (프로필) -->
            <!-- <div class="profile-card">
                <v-avatar size="40">
                    <img :src="profileImage" alt="프로필" />
                </v-avatar>
                <div class="profile-info">
                    <div class="name">{{ auth.name }} 님</div>
                    <div class="role">{{ auth.authority }}</div>
                </div>
            </div> -->

        </div>
    </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { fetchMemberById } from '@/api/member/memberQuery'
import { onMounted } from 'vue'

const auth = useAuthStore()
// const profileImage = '/src/assets/img/profile/counselorProfile.png'

// ✅ 새로고침 후 auth.name 없으면 가져오기
onMounted(async () => {
    if (auth.isLogin && !auth.name) {
        try {
            const res = await fetchMemberById(auth.memberId)
            const member = res.data
            auth.name = member.name
            auth.authority = member.authority
        } catch (err) {
            console.error('회원 정보 가져오기 실패', err)
        }
    }
})
</script>

<style scoped>
.sidebar {
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.sidebar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.logo-box {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
    margin-bottom: 32px;
    padding-left: 20px;
}

.logo-image {
    width: 44px;
}

.logo-text {
    font-size: 22px;
    font-weight: bold;
    color: #000000;
}

.menu-list {
    padding: 0 12px;
}

.menu-item {
    justify-content: flex-start;
    width: 100%;
    border-radius: 12px;
    margin-bottom: 16px;
    color: black;
}

.menu-item.active {
    background-color: #6c4ef9;
    color: white;
    height: 44px;
}

.menu-item.active .menu-icon,
.menu-item.active .menu-title {
    color: white;
}

.menu-icon {
    font-size: 26px;
}

.menu-title {
    font-weight: 500;
    font-size: 18px;
}

.profile-card {
    display: flex;
    align-items: center;
    padding: 16px;
    border-top: 1px solid #eee;
}

.profile-info {
    flex-grow: 1;
    margin-left: 12px;
}

.name {
    font-weight: bold;
}

.role {
    font-size: 12px;
    color: gray;
}
</style>
