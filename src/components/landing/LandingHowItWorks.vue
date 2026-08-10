<template>
    <section class="bg-[#F4F5F7] border border-[#E0E5EE]">
        <div class="p-5 max-w-7xl mx-auto my-16">
            <h1 class="text-3xl font-bold">Como funciona?</h1>
            <p class="text-[#6B778F] mt-4">Um método simples e eficaz em 4 passos.</p>
    
            <div class="mt-8 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
                <div v-for="(step, index) in steps" :key="index"
                    class="bg-white border border-[#E0E5EE] rounded-xl p-6 shadow-md hover:border-[#D2DDF4] hover:shadow-xl transition-all">
                    <span class="text-4xl font-semibold text-[#D2DDF4]">{{ String(index + 1).padStart(2, '0') }}</span>
                    <h3 class="mt-4 text-lg font-semibold">{{ step.title }}</h3>
                    <p class="mt-2 text-sm text-[#6B778F]">{{ step.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const steps = [
    { title: 'Escolha seu nível', description: 'Iniciante, intermediário ou avançado, conteúdos adaptados para você.' },
    { title: 'Leia e ouça', description: 'Textos com áudio sincronizado para desenvolver leitura e escuta juntas.' },
    { title: 'Salve palavras', description: 'Construa seu vocabulário clicando nas palavras importantes.' },
    { title: 'Acompanhe o progresso', description: 'Veja sua evolução real e mantenha a motivação em alta.' }
];
</script>
