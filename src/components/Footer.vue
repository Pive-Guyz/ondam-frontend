<!-- src/components/common/Footer.vue -->
<template>
    <v-footer class="footer" padless>
        <v-container class="footer-container">
            <!-- 로고 + 설명 -->
            <div class="footer-left">
                <div class="d-flex align-center mb-2">
                    <img src="@/assets/img/logo/logo.png" alt="ON:DAM 로고" class="footer-logo" />
                    <span class="footer-title ml-2">ON:DAM</span>
                </div>
                <p class="footer-description">
                    ON:DAM을 이용하시기 전에<br />
                    이용약관과 개인정보 처리방침을 꼭 확인해주세요.
                </p>
                <div class="footer-icons">
                    <v-icon class="footer-icon">mdi-twitter</v-icon>
                    <v-icon class="footer-icon">mdi-facebook</v-icon>
                    <v-icon class="footer-icon">mdi-google</v-icon>
                </div>
            </div>

            <!-- 링크들 -->
            <div class="footer-columns">
                <div>
                    <div class="footer-inline-links">
                        <h4 class="footer-heading">서비스</h4>
                        <div class="footer-link footer-click" @click="emit('scroll-to-top')">온:담이란?</div>
                        <div class="footer-link footer-click" @click="emit('scroll-to-feature')">기능 소개</div>
                    </div>
                </div>
                <div>
                    <h4 class="footer-heading">고객 지원</h4>
                    <p class="footer-link">이용 약관</p>
                    <p class="footer-link">개인 정보 처리 방침</p>
                    <p class="footer-link">문의하기</p>
                </div>
                <div>
                    <h4 class="footer-heading">온:담</h4>
                    <p class="footer-link">
                        <v-icon size="18" class="mr-1">mdi-map-marker</v-icon>
                        87, Boramae-ro, Dongjak-gu, Seoul
                    </p>
                    <p class="footer-link">
                        <v-icon size="18" class="mr-1">mdi-phone</v-icon>
                        +82 10 3178 3767
                    </p>
                    <p class="footer-link">
                        <v-icon size="18" class="mr-1">mdi-email</v-icon>
                        dntjr8106@gmail.com
                    </p>
                </div>
            </div>
        </v-container>
    </v-footer>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['scroll-to-top', 'scroll-to-feature'])
</script>

<style scoped>
.footer {
    background-color: #ffffff;
    padding: 40px 0;
    border-top: 1px solid #e0e0e0;
}

.footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
}

.footer-left {
    max-width: 260px;
}

.footer-logo {
    width: 40px;
    height: 40px;
}

.footer-title {
    font-size: 20px;
    font-weight: bold;
    color: #1e0e62;
}

.footer-description {
    font-size: 14px;
    color: #888;
    line-height: 1.6;
    margin: 10px 0;
}

.footer-icons {
    display: flex;
    gap: 8px;
}

.footer-icon {
    color: #2d2d5a;
    cursor: pointer;
}

.footer-columns {
    display: flex;
    gap: 60px;
    flex-wrap: wrap;
}

.footer-heading {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 8px;
    color: #2d2d5a;
}

.footer-link {
    font-size: 14px;
    color: #2d2d5a;
    margin-bottom: 6px;
}

.footer-link-btn {
    color: #2d2d5a;
    font-weight: 500;
    font-size: 14px;
    text-transform: none;
    padding: 0;
    min-width: 0;
}

.footer-click {
    cursor: pointer;
    transition: color 0.2s;
}

.footer-click:hover {
    color: #344fa3;
    text-decoration: underline;
}
</style>