<template>
    <v-dialog :model-value="isOpen" @update:modelValue="$emit('update:isOpen', $event)" max-width="500" persistent>
        <v-card class="modal-card pa-6">
            <!-- 모달 상단 -->
            <div class="d-flex justify-space-between align-center mb-6">
                <div>
                    <div class="logo-text">ON:DAM</div>
                    <div class="modal-title">신고 처리</div>
                </div>
                <v-btn icon variant="text" size="small" class="close-btn" @click="$emit('update:isOpen', false)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>

            <!-- 처리 선택 라디오 -->
            <v-radio-group v-model="selectedStatus" class="mb-6">
                <v-radio label="Pending" value="Pending" class="mb-6" color="primary" />
                <v-radio label="Rejected" value="Rejected" class="mb-6" color="primary" />
                <v-radio label="Approved" value="Approved" color="primary" />
            </v-radio-group>

            <!-- 완료 버튼 -->
            <div class="d-flex justify-center">
                <v-btn color="primary" class="action-btn" @click="submitStatus">
                    완료
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    isOpen: Boolean,
})

const emit = defineEmits(['update:isOpen', 'submit'])

const selectedStatus = ref('Pending')

function submitStatus() {
    emit('submit', selectedStatus.value)
    emit('update:isOpen', false)
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