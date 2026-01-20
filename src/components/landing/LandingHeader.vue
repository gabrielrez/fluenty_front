<template>
    <header class="p-5 border-b border-[#E0E5EE]">
        <div class="flex justify-between items-center max-w-7xl mx-auto">
            <Logo />
            <div class="flex items-center gap-2 sm:gap-4">
                <router-link to="/dashboard"
                    class="px-4 py-2 text-sm sm:text-base font-medium border border-[#E0E5EE] rounded-xl hover:bg-[#f5f6f7] transition-all">Entrar</router-link>
                <router-link to="/dashboard"
                    class="bg-[#1D56C9] px-4 py-2 rounded-xl text-sm sm:text-base text-white font-medium cursor-pointer hover:bg-[#1A4FB8] transition-all">Começar
                    Agora</router-link>
            </div>
        </div>
    </header>
</template>

<script setup>
import Logo from '../common/Logo.vue'
</script>
