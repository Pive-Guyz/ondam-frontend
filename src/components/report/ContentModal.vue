<template>
    <v-dialog :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)" max-width="600px"
        persistent>
        <v-card class="content-modal-card pa-6">
            <!-- 헤더 -->
            <div class="d-flex justify-space-between align-center mb-6">
                <div>
                    <div class="logo-text">ON:DAM</div>
                    <div class="modal-subtitle">신고 받은 컨텐츠입니다.</div>
                </div>
                <v-btn icon variant="text" @click="$emit('update:modelValue', false)">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
            </div>

            <!-- 폼 -->
            <v-text-field label="제목" :model-value="title" readonly class="mb-4" variant="outlined"
                density="comfortable" />
            <v-text-field label="작성일" :model-value="createdAt" readonly class="mb-4" variant="outlined"
                density="comfortable" />
            <v-textarea label="내용" :model-value="content" readonly rows="6" variant="outlined" density="comfortable" />
        </v-card>
    </v-dialog>
</template>

<script setup>
defineProps({
    modelValue: Boolean,
    title: String,
    createdAt: String,
    content: String
})
</script>

<style scoped>
.content-modal-card {
    border-radius: 20px;
}

.logo-text {
    font-weight: 800;
    font-size: 20px;
    color: #344FA3;
}

.modal-subtitle {
    font-size: 15px;
    color: #888888;
    margin-top: 2px;
}

.v-text-field,
.v-textarea {
    --v-field-border-color: #344FA3;
    --v-primary-base: #344FA3;
}

.v-field {
    border-color: #344FA3 !important;
}

.v-label {
    color: #344FA3 !important;
    font-weight: 600;
}
</style>