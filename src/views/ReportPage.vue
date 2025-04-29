<template>
    <v-app>
        <v-main class="main-background">
            <v-container fluid class="d-flex pa-0" style="height: 100vh;">
                
                <AdminSidebar />

                <v-container fluid class="pa-8">
                    <v-container style="max-width: 1100px; margin: 0 auto;">
                        <ReportCard />
                    </v-container>
                </v-container>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import AdminSidebar from '@/components/sidebar/AdminSidebar.vue'
import ReportCard from '@/components/report/ReportCard.vue'
</script>

<style scoped>
.main-background {
    background-color: #F5F7FA;
}
</style>