<script setup lang="ts">
import { useRouter } from 'vue-router';
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

const router = useRouter();
const userStore = useUserStore();

async function handleLogout() {
    await userStore.logout();
    router.push('/login');
}

</script>

<template>
    <aside class="bg-[#142952] w-64 sticky top-0 h-screen px-2 py-4">
        <div class="px-2">
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
                class="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors cursor-pointer text-[#6B778F] hover:bg-[#DD3C3C] hover:text-white">
                <LogOut class="w-4 h-4 text-current" />
                Sair
            </button>
        </nav>
    </aside>
</template>