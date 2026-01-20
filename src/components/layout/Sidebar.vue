<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineProps, defineEmits } from 'vue';
import Logo from '../common/Logo.vue';
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
import { useUserStore } from '../../stores/user';

defineProps<{
    open: boolean;
}>();

const emit = defineEmits(['close']);

const router = useRouter();
const userStore = useUserStore();

async function handleLogout() {
    await userStore.logout();
    router.push('/login');
}
</script>

<template>
    <div v-if="open" @click="emit('close')" class="fixed inset-0 bg-black/40 z-40 md:hidden" />

    <aside class="
            fixed md:static top-0 left-0 z-50
            h-screen w-64
            bg-[#142952]
            px-2 py-4
            transform transition-transform duration-300
            md:translate-x-0
        " :class="open ? 'translate-x-0' : '-translate-x-full'">
        <div class="flex items-center justify-between px-2 md:hidden">
            <Logo variant="white" to="/dashboard" />
            <button @click="emit('close')">
                <X class="w-6 h-6 text-white" />
            </button>
        </div>

        <div class="px-2 hidden md:block">
            <Logo variant="white" to="/dashboard" />
        </div>

        <nav class="mt-10 flex flex-1 flex-col gap-2">
            <SidebarLink to="/dashboard" :icon="LayoutDashboard">
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

            <button @click="handleLogout"
                class="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-[#6B778F] hover:bg-[#DD3C3C] hover:text-white">
                <LogOut class="w-4 h-4 text-current" />
                Sair
            </button>
        </nav>
    </aside>
</template>
