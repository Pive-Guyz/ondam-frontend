<template>
    <v-card class="pa-6 elevation-2">
        <v-card-title class="text-h5 font-weight-bold mb-6">
            ✏️ 고민 요약
        </v-card-title>
        <v-card-text>
            <v-container class="pa-0" fluid>
                <v-row v-for="(item, index) in summaryList" :key="index" align="center">
                    <v-col cols="auto" class="d-flex align-center" style="min-width: 150px;">
                        <v-icon size="20" class="mr-4 ml-2">{{ item.icon }}</v-icon>
                        <span class="text-body-1 font-weight-medium">{{ item.title }}</span>
                    </v-col>
                    <v-col class="text-body-2" style="font-size: 14px; line-height: 1.4;">
                            {{ item.content }}
                    </v-col>
                </v-row>

            </v-container>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    summary: Object
});

const summaryList = computed(() => [
    { icon: 'mdi-clock-time-four-outline', title: '시기', content: props.summary.period },
    { icon: 'mdi-map-marker', title: '어디서', content: props.summary.place },
    { icon: 'mdi-sync', title: '상황', content: props.summary.situation },
    { icon: 'mdi-comment-alert-outline', title: '이유', content: props.summary.reason },
    { icon: 'mdi-arrow-decision-outline', title: '흐름', content: props.summary.flow },
    { icon: 'mdi-leaf', title: '결심', content: props.summary.determination },
]);
</script>