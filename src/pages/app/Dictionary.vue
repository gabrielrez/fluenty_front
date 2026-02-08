<script setup lang="ts">
import {
    BookIcon,
    BookOpenCheckIcon,
    Calendar,
    FileText,
    TrashIcon,
} from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import { api } from '../../lib/api'

type SavedWord = {
    id: number
    word: string
    translation: string
    context: string
    created_at: string
    lesson: {
        id: number
        title: string
    }
}

const words = ref<SavedWord[]>([])
const isLoading = ref(true)
const search = ref('')

let searchTimeout: number | undefined

async function fetchWords() {
    isLoading.value = true

    try {
        const { data } = await api.get('/words', {
            params: {
                search: search.value || undefined,
            },
        })

        words.value = data.data
    } finally {
        isLoading.value = false
    }
}

async function deleteWord(item: SavedWord) {
    const previous = [...words.value]
    words.value = words.value.filter(word => word.id !== item.id)

    try {
        await api.delete(`/words/${item.id}`)
    } catch {
        words.value = previous
    }
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

watch(search, () => {
    clearTimeout(searchTimeout)

    searchTimeout = window.setTimeout(() => {
        fetchWords()
    }, 400)
})

onMounted(fetchWords)
</script>

<template>
    <div class="lg:px-32">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold">
                Dicionário Pessoal
            </h1>
            <p class="mt-2 text-[#6B778F] text-sm sm:text-base">
                Suas palavras e traduções salvas para revisão.
            </p>
        </div>

        <div
            class="flex items-center gap-3 sm:gap-4 mt-8 border border-[#E0E5EE] w-full px-4 py-6 rounded-xl sm:justify-start justify-center">
            <div class="flex justify-center items-center w-max bg-[#E8EEF9] p-2.5 rounded-xl">
                <BookOpenCheckIcon class="w-7 h-7 text-[#1D56C9]" />
            </div>
            <div>
                <h3 class="font-semibold text-2xl">
                    {{ words.length }}
                </h3>
                <p class="text-sm text-[#6B778F]">
                    Palavras salvas
                </p>
            </div>
        </div>

        <input
            v-model="search"
            type="text"
            placeholder="Pesquisar..."
            class="mt-6 pl-4 text-sm border border-[#E0E5EE] h-10 rounded-xl w-full"
        />

        <div v-if="isLoading" class="mt-5 space-y-4">
            <div class="bg-gray-200 h-24 rounded-xl animate-pulse" />
            <div class="bg-gray-200 h-24 rounded-xl animate-pulse" />
        </div>

        <div v-else class="mt-5 space-y-4">
            <div
                v-for="item in words"
                :key="item.id"
                class="border border-[#E0E5EE] w-full px-4 py-6 sm:px-5 sm:py-6 rounded-xl"
            >
                <div class="flex justify-between items-start sm:items-center gap-2">
                    <h3 class="font-medium text-lg break-words">
                        {{ item.word }}
                    </h3>
                    <TrashIcon
                        @click.prevent.stop="deleteWord(item)"
                        class="w-5 h-5 text-[#6B778F] cursor-pointer hover:text-[#DD3C3C] transition-all shrink-0"
                    />
                </div>

                <span class="mt-3 block font-medium text-[#6B778F] text-sm sm:text-base">
                    {{ item.translation }}
                </span>

                <p
                    v-if="item.context"
                    class="mt-2.5 border-l-3 pl-2 border-[#C0D0ED] text-[#6B778F] italic text-sm sm:text-base"
                >
                    "{{ item.context }}"
                </p>

                <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                    <div class="flex items-center gap-1">
                        <Calendar
                            class="w-4 h-4 text-[#6B778F]"
                            stroke-width="1"
                        />
                        <span class="text-xs text-[#6B778F] font-light">
                            {{ formatDate(item.created_at) }}
                        </span>
                    </div>

                    <router-link
                        :to="`/lesson/${item.lesson.id}`"
                        class="group flex items-center gap-1 hover:text-[#1D56C9] max-w-full"
                    >
                        <FileText
                            class="w-4 h-4 text-[#6B778F] group-hover:text-[#1D56C9] shrink-0"
                            stroke-width="1"
                        />
                        <span
                            class="text-xs font-light text-[#6B778F] group-hover:text-[#1D56C9] truncate"
                        >
                            {{ item.lesson.title }}
                        </span>
                    </router-link>
                </div>
            </div>

            <div v-if="words.length === 0" class="mt-10">
                <div
                    class="mx-auto w-max rounded-full p-4 flex justify-center items-center bg-[#E8EAEE]"
                >
                    <BookIcon class="w-8 h-8 text-[#667799]" />
                </div>

                <h4 class="mt-3 text-center text-lg">
                    Nenhuma palavra encontrada
                </h4>

                <p class="text-center text-[#6B778F] mt-2">
                    {{
                        search
                            ? 'Tente outro termo de busca.'
                            : 'Clique nas palavras durante a leitura para salvá-las.'
                    }}
                </p>
            </div>
        </div>
    </div>
</template>
