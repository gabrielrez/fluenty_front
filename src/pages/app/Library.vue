<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import LessonCardSkeleton from '../../components/skeletons/LessonCardSkeleton.vue'
import LessonCard from '../../components/lesson/LessonCard.vue'
import { api } from '../../lib/api'
import { Filter, X } from 'lucide-vue-next'

const lessons = ref([])
const categories = ref([])
const isLoading = ref(false)
const showFilters = ref(false)

const pagination = reactive({
    currentPage: 1,
    lastPage: 1,
    total: 0,
})

const goToPage = (page) => {
    if (page < 1 || page > pagination.lastPage) return
    pagination.currentPage = page
    scrollToTop()
    fetchLessons(page)
}

const nextPage = () => goToPage(pagination.currentPage + 1)
const prevPage = () => goToPage(pagination.currentPage - 1)

const itemsCounter = computed(() => {
    return `${lessons.value.length} de ${pagination.total}`
})

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

const filters = reactive({
    search: '',
    level: '',
    category: '',
    status: '',
    notStarted: false,
});

const hasActiveFilters = computed(() => {
    return (
        !!filters.level ||
        !!filters.category ||
        !!filters.status ||
        filters.notStarted
    );
});

const activeFiltersCount = computed(() => {
    let count = 0
    if (filters.level) count++
    if (filters.category) count++
    if (filters.status) count++
    if (filters.notStarted) count++
    return count
});

const clearFilters = () => {
    filters.level = ''
    filters.category = ''
    filters.status = ''
    filters.notStarted = false
}

const levels = [
    { label: 'Básico', value: 'beginner' },
    { label: 'Intermediário', value: 'intermediate' },
    { label: 'Avançado', value: 'advanced' },
]

const fetchLessons = async (page = pagination.currentPage) => {
    isLoading.value = true
    const { data } = await api.get('/lessons', {
        params: {
            page,
            search: filters.search || undefined,
            level: filters.level || undefined,
            category: filters.category || undefined,
            status: filters.notStarted ? undefined : filters.status || undefined,
            not_started: filters.notStarted ? true : undefined,
        },
    })
    lessons.value = data.data

    pagination.currentPage = data.meta.current_page
    pagination.lastPage = data.meta.last_page
    pagination.total = data.meta.total

    isLoading.value = false
}

const fetchCategories = async () => {
    const { data } = await api.get('/categories')
    categories.value = data.data
}

const toggleLevel = (value) => {
    filters.level = filters.level === value ? '' : value
}

const toggleCategory = (id) => {
    filters.category = filters.category === id ? '' : id
}

const toggleStatus = (value) => {
    filters.notStarted = false
    filters.status = filters.status === value ? '' : value
}

const toggleNotStarted = () => {
    filters.status = ''
    filters.notStarted = !filters.notStarted
}

onMounted(async () => {
    await Promise.all([fetchLessons(), fetchCategories()])
})

let searchTimeout = null

watch(
    () => filters.search,
    () => {
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => {
            pagination.currentPage = 1
            fetchLessons(1)
        }, 400)
    }
)

watch(
    () => [filters.level, filters.category, filters.status, filters.notStarted],
    () => {
        pagination.currentPage = 1
        fetchLessons(1)
    }
)
</script>

<template>
    <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold">Biblioteca</h1>
        <p class="mt-2 text-[#6B778F] text-sm sm:text-base">
            Explore materiais organizados por nível e tema.
        </p>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center gap-3 my-8">
        <input v-model="filters.search" type="text" placeholder="Pesquisar..."
            class="pl-4 text-sm border border-[#E0E5EE] h-10 rounded-xl w-full" />

        <button @click="showFilters = !showFilters"
            class="h-10 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 border cursor-pointer transition-all w-full sm:w-auto"
            :class="hasActiveFilters
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                : 'border-[#E0E5EE] text-[#334155] hover:bg-[#F5F7FA]'">
            <Filter class="w-4 h-4" />
            Filtros
            <span v-if="hasActiveFilters"
                class="ml-1 bg-white text-[#1D4ED8] text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {{ activeFiltersCount }}
            </span>
        </button>

        <button v-if="hasActiveFilters" @click="clearFilters"
            class="h-10 px-3 border rounded-xl flex items-center justify-center gap-2 text-sm bg-[#DD3C3C] text-white cursor-pointer transition-all w-full sm:w-auto">
            <X class="w-4 h-4" />
            Clear
        </button>
    </div>

    <div v-if="showFilters" class="border border-[#E0E5EE] rounded-2xl p-4 sm:p-6 mb-10 space-y-6">
        <div>
            <p class="text-sm font-semibold mb-3">Status de estudo</p>

            <div class="flex flex-col sm:flex-row flex-wrap gap-2">
                <button @click="toggleStatus('completed')"
                    class="px-4 py-2 rounded-lg text-sm border transition cursor-pointer w-full sm:w-auto" :class="filters.status === 'completed'
                        ? 'bg-[#E2F3ED] text-[#39AC86] border-[#39AC86]'
                        : 'border-[#E0E5EE] text-[#334155] hover:bg-[#F5F7FA]'">
                    Concluído
                </button>

                <button @click="toggleStatus('in_progress')"
                    class="px-4 py-2 rounded-lg text-sm border transition cursor-pointer w-full sm:w-auto" :class="filters.status === 'in_progress'
                        ? 'bg-[#FEF1DA] text-[#F59F0A] border-[#F59F0A]'
                        : 'border-[#E0E5EE] text-[#334155] hover:bg-[#F5F7FA]'">
                    Em progresso
                </button>

                <button @click="toggleNotStarted"
                    class="px-4 py-2 rounded-lg text-sm border transition cursor-pointer w-full sm:w-auto" :class="filters.notStarted
                        ? 'bg-[#E9F2FF] border-[#3B82F6] text-[#1D4ED8]'
                        : 'border-[#E0E5EE] text-[#334155] hover:bg-[#F5F7FA]'">
                    Não iniciado
                </button>
            </div>
        </div>
        <div>
            <p class="text-sm font-semibold mb-3">Level</p>
            <div class="flex flex-col sm:flex-row flex-wrap gap-2">
                <button v-for="level in levels" :key="level.value" @click="toggleLevel(level.value)"
                    class="px-4 py-2 rounded-lg text-sm border transition cursor-pointer w-full sm:w-auto text-center"
                    :class="{
                        'bg-[#E2F3ED] text-[#39AC86] border-[#39AC86]':
                            filters.level === 'beginner' && level.value === 'beginner',
                        'bg-[#FEF1DA] text-[#F59F0A] border-[#F59F0A]':
                            filters.level === 'intermediate' && level.value === 'intermediate',
                        'bg-[#FAE2E2] text-[#DD3C3C] border-[#DD3C3C]':
                            filters.level === 'advanced' && level.value === 'advanced',
                        'border-[#E0E5EE] text-[#334155] hover:bg-[#F5F7FA]':
                            filters.level !== level.value,
                    }">
                    {{ level.label }}
                </button>
            </div>
        </div>

        <div>
            <p class="text-sm font-semibold mb-3">Topic</p>
            <div class="flex flex-col sm:flex-row flex-wrap gap-2">
                <button v-for="category in categories" :key="category.id" @click="toggleCategory(category.id)"
                    class="px-4 py-2 rounded-lg text-sm border transition cursor-pointer w-full sm:w-auto text-center"
                    :class="filters.category === category.id
                        ? 'bg-[#E9F2FF] border-[#3B82F6] text-[#1D4ED8]'
                        : 'border-[#E0E5EE] text-[#334155] hover:bg-[#F5F7FA]'">
                    {{ category.name }}
                </button>
            </div>
        </div>
    </div>

    <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-[#6B778F]">
            Exibindo <span class="font-semibold">{{ itemsCounter }}</span> lições
        </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <LessonCardSkeleton v-if="isLoading" v-for="n in 6" :key="n" />
        <LessonCard v-else v-for="lesson in lessons" :key="lesson.id" :lesson="lesson" />
    </div>

    <div v-if="pagination.lastPage > 1" class="flex items-center justify-center gap-2 mt-10 flex-wrap">

        <button @click="prevPage" :disabled="pagination.currentPage === 1"
            class="px-3 py-2 rounded-lg text-sm border disabled:opacity-50 cursor-pointer">
            Anterior
        </button>

        <button v-for="page in pagination.lastPage" :key="page" @click="goToPage(page)"
            class="px-4 py-2 rounded-lg text-sm border" :class="pagination.currentPage === page
                ? 'bg-[#243B6B] text-white border-[#243B6B]'
                : 'border-[#E0E5EE] text-[#334155] hover:bg-[#F5F7FA]'">
            {{ page }}
        </button>

        <button @click="nextPage" :disabled="pagination.currentPage === pagination.lastPage"
            class="px-3 py-2 rounded-lg text-sm border disabled:opacity-50 cursor-pointer">
            Próxima
        </button>
    </div>
</template>
