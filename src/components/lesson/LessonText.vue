<script setup>
defineProps({
    paragraphPairs: {
        type: Array,
        required: true,
    },
    isTranslated: {
        type: Boolean,
        required: true,
    },
    isWhitespace: {
        type: Function,
        required: true,
    },
})

const emit = defineEmits(['word-click'])

const onWordClick = (word) => {
    emit('word-click', word)
}
</script>

<template>
    <div class="mt-6 p-8 bg-[#F6F7F8] border border-[#E0E5EE] rounded-xl font-[Libre_Baskerville]">
        <div v-for="(pair, pIndex) in paragraphPairs" :key="pIndex" class="mb-10 last:mb-0">
            <p class="text-lg leading-relaxed mb-2">
                <span v-for="(word, wIndex) in pair.original.split(/(\s+)/)" :key="`${pIndex}-${wIndex}`"
                    @click="onWordClick(word)" :class="[
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
</template>
