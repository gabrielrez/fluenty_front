<template>
    <section :class="[
        'px-5 py-16',
        variant === 'primary' ? 'bg-[radial-gradient(circle_at_center,#1D56C9_0%,#124AB9_70%)] text-white' : 'bg-[#F4F5F7] border border-[#E0E5EE]'
    ]">
        <div class="flex flex-col justify-center items-center">
            <div v-if="showUsersIcon" class="flex gap-2 items-center mb-4">
                <UsersIcon class="w-6 h-6" :class="variant === 'primary' ? 'text-white' : 'text-[#1D56C9]'" />
                <p class="text-center">{{ subtitle }}</p>
            </div>
            <h2 class="text-3xl font-extrabold text-center" :class="{ 'mt-4': !showUsersIcon }">{{ title }}</h2>
            <p v-if="description" class="text-[#6B778F] mt-6 text-center max-w-2xl">{{ description }}</p>
            <router-link to="/"
                :class="[
                    'mx-auto lg:mx-0 mt-6 w-max flex items-center gap-2 px-8 py-3 rounded-xl font-medium hover:scale-[98%] transition-all',
                    variant === 'primary' ? 'bg-white text-[#1B2232]' : 'bg-[#1D56C9] text-white'
                ]">
                {{ buttonText }}
                <ArrowRightIcon class="w-4 h-4" />
            </router-link>
        </div>
    </section>
</template>

<script setup>
import { ArrowRightIcon, UsersIcon } from 'lucide-vue-next';

defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    buttonText: { type: String, default: 'Começar a Aprender' },
    variant: { type: String, default: 'primary' }, // 'primary' or 'secondary'
    showUsersIcon: { type: Boolean, default: false }
});
</script>
