<script setup>
import { onMounted, ref } from 'vue';
import LessonCardSkeleton from '../../components/skeletons/LessonCardSkeleton.vue';
import LessonCard from '../../components/common/LessonCard.vue';
import { api } from '../../lib/api';

const lessons = ref([]);
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;

    const { data } = await api.get('/lessons');

    lessons.value = data.data;
    isLoading.value = false;
});
</script>

<template>
    <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold">
            Biblioteca
        </h1>
        <p class="mt-2 text-[#6B778F] text-sm sm:text-base">
            Explore materiais organizados por nível e tema.
        </p>
    </div>

    <div class="flex items-center gap-2.5">
        <div class="block bg-gray-200 w-full h-10 rounded-xl my-8"></div>
        <div class="block bg-gray-200 w-40 h-10 rounded-xl my-8"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <LessonCardSkeleton v-if="isLoading" v-for="n in 6" :key="n" />
        <LessonCard v-else v-for="lesson in lessons" :key="lesson.id" :lesson="lesson" />
    </div>
</template>