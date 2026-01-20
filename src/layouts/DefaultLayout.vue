<script setup lang="ts">
import Sidebar from '../components/layout/Sidebar.vue';

</script>

<template>
    <div class="flex min-h-screen">
        <sidebar />

        <div class="flex flex-col flex-1 bg-[#F9FAFB]">
            <main class="flex-1 p-6">
                <router-view />
            </main>
        </div>
    </div>
</template>