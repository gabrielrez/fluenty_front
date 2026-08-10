<script setup>
import { BookmarkPlus, BookmarkCheck } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { api } from '../../lib/api'

const props = defineProps({
    modelValue: Boolean,
    word: String,
    context: String,
    lessonId: Number,
})

const emit = defineEmits(['update:modelValue'])

const isTranslated = ref(false)
const translation = ref('')
const isSaved = ref(null)
const isSaving = ref(false)

function close() {
    emit('update:modelValue', false)
}

const loadWordState = async () => {
    if (!props.word) return

    try {
        const { data } = await api.get(`/words/${props.word}`, {
            params: {
                context: props.context,
            },
        })
        isSaved.value = data.saved
        translation.value = data.translation ?? ''
        isTranslated.value = !!data.translation
    } catch {
        isSaved.value = false
        isTranslated.value = false
    }
}

const translateWord = async () => {
    if (!props.word) return

    isTranslated.value = false
    translation.value = 'Carregando...'

    const { data } = await api.post('/words/translate', {
        text: props.word,
    })

    translation.value = data.translation
    isTranslated.value = true
}

const saveWord = async () => {
    if (!props.word || !props.context || !translation.value) return

    isSaving.value = true

    try {
        await api.post('/words/save', {
            word: props.word,
            context: props.context,
            translation: translation.value,
            lesson_id: props.lessonId,
        })

        isSaved.value = true
    } finally {
        isSaving.value = false
    }
}

watch(
    () => props.modelValue,
    async (open) => {
        if (!open) return

        isSaved.value = null
        translation.value = ''
        isTranslated.value = false

        await loadWordState()

        if (!isSaved.value) {
            await translateWord()
        }
    }
)
</script>

<template>
    <transition name="fade">
        <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div class="absolute inset-0 bg-black/50" @click="close" />

            <div class="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 z-10">
                <header class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <BookmarkPlus class="w-6 h-6 text-[#1D56C9]" />
                        <h2 class="text-lg font-semibold">Salvar no Dicionário</h2>
                    </div>

                    <button @click="close" class="text-gray-400 hover:text-gray-600">
                        ✕
                    </button>
                </header>

                <form class="flex flex-col mt-8">
                    <div>
                        <label class="block text-sm font-medium text-[#6B778F]">
                            Palavra
                        </label>
                        <input type="text" :value="props.word" disabled
                            class="mt-2.5 block w-full rounded-lg border border-[#E0E5EE] p-2.5 text-sm" />
                    </div>

                    <div class="mt-6">
                        <label class="block text-sm font-medium text-[#6B778F]">
                            Contexto
                        </label>
                        <p class="mt-2.5 border-l-3 border-[#C0D0ED] pl-2 italic text-sm text-[#6B778F]">
                            "{{ props.context }}"
                        </p>
                    </div>

                    <div class="mt-6">
                        <label class="block text-sm font-medium text-[#6B778F]">
                            Tradução
                        </label>
                        <input type="text" v-model="translation"
                            class="mt-2.5 block w-full rounded-lg border border-[#E0E5EE] p-2.5 text-sm" />
                    </div>

                    <router-link v-if="isSaved" to="/dictionary" class="flex items-center gap-2 self-end px-4 py-2.5 rounded-lg mt-8 transition-all
           bg-[#39AC86] hover:bg-[#2c9975] text-white">
                        <BookmarkCheck class="w-4 h-4" />
                        <span>Ver Dicionário</span>
                    </router-link>

                    <button v-else-if="isSaved === false" type="button" @click="saveWord"
                        :disabled="isSaving || !isTranslated" class="flex items-center gap-2 self-end px-4 py-2.5 rounded-lg mt-8 transition-all cursor-pointer
           bg-[#1D56C9] hover:bg-[#2c64d5] text-white
           disabled:opacity-50 disabled:cursor-not-allowed">
                        <BookmarkPlus v-if="!isSaving" class="w-4 h-4" />
                        <span v-if="isSaving">Salvando...</span>
                        <span v-else>Salvar Palavra</span>
                    </button>
                </form>
            </div>
        </div>
    </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
