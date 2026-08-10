<script setup>
import { Calendar, CreditCard, LogOut, Mail, Settings } from 'lucide-vue-next';
import { ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router';
import EditProfileModal from '../../components/common/EditProfileModal.vue';
import { api } from '../../lib/api';

const router = useRouter();
const userStore = useUserStore();
const showEditModal = ref(false);

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

async function handleLogout() {
    await userStore.logout();
    router.push('/login');
}

async function manageSubscription() {
    const {data} = await api.post(`/subscription/billing-portal`, {
        return_url: 'http://127.0.0.1:5173/profile'
    })

    window.location.href = data.billing_portal_url
}
</script>

<template>
    <div class="px-4 sm:px-8 lg:px-32">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold">
                Perfil
            </h1>
            <p class="mt-2 text-[#6B778F] text-sm sm:text-base">
                Gerencie as configurações da sua conta.
            </p>
        </div>

        <div class="block mt-8 p-6 sm:p-8 border border-[#E0E5EE] w-full rounded-lg">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 sm:gap-0">
                <div>
                    <h2 class="font-semibold text-2xl break-words">{{ userStore.userName }}</h2>
                    <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2">
                        <div class="flex items-center gap-1 mt-2 sm:mt-0">
                            <Mail class="w-4 h-4 text-[#6B778F]" />
                            <p class="text-[#6B778F] text-sm break-words">{{ userStore.userEmail }}</p>
                        </div>
                        <div class="flex items-center gap-1 mt-2 sm:mt-0">
                            <Calendar class="w-4 h-4 text-[#6B778F]" />
                            <p class="text-[#6B778F] text-sm">desde {{ formatDate(userStore.userCreatedAt) }}</p>
                        </div>
                    </div>
                </div>

                <button @click="showEditModal = true"
                    class="flex items-center justify-center gap-2 px-6 py-2.5 border border-[#E0E5EE] rounded-lg cursor-pointer hover:bg-[#f2f4f7] transition-all w-full sm:w-auto">
                    <Settings class="w-4 h-4 text-[#6B778F]" />
                    Editar
                </button>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
            <button @click="manageSubscription"
                class="flex justify-center items-center gap-2 mt-6 border border-[#E0E5EE] w-full p-3 rounded-lg cursor-pointer hover:bg-[#f2f4f7] transition-all">
                <CreditCard class="w-4 h-4 mt-0.5 text-[#243B6B]" />
                <span class="text-[#243B6B] text-sm font-semibold">Gerenciar assinatura</span>
            </button>

            <button @click="handleLogout"
                class="flex justify-center items-center gap-2 mt-6 border border-[#E0E5EE] w-full p-3 rounded-lg cursor-pointer hover:bg-[#f2f4f7] transition-all">
                <LogOut class="w-4 h-4 mt-0.5 text-[#DD3C3C]" />
                <span class="text-[#DD3C3C] text-sm font-semibold">Sair da Conta</span>
            </button>
        </div>

        <EditProfileModal v-model="showEditModal" />
    </div>
</template>