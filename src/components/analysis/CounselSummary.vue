<template>
    <v-card class="mb-8 pa-6 elevation-2">
        <v-card-title class="text-h6 font-weight-bold">상담 결과 요약</v-card-title>
        <v-list dense>
            <v-list-item><strong>정서 변화:</strong> {{ summary.emotionalChange }}</v-list-item>
            <v-list-item><strong>인지적 특징:</strong> {{ summary.cognitive }}</v-list-item>
            <v-list-item><strong>행동적 특징:</strong> {{ summary.behavioral }}</v-list-item>
            <v-list-item><strong>상담 반응:</strong> {{ summary.response }}</v-list-item>
            <v-list-item><strong>추천 방향:</strong> {{ summary.recommendedDirection }}</v-list-item>
        </v-list>
    </v-card>
</template>

<script setup>
defineProps({
    summary: Object
});
</script>