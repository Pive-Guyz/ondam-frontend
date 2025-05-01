<template>
    <Header />
    <div class="error-container">
        <v-card class="pa-6 ma-auto text-center" width="400">
            <v-icon size="48" color="error">mdi-alert-circle</v-icon>
            <h2 class="mt-3">오류가 발생했어요</h2>
            <p>😢 무언가 잘못되었어요. 다시 시도해 주세요.</p>
            <v-btn color="primary" class="mt-4" @click="$router.push('/')">홈으로 이동</v-btn>
        </v-card>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>

<style scoped>
.error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>