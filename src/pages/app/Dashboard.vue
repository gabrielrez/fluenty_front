<script setup>
import { computed } from 'vue';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();

const sequenceMessage = computed(() => {
    if (userStore.userSequence > 1) {
        return `Continue assim! Você está numa sequência de ${userStore.userSequence} dias.`;
    }
    return 'Estude todos os dias para aumentar sua sequência.';
});
</script>

<template>
    <div>
        <h1 class="text-3xl font-extrabold">
            Welcome back, <span class="text-[#1D56C9]">{{ userStore.userPreferredName }}</span> 👋
        </h1>
        <p class="mt-2 text-[#6B778F]">
            {{ sequenceMessage }}
        </p>
    </div>
</template>