<template>
    <v-container class="py-8" v-if="data">
        <v-card class="mb-8 pa-6 elevation-2">
            <v-card-title class="text-h5 font-weight-bold">{{ reportTitle }}</v-card-title>
            <v-card-subtitle>{{ reportDate }}</v-card-subtitle>
        </v-card>

        <v-card class="mb-8 pa-6 elevation-2">
            <v-card-title class="text-h6 font-weight-bold">상담 내용</v-card-title>
            <v-card-text>
                <v-textarea outlined readonly rows="6" value="오늘 어떻게 오시게 되었나요? ... (예시 텍스트)"></v-textarea>
            </v-card-text>
        </v-card>

        <TroubleSummary :summary="data.troubleSummary" />
        <EmotionAnalysis :emotions="data.emotionAnalysisList" />

        <v-card class="mb-8 pa-6 elevation-2">
            <v-card-title class="text-h6 font-weight-bold">효과적 발화</v-card-title>
            <v-card-text>
                <p class="mb-4 font-italic">"{{ data.effectiveStatement.content }}"</p>
                <v-list dense>
                    <v-list-item><strong>내담자 반응:</strong> {{ data.effectiveStatement.response }}</v-list-item>
                    <v-list-item><strong>이유:</strong> {{ data.effectiveStatement.reason }}</v-list-item>
                    <v-list-item><strong>결과:</strong> {{ data.effectiveStatement.result }}</v-list-item>
                </v-list>
            </v-card-text>
        </v-card>

        <CounselSummary :summary="data.shortenedCounsel" />

        <v-row>
            <v-col cols="12" md="6">
                <v-card class="pa-6 elevation-2">
                    <v-card-title class="text-h6 font-weight-bold">상담사 소견</v-card-title>
                    <v-card-text>내담자의 상황을 종합하여 분석하고, 필요한 방향을 제시한 내용입니다.</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="pa-6 elevation-2">
                    <v-card-title class="text-h6 font-weight-bold">다음 상담 일정</v-card-title>
                    <v-card-text>2025년 05월 01일</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-container v-else class="py-8">
        <v-card class="pa-6 elevation-2">
            <v-card-title>로딩 중...</v-card-title>
        </v-card>
    </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import TroubleSummary from '@/components/analysis/TroubleSummary.vue';
import EmotionAnalysis from '@/components/analysis/EmotionAnalysis.vue';
import CounselSummary from '@/components/analysis/CounselSummary.vue';

const route = useRoute();
const counselId = route.params.counselId;

const reportTitle = ref('상담일지');
const reportDate = ref('');
const data = ref(null);

const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/analysis/${counselId}/analysis`);
        data.value = response.data;
        reportDate.value = new Date().toISOString().split('T')[0];
        console.log(response);
    } catch (error) {
        console.error('Failed to fetch analysis data', error);
    }
};

onMounted(fetchData);
</script>