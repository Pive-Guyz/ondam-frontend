<template>
    <v-app style="background-color: #F5F7FA;">
        <Header />
        <!-- <MemberSidebar />  -->
        <v-main>
            <v-container class="py-10">

                <v-dialog v-model="isLoading" persistent max-width="300">
                    <v-card class="pa-5" style="text-align: center;">
                        <v-progress-circular indeterminate color="primary" size="40" class="mb-3" />
                        <div>GPT 분석 중입니다. 잠시만 기다려주세요...</div>
                    </v-card>
                </v-dialog>

                <div class="counseling-log-form container">
                    <!-- <h2 class="page-title">상담 일지 입력 페이지</h2> -->
                    <div class="d-flex justify-end mb-6">
                        <v-btn color="deep-purple" class="list-btn" large @click="goToList">
                            목록으로
                        </v-btn>
                    </div>
                    <div class="form-card">
                        <div class="text-h6 font-weight-bold mb-1" style="color: #344FA3;">{{ counseleeName }} 상담일지
                        </div>
                        <p class="today-date">{{ today }}</p>

                        <form @submit.prevent="submitForm">
                            <!-- 상담 유형 -->
                            <div class="form-group">
                                <label>상담 유형</label>
                                <input v-model="form.type" type="text" placeholder="상담 유형을 입력해주세요" />
                            </div>

                            <!-- 오늘 날씨 -->
                            <div class="form-group">
                                <label>오늘 날씨</label>
                                <select v-model="form.weather">
                                    <option value="">날씨 선택</option>
                                    <option value="맑음">맑음</option>
                                    <option value="흐림">흐림</option>
                                    <option value="비">비</option>
                                    <option value="눈">눈</option>
                                </select>
                            </div>

                            <!-- 상담 내용 -->
                            <div class="form-group">
                                <label>상담 내용</label>
                                <textarea v-model="form.content" rows="6" placeholder="상담 내용을 입력해주세요"></textarea>
                            </div>

                            <!-- 상담사 소견 -->
                            <div class="form-group">
                                <label>상담사 소견</label>
                                <input v-model="form.opinion" type="text" placeholder="소견을 입력해주세요" />
                            </div>

                            <!-- 소요 시간 -->
                            <div class="form-group">
                                <label>소요 시간</label>
                                <div class="time-select">
                                    <select v-model="form.hour">
                                        <option value="">시</option>
                                        <option v-for="h in 24" :key="h" :value="h">{{ h }}시</option>
                                    </select>
                                    <select v-model="form.minute">
                                        <option value="">분</option>
                                        <option v-for="m in 60" :key="m" :value="m">{{ m }}분</option>
                                    </select>
                                </div>
                            </div>

                            <!-- 다음 상담 일정 -->
                            <div class="form-group">
                                <label>다음 상담 일정</label>
                                <input v-model="form.nextDate" type="date" />
                            </div>

                            <!-- 버튼 -->
                            <div class="form-buttons">
                                <button type="button" @click="cancelForm">취소하기</button>
                                <button type="submit">등록하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { createCounsel } from '@/api/counsel/counselCommand';
import { useRouter, useRoute } from 'vue-router';
import { requestGptPrompt } from '@/api/analysis/analysisCommand';

import Header from '@/components/Header.vue';
// import MemberSidebar from '../components/sidebar/MemberSidebar.vue';
import Counsel from '@/models/Counsel';


const route = useRoute();
const router = useRouter();

const counseleeId = Number(route.params.id);         // id param도 숫자로 변환
const counseleeName = route.query.counseleeName || '';
const memberId = Number(route.query.memberId);       // ← 여기 Number()로 변환 필수
const today = new Date().toISOString().split('T')[0];

const isLoading = ref(false);

const form = reactive({

    type: '',
    content: '',
    opinion: '',
    weather: '',
    hour: '',
    minute: '',
    nextDate: today,
});

const goToList = () => {
    router.push({
        name: 'CounseleeCounselPage',
        params: { id: counseleeId },
        query: {
            name: String(counseleeName),
        }
    });
};

const validateForm = () => {
    if (!form.type.trim()) {
        alert('상담 유형을 입력해주세요.');
        return false;
    }
    if (!form.content.trim()) {
        alert('상담 내용을 입력해주세요.');
        return false;
    }
    if (!form.opinion.trim()) {
        alert('상담사 소견을 입력해주세요.');
        return false;
    }
    if (!form.weather) {
        alert('오늘 날씨를 선택해주세요.');
        return false;
    }
    if (!form.hour && !form.minute) {
        alert('소요 시간을 입력해주세요.');
        return false;
    }
    return true;
};

const submitForm = async () => {
    if (!validateForm()) return;

    const paddedHour = form.hour ? String(form.hour).padStart(2, '0') : '00';
    const paddedMinute = form.minute ? String(form.minute).padStart(2, '0') : '00';
    const formattedTime = `${paddedHour}:${paddedMinute}`;
    const nextDateWithTime = `${form.nextDate}T00:00:00`;

    const counsel = new Counsel({
        content: form.content,
        opinion: form.opinion,
        weather: form.weather,
        counselType: form.type,
        time: formattedTime,
        nextCreatedAt: nextDateWithTime,
        counseleeId,
        memberId,
    });

    try {
        counsel.validateAll();
    } catch (err) {
        alert(err.message);
        return;
    }

    try {
        isLoading.value = true;

        const response = await createCounsel(counsel);
        const counselId = response.data.id;

        if (!counselId) {
            throw new Error('counselId가 서버 응답에 없습니다.');
        }

        // ✅ GPT 분석 요청: 약간의 딜레이를 두고 요청 -> 요청 성공 시 바로 넘어가게 수정
        // setTimeout(async () => {
        try {
            await requestGptPrompt({
                counselId,
                messages: [
                    {
                        role: 'user',
                        content: form.content,
                    }
                ]
            }, { timeout: 120000 });  // 2분내로 답 안오면 에러 처리

            console.log('✅ GPT 요청 성공');

            // 분석 성공 시 상담 일지 페이지로 이동
            router.push({
                name: 'CounselingReport',
                params: { counselId: String(counselId) },
                query: {
                    counseleeId: counseleeId,
                    reportTitle: `${counseleeName}`,
                    reportDate: today,
                    duration: `${paddedHour}:${paddedMinute}`,
                    weather: form.weather,
                    nextSchedule: form.nextDate,
                    counselorComment: form.opinion,
                    memberId: counsel.memberId,
                }
            });

        } catch (err) {
            console.warn('❌ GPT 요청 실패:', err);

            const errorCode = err.response?.data?.code;

            if (errorCode === 'ECONNABORTED') {
                alert('GPT 분석 요청이 시간 초과되었습니다. 다시 시도해주세요.');
            } else if (!err.response) {
                alert('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
            } else if (errorCode === 'INVALID_COUNSEL_CONTENT') {
                alert(err.response.data.message);
            } else if (errorCode === 'INVALID_JSON_FORMAT') {
                alert(err.response.data.message);
            } else {
                alert('GPT 분석에 실패했습니다. 나중에 다시 시도해주세요.');
            }
        }
        // }, 5000); // 1초 기다림
    } catch (error) {
        console.error('등록 실패:', error);
        alert('상담 일지 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
        isLoading.value = false;
    }
};

const cancelForm = () => {
    if (confirm('정말 입력한 내용을 초기화하시겠습니까?')) {
        form.type = '';
        form.content = '';
        form.opinion = '';
        form.weather = '';
        form.hour = '';
        form.minute = '';
        form.nextDate = today;
    }
};
</script>

<style scoped>
.container {
    padding: 2rem;
}

.page-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
}

.form-card {
    background: #fff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.counselee-name {
    font-size: 1.25rem;
    font-weight: bold;
}

.today-date {
    color: #888;
    margin-bottom: 1.5rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input,

.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    appearance: none;
    /* 크롬, 사파리 */
    -webkit-appearance: none;
    /* 사파리 */
    -moz-appearance: none;
    /* 파이어폭스 */
    background: url('data:image/svg+xml;utf8,<svg fill="black" height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center;
}

.time-select {
    display: flex;
    gap: 1rem;
}

.form-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
}

.form-buttons button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    background-color: #364fc7;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
}

.form-buttons button[type="button"] {
    background-color: #868e96;
}
</style>