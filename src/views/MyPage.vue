<template>
    <v-app style="background-color: #F5F7FA;">
        <SideBar />
        <v-main>
            <v-container class="py-15 d-flex justify-center">
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
                                    <input :value="form.password" type="password" readonly @click="openPasswordModal"
                                        style="cursor: pointer;" />
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

                            <!-- ✅ 일기 수신 여부 토글 -->
                            <div class="form-row">
                                <div class="form-group">
                                    <label>일기 수신 여부</label>
                                    <div class="toggle-box" @click="toggleDiaryReceive">
                                        <div :class="['toggle-button', form.diaryReceive ? 'on' : 'off']">
                                            <div class="toggle-circle" />
                                        </div>
                                        <span class="toggle-label">
                                            {{ form.diaryReceive ? '수신함' : '수신 안함' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 저장 & 탈퇴 버튼 -->
                        <div class="save-btn-wrapper">
                            <button class="delete-btn" @click="showWithdrawalModal = true">회원탈퇴</button>
                            <button class="save-btn" @click="save">저장</button>
                        </div>
                    </div>
                </div>
            </v-container>

            <ChangePasswordModal v-if="showPasswordModal" :memberId="auth.memberId"
                @close="showPasswordModal = false" />

            <ConfirmWithdrawalModal v-if="showWithdrawalModal" @close="showWithdrawalModal = false"
                @confirm="handleWithdrawal" />
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SideBar from '@/components/sidebar/MemberSideBar.vue'
import ChangePasswordModal from '@/components/member/ChangePasswordModal.vue'
import ConfirmWithdrawalModal from '@/components/member/ConfirmWithdrawalModal.vue'
import { useAuthStore } from '@/stores/auth'
import { deleteMember } from '@/api/member/memberCommand'

const auth = useAuthStore()
const router = useRouter()

const showPasswordModal = ref(false)
const showWithdrawalModal = ref(false)

const openPasswordModal = () => {
    showPasswordModal.value = true
}

const profileImageUrl = ref('https://via.placeholder.com/150')

const form = ref({
    name: '서정훈',
    password: '********',
    email: 'charlenereed@gmail.com',
    phone: '01026437581',
    birthday: '19971216',
    address: '연희동',
    authority: '게스트',
    createdAt: '2025-04-24',
    diaryReceive: true
})

const toggleDiaryReceive = () => {
    form.value.diaryReceive = !form.value.diaryReceive
}

const save = () => {
    console.log('저장된 데이터:', form.value)
}

const requestUpgrade = () => {
    alert('권한 승급 신청이 완료되었습니다.')
}

const handleWithdrawal = async () => {
    try {
        await deleteMember(auth.memberId)
        alert('회원탈퇴가 완료되었습니다.')
        auth.logout()
        router.push('/')
    } catch (err) {
        alert('회원탈퇴 실패: ' + (err.response?.data?.message || '서버 오류'))
    }
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
    display: flex;
    justify-content: space-between;
}

.save-btn,
.delete-btn {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
}

.save-btn {
    background-color: #3c8df3;
    color: white;
}

.save-btn:hover {
    background-color: #2f76ce;
}

.delete-btn {
    background-color: #e74c3c;
    color: white;
}

.delete-btn:hover {
    background-color: #c0392b;
}

/* ✅ 토글 스타일 */
.toggle-box {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    margin-top: 8px;
}

.toggle-button {
    width: 48px;
    height: 24px;
    background-color: #ccc;
    border-radius: 12px;
    position: relative;
    transition: background-color 0.3s ease;
}

.toggle-button.on {
    background-color: #3c8df3;
}

.toggle-button.off {
    background-color: #d0d7e2;
}

.toggle-circle {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: left 0.3s ease;
}

.toggle-button.on .toggle-circle {
    left: 26px;
}

.toggle-label {
    font-size: 14px;
    color: #34495e;
}
</style>
