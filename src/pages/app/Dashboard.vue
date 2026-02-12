<script setup>
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/user';
import LessonCard from '../../components/lesson/LessonCard.vue';
import LessonCardSkeleton from '../../components/skeletons/LessonCardSkeleton.vue';
import StatisticsSkeleton from '../../components/skeletons/StatisticsSkeleton.vue';
import { api } from '../../lib/api';
import { BookmarkCheck, BookOpenCheck, Clock, Flame } from 'lucide-vue-next';

const userStore = useUserStore();

const lessons = ref([])
const isLoading = ref(false)

const statistics = ref({
    percent_progress: 0,
    completed_lessons: 0,
    words_saved: 0,
    study_time: 0,
    sequence: 0,
})

const formattedStudyTime = computed(() => {
    const totalSeconds = statistics.value.study_time;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}min`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}min`;
})

onMounted(async () => {
    isLoading.value = true;

    const [lessonsRes, statsRes] = await Promise.all([
        api.get('/lessons', {
            params: {
                only_started: true,
                latest: true,
                per_page: 2,
            }
        }),
        api.get('/statistics'),
    ]);

    lessons.value = lessonsRes.data.data;
    statistics.value = statsRes.data.data;
    isLoading.value = false;
});

const sequenceMessage = computed(() => {
    if (statistics.value.sequence > 1) {
        return `Continue assim! Você está numa sequência de ${statistics.value.sequence} dias.`;
    }
    return 'Estude todos os dias para aumentar sua sequência.';
});

const props = defineProps({
    size: { type: Number, default: 120 },
    stroke: { type: Number, default: 8 }
})

const radius = computed(() => (props.size - props.stroke) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

const dashOffset = computed(() =>
    circumference.value - (statistics.value.percent_progress / 100) * circumference.value
)
</script>

<template>
    <header>
        <h1 class="text-2xl sm:text-3xl font-extrabold">
            Welcome back, <span class="text-[#1D56C9]">{{ userStore.userPreferredName }}</span> 👋
        </h1>
        <p class="mt-2 text-[#6B778F] text-sm sm:text-base">
            {{ sequenceMessage }}
        </p>
    </header>

    <section class="w-full mt-8 rounded-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatisticsSkeleton v-if="isLoading" />

        <template v-else>
        <div class="border border-[#e0e5eea3] rounded-xl flex flex-col justify-center items-center p-6 sm:p-9">
            <div class="flex items-center justify-center" :style="{ width: size + 'px', height: size + 'px' }">
                <svg :width="size" :height="size" class="-rotate-90">
                    <circle :cx="size / 2" :cy="size / 2" :r="radius" :stroke-width="stroke"
                        class="stroke-[#E8EAEE] fill-none" />

                    <circle :cx="size / 2" :cy="size / 2" :r="radius" :stroke-width="stroke"
                        class="stroke-[#1D56C9] fill-none transition-all duration-500" stroke-linecap="round"
                        :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" />
                </svg>

                <div class="absolute text-2xl font-bold text-gray-800">
                    {{ Math.round(statistics.percent_progress) }}%
                </div>
            </div>
            <h4 class="mt-4 text-[#667799]">Progresso Geral</h4>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div class="border border-[#e0e5eea3] rounded-xl px-5 py-3 flex justify-between">
                <div>
                    <span class="text-[#667799] text-sm font-medium">Lições concluídas</span>
                    <h4 class="mt-2.5 font-semibold text-2xl">{{ statistics.completed_lessons }}</h4>
                    <span class="text-xs text-[#667799]">artigos completos</span>
                </div>
                <div class="bg-[#E8EEF9] rounded-xl w-max h-max p-2">
                    <BookOpenCheck class="text-2xl text-[#1D56C9]" />
                </div>
            </div>
            <div class="border border-[#e0e5eea3] rounded-xl px-5 py-3 flex justify-between">
                <div>
                    <span class="text-[#667799] text-sm font-medium">Tempo de estudo</span>
                    <h4 class="mt-2.5 font-semibold text-2xl">{{ formattedStudyTime }}</h4>
                    <span class="text-xs text-[#667799]">de textos e áudios concluídos</span>
                </div>
                <div class="bg-[#E8EEF9] rounded-xl w-max h-max p-2">
                    <Clock class="text-2xl text-[#1D56C9]" />
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div class="border border-[#e0e5eea3] rounded-xl px-5 py-3 flex justify-between">
                <div>
                    <span class="text-[#667799] text-sm font-medium">Palavras salvas</span>
                    <h4 class="mt-2.5 font-semibold text-2xl">{{ statistics.words_saved }}</h4>
                    <span class="text-xs text-[#667799]">palavras no dicionário</span>
                </div>
                <div class="bg-[#E8EEF9] rounded-xl w-max h-max p-2">
                    <BookmarkCheck class="text-2xl text-[#1D56C9]" />
                </div>
            </div>
            <div class="border border-[#eee0e0a0] bg-[#FBEAEA] rounded-xl px-5 py-3 flex justify-between">
                <div>
                    <span class="text-[#996666] text-sm font-medium">Sequência atual</span>
                    <h4 class="mt-2.5 font-semibold text-[#321B1B] text-2xl">{{ statistics.sequence }}</h4>
                    <span class="text-xs text-[#996666]">dias de estudo seguidos</span>
                </div>
                <div class="bg-[#DD3C3C] rounded-xl w-max h-max p-2">
                    <Flame class="text-2xl text-[#FBEAEA]" />
                </div>
            </div>
        </div>
        </template>
    </section>

    <section class="mt-10">
        <h3 class="text-xl font-semibold">Continue Aprendendo</h3>
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <LessonCardSkeleton v-if="isLoading" v-for="n in 2" :key="n" />

            <div v-else-if="lessons.length === 0" class="col-span-full text-center text-gray-400 italic">
                Você ainda não começou nenhuma Lesson.
            </div>

            <LessonCard v-else v-for="lesson in lessons" :key="lesson.id" :lesson="lesson" />

            <router-link to="/library"
                class="min-h-89 flex justify-center items-center text-[#6B778F] border border-[#E0E5EE] rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg">
                Ver todos
            </router-link>
        </div>
    </section>
</template>