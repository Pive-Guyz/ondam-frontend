<template>
    <div class="form-label">
        <span>{{ text }}</span>
        <span v-if="required" class="text-red">●</span>
    </div>
</template>

<script setup>
defineProps({
    text: String,
    required: Boolean
});
</script>

<style scoped>
.form-label {
    display: block;
    margin-bottom: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
}

.text-red {
    color: #F44336;
    margin-left: 4px;
}
</style>