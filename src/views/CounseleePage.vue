<template>
    <v-app style="background-color: #F5F7FA;">
        <Header />
        <MemberSideBar />
        <v-main>
            <v-container class="py-15 ">
                <v-card class="pl-10 pt-10">
                    <h2 class="page-title mt-3 ml-3">내담자 리스트</h2>
                    <!-- 상단 컨트롤 영역 -->
                    <v-row class="mt-3" align="center" justify="space-between">
                        <v-col cols="12" md="6" class="d-flex gap-2">
                            <v-select v-model="searchType" :items="['이름']" density="compact" style="max-width: 100px"
                                variant="outlined" />
                            <v-text-field v-model="searchQuery" placeholder="검색어를 입력하세요" density="compact" hide-details
                                variant="outlined" append-inner-icon="mdi-magnify" @keyup.enter="handleSearch"
                                style="height: 36px; font-size: 14px; margin-left: 5px;"
                                @click:append-inner="handleSearch" />
                            <v-btn class="ml-3" style="margin-top: 1px;" v-if="isSearching" variant="outlined"
                                @click="resetSearch">
                                전체
                            </v-btn>
                        </v-col>
                        <v-col cols="12" md="3" class="text-right">
                            <v-btn color="primary" @click="handleRegister" class="mr=10">
                                내담자 등록
                            </v-btn>
                        </v-col>
                    </v-row>

                    <!-- 내담자 리스트 테이블 -->
                    <v-table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>내담자</th>
                                <th>성별</th>
                                <th>생년월일</th>
                                <th>심각도</th>
                                <th>등록일</th>
                                <th>상담 종료일</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, idx) in paginatedItems" :key="item.id"
                                @click="goToCounselLogs(item.id, item.name)" style="cursor: pointer;">
                                <td>{{ startIndex + idx + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.gender === 'M' ? '남' : item.gender === 'F' ? '여' : '-' }}</td>
                                <td>{{ item.birthday }}</td>
                                <td>{{ item.severityLevel ?? '-' }}</td>
                                <td>{{ formatDate(item.createdAt) }}</td>
                                <td>{{ item.endDate ? formatDate(item.endDate) : 'N/A' }}</td>
                                <td>
                                    <v-btn size="small" @click.stop="writeCounsel(item.id, item.name)">
                                        상담서 작성
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>

                    <!-- 페이지네이션 -->
                    <v-pagination v-model="currentPage" :length="pageCount" :total-visible="7" class="pa-4" />
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchCounselees, searchCounseleesByName } from '@/api/counselee/counseleeQuery';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import Header from '@/components/Header.vue';
import MemberSideBar from '@/components/sidebar/MemberSidebar.vue';
import Counselee from '@/models/Counselee';

const router = useRouter();
const authStore = useAuthStore();
const memberId = authStore.memberId ?? 1;

const counselees = ref([]);
const searchQuery = ref('');
const searchType = ref('이름');
const isSearching = ref(false);

const currentPage = ref(1);
const itemsPerPage = 10;

const pageCount = computed(() => Math.ceil(counselees.value.length / itemsPerPage));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const paginatedItems = computed(() =>
    counselees.value.slice(startIndex.value, startIndex.value + itemsPerPage)
);

const goToCounselLogs = (id, name) => {
    router.push({
        name: 'CounseleeCounselPage',
        params: { id },
        query: { name }, // 이름은 query로 전달
    });
};

const loadCounselees = async () => {
    try {
        const response = await fetchCounselees(memberId);
        counselees.value = response.data.map(counselee => new Counselee(counselee));
    } catch (error) {
        alert('내담자 리스트 조회 실패');
        console.error(error);
    }
};

const handleSearch = async () => {
    const keyword = searchQuery.value.trim();

    if (!keyword) {
        await loadCounselees();
        isSearching.value = false;
        return;
    }

    try {
        const response = await searchCounseleesByName(memberId, keyword);
        counselees.value = response.data.map(counselee => new Counselee(counselee));
        currentPage.value = 1;
        isSearching.value = true; // 검색 성공 시 표시
    } catch (error) {
        alert('내담자 검색 실패');
        console.error(error);
    }
};

const resetSearch = async () => {
    searchQuery.value = '';
    isSearching.value = false;
    await loadCounselees();
    currentPage.value = 1;
};

const handleRegister = () => {
    router.push({ name: 'CounseleeRegisterPage' });
};

const writeCounsel = (counseleeId, counseleeName) => {
    router.push({
        name: 'CounselingLogFormPage',
        params: { id: counseleeId }, // path variable
        query: {
            counseleeName: String(counseleeName),
            memberId: String(memberId),
        },
    });
};


const formatDate = (dateStr) => {
    return dateStr?.split('T')[0];
};

onMounted(loadCounselees);
</script>

<style scoped>
.content-area {
    position: relative;
    padding: 0;
    overflow: hidden;
}

th {
    font-weight: 600;
}

td {
    vertical-align: middle;
}

.v-btn {
    font-weight: bold;
    letter-spacing: 0.5px;
    margin-right: 20px;
}
</style>