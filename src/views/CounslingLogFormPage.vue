<template>
    <div class="counseling-log-form container">
        <h2 class="page-title">상담 일지 입력 페이지</h2>

        <div class="form-card">
            <h3 class="counselee-name">{{ counseleeName }} 상담일지</h3>
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
</template>

<script setup>
import { reactive } from 'vue';
import { createCounsel } from '@/api/counsel/counselCommand';
import Counsel from '@/models/Counsel';

const today = new Date().toISOString().split('T')[0];
const counseleeName = '박우석'; // 나중에 props로 교체 가능
const counseleeId = 2;          // 예시: 현재 상담하는 내담자 ID
const memberId = 1;             // 예시: 현재 로그인한 상담사 ID

const props = defineProps({
    memberId: {
        type: [String, Number],
        required: true,
    },
    counseleeId: {
        type: [String, Number],
        required: true,
    },
    counseleeName: {
        type: String,
        default: '',
    },
});

const form = reactive({
    type: '',
    content: '',
    opinion: '',
    weather: '',
    hour: '',
    minute: '',
    nextDate: today,
});

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
        counseleeId: counseleeId,
        memberId: memberId,
    });
    console.log('counsel data chk : ', counsel);
    try {
        counsel.validateAll();
    } catch (err) {
        alert(err.message);
        return;
    }

    try {
        const response = await createCounsel(counsel);
        alert('상담 일지가 성공적으로 등록되었습니다.');
        console.log('서버 응답:', response.data);
        // TODO: 등록 후 페이지 이동 or 초기화
    } catch (error) {
        console.error('등록 실패:', error);
        alert('상담 일지 등록에 실패했습니다. 다시 시도해주세요.');
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
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
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