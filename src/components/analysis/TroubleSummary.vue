<template>
    <v-card class="mb-8 pa-6 elevation-2">
        <v-card-title class="text-h6 font-weight-bold">고민 요약</v-card-title>
        <v-list dense>
            <v-list-item><strong>시기:</strong> {{ summary.period }}</v-list-item>
            <v-list-item><strong>어디서:</strong> {{ summary.place }}</v-list-item>
            <v-list-item><strong>상황:</strong> {{ summary.situation }}</v-list-item>
            <v-list-item><strong>이유:</strong> {{ summary.reason }}</v-list-item>
            <v-list-item><strong>흐름:</strong> {{ summary.flow }}</v-list-item>
            <v-list-item><strong>결심:</strong> {{ summary.determination }}</v-list-item>
        </v-list>
    </v-card>
</template>

<script setup>
defineProps({
    summary: Object
});
</script>