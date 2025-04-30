<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card class="pa-6" style="border-radius: 20px;">
            <!-- 모달 상단 -->
            <div class="d-flex justify-space-between align-center mb-6">
                <div>
                    <div class="logo-text">ON:DAM</div>
                    <div class="modal-title">허위 신고 시 이용이 제한될 수 있습니다.</div>
                </div>
                <v-btn icon variant="text" size="small" class="close-btn" @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>

            <!-- 입력 필드 -->
            <v-text-field label="작성 시각" v-model="createdAt" readonly variant="outlined" density="comfortable"
                class="mb-4" style="border-radius: 12px;" />

            <v-select label="신고 사유" v-model="reason" :items="reasonOptions" item-title="label" item-value="value"
                variant="outlined" density="comfortable" class="mb-4" style="border-radius: 12px;" />

            <v-textarea label="내용" v-model="content" rows="4" variant="outlined" density="comfortable"
                style="border-radius: 12px;" />

            <!-- 버튼 -->
            <div class="text-center mt-6">
                <v-btn color="#2D4DA4" class="action-btn" @click="submitReport">
                    신고하기
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '@/api/config/axios'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
    replyId: Number,
    createdAt: String,
    reportedMemberId: Number,
    modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.modelValue)
watch(() => props.modelValue, val => (isOpen.value = val))
watch(isOpen, val => emit('update:modelValue', val)) // ✅ modelValue로 맞춰야 함

const reason = ref('')
const content = ref('')
const createdAt = ref('')

const reasonOptions = ref([])

const fetchReportCategories = async () => {
    try {
        const res = await api.get('/report/report-category')
        reasonOptions.value = res.data.map(cat => ({
            label: cat.name,
            value: cat.id
        }))
    } catch (e) {
        console.error('신고 카테고리 불러오기 실패', e)
    }
}

const formatDate = (dateObj) => {
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    return `${year}. ${month}. ${day}`
}

onMounted(() => {
    fetchReportCategories()
    createdAt.value = formatDate(new Date())
})

const close = () => {
    isOpen.value = false // ✅ 이게 바뀌면 위 watch가 emit을 발생시킴
}

const authStore = useAuthStore()

const submitReport = async () => {
    if (!reason.value) {
        alert('신고 사유를 선택해주세요.')
        return
    }

    console.log('[신고 요청]', {
        memberId: authStore.memberId,
        reportedMemberId: props.reportedMemberId,
        replyId: props.replyId,
        reportCategoryId: reason.value,
        reason: content.value
    })

    try {
        await api.post('/report/reply', {
            memberId: authStore.memberId,
            reportedMemberId: props.reportedMemberId,
            replyId: props.replyId,
            reportCategoryId: reason.value,
            reason: content.value
        })

        alert('신고가 완료되었습니다.')
        close()
    } catch (err) {
        console.error(err)
        alert('신고 중 오류가 발생했습니다.')
    }
}
</script>

<style scoped>
.logo-text {
    font-weight: 800;
    font-size: 20px;
    color: #344FA3;
}

.modal-title {
    font-size: 15px;
    font-weight: 600;
    color: #666666;
    margin-top: 4px;
}
</style>
