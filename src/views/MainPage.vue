<template>
    <v-app>
        <Header @scroll-to-feature="scrollToFeature" />
        <v-main>
            <section class="hero">
                <div class="hero-content">
                    <div class="hero-text">
                        <h1>
                            ON:DAM<br />
                            <div style="font-size:25px; color:#344FA3">
                                기록은 간결하게,
                                감정은 더 깊이<br />이해할 수 있도록
                            </div>
                        </h1>
                        <p>
                            상담사는 기록에 집중하지 않아도 됩니다.<br />
                            ON:DAM이 상담 내용을 정리하고, 내담자의 감정 흐름을<br />
                            시각화해 드릴게요.
                        </p>
                    </div>
                    <img class="hero-image" :src="hero" alt="ON:DAM 그래프 예시" />
                </div>
            </section>

            <section ref="featureSection">
                <LandingSection title="한눈에 정리되는 상담 회기 요약" description="상담 내용을 자유롭게 작성하면,<br />주요 키워드와 흐름을 자동으로 정리해 드려요.<br /><br/>
                    ✅ 스크립트 기반 요약문 자동 생성<br />✅ 키워드 추출 및 강조<br />✅ 회기별 상담 히스토리 구성 가능" :image="counsel" />

                <LandingSection title="감정의 흐름을 눈으로 확인하세요" description="내담자의 감정 상태 변화를 시각화해서<br />상담 흐름을 더 깊이 이해할 수 있어요.<br /><br/>
                    ✅ 감정 키워드 입력 기반 분석<br />✅ 세션별 감정 라인 차트 제공<br />✅ 상담 흐름 인사이트 시각화" :image="emotion_analysis"
                    :reverse="true" />

                <LandingSection title="내담자 정보, 상담 내용, 감정 분석까지 한눈에" description="회기별 상담 내역과 요약, 감정 흐름, 메모 등을<br />내담자 단위로 통합 관리할 수 있습니다.<br /><br/>
                    ✅ 내담자별 상담 히스토리 관리<br />✅ 최근 회기 빠른 복기 기능<br />✅ 상담 진행 상태 분류 및 정리" :image="counsel_counselees" />

                <LandingSection title="감정 해소와 공감을 위한, 하루 한 편의 익명 일기" description="하루에 한 번 익명 일기를 쓰면<br/>다른 상담사 3명에게 전송되고, 나도 일기 3개를 받아요.<br />답장도 익명으로 주고받을 수 있어요.<br/><br/>
                    ✅ 하루 1회 랜덤 일기 전송<br />✅ 익명 상담사 3명에게 공유<br />✅ 감정 해소 + 공감 기반 소통 지원" :image="diary"
                    :reverse="true" />
            </section>
        </v-main>
        <Footer @scroll-to-top="scrollToTop" @scroll-to-feature="scrollToFeature" />
    </v-app>
</template>

<script setup>
import { ref } from 'vue'

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue'
import LandingSection from '@/components/main/LandingSection.vue'

// 이미지 import
import hero from '@/resources/main/hero.png'
import emotion_analysis from '@/resources/main/emotion_analysis.png'
import counsel from '@/resources/main/counsel.png'
import counsel_counselees from '@/resources/main/counsel_counselees.png'
import diary from '@/resources/main/diary.png'

const featureSection = ref(null)

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToFeature() {
    featureSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
    background: linear-gradient(135deg, #c2d4f8, #e6c5f1, #ffd6e8);
    padding: 30px 20px 50px 20px;
}

.hero-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
}

.hero-text {
    flex: 1;
    min-width: 320px;
    margin-top: 100px;
    margin-left: 100px;
    margin-bottom: 70px;
}

.hero-text h1 {
    font-size: 36px;
    font-weight: 700;
    color: #1E0E62;
    margin-bottom: 20px;
    line-height: 1.5;
}

.hero-text p {
    font-size: 16px;
    color: #344FA3;
    line-height: 1.8;
}

.hero-image {
    flex: 1;
    max-width: 500px;
    width: 100%;
    border-radius: 12px;
    margin-right: 100px;
}
</style>