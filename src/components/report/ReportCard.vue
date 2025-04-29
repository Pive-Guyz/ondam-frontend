<template>
    <v-card class="pa-6">
        <!-- 제목 -->
        <v-card-title class="text-h5 font-weight-bold">
            신고
        </v-card-title>
        <v-card-subtitle class="subtitle-text">
            신고 내역을 확인할 수 있습니다.
        </v-card-subtitle>

        <!-- 필터 -->
        <v-row justify="end" class="mb-4">
            <v-col cols="auto">
                <v-select v-model="selectedSort" :items="sortOptions" label="정렬" variant="outlined" density="compact"
                    style="width: 160px;" />
            </v-col>
            <v-col cols="auto">
                <v-select v-model="selectedStatus" :items="statusOptions" label="상태" variant="outlined"
                    density="compact" style="width: 160px;" />
            </v-col>
        </v-row>

        <!-- 리스트 테이블 -->
        <List :headers="headers" :items="paginatedReports.map(({ details, ...rest }) => rest)" @row-click="openModal">
            <template #status="{ value }">
                <v-chip :class="statusClass(value)" class="status-chip" variant="tonal" size="small">
                    {{ value }}
                </v-chip>
            </template>
        </List>

        <!-- 상세 모달 -->
        <ReportDetailModal v-model:isOpen="isDetailOpen" :reportData="selectedReport" @view="handleView"
            @process="openProcessModal" />

        <!-- 처리 모달 -->
        <ReportProcessModal v-model:isOpen="isProcessOpen" @submit="handleStatusSubmit" />

        <!-- 페이지네이션 -->
        <v-row justify="center" class="mt-6">
            <Pagination v-model:currentPage="page" :total-items="filteredReports.length"
                :items-per-page="itemsPerPage" />
        </v-row>
    </v-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import List from '@/components/report/List.vue'
import Pagination from '@/components/Pagination.vue'
import ReportDetailModal from '@/components/report/ReportDetailModal.vue'
import ReportProcessModal from '@/components/report/ReportProcessModal.vue'
import reportsData from '@/json/reports.json'

const selectedSort = ref('최근순')
const selectedStatus = ref('전체')
const page = ref(1)
const itemsPerPage = 10
const isDetailOpen = ref(false)
const isProcessOpen = ref(false)
const selectedReport = ref(null)

watch([selectedSort, selectedStatus], () => {
    page.value = 1
})

const headers = [
    '신고한 회원',
    '신고당한 회원',
    '신고 사유',
    '작성 시각',
    '신고 유형',
    '처리 상태'
]

const reports = reportsData

const sortOptions = ['최근순', '오래된순']
const statusOptions = ['전체', 'Pending', 'Approved', 'Rejected']

const filteredReports = computed(() => {
    let result = reports

    if (selectedStatus.value !== '전체') {
        result = result.filter(r => r.status === selectedStatus.value)
    }

    if (selectedSort.value === '오래된순') {
        result = [...result].sort((a, b) => new Date(a.date) - new Date(b.date))
    } else {
        result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    return result
})

const paginatedReports = computed(() => {
    const start = (page.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredReports.value.slice(start, end)
})

// 리스트에서 한 줄 클릭 → 상세 모달 열기
function openModal(rowWithoutDetails) {
    const found = paginatedReports.value.find(report =>
        report.reporter === rowWithoutDetails.reporter &&
        report.reported === rowWithoutDetails.reported &&
        report.reason === rowWithoutDetails.reason &&
        report.date === rowWithoutDetails.date &&
        report.type === rowWithoutDetails.type &&
        report.status === rowWithoutDetails.status
    )

    if (found) {
        selectedReport.value = found // ✅ details까지 포함된 데이터
        isDetailOpen.value = true
    }
}

// 상세 모달 → 처리하기 버튼 클릭
function openProcessModal() {
    isDetailOpen.value = false
    isProcessOpen.value = true
}

// 처리 모달 → 완료 버튼 클릭
function handleStatusSubmit(newStatus) {
    if (selectedReport.value) {
        selectedReport.value.status = newStatus
    }
    isProcessOpen.value = false
}

// 상세 모달 → 컨텐츠 보기 클릭
function handleView() {
    console.log('컨텐츠 보기 클릭')
}

function statusClass(status) {
    switch (status) {
        case 'Pending':
            return 'status-chip pending'
        case 'Approved':
            return 'status-chip approved'
        case 'Rejected':
            return 'status-chip rejected'
        default:
            return 'status-chip'
    }
}
</script>

<style scoped>
.subtitle-text {
    font-size: 14px;
    color: #344FA3;
    margin-bottom: 24px;
}

.status-chip {
    border-width: 2px;
    font-weight: 500;
    width: 90px;
    justify-content: center;
    border-radius: 999px;
}

.status-chip.pending {
    color: #6366F1;
    background-color: #E0E7FF;
    border: 1px solid #6366F1;
}

.status-chip.approved {
    color: #FF5252;
    background-color: #FFE5E5;
    border: 1px solid #FF5252;
}

.status-chip.rejected {
    color: #757575;
    background-color: #EEEEEE;
    border: 1px solid #BDBDBD;
}
</style>
