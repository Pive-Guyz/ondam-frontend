<template>
    <v-container class="d-flex justify-center py-10">
        <v-card width="480" class="pa-8" elevation="0" style="background-color: #F9FAFC;">
            <h2 class="text-h6 font-weight-bold mb-6">신규 등록</h2>

            <v-form>
                <FormLabel text="이름" required />
                <v-text-field v-model="form.name" placeholder="이름 입력" density="comfortable" variant="outlined"
                    hide-details class="mb-5" />

                <FormLabel text="생년월일" required />
                <v-text-field :model-value="form.birthday" @input="form.birthday = formatBirthday($event.target.value)"
                    placeholder="YYYY-MM-DD" maxlength="10" density="comfortable" variant="outlined" hide-details
                    class="mb-5" />

                <FormLabel text="성별" />
                <v-btn-toggle v-model="form.gender" mandatory class="mb-5" rounded="lg" group>
                    <v-btn value="F" variant="outlined" class="px-10">여성</v-btn>
                    <v-btn value="M" variant="outlined" class="px-10">남성</v-btn>
                </v-btn-toggle>

                <FormLabel text="연락처" required />
                <v-text-field :model-value="form.phone" @input="form.phone = formatPhoneNumber($event.target.value)"
                    placeholder="000-0000-0000" maxlength="13" density="comfortable" variant="outlined" hide-details
                    class="mb-5" />

                <FormLabel text="긴급 연락처" />
                <v-text-field :model-value="form.emePhone"
                    @input="form.emePhone = formatPhoneNumber($event.target.value)" placeholder="000-0000-0000"
                    density="comfortable" maxlength="13" variant="outlined" hide-details class="mb-5" />

                <FormLabel text="주소" required />
                <v-text-field v-model="form.address" placeholder="주소 입력" density="comfortable" variant="outlined"
                    hide-details class="mb-6" />

                <v-btn block color="#3F51B5" size="large" class="text-white" @click="handleSubmit">
                    등록
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { createCounselee } from '@/api/counselee/counseleeCommand';
import { formatPhoneNumber, formatBirthday } from '@/utils/formatter';
import FormLabel from '@/components/form/FormLabel.vue';

const router = useRouter();
const authStore = useAuthStore()

const form = reactive({
    name: '',
    birthday: '',
    gender: '',
    phone: '',
    emePhone: '',
    address: '',
})

const handleSubmit = async () => {
    if (!form.name.trim()) {
        alert('이름을 입력해주세요.');
        return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.birthday)) {
        alert('생년월일을 YYYY-MM-DD 형식으로 입력해주세요.');
        return;
    }
    if (!form.gender) {
        alert('성별을 선택해주세요.');
        return;
    }
    if (!/^01[016789]-\d{3,4}-\d{4}$/.test(form.phone)) {
        alert('유효한 연락처를 입력해주세요. 예: 010-1234-5678');
        return;
    }
    if (!form.address.trim()) {
        alert('주소를 입력해주세요.');
        return;
    }

    const payload = {
        name: form.name,
        birthday: form.birthday,
        gender: form.gender,
        phone: form.phone,
        emePhone: form.emePhone || null,
        address: form.address,
        memberId: authStore.memberId ?? 1,
    };

    try {
        await createCounselee(payload);
        alert('내담자가 성공적으로 등록되었습니다.');
        // TODO: 이동 경로 조정
        router.push({ name: 'CounseleePage' });
    } catch (error) {
        console.error('등록 실패:', error);
        alert('등록에 실패했습니다. 다시 시도해주세요.');
    }
};

</script>