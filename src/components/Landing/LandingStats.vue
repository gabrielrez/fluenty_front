<template>
    <section class="p-5 mt-16 bg-[#F4F5F7] border border-[#E0E5EE]">
        <div class="max-w-7xl mx-auto grid md:grid-cols-4 grid-cols-2 sm:gap-6 gap-3 py-12">
            <div class="flex flex-col items-center gap-3 bg-white border border-[#E0E5EE] rounded-xl p-5"
                v-for="stat in stats" :key="stat.label">
                <div class="w-max bg-[#DDE6F6] p-2 rounded-xl">
                    <component :is="stat.icon" class="w-5 h-5 text-[#1D56C9]" />
                </div>
                <div class="text-center">
                    <h3 :class="stat.value === '∞' ? 'font-sans' : ''" class="text-2xl font-bold">{{ stat.value }}</h3>
                    <span class="text-[#6B778F] text-sm">{{ stat.label }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { BookOpenCheckIcon, ChartColumn, Sparkles, HeadphonesIcon } from 'lucide-vue-next';

const stats = [
    { icon: BookOpenCheckIcon, value: '+500', label: 'Textos disponíveis' },
    { icon: ChartColumn, value: '3', label: 'Níveis de dificuldade' },
    { icon: Sparkles, value: '10k+', label: 'Palavras no vocabulário' },
    { icon: HeadphonesIcon, value: '∞', label: 'Horas de áudio' }
];
</script>
