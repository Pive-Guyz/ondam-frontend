<template>
    <div class="emotion-analysis-container">
        <h2 class="section-title">📊 감정 분석</h2>

        <div class="charts-section">
            <div class="chart-box">
                <h3 class="chart-title">감정 유형별 전체 비율</h3>
                <ApexCharts type="pie" :options="pieOptions" :series="pieSeries" height="350" />
            </div>
            <div class="chart-box">
                <h3 class="chart-title">감정별 출현 빈도</h3>
                <ApexCharts type="bar" :options="barOptions" :series="barSeries" :height="barHeight" />
            </div>
        </div>

        <div class="detail-section">
            <h3 class="section-subtitle">🔍 상세 감정 분석</h3>
            <table class="emotion-table">
                <thead>
                    <tr>
                        <th style="width: 15%;">감정</th>
                        <th style="width: 35%;">근거 발화</th>
                        <th style="width: 35%;">판단 이유</th>
                        <th style="width: 10%;">감정 유형</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in emotionAnalysisList" :key="index">
                        <td>{{ item.emotion }}</td>
                        <td>{{ item.evidence }}</td>
                        <td>{{ item.reason }}</td>
                        <td>
                            <span :class="['tag', getCategoryClass(item.emotionCategoryName)]">
                                {{ convertCategory(item.emotionCategoryName) }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ApexCharts from 'vue3-apexcharts';

const route = useRoute();
const counselId = route.params.counselId;
const emotionAnalysisList = ref([]);

const pieSeries = ref([]);
const pieOptions = ref({});

const barSeries = ref([]);
const barOptions = ref({});

const barHeight = ref(300);

const categoryColorMap = {
    '긍정적': '#5B93FF',
    '부정적': '#FF9494',
    '성장/회복': '#34C759',
    '중립/혼합': '#A2845E',
    '대인관계': '#FFD66B'
};

function getCategoryClass(category) {
    if (category.includes('긍정적')) return 'positive';
    if (category.includes('부정적')) return 'negative';
    if (category.includes('성장/회복')) return 'growth';
    if (category.includes('중립/혼합')) return 'neutral';
    return 'relationship';
}

function convertCategory(category) {
    if (category.includes('긍정적')) return '긍정적';
    if (category.includes('부정적')) return '부정적';
    if (category.includes('성장/회복')) return '성장/회복';
    if (category.includes('중립/혼합')) return '중립/혼합';
    return '대인관계';
}

async function fetchData() {
    try {
        const { data } = await axios.get(`/api/v1/analysis/${counselId}/analysis`);
        emotionAnalysisList.value = data.emotionAnalysisList || [];

        const categoryCount = {};
        const emotionCount = {};

        emotionAnalysisList.value.forEach(item => {
            const category = convertCategory(item.emotionCategoryName);
            categoryCount[category] = (categoryCount[category] || 0) + 1;
            emotionCount[item.emotion] = (emotionCount[item.emotion] || 0) + 1;
        });

        const labels = Object.keys(categoryCount);
        const series = Object.values(categoryCount);
        const pieColors = labels.map(label => categoryColorMap[label] || '#CCCCCC');

        pieSeries.value = series;
        pieOptions.value = {
            chart: { type: 'donut' },
            labels: labels,
            colors: pieColors,
            dataLabels: { enabled: true },
            legend: { position: 'bottom' },
            stroke: { width: 2, colors: ['#fff'] },
            plotOptions: { pie: { donut: { size: '65%' } } }
        };

        const emotionLabels = Object.keys(emotionCount);
        const emotionSeries = Object.values(emotionCount);

        const barColors = emotionLabels.map(emotion => {
            const emotionItem = emotionAnalysisList.value.find(e => e.emotion === emotion);
            if (!emotionItem) return '#CCCCCC';
            const category = convertCategory(emotionItem.emotionCategoryName);
            return categoryColorMap[category] || '#CCCCCC';
        });

        const maxCount = Math.max(...emotionSeries);

        barSeries.value = [{ name: '출현 빈도', data: emotionSeries }];
        barOptions.value = {
            chart: {
                type: 'bar',
                toolbar: { show: false },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 8,
                    distributed: true,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: val => `${val}회`,
                offsetX: 10,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    colors: ['#555'],
                },
            },
            xaxis: {
                categories: emotionLabels,
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '14px',
                        color: '#333',
                    },
                },
            },
            grid: {
                xaxis: { lines: { show: false } },
                yaxis: { lines: { show: false } },
                padding: {
                    top: 20,
                    bottom: 20,
                    left: 10,
                    right: 10,
                },
            },
            colors: barColors,
        };


        barHeight.value = Math.max(300, emotionLabels.length * 40);
    } catch (error) {
        console.error('Error fetching analysis data:', error);
    }
}

onMounted(() => {
    fetchData();
});
</script>

<style scoped>
.emotion-analysis-container {
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
}

.section-subtitle {
    font-size: 1.4rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.charts-section {
    display: flex;
    gap: 4rem;
    justify-content: space-between;
}

.chart-box {
    flex: 1;
    background: #fafafa;
    border-radius: 12px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chart-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.detail-section {
    margin-top: 2rem;
}

.emotion-table {
    width: 100%;
    border-collapse: collapse;
}

.emotion-table th,
.emotion-table td {
    padding: 1rem 0.8rem;
    text-align: left;
    font-size: 14px;
    line-height: 1.5;
    word-break: break-word;
    white-space: normal;
    vertical-align: top;
    border-bottom: 1px solid #eee;
}

.emotion-table th {
    font-weight: 600;
    color: #333;
}

.emotion-table td {
    color: #555;
}

.tag {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;
}

.positive {
    background-color: #5B93FF;
}

.negative {
    background-color: #FF9494;
}

.growth {
    background-color: #34C759;
}

.neutral {
    background-color: #A2845E;
}

.relationship {
    background-color: #FFD66B;
}
</style>