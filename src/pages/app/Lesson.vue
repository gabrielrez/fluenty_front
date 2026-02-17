<script setup>
import confetti from 'canvas-confetti'
import { ArrowLeft, HeadphonesIcon } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../../lib/api'
import AudioPlayer from '../../components/lesson/AudioPlayer.vue'
import TranslationToolbar from '../../components/lesson/TranslationToolbar.vue'
import LessonText from '../../components/lesson/LessonText.vue'
import LessonSkeleton from '../../components/skeletons/LessonSkeleton.vue'

const route = useRoute()
const lessonId = route.params.id

const completeButtonRef = ref(null)

const isLoading = ref(false)
const isTranslated = ref(false)
const isTogglingComplete = ref(false)

const lesson = ref(null)
const isCompleted = ref(false)

const formatDuration = (seconds) => Math.ceil(seconds / 60)

const levelConfig = (level) => ({
    beginner: { label: 'Básico', bg: '#E2F3ED', color: '#39AC86' },
    intermediate: { label: 'Intermediário', bg: '#FEF1DA', color: '#F59F0A' },
    advanced: { label: 'Avançado', bg: '#FAE2E2', color: '#DD3C3C' },
}[level] ?? { label: level, bg: '#E8EAEE', color: '#667799' })

const isWhitespace = (t) => /^\s+$/.test(t)

const normalizeWord = (word) =>
    word
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z]/g, '')
        .trim()

const handleWordClick = (word) => {
    const clean = normalizeWord(word)
    if (clean) saveWord(clean)
}

const fetchLesson = async () => {
    isLoading.value = true
    const { data } = await api.get(`/lessons/${lessonId}`)
    console.log(data.data)
    lesson.value = data.data
    isCompleted.value = lesson.value.status === 'completed'
    isLoading.value = false
}

const startLesson = async () => {
    await api.post(`/lessons/${lessonId}/start`)
}

const toggleCompleteLesson = async () => {
    isTogglingComplete.value = true
    const { data } = await api.post(`/lessons/${lessonId}/toggle-complete`)

    const wasCompleted = isCompleted.value
    isCompleted.value = data.completed
    lesson.value.status = data.status

    if (!wasCompleted && data.completed) {
        const rect = completeButtonRef.value.getBoundingClientRect()
        confetti({
            particleCount: 120,
            spread: 360,
            startVelocity: 35,
            origin: {
                x: (rect.left + rect.width / 2) / window.innerWidth,
                y: (rect.top + rect.height / 2) / window.innerHeight,
            },
        })
    }

    isTogglingComplete.value = false
}

const paragraphPairs = computed(() => {
    if (!lesson.value) return []

    const originals = lesson.value.text
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean)

    const translations = lesson.value.translation
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean)

    return originals.map((original, index) => ({
        original,
        translation: translations[index] || '',
    }))
})

onMounted(async () => {
    await fetchLesson()
    await startLesson()
})
</script>

<template>
    <div class="xl:px-32">
        <LessonSkeleton v-if="isLoading" />

        <div v-else-if="lesson">
            <router-link to="/library" class="text-sm text-[#6B778F] hover:underline">
                <ArrowLeft class="inline w-4 h-4 ml-1" />
                Voltar à biblioteca
            </router-link>

            <div class="mt-8 flex gap-2 items-center">
                <span class="text-xs px-2.5 py-1 rounded-full" :style="levelConfig(lesson.level)">
                    {{ levelConfig(lesson.level).label }}
                </span>

                <span class="text-xs bg-[#E8EAEE] text-[#667799] px-2.5 py-1 rounded-full">
                    {{ lesson.category.name }}
                </span>

                <div class="flex items-center gap-1 ml-3 text-[#6B778F] text-xs">
                    <HeadphonesIcon class="w-4 h-4" />
                    {{ formatDuration(lesson.duration) }} min
                </div>
            </div>

            <h1 class="mt-5 text-4xl font-extrabold">
                {{ lesson.title }}
            </h1>

            <img class="mt-8 w-full h-40 sm:h-80 rounded-xl object-cover" :src="lesson.image_url" />

            <AudioPlayer :lesson="lesson" />

            <TranslationToolbar :isTranslated="isTranslated" @toggle="isTranslated = !isTranslated" />

            <LessonText :paragraphPairs="paragraphPairs" :isTranslated="isTranslated" :isWhitespace="isWhitespace"
                :lessonId="lessonId" />

            <button ref="completeButtonRef" @click="toggleCompleteLesson"
                class="block mx-auto mt-12 px-6 py-3 rounded-xl text-white font-semibold cursor-pointer hover:scale-95 transition-all"
                :class="isCompleted
                    ? 'bg-[#39AC86]'
                    : 'bg-[#1D56C9]'">
                {{ isCompleted ? 'Lição concluída' : 'Marcar como concluída' }}
            </button>
        </div>
    </div>
</template>
