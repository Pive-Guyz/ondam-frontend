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
            <v-text-field label="신고 당한 회원" :model-value="detailData.reportedMemberName" readonly />
            <v-text-field label="신고 사유" :model-value="detailData.reportCategoryName" readonly />
            <v-textarea label="상세 내용" :model-value="detailData.reason" readonly />

            <!-- 버튼 -->
            <div class="d-flex justify-center" style="gap: 30px;">
                <v-btn color="primary" class="action-btn" @click="$emit('view')">
                    컨텐츠 보기
                </v-btn>
                <v-btn color="primary" class="action-btn" @click="$emit('process', reportData)">
                    처리하기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { fetchReportDetail } from '@/api/report/reportQuery'

const props = defineProps({
    isOpen: Boolean,
    reportData: Object
})

const detail = ref(null)

// ✅ 템플릿에서 쓸 때 computed로 감싸기
const detailData = computed(() => detail.value || {})

// 모달 처음 열릴 때
watch(() => props.isOpen, async (opened) => {
    if (opened && props.reportData?.id) {
        const res = await fetchReportDetail(props.reportData.id)
        detail.value = res.data
    }
})

// 모달 열려있는 상태에서 다른 신고 클릭한 경우
watch(() => props.reportData, async (newData) => {
    if (props.isOpen && newData?.id) {
        const res = await fetchReportDetail(newData.id)
        detail.value = res.data
    }
})
</script>

<style scoped>
/* 네가 올린 스타일 그대로 사용 */
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