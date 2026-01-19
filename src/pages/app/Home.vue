<script setup>
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

async function handleLogout() {
    await userStore.logout();
    router.push('/login');
}
</script>

<template>
    <div class="p-5">
        <h1 class="text-xl font-bold">
            Bem-vindo, {{ userStore.userPreferredName }}!
        </h1>

        <button @click="handleLogout" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Sair
        </button>
    </div>
</template>