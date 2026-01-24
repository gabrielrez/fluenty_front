<script setup>
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/user';
import LessonCard from '../../components/common/LessonCard.vue';
import LessonCardSkeleton from '../../components/skeletons/LessonCardSkeleton.vue';
import { api } from '../../lib/api';

const userStore = useUserStore();

const lessons = ref([])
const isLoading = ref(false)

onMounted(async () => {
    isLoading.value = true;

    const { data } = await api.get('/lessons', {
        params: {
            only_started: true,
            per_page: 2,
        }
    });

    lessons.value = data.data;
    isLoading.value = false;
});

const sequenceMessage = computed(() => {
    if (userStore.userSequence > 1) {
        return `Continue assim! Você está numa sequência de ${userStore.userSequence} dias.`;
    }
    return 'Estude todos os dias para aumentar sua sequência.';
});
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

    <section class="bg-gray-200 w-full h-64 mt-8 rounded-xl flex justify-center items-center">
        <h4 class="text-gray-500 italic">Coming soon...</h4>
    </section>

    <section class="mt-10">
        <h3 class="text-xl font-semibold">Continue Aprendendo</h3>
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <LessonCardSkeleton v-if="isLoading" v-for="n in 2" :key="n" />
            
            <div v-else-if="lessons.length === 0" class="col-span-full text-center text-gray-400 italic">
                Você ainda não começou nenhuma Lesson.
            </div>

            <LessonCard v-else v-for="lesson in lessons" :key="lesson.id" :lesson="lesson" />
        </div>
    </section>
</template>