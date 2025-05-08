<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <div class="modal-header">
        <h3>ON:DAM<br /><span class="subtitle">권한 변경</span></h3>
        <button class="close-btn" @click="emit('close')">×</button>
      </div>

      <div class="authority-options">
        <label v-for="option in roles" :key="option.value" class="radio-label">
          <input
            type="radio"
            :value="option.value"
            v-model="selectedAuthority"
          />
          {{ option.label }}
        </label>
      </div>

      <button class="confirm-btn" @click="submitChange">완료</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { updateAuthority } from '@/api/member/memberCommand'

const emit = defineEmits(['close', 'updated'])

const props = defineProps({
  memberId: Number,
  currentAuthority: String,
})

const selectedAuthority = ref(props.currentAuthority)

const roles = [
  { label: 'Guest', value: 'GUEST' },
  { label: 'User', value: 'USER' },
  { label: 'Admin', value: 'ADMIN' },
]

const submitChange = async () => {
  try {
    await updateAuthority(props.memberId, selectedAuthority.value)
    alert('권한이 변경되었습니다.')
    emit('updated', selectedAuthority.value)
    emit('close')
  } catch (e) {
    console.error(e)
    alert('권한 변경에 실패했습니다.')
  }
}
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-box {
  background: white;
  width: 260px;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subtitle {
  font-size: 14px;
  color: #999;
}

.close-btn {
  font-size: 20px;
  border: none;
  background: none;
  cursor: pointer;
}

.authority-options {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
}

.radio-label {
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.confirm-btn {
  background-color: #3c8df3;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}
</style>
