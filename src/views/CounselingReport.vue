<template>
    <v-app style="background-color: #F5F7FA;">
        <!-- <SideBar /> -->
        <v-main>
            <v-container class="py-15" v-if="data">
                <div class="d-flex justify-end mb-6">
                    <v-btn color="deep-purple" class="list-btn" large @click="goToLog">
                        상담서 작성
                    </v-btn>
                </div>
                <!-- 상담 일지 제목 및 날짜 -->
                <v-card class="mb-8 pa-10 elevation-2">
                    <v-row align="center" justify="space-between" no-gutters>
                        <div>
                            <div class="text-h6 font-weight-bold mb-1" style="color: #344FA3;">
                                {{ counseleeName }} 상담일지
                            </div>
                            <div class="text-body-2" style="color: #8c8c8c;">
                                {{ reportDate }}
                            </div>
                        </div>
                        <div class="d-flex align-center">
                            <span class="text-subtitle-1 font-weight-regular mr-3" style="font-size: 16px;">
                                {{ duration }} 소요
                            </span>
                            <v-icon :icon="weatherIcon" :color="weatherColor" size="55" class="ml-5" />
                        </div>
                    </v-row>
                </v-card>

                <!-- 상담 내용 -->
                <v-card class="mb-8 pa-6 elevation-2">
                    <v-card-title class="text-h5 font-weight-bold">📁 상담 내용</v-card-title>
                    <v-card-text class="content-area">
                        <div class="scroll-wrapper">
                            <div ref="contentBox" class="counsel-content-box" :class="{ expanded: isExpanded }">
                                <div v-html="formattedCounselContent" style="margin-bottom: 40px;"></div>
                            </div>

                            <div v-if="isContentOverflow" class="expand-btn-box"
                                :class="{ 'background-visible': !isExpanded }">
                                <v-btn size="small" color="primary" variant="tonal" @click="toggleExpand">
                                    {{ isExpanded ? '닫기' : '더 보기' }}
                                </v-btn>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>

                <!-- 분석 데이터 컴포넌트들 -->
                <TroubleSummary :summary="data.troubleSummary" />
                <EmotionAnalysis :emotions="data.emotionAnalysisList" />
                <EffectiveStatement :effectiveStatement="data.effectiveStatement" />
                <CounselSummary :summary="data.shortenedCounsel" />

                <!-- 상담사 소견, 다음 상담 일정 -->
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card class="pa-6 elevation-2">
                            <v-card-title class="text-h6 font-weight-bold mb-3">🚩 상담사 소견</v-card-title>
                            <v-card-text>{{ counselorComment }}</v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card class="pa-6 elevation-2">
                            <v-card-title class="text-h6 font-weight-bold mb-3">📆 다음 상담 일정</v-card-title>
                            <v-card-text>{{ nextSchedule }}</v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <div class="d-flex justify-end mt-6">
                    <v-btn color="deep-purple" class="list-btn" large @click="goToList">
                        목록으로
                    </v-btn>
                </div>
            </v-container>

            <v-container v-else class="py-8">
                <v-card class="pa-6 elevation-2">
                    <v-card-title>로딩 중...</v-card-title>
                </v-card>
            </v-container>
        </v-main>

    </v-app>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { fetchCounselById } from '@/api/counsel/counselQuery';
import { getAnalysisResult } from '@/api/analysis/analysisQuery';

import TroubleSummary from '@/components/analysis/TroubleSummary.vue';
import EmotionAnalysis from '@/components/analysis/EmotionAnalysis.vue';
import EffectiveStatement from '@/components/analysis/EffectiveStatement.vue';
import CounselSummary from '@/components/analysis/CounselSummary.vue';

const route = useRoute();
const router = useRouter();

// ✅ query에서 모든 값 가져오기
const memberId = Number(route.query.memberId);
const counseleeId = Number(route.query.counseleeId);
const counselId = route.params.counselId;
const counseleeName = route.query.reportTitle || '';
const reportDate = route.query.reportDate || '';
const duration = route.query.duration || '';
const nextSchedule = route.query.nextSchedule || '';
const counselorComment = route.query.counselorComment || '';
const weather = route.query.weather || '';


// 상태 변수
const data = ref(null);
const counselContent = ref('');
const isExpanded = ref(false);
const isContentOverflow = ref(false);
const contentBox = ref(null);
const weatherIcon = ref('');
const weatherColor = ref('');

// 상담 내용 줄바꿈 처리
const formattedCounselContent = computed(() =>
    counselContent.value.replace(/\\n/g, '<br>').replace(/\r\n|\r|\n/g, '<br>')
);

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};

const checkWeather = () => {
    switch (weather) {
        case '맑음':
            weatherIcon.value = 'mdi-white-balance-sunny';
            weatherColor.value = '#FFC107';
            break;
        case '흐림':
            weatherIcon.value = 'mdi-weather-cloudy';
            weatherColor.value = '#607D8B';
            break;
        case '비':
            weatherIcon.value = 'mdi-weather-pouring';
            weatherColor.value = '#3F51B5';
            break;
        case '눈':
            weatherIcon.value = 'mdi-snowflake';
            weatherColor.value = '#81D4FA';
            break;
        default:
            weatherIcon.value = 'mdi-help-circle';
            weatherColor.value = '#9E9E9E';
    }
};

const checkContentOverflow = async () => {
    await nextTick();
    if (contentBox.value) {
        isContentOverflow.value =
            contentBox.value.scrollHeight > contentBox.value.clientHeight;
    }
};

const fetchAnalysisData = async () => {
    try {
        const res = await getAnalysisResult(counselId);
        data.value = res.data;
    } catch (err) {
        console.error('GPT 분석 로딩 실패', err);
    }
};

const fetchCounselContent = async () => {
    try {
        const res = await fetchCounselById(counselId);
        counselContent.value = res.data.content;
    } catch (err) {
        console.error('상담 내용 로딩 실패', err);
    }
};

const goToLog = () => {
    router.push({
        name: 'CounselingLogFormPage',
        params: { id: counseleeId },
        query: {
            counseleeName: String(counseleeName),
            memberId: String(memberId),
        },
    });
};

const goToList = () => {
    router.push({
        name: 'CounseleeCounselPage',
        params: { id: counseleeId },
        query: {
            name: String(counseleeName),
        }
    });
};

onMounted(async () => {
    await Promise.all([fetchAnalysisData(), fetchCounselContent()]);
    await checkContentOverflow();
    checkWeather();
});
</script>

<style scoped>
.content-area {
    position: relative;
    padding: 0;
    overflow: hidden;
}

.scroll-wrapper {
    position: relative;
}

.counsel-content-box {
    margin: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    line-height: 1.6;
    font-size: 14px;
    max-height: 150px;
    overflow: hidden;
    transition: max-height 0.5s ease;
}

.counsel-content-box.expanded {
    max-height: 10000px;
}

.expand-btn-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px 0;
    text-align: center;
    z-index: 10;
}

.expand-btn-box.background-visible {
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

.v-btn {
    font-weight: bold;
    letter-spacing: 0.5px;
}

.list-btn {
    font-weight: bold;
    padding: 0.5rem 1.2rem;
}
</style>