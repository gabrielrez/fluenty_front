<script setup>
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router';
import Logo from '../Logo.vue';
import SidebarLink from './SidebarLink.vue';

import {
    Book,
    LayoutDashboard,
    Library,
    LogOut,
    TrendingUp,
    User,
    X,
} from 'lucide-vue-next';

defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['close']);

const userStore = useUserStore();
const router = useRouter();

async function handleLogout() {
    await userStore.logout();
    router.push('/login');
}
</script>

<template>
    <div v-if="open" class="fixed inset-0 z-40 bg-black/40 lg:hidden" @click="emit('close')" />

    <aside class="fixed z-50 lg:static top-0 left-0 h-screen w-64
         bg-[#142952] text-white flex flex-col px-2 py-4
         overflow-hidden
         transform transition-transform duration-300
         lg:translate-x-0" :class="open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
        <div class="flex items-center justify-between px-2 lg:hidden">
            <Logo variant="white" to="/home" />
            <button @click="emit('close')">
                <X class="w-5 h-5" />
            </button>
        </div>

        <Logo class="px-2 hidden lg:block" variant="white" to="/home" />

        <nav class="mt-10 flex flex-1 flex-col gap-2">
            <SidebarLink to="/home" :icon="LayoutDashboard">
                Dashboard
            </SidebarLink>

            <SidebarLink to="/library" :icon="Library">
                Biblioteca
            </SidebarLink>

            <SidebarLink to="/dictionary" :icon="Book">
                Dicionário
            </SidebarLink>

            <SidebarLink to="/progress" :icon="TrendingUp">
                Progresso
            </SidebarLink>

            <SidebarLink to="/profile" :icon="User">
                Perfil
            </SidebarLink>
        </nav>

        <button @click="handleLogout" class="flex items-center gap-2 px-2 py-2 mb-2 rounded-xl transition-colors cursor-pointer
                   text-white hover:bg-[#DD3C3C]">
            <LogOut class="w-4 h-4 text-current" />
            Sair
        </button>
    </aside>
</template>
