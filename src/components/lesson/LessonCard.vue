<script setup>
import { BadgeCheck, HeadphonesIcon } from 'lucide-vue-next';

defineProps({
    lesson: {
        type: Object,
        required: true,
    },
});

const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formattedSecs = String(secs).padStart(2, '0');

    if (mins === 0) {
        return `${secs}s`;
    }

    return `${mins} min e ${formattedSecs}s`;
};

const levelConfig = (level) => {
    const map = {
        beginner: {
            label: 'Básico',
            bg: '#E2F3ED',
            color: '#39AC86',
        },
        intermediate: {
            label: 'Intermediário',
            bg: '#FEF1DA',
            color: '#F59F0A',
        },
        advanced: {
            label: 'Avançado',
            bg: '#FAE2E2',
            color: '#DD3C3C',
        },
    };

    return map[level] ?? {
        label: level,
        bg: '#E8EAEE',
        color: '#667799',
    };
};

const statusConfig = (status) => {
    const map = {
        completed: {
            label: 'Concluído',
            color: '#39AC86',
        },
        not_started: {
            label: 'Não iniciado',
            color: '#6B778F',
        },
        in_progress: {
            label: 'Em progresso',
            color: '#1D56C9',
        },
    };

    return map[status] ?? {
        label: status,
        color: '#6B778F',
    };
};
</script>

<template>
    <router-link :to="`/lesson/${lesson.id}`"
        class="border border-[#E0E5EE] rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg">

        <div class="relative">
            <img class="w-full h-40 object-cover" :src="lesson.image_url" :alt="lesson.title" />

            <span v-if="!lesson.is_free"
                class="absolute top-3 left-3 bg-[#1D56C9] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xl flex items-center gap-1">
                <BadgeCheck class="w-4 h-4" />
                Premium
            </span>
        </div>

        <div class="p-5">
            <div class="flex gap-2 items-center">
                <span class="text-xs px-2.5 py-1 rounded-full" :style="{
                    backgroundColor: levelConfig(lesson.level).bg,
                    color: levelConfig(lesson.level).color,
                }">
                    {{ levelConfig(lesson.level).label }}
                </span>

                <span class="text-xs text-[#667799] px-2.5 py-1 bg-[#E8EAEE] rounded-full capitalize">
                    {{ lesson.source }}
                </span>
            </div>

            <h4 class="mt-3 font-semibold">
                {{ lesson.title }}
            </h4>

            <p class="mt-2 text-[#6B778F] text-sm line-clamp-2">
                {{ lesson.text.length > 84 ? lesson.text.slice(0, 84) + '...' : lesson.text }}
            </p>

            <span class="block w-full h-px bg-[#E0E5EE] opacity-50 my-4"></span>

            <div class="flex justify-between items-center">
                <div class="flex gap-1 items-center">
                    <HeadphonesIcon class="w-3.5 h-3.5 text-[#6B778F]" />
                    <span class="text-[#6B778F] text-xs">
                        {{ formatDuration(lesson.duration) }}
                    </span>
                </div>

                <span class="font-semibold text-xs" :style="{ color: statusConfig(lesson.status).color }">
                    {{ statusConfig(lesson.status).label || 'Não iniciado' }}
                </span>
            </div>
        </div>
    </router-link>
</template>
