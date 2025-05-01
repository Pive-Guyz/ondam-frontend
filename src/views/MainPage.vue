<template>
    <v-app>
        <v-main>

            <!-- ✅ Hero Section -->
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
                            상담기록을 간편하고 효율적으로 정리할 수 있도록,<br />
                            ON:DAM에서 상담 내용을 정리하고 내담자의 감정 흐름을<br />시각화해드립니다.
                        </p>
                    </div>
                    <img class="hero-image" :src="emotionImg" alt="ON:DAM 그래프 예시" />
                </div>
            </section>

            <LandingSection title="간결하고 정확한 상담 분석" description="GPT를 통해 상담 내용을 자동으로 요약하고<br>핵심 발화를 추출해 상담 흐름을 정리해드립니다."
                :image="emotionImg" />

            <LandingSection title="한눈에 정리되는 상담 회기 요약"
                description="감정 변화, 내담자 반응, 상담사의 소견까지 하나로 확인 가능!<br>시각적 리포트를 통해 내담자의 흐름을 분석할 수 있어요." :image="emotionImg"
                :reverse="true" />

            <LandingSection title="내담자 리스트, 상담 내용, 감정 분석까지 한 화면에"
                description="상담 회기별로 내담자의 데이터를 쉽게 정리하고<br>감정 추세 및 이슈 키워드를 바로 확인할 수 있습니다." :image="emotionImg" />

            <LandingSection title="감정 해소와 공감을 위한 다이어리 기능"
                description="내담자의 일기를 통해 감정을 더 깊이 이해하고<br>상담사는 답글을 통해 추가적인 지지와 격려를 전달할 수 있어요." :image="emotionImg"
                :reverse="true" />
        </v-main>
    </v-app>
</template>

<script setup>
import LandingSection from '@/components/main/LandingSection.vue'

// ✅ 이미지 import
import emotionImg from '@/resources/analysis/emotion_analysis.png'
</script>

<style scoped>
/* ✅ Hero 영역 스타일 */
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
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
    margin-right: 100px;
}
</style>