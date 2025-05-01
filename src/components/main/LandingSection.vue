<template>
    <section class="landing-section" :class="{ reverse }">
        <div class="text-block">
            <h2>{{ title }}</h2>
            <p v-html="description"></p>
        </div>
        <div class="image-block">
            <img :src="image" :alt="title" />
        </div>
    </section>
</template>

<script setup>
defineProps({
    title: String,
    description: String,
    image: String,
    reverse: Boolean
});
</script>

<style scoped>
.landing-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 80px 20px;
    gap: 48px;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: nowrap;
}

.landing-section.reverse {
    flex-direction: row-reverse;
}

.text-block {
    flex: 1;
    min-width: 320px;
}

.text-block h2 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #1e1e2f;
}

.text-block p {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
}

.image-block {
    flex: 1;
    display: flex;
    justify-content: center;
    min-width: 320px;
}

.image-block img {
    max-width: 100%;
    max-height: 420px;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

@media (max-width: 960px) {
    .landing-section {
        flex-direction: column;
        text-align: center;
    }

    .landing-section.reverse {
        flex-direction: column;
    }

    .text-block,
    .image-block {
        width: 100%;
    }

    .image-block img {
        max-height: 300px;
    }
}
</style>