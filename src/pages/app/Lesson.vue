<script setup>
import { ArrowLeft, HeadphonesIcon } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../../lib/api'

const route = useRoute()
const isLoading = ref(false)
const lesson = ref(null)

const lessonId = route.params.id

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

const formatDuration = (seconds) => Math.ceil(seconds / 60);

const fetchLesson = async () => {
    isLoading.value = true
    const { data } = await api.get(`/lessons/${lessonId}`)

    lesson.value = data.data
    isLoading.value = false
}

onMounted(async () => {
    await fetchLesson()
})
</script>


<template>
    <div class="lg:px-32">
        <div v-if="isLoading" class="flex items-center justify-center h-screen">
            Carregando...
        </div>

        <div v-else-if="lesson">
            <router-link to="/library" class="text-[#6B778F] text-sm hover:underline">
                <ArrowLeft class="inline-block w-4 h-4 ml-1" />
                Voltar à biblioteca
            </router-link>

            <div class="mt-8 flex justify-center sm:justify-start items-center gap-2">
                <span class="text-xs px-2.5 py-1 rounded-full" :style="{
                    backgroundColor: levelConfig(lesson.level).bg,
                    color: levelConfig(lesson.level).color,
                }">
                    {{ levelConfig(lesson.level).label }}
                </span>
                <span class="text-xs text-[#667799] px-2.5 py-1 bg-[#E8EAEE] rounded-full capitalize">
                    {{ lesson.category.name }}
                </span>
                <div class="flex gap-1 items-center ml-3">
                    <HeadphonesIcon class="w-3.5 h-3.5 text-[#6B778F]" />
                    <span class="text-[#6B778F] text-xs">
                        {{ formatDuration(lesson.duration) }} min
                    </span>
                </div>
            </div>

            <h1 class="mt-5 text-center sm:text-left text-2xl sm:text-4xl font-extrabold">
                {{ lesson.title }}
            </h1>

            <img class="mt-5 sm:mt-8 w-full h-20 sm:h-40 md:h-80 rounded-xl object-cover" :src="lesson.image_url"
                :alt="lesson.title" />

            <div class="mt-6 rounded-xl h-20 border border-[#E0E5EE] shadow-sm"></div>

            <div class="mt-6 rounded-xl h-17 border border-[#E0E5EE]"></div>

            <div class="mt-6 rounded-xl h-100 bg-[#F6F7F8] border border-[#E0E5EE]"></div>

            <button class="block mx-auto mt-12 bg-[#1D56C9] hover:bg-[#3367CE] px-6 py-2.5 rounded-xl text-white cursor-pointer transition-all">Marcar como concluída</button>
        </div>
    </div>
</template>