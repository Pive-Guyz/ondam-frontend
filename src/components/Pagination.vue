<template>
    <v-pagination :model-value="currentPage" @update:modelValue="updatePage" :length="totalPages" rounded
        total-visible="5" class="custom-pagination" />
</template>

<script setup>
import { computed } from 'vue'

// props
const props = defineProps({
    currentPage: Number,
    totalItems: Number,
    itemsPerPage: {
        type: Number,
        default: 10
    }
})

// emit
const emit = defineEmits(['update:currentPage'])

// 총 페이지 수 계산
const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.itemsPerPage)
})

// 페이지 변경 시 emit
function updatePage(newPage) {
    emit('update:currentPage', newPage)
}
</script>

<style scoped>
.custom-pagination {
    --v-pagination-item-height: 40px;
    --v-pagination-item-width: 40px;
}

/* 기본 버튼 */
.custom-pagination .v-pagination__item {
    border-radius: 8px;
    background-color: #F5F7FA;
    color: #2C3E50;
    font-weight: 500;
    transition: all 0.2s;
}

/* 눌렸을 때 (active) 버튼 */
.custom-pagination .v-pagination__item:active {
    background-color: #344FA3;
    color: #ffffff;
}

/* 활성화된 버튼 (현재 페이지) */
.custom-pagination .v-pagination__item--is-active {
    background-color: #344FA3;
    color: #FFFFFF;
}

/* ... 점 3개 */
.custom-pagination .v-pagination__more {
    color: #757575;
}
</style>
