<script setup>
import { Calendar, LogOut, Mail, Settings } from 'lucide-vue-next';
import { ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router';
import EditProfileModal from '../../components/common/EditProfileModal.vue';

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

        <div class="block mt-8 p-6 sm:p-8 border border-[#E0E5EE] w-full rounded-xl">
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
                    class="flex items-center justify-center gap-2 px-6 py-2.5 border border-[#E0E5EE] rounded-xl cursor-pointer hover:bg-[#f2f4f7] transition-all w-full sm:w-auto">
                    <Settings class="w-4 h-4 text-[#6B778F]" />
                    Editar
                </button>
            </div>
        </div>

        <button @click="handleLogout"
            class="flex justify-center items-center gap-2 mt-6 border border-[#E0E5EE] w-full p-3 rounded-xl cursor-pointer hover:bg-[#f2f4f7] transition-all">
            <LogOut class="w-4 h-4 mt-0.5 text-[#DD3C3C]" />
            <span class="text-[#DD3C3C] text-sm font-semibold">Sair da Conta</span>
        </button>
        <EditProfileModal v-model="showEditModal" />
    </div>
</template>