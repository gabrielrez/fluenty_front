<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '../components/layout/Sidebar.vue';
import { MenuIcon } from 'lucide-vue-next';
import Logo from '../components/common/Logo.vue';

const isSidebarOpen = ref(false);

</script>

<template>
    <div class="flex min-h-screen overflow-hidden bg-[#F9FAFB]">
        <Sidebar :open="isSidebarOpen" @close="isSidebarOpen = false" />

        <div class="flex flex-col flex-1">
            <header class="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#E0E5EE]">
                <button @click="isSidebarOpen = true" class="flex items-center gap-1 bg-[#142952] p-2 rounded-lg">
                    <menu-icon class="w-6 h-6 text-white" />
                </button>
                <logo to="/dashboard"/>
            </header>

            <main class="flex-1 ml-0 md:ml-64 p-4 sm:p-6 overflow-y-auto">
                <router-view />
            </main>
        </div>
    </div>
</template>