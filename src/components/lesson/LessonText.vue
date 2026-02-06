<script setup>
import { ref } from 'vue'
import SaveWordModal from '../common/SaveWordModal.vue'

const { paragraphPairs, isTranslated, isWhitespace } = defineProps({
    paragraphPairs: { type: Array, required: true },
    isTranslated: { type: Boolean, required: true },
    isWhitespace: { type: Function, required: true },
})

const isOpen = ref(false)
const selectedWord = ref('')
const context = ref('')

const cleanWord = (word) => {
    return word.replace(/[.,!?;:"“”‘’(){}[\]]/g, '')
}

const wordClick = (word, pIndex, wIndex) => {
    if (isWhitespace(word)) return

    const wordsWithSpaces = paragraphPairs[pIndex].original.split(/(\s+)/)
    const cleaned = cleanWord(word)

    const realWords = wordsWithSpaces.filter(w => !/^\s+$/.test(w))
    const realIndex = realWords.findIndex(w => cleanWord(w) === cleaned)

    const start = Math.max(0, realIndex - 4)
    const end = Math.min(realWords.length, realIndex + 9)
    const contextWords = realWords.slice(start, end).join(' ')

    selectedWord.value = cleaned
    context.value = contextWords
    isOpen.value = true
}
</script>

<template>
    <div class="mt-6 p-8 bg-[#F6F7F8] border border-[#E0E5EE] rounded-xl font-[Libre_Baskerville]">
        <div v-for="(pair, pIndex) in paragraphPairs" :key="pIndex" class="mb-10 last:mb-0">
            <p class="text-lg leading-relaxed mb-2">
                <span v-for="(word, wIndex) in pair.original.split(/(\s+)/)" :key="`${pIndex}-${wIndex}`"
                    @click="wordClick(word, pIndex, wIndex)" :class="[
                        'whitespace-pre-wrap rounded-sm transition',
                        isWhitespace(word)
                            ? 'cursor-default'
                            : 'cursor-pointer hover:bg-[#1d56c91f]'
                    ]">
                    {{ word }}
                </span>
            </p>

            <p v-if="isTranslated && pair.translation" class="text-base italic text-[#6B778F]">
                {{ pair.translation }}
            </p>
        </div>
    </div>

    <SaveWordModal v-model="isOpen" :word="selectedWord" :context="context" />
</template>
