<template>
    <section class="p-5 max-w-7xl mx-auto my-16">
        <h1 class="text-3xl font-bold">Depoimentos</h1>
        <p class="text-[#6B778F] mt-4">O que nossos alunos dizem sobre o Fluenty.</p>
        <div class="mt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            <div v-for="testimonial in testimonials" :key="testimonial.name"
                class="bg-white border border-[#E0E5EE] rounded-lg p-6 hover:shadow-lg transition-all">
                <img src="/images/5stars.svg" alt="5 stars">
                <p class="my-4 text-sm text-[#1B2232] border-b border-[#E0E5EE] pb-4">"{{ testimonial.text }}"</p>
                <div class="flex items-center gap-2">
                    <div class="bg-[#1D56C9] text-white w-10 h-10 rounded-full flex justify-center items-center">
                        <h4 class="text-xs font-bold">{{ testimonial.initials }}</h4>
                    </div>
                    <div class="flex flex-col">
                        <h4 class="text-sm font-medium">{{ testimonial.name }}</h4>
                        <p class="text-xs text-[#6B778F]">{{ testimonial.role }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const testimonials = [
    {
        initials: 'MS',
        name: 'Mariana Silva',
        role: 'Estudante de Medicina',
        text: 'Em 3 meses, passei de mal conseguir ler um artigo para consumir conteúdo em inglês diariamente.'
    },
    {
        initials: 'CE',
        name: 'Carlos Eduardo',
        role: 'Desenvolvedor de Software',
        text: 'O que mais me impressionou foi a qualidade dos textos e áudios. Finalmente entendo inglês falado!'
    },
    {
        initials: 'AB',
        name: 'Ana Beatriz',
        role: 'Empreendedora',
        text: 'Estudar no meu ritmo, focando em leitura e escuta, foi exatamente o que eu precisava.'
    }
];
</script>
