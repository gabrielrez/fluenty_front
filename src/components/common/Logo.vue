<script setup>
import { computed } from 'vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'black'
    },
    to: {
        type: String,
        default: '/'
    }
});

const logoSrc = computed(() => {
    return props.variant === 'white'
        ? '/images/icons/logo-white.svg'
        : '/images/icons/logo-black.svg';
});
</script>

<template>
    <router-link :to="to">
        <img :src="logoSrc" alt="Fluenty Logo" />
    </router-link>
</template>