<!-- 삭제 예정(모달 확인용) -->
<template>
    <v-app>
        <ReplyReportModal v-model="showModal" :reply-id="1" :created-at="'2025-04-30'" :reported-member-id="2" />
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import ReplyReportModal from '@/components/report/ReplyReportModal.vue'

const showModal = ref(true)
</script>