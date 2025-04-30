<template>
    <v-card class="pa-6">
        <!-- 제목 -->
        <v-card-title class="text-h5 font-weight-bold">신고</v-card-title>
        <v-card-subtitle class="subtitle-text">신고 내역을 확인할 수 있습니다.</v-card-subtitle>

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
        <List :headers="headers" :items="paginatedReports" @row-click="openModal">
            <template #처리 상태="{ value }">
                <v-chip :class="['status-chip', statusClass(value)]" variant="tonal" size="small">
                    {{ value }}
                </v-chip>
            </template>
        </List>

        <!-- 상세 모달 -->
        <ReportDetailModal v-model:isOpen="isDetailOpen" :reportData="selectedReport" @view="handleView"
            @process="openProcessModal" @refresh="fetchReports" />

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
import { ref, computed, watch, onMounted } from 'vue'
import List from '@/components/report/List.vue'
import Pagination from '@/components/Pagination.vue'
import ReportDetailModal from '@/components/report/ReportDetailModal.vue'
import ReportProcessModal from '@/components/report/ReportProcessModal.vue'
import { fetchReportList, fetchReportDetail } from '@/api/report/reportQuery'
import { updateReportStatus, approveReport } from '@/api/report/reportCommand'
import { statusToText, textToStatus } from '@/utils/reportUtils'

const selectedSort = ref('최근순')
const selectedStatus = ref('전체')
const page = ref(1)
const itemsPerPage = 10
const isDetailOpen = ref(false)
const isProcessOpen = ref(false)
const selectedReport = ref(null)
const reports = ref([])

onMounted(fetchReports)

const headers = ['신고한 회원', '신고당한 회원', '신고 사유', '작성 시각', '신고 유형', '처리 상태']
const sortOptions = ['최근순', '오래된순']
const statusOptions = ['전체', 'Pending', 'Approved', 'Rejected']

// 목록 조회
async function fetchReports() {
    const statusCode = selectedStatus.value !== '전체' ? textToStatus(selectedStatus.value) : null
    const order = selectedSort.value === '오래된순' ? 'asc' : 'desc'
    try {
        const res = await fetchReportList({ status: statusCode, order })
        reports.value = res.data.map(r => ({
            '신고한 회원': r.reporterName,
            '신고당한 회원': r.reportedMemberName,
            '신고 사유': r.reportCategoryName,
            '작성 시각': r.createdAt.slice(0, 16).replace('T', ' '),
            '신고 유형': r.diaryId != null ? `일기 #${r.diaryId}` : `답장 #${r.replyId}`,
            '처리 상태': statusToText(r.status),
            raw: r
        }))
    } catch (e) {
        console.error('신고 목록 조회 실패', e)
    }
}

watch([selectedSort, selectedStatus], () => {
    page.value = 1
    fetchReports()
}, { immediate: true })

const filteredReports = computed(() => reports.value)

const paginatedReports = computed(() => {
    const start = (page.value - 1) * itemsPerPage
    return filteredReports.value.slice(start, start + itemsPerPage)
})

// ✅ 상세 모달 열기 - fetchReportDetail로 다시 조회
async function openModal(row) {
    try {
        const res = await fetchReportDetail(row.raw.id)
        selectedReport.value = res.data
        isDetailOpen.value = true
    } catch (e) {
        console.error('신고 상세 조회 실패', e)
        alert('신고 상세 정보를 불러오지 못했습니다.')
    }
}

function openProcessModal() {
    isDetailOpen.value = false
    isProcessOpen.value = true
}

async function handleStatusSubmit(newStatusText) {
    if (selectedReport.value) {
        const statusCode = textToStatus(newStatusText)
        const reportId = selectedReport.value.id
        try {
            await updateReportStatus(reportId, statusCode)
            if (statusCode === 1) {
                await approveReport(reportId)
            }
            await fetchReports()
        } catch (err) {
            console.error('신고 상태 변경 실패', err)
            alert('처리 중 오류가 발생했습니다.')
        }
        isProcessOpen.value = false
    }
}

function handleView() {
    console.log('컨텐츠 보기 클릭')
}

function statusClass(status) {
    switch (status) {
        case 'Pending': return 'pending';
        case 'Approved': return 'approved';
        case 'Rejected': return 'rejected';
        default: return '';
    }
}
</script>

<style scoped>
.subtitle-text {
    font-size: 14px;
    color: #344FA3;
    margin-bottom: 24px;
}

::v-deep .status-chip {
    border-width: 2px;
    font-weight: 500;
    width: 90px;
    justify-content: center;
    border-radius: 999px;
}

::v-deep .status-chip.pending {
    color: #6366F1 !important;
    background-color: #E0E7FF !important;
}

::v-deep .status-chip.approved {
    color: #FF5252 !important;
    background-color: #FFE5E5 !important;
}

::v-deep .status-chip.rejected {
    color: #757575 !important;
    background-color: #EEEEEE !important;
}
</style>