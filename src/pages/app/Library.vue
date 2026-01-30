<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import LessonCardSkeleton from '../../components/skeletons/LessonCardSkeleton.vue';
import LessonCard from '../../components/common/LessonCard.vue';
import { api } from '../../lib/api';

const lessons = ref([]);
const categories = ref([]);
const isLoading = ref(false);

const filters = reactive({
    search: '',
    level: '',
    category: '',
});

const fetchLessons = async () => {
    isLoading.value = true;

    const { data } = await api.get('/lessons', {
        params: {
            search: filters.search || undefined,
            level: filters.level || undefined,
            category: filters.category || undefined,
        },
    });

    lessons.value = data.data;
    isLoading.value = false;
};

const fetchCategories = async () => {
    const { data } = await api.get('/categories');
    categories.value = data.data;
};

onMounted(async () => {
    await Promise.all([
        fetchLessons(),
        fetchCategories(),
    ]);
});

let searchTimeout = null;

watch(
    () => filters.search,
    () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(fetchLessons, 400);
    }
);

watch(
    () => [filters.level, filters.category],
    fetchLessons
);
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

    <div class="flex flex-col sm:flex-row items-center gap-2.5">
        <input v-model="filters.search" type="text" placeholder="Pesquisar..."
            class="pl-4 text-sm border border-[#E0E5EE] h-10 rounded-xl my-8 w-full sm:flex-3" />

        <select v-model="filters.level" class="text-sm border border-[#E0E5EE] h-10 rounded-xl px-3 w-full sm:flex-1">
            <option value="">Todos os níveis</option>
            <option value="beginner">Básico</option>
            <option value="intermediate">Intermediário</option>
            <option value="advanced">Avançado</option>
        </select>

        <select v-model="filters.category"
            class="text-sm border border-[#E0E5EE] h-10 rounded-xl px-3 w-full sm:flex-1">
            <option value="">Todas categorias</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
            </option>
        </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 sm:mt-0">
        <LessonCardSkeleton v-if="isLoading" v-for="n in 6" :key="n" />
        <LessonCard v-else v-for="lesson in lessons" :key="lesson.id" :lesson="lesson" />
    </div>
</template>