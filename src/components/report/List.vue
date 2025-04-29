<template>
    <v-table class="list-table">
        <thead>
            <tr>
                <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, rowIndex) in items" :key="rowIndex" @click="emit('row-click', row)" class="clickable-row">
                <td v-for="(value, key, colIndex) in row" :key="colIndex">
                    <slot :name="key" :value="value" :item="row">
                        {{ value }}
                    </slot>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['row-click'])

defineProps({
    headers: {
        type: Array,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>
.list-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

th {
    background-color: #f4f4f4;
    font-weight: 600;
    text-align: center !important;
    padding: 14px;
    border-bottom: 1px solid #e0e0e0;
}

td {
    text-align: center;
    padding: 14px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.clickable-row {
    cursor: pointer;
    transition: background-color 0.2s;
}

.clickable-row:hover {
    background-color: #f5f5f5;
}
</style>