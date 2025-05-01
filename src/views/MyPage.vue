<template>
    <v-app style="background-color: #F5F7FA;">
        <SideBar />
        <v-main>
            <v-container class="py-15 ">
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
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import SideBar from '@/components/sidebar/MemberSidebar.vue';

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
.mypage-container {
    display: flex;
    background: #ffffff;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 1100px;
    gap: 40px;
    align-items: flex-start;
    margin: 0 auto;
}

.profile-image-section {
    flex-shrink: 0;
}

.profile-image {
    width: 160px;
    height: 160px;
    border-radius: 12px;
    object-fit: cover;
    box-shadow: 0 4px 12px rgba(60, 141, 243, 0.25);
    border: 2px solid #3c8df3;
}

.profile-info-section {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.form-rows {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}

.form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 200px;
}

.form-group label {
    margin-bottom: 6px;
    font-weight: 600;
    color: #34495e;
    font-size: 14px;
}

.form-group input {
    padding: 10px 14px;
    border: 1.5px solid #d0d7e2;
    border-radius: 8px;
    font-size: 14px;
    transition: border 0.2s ease, box-shadow 0.2s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #3c8df3;
    box-shadow: 0 0 0 2px rgba(60, 141, 243, 0.2);
}

.authority-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 10px;
    background: #f2f6fb;
    border: 1.5px solid #3c8df3;
}

.authority-role {
    font-size: 14px;
    font-weight: 500;
    color: #3c8df3;
}

.authority-btn {
    background: white;
    color: #3c8df3;
    border: 1px solid #3c8df3;
    padding: 6px 14px;
    font-size: 13px;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.2s ease;
}

.authority-btn:hover {
    background: #eaf1fd;
}

.save-btn-wrapper {
    margin-top: 28px;
    text-align: right;
}

.save-btn {
    background-color: #3c8df3;
    color: white;
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.save-btn:hover {
    background-color: #2f76ce;
}
</style>