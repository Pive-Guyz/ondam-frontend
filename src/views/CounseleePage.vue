<template>
    <div class="container mt-4">
        <h1>내담자 관리 (테스트)</h1>

        <div v-if="loading">불러오는 중...</div>
        <div v-else>
            <ul class="list-group">
                <li v-for="counselee in counselees" :key="counselee.id" class="list-group-item">
                    {{ counselee.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchCounselees } from '@/api/counseleeQuery';

const counselees = ref([]);
const loading = ref(false);

// 테스트용 memberId
const memberId = '1';

onMounted(async () => {
    loading.value = true;
    try {
        const response = await fetchCounselees(memberId);
        counselees.value = response.data;
    } catch (error) {
        console.error('내담자 목록 불러오기 실패:', error);
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>