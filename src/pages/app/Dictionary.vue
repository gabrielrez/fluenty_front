<script setup lang="ts">
import { BookOpenCheckIcon, Calendar, FileText, TrashIcon } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { api } from '../../lib/api'

type SavedWord = {
    id: number
    word: string
    translation: string
    context: string
    created_at: string
}

const words = ref<SavedWord[]>([])
const isLoading = ref(true)

async function fetchWords() {
    try {
        const { data } = await api.get('/words')
        words.value = data.data
        console.log(data.data)
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

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

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

        <div class="flex items-center gap-3 mt-8 border border-[#E0E5EE] w-full px-4 py-6 rounded-xl">
            <div class="flex justify-center items-center w-max bg-[#E8EEF9] p-2.5 rounded-xl">
                <BookOpenCheckIcon class="w-7 h-7 text-[#1D56C9]" />
            </div>
            <div>
                <h3 class="font-semibold text-2xl">
                    {{ words.length }}
                </h3>
                <p class="text-sm text-[#6B778F]">Palavras salvas</p>
            </div>
        </div>

        <div v-if="isLoading" class="mt-6 space-y-4">
            <div class="bg-gray-200 h-24 rounded-xl animate-pulse" />
            <div class="bg-gray-200 h-24 rounded-xl animate-pulse" />
        </div>

        <div v-else class="mt-6 space-y-4">
            <div v-for="(item, index) in words" :key="index"
                class="border border-[#E0E5EE] w-full px-4 py-6 rounded-xl">
                <div class="flex justify-between items-center">
                    <h3 class="font-medium text-lg">
                        {{ item.word }}
                    </h3>
                    <TrashIcon @click.prevent.stop="deleteWord(item)"
                        class="w-5 h-5 text-[#6B778F] cursor-pointer hover:text-[#DD3C3C] transition-all" />
                </div>

                <span class="mt-3 block font-medium text-[#6B778F]">
                    {{ item.translation }}
                </span>

                <p v-if="item.context" class="mt-2.5 border-l-3 pl-2 border-[#C0D0ED] text-[#6B778F] italic">
                    "{{ item.context }}"
                </p>

                <div class="mt-4 flex items-center gap-8">
                    <div class="flex items-center gap-1">
                        <Calendar class="w-4 h-4 text-[#6B778F]" stroke-width="1" />
                        <span class="text-xs text-[#6B778F] font-light">
                            {{ formatDate(item.created_at) }}
                        </span>
                    </div>
                    <router-link :to="`/lesson/${item.lesson.id}`"
                        class="group flex items-center gap-1 hover:text-[#1D56C9]">
                        <FileText class="w-4 h-4 text-[#6B778F] group-hover:text-[#1D56C9]" stroke-width="1" />
                        <span class="text-xs font-light text-[#6B778F] group-hover:text-[#1D56C9]">
                            {{ item.lesson.title }}
                        </span>
                    </router-link>
                </div>
            </div>

            <p v-if="words.length === 0" class="text-center text-[#6B778F] mt-10">
                Nenhuma palavra salva ainda 📘
            </p>
        </div>
    </div>
</template>
