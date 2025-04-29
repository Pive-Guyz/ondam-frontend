<template>
    <v-card class="pa-6 elevation-2 counsel-summary-card">
        <!-- 제목 -->
        <v-card-title class="text-h5 font-weight-bold mb-3">
            ✅ 상담 결과 요약
        </v-card-title>

        <!-- 요약 항목들 -->
        <v-card-text class="text-body-1 ml-5">
            <ul style="padding-left: 1.2rem; list-style-type: disc; line-height: 2.0;">
                <li>{{ summary.emotionalChange }}</li>
                <li>{{ summary.cognitive }}</li>
                <li>{{ summary.behavioral }}</li>
                <li>{{ summary.response }}</li>
            </ul>
        </v-card-text>

        <!-- 추천 방향 강조 박스 -->
        <div class="mt-1 ml-3 mr-3 mb-3 pa-4 rounded"
            style="background-color: #f1f0ff; display: inline-block; max-width: 100%;">
            <span class="text-body-1">{{ summary.recommendedDirection }}</span>
        </div>
    </v-card>
</template>

<script setup>
defineProps({
    summary: Object
});
</script>

<style scoped>
.counsel-summary-card {
    margin-top: 2rem;
    margin-bottom: 2rem;
}
</style>