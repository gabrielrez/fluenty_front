<script setup>
import { ref } from 'vue';
import { ArrowLeft, Check, Crown, Zap } from 'lucide-vue-next';
import Logo from '../../components/common/Logo.vue';
import { api } from '../../lib/api';

const activeTab = ref('anual');
const loading = ref(false)

const plans = {
    mensal: 'price_1T0PfrCXfRxTkf71d1UcujwE',
    anual: 'price_1T0PgSCXfRxTkf71TjtMxNRA'
}

const checkout = async (type) => {
    try {
        loading.value = true

        const res = await api.post('/subscription/checkout', {
            price_id: plans[type],
            success_url: 'http://127.0.0.1:5173/dashboard?subscribed=true',
            cancel_url: 'http://127.0.0.1:5173/planos'
        })

        window.location.href = res.data.checkout_url
    } catch (err) {
        alert(err.response?.data?.message || 'Erro ao iniciar checkout')
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <header class="fixed top-0 left-0 w-full z-50 p-4 md:p-5 border-b border-[#E0E5EE] bg-white">
        <div
            class="flex justify-between items-center max-w-7xl mx-auto text-[#6B778F] hover:text-[#1D56C9] transition-all">
            <router-link to="/library" class="flex items-center gap-2">
                <ArrowLeft class="w-3 h-3" />
                <span class="font-medium text-sm">Voltar</span>
            </router-link>
            <Logo />
        </div>
    </header>

    <main class="mx-auto mt-28 px-4">
        <h1 class="text-2xl md:text-3xl text-center font-bold">Escolha seu plano</h1>

        <p class="mt-4 text-center text-[#6B778F] text-sm md:text-base">
            Invista no seu inglês com um plano que cabe no seu bolso. Cancele quando quiser.
        </p>

        <div class="mt-8 flex md:hidden mx-auto max-w-md bg-[#F1F3F7] rounded-xl p-1">
            <button @click="activeTab = 'anual'"
                :class="activeTab === 'anual' ? 'bg-white shadow text-[#1D56C9] font-bold' : 'text-[#6B778F]'"
                class="flex-1 py-2.5 text-sm rounded-lg transition-all cursor-pointer">
                Plano Anual
            </button>
            <button @click="activeTab = 'mensal'"
                :class="activeTab === 'mensal' ? 'bg-white shadow text-[#1D56C9] font-bold' : 'text-[#6B778F]'"
                class="flex-1 py-2.5 text-sm rounded-lg transition-all cursor-pointer">
                Plano Mensal
            </button>
        </div>

        <div class="mt-8 md:mt-12 mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 justify-center gap-6 md:gap-8">
            <div :class="{ 'hidden md:flex': activeTab !== 'mensal' }"
                class="border border-[#E0E5EE] rounded-xl p-6 flex flex-col items-center shadow-lg order-2 md:order-1">
                <div class="w-max rounded-xl bg-[#DDE6F6] p-3">
                    <Zap class="w-10 h-10 text-[#1D56C9]" />
                </div>

                <h3 class="mt-4 font-bold text-xl">Plano Mensal</h3>
                <p class="text-[#6B778F] text-sm">Flexibilidade total</p>

                <div class="mt-5 flex items-end">
                    <h2 class="text-3xl md:text-4xl font-bold">R$ 37,90</h2>
                    <span class="text-[#6B778F]">/mês</span>
                </div>

                <ul class="mt-8 self-start flex flex-col gap-3 text-sm md:text-base">
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        +100 Materiais disponíveis
                    </li>
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        3 níveis de dificuldade
                    </li>
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        +10k palavras novas no seu vocabulário
                    </li>
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        Áudios autênticos para praticas esculta
                    </li>
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        Acesso completo
                    </li>
                </ul>

                <button @click="checkout('mensal')" :disabled="loading"
                    class="mt-8 w-full border border-[#E0E5EE] rounded-xl font-bold text-sm p-3 cursor-pointer hover:bg-[#E0E5EE] transition-all">
                    {{ loading ? 'Processando...' : 'Assinar Mensal' }}
                </button>
            </div>

            <div :class="{ 'hidden md:flex': activeTab !== 'anual' }"
                class="relative border border-[#1D56C9] rounded-xl p-6 flex flex-col items-center shadow-lg order-1 md:order-2">
                <div
                    class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1D56C9] text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                    Economia de 15%
                </div>

                <div class="w-max rounded-xl bg-[#1D56C9] p-3">
                    <Crown class="w-10 h-10 text-white" />
                </div>

                <h3 class="mt-4 font-bold text-xl">Plano Anual</h3>
                <p class="text-[#6B778F] text-sm">Melhor custo-benefício</p>

                <div class="mt-5 flex items-end">
                    <h2 class="text-3xl md:text-4xl font-bold">R$ 397,90</h2>
                    <span class="text-[#6B778F]">/ano</span>
                </div>

                <span class="mt-2 text-[#6B778F] text-sm">Equivale a R$ 33,16/mês</span>

                <ul class="mt-8 self-start flex flex-col gap-3 text-sm md:text-base">
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        +100 Materiais disponíveis
                    </li>
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        3 níveis de dificuldade
                    </li>
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        +10k palavras novas no seu vocabulário
                    </li>
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        Áudios autênticos para praticas esculta
                    </li>
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        Acesso completo
                    </li>
                    <li class="flex items-center gap-1">
                        <Check class="w-5 h-5 text-[#39AC86]" />
                        Csusto-benefício
                    </li>
                </ul>

                <button @click="checkout('anual')" :disabled="loading"
                    class="mt-8 w-full rounded-xl font-bold text-sm p-3 cursor-pointer text-white bg-[#1D56C9] hover:bg-[#1047b5] transition-all">
                    {{ loading ? 'Processando...' : 'Assinar Anual' }}
                </button>
            </div>
        </div>
    </main>

    <footer
        class="mt-20 mb-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-0 px-4 justify-between items-center">
        <Logo />
        <span class="text-sm text-[#6B778F] text-center md:text-right">
            © 2026 Fluenty. Aprenda inglês com leitura e escuta.
        </span>
    </footer>
</template>
