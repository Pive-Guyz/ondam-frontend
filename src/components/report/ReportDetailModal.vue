<template>
    <v-dialog :model-value="isOpen" @update:modelValue="$emit('update:isOpen', $event)" max-width="600" persistent>
        <v-card class="modal-card pa-6">
            <!-- 모달 상단 -->
            <div class="d-flex justify-space-between align-center mb-6">
                <div>
                    <div class="logo-text">ON:DAM</div>
                    <div class="modal-title">신고 상세 조회</div>
                </div>
                <v-btn icon variant="text" size="small" class="close-btn" @click="$emit('update:isOpen', false)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>

            <!-- 신고 정보 -->
            <v-text-field label="신고 당한 회원" :model-value="reportData?.reportedMemberName" readonly />
            <v-text-field label="신고 사유" :model-value="reportData?.reportCategoryName" readonly />
            <v-textarea label="상세 내용" :model-value="reason" readonly />

            <!-- 버튼 -->
            <div class="d-flex justify-center" style="gap: 30px;">
                <v-btn color="primary" class="action-btn" @click="$emit('view')">
                    컨텐츠 보기
                </v-btn>
                <v-btn color="primary" class="action-btn" @click="handleApprove">
                    처리하기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { approveReport } from '@/api/report/reportCommand'
import { fetchReportContent } from '@/api/report/reportQuery'

const props = defineProps({
    isOpen: Boolean,
    reportData: Object
})

const emit = defineEmits(['update:isOpen', 'view', 'refresh'])

const reason = ref('')

// 모달 열릴 때마다 신고 내용 조회
watch(() => props.isOpen, async (opened) => {
    if (opened && props.reportData?.id) {
        try {
            const res = await fetchReportContent(props.reportData.id)
            reason.value = res.data.reason
        } catch (e) {
            console.error('신고 상세 내용 조회 실패', e)
        }
    }
})

// 블라인드 처리
const handleApprove = async () => {
    try {
        await approveReport(props.reportData.id)
        alert('신고가 승인되어 블라인드 처리되었습니다.')
        emit('update:isOpen', false)
        emit('refresh')
    } catch (err) {
        console.error('신고 승인 실패', err)
        alert('처리 중 오류가 발생했습니다.')
    }
}
</script>

<style scoped>
.modal-card {
    border-radius: 16px;
}

.logo-text {
    font-weight: 800;
    font-size: 20px;
    color: #344FA3;
}

.modal-title {
    font-size: 18px;
    font-weight: 600;
    color: #666666;
    margin-top: 4px;
}

.close-btn {
    color: #344FA3;
    transition: 0.2s;
}

.close-btn:hover {
    background-color: #e0e7ff;
}

.v-text-field,
.v-select,
.v-textarea {
    --v-field-border-color: #344FA3;
    --v-primary-base: #344FA3;
}

.v-text-field .v-field,
.v-select .v-field,
.v-textarea .v-field {
    border-color: #344FA3 !important;
}

.v-text-field:hover .v-field,
.v-select:hover .v-field,
.v-textarea:hover .v-field {
    border-color: #344FA3 !important;
}

.v-text-field:focus-within .v-field,
.v-select:focus-within .v-field,
.v-textarea:focus-within .v-field {
    border-color: #344FA3 !important;
}

.action-btn {
    background-color: #344FA3;
    color: #fff;
    font-weight: bold;
    border-radius: 12px;
    width: 150px;
    height: 45px;
    font-size: 16px;
}
</style>
