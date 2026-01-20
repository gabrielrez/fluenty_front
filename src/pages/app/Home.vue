<script setup>
import { ref } from 'vue';
import Sidebar from '../../components/Layout/Sidebar.vue';
import { useUserStore } from '../../stores/user';
import { Menu } from 'lucide-vue-next';
import Logo from '../../components/Logo.vue';

const userStore = useUserStore();
const sidebarOpen = ref(false);
</script>

<template>
    <div class="flex justify-between items-center lg:hidden
         sticky top-0 z-30 p-6
         bg-[#F9FAFB]
         border-b border-[#E0E5EE]">
        <button @click="sidebarOpen = true" class="p-2 rounded-lg bg-white shadow">
            <Menu class="w-5 h-5 text-[#142952]" />
        </button>
        <Logo to="/home" />
    </div>

    <div class="flex h-screen overflow-hidden bg-[#F9FAFB]">
        <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

        <main class="flex-1 px-6 py-6 overflow-y-auto">
            <h1 class="text-3xl font-extrabold">
                Bem-vindo,
                <span class="text-[#1D56C9]">
                    {{ userStore.userPreferredName }}
                </span>! 👋
            </h1>

            <p class="mt-2 text-[#6B778F]">
                Continue assim! Você está numa sequência de 7 dias.
            </p>

            <section class="flex justify-center items-center mt-8 h-64 bg-gray-200 rounded-xl">
                <h3 class="text-gray-400 text-xl font-semibold">Coming Soon...</h3>
            </section>

            <section class="flex justify-center items-center mt-10 h-115 bg-gray-200 rounded-xl">
                <h3 class="text-gray-400 text-xl font-semibold">Coming Soon...</h3>
            </section>
        </main>
    </div>
</template>