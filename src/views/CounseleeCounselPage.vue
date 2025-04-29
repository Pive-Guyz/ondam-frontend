<!-- src/views/CounseleeCounselPage.vue -->
<template>
    <v-container class="py-10 px-5">
        <v-card>
            <!-- 상단: 뒤로가기 + 제목 -->
            <v-row align="center" class="ml-4 mt-5">
                <v-icon icon="mdi-arrow-left" size="32" style="cursor: pointer;" @click="goBack" />

                <h2 class="text-h5 font-weight-bold ml-2">
                    {{ counseleeName }}님의 상담 기록
                </h2>
            </v-row>

            <v-table class="mt-4">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>상담일자</th>
                        <th>상담유형</th>
                        <th>상담내용 요약</th>
                        <th>상담소견 요약</th>
                        <th>다음상담일자</th>
                        <th>소요시간</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(counsel, idx) in counsels" :key="counsel.id" style="cursor: pointer;">
                        <td>{{ (currentPage - 1) * itemsPerPage + idx + 1 }}</td>
                        <td>{{ formatDate(counsel.createdAt) }}</td>
                        <td>{{ counsel.counselType || '-' }}</td>

                        <!-- 상담내용 요약 -->
                        <td>
                            <v-tooltip location="top">
                                <template #activator="{ props }">
                                    <span v-bind="props">{{ shorten(counsel.content) }}</span>
                                </template>
                                <template #default>
                                    <div class="tooltip-text">{{ counsel.content }}</div>
                                </template>
                            </v-tooltip>
                        </td>

                        <!-- 상담소견 요약 -->
                        <td>
                            <v-tooltip location="top">
                                <template #activator="{ props }">
                                    <span v-bind="props">{{ shorten(counsel.opinion) }}</span>
                                </template>
                                <template #default>
                                    <div class="tooltip-text">{{ counsel.opinion }}</div>
                                </template>
                            </v-tooltip>
                        </td>

                        <td>{{ formatDate(counsel.nextCreatedAt) }}</td>
                        <td>{{ counsel.time || '-' }}</td>
                    </tr>
                </tbody>
            </v-table>
            <v-pagination v-model="currentPage" :length="pageCount" :total-visible="7" class="mt-4" />
        </v-card>


    </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchCounselsByCounseleeId } from '@/api/counsel/counselQuery';

const route = useRoute();
const router = useRouter();
const counseleeName = ref(route.query.name || ''); // 쿼리에서 받아오기
const counseleeId = route.params.id;
const counsels = ref([]);

const currentPage = ref(1);
const itemsPerPage = 10;

const pageCount = computed(() => {
    return Math.ceil(counsels.value.length / itemsPerPage);
});

const paginatedCounsels = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return counsels.value.slice(start, start + itemsPerPage);
});

const goBack = () => {
    router.back();
};

onMounted(async () => {
    try {
        const res = await fetchCounselsByCounseleeId(counseleeId);
        console.log('상담 기록:', res.data);
        counsels.value = res.data;
    } catch (e) {
        console.error(e);
        alert('상담 기록을 불러오는 데 실패했습니다.');
    }
});

const formatDate = (str) => {
    return str?.split('T')[0] || '-';
};

const shorten = (text, length = 10) => {
    if (!text) return '-';
    return text.length > length ? text.slice(0, length) + '...' : text;
};
</script>

<style scoped>
.counsel-table-wrapper {
    background-color: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.06);
}

.tooltip-text {
    max-width: 320px;
    white-space: normal;
    word-break: break-word;
    font-size: 14px;
    line-height: 1.4;
}
</style>