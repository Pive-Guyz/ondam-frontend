<template>
    <v-card class="pa-6 elevation-2 effective-statement-card">

        <v-card-title class="text-h5 font-weight-bold mb-6">
            🗣️ 효과적 발화
        </v-card-title>

        <v-card-text>
            <!-- 발화 문구 -->
            <p class="quote-text font-weight-medium ml-5">
                "{{ effectiveStatement.content }}"
            </p>

            <!-- 구분선 -->
            <v-divider class="divider my-10" />

            <!-- 테이블 -->
            <v-simple-table class="custom-table">
                <thead>
                    <tr>
                        <th class="header-cell" style="width: 30%;">내담자 반응</th>
                        <th class="header-cell" style="width: 40%;">이유</th>
                        <th class="header-cell" style="width: 30%;">결과</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ul class="bullet-list">
                                <li v-for="(item, index) in splitResponses" :key="index">{{ item.trim() }}</li>
                            </ul>
                        </td>
                        <td>
                            <ul class="bullet-list">
                                <li v-for="(item, index) in splitReasons" :key="index">{{ item.trim() }}</li>
                            </ul>
                        </td>
                        <td>
                            <p class="result-text">{{ effectiveStatement.result }}</p>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    effectiveStatement: {
        type: Object,
        required: true
    }
});

const splitResponses = computed(() => {
    if (!props.effectiveStatement?.response) return [];
    return props.effectiveStatement.response.split('/');
});

const splitReasons = computed(() => {
    if (!props.effectiveStatement?.reason) return [];
    return props.effectiveStatement.reason.split('/');
});
</script>

<style scoped>
.effective-statement-card {
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.quote-text {
    font-size: 16px;
    color: #222;
    line-height: 1.8;
    white-space: pre-line;
}

.divider {
    height: 10px;
    border-color: #000000;
}

.custom-table {
    width: 100%;
    font-size: 13px;
    color: #333;
    border-collapse: separate;
    border-spacing: 0 13px;
    /* 행 간격 */
    margin: 0 12px 0 0;
}

.header-cell {
    font-weight: 700;
    padding: 0px 12px 0px 12px;
    text-align: left;
    font-size: 15px;
}

.custom-table td {
    padding: 0px 12px;
    vertical-align: top;
}

.bullet-list {
    list-style-type: disc;
    padding-left: 1.2rem;
    margin: 0;
}

.bullet-list li {
    margin-bottom: 0.5rem;
    line-height: 1.8;
    color: #444;
}

.result-text {
    white-space: pre-line;
    color: #555;
    line-height: 1.8;
}
</style>