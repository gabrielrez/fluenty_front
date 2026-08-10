<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    to: {
        type: String,
        required: true,
    },
    icon: {
        required: true,
    },
});
</script>

<template>
    <RouterLink :to="to" v-slot="{ isActive }">
        <div class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" :class="isActive
            ? 'bg-[#243B6B] text-white'
            : 'bg-[#142952] text-[#6B778F] hover:bg-[#243B6B] hover:text-white'">
            <component :is="icon" class="w-4 h-4 text-current" />
            <slot />
        </div>
    </RouterLink>
</template>