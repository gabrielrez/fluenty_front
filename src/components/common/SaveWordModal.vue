<script setup>
import { BookmarkPlus } from 'lucide-vue-next';

defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    word: String,
    context: String,
})

const emit = defineEmits(['update:modelValue'])

function close() {
    emit('update:modelValue', false)
}
</script>

<template>
    <transition name="fade">
        <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div class="absolute inset-0 bg-black/50" @click="close" />

            <div class="relative bg-white rounded-xl shadow-xl w-full max-w-lg sm:max-w-md md:max-w-lg p-6 sm:p-4 z-10">
                <header class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <BookmarkPlus class="w-6 h-6 text-[#1D56C9]" />
                        <h2 class="text-lg font-semibold">Salvar no Dicionário</h2>
                    </div>

                    <button @click="close" class="text-gray-400 hover:text-gray-600">✕</button>
                </header>

                <form class="flex flex-col mt-8">
                    <div>
                        <label for="word" class="block text-sm font-medium text-[#6B778F]">
                            Palavra
                        </label>
                        <input type="text" id="word"
                            class="mt-2.5 block w-full rounded-xl border border-[#E0E5EE] p-2.5 text-sm"
                            :value="word" />
                    </div>

                    <div class="mt-6">
                        <label for="context" class="block text-sm font-medium text-[#6B778F]">
                            Contexto
                        </label>
                        <p class="mt-2.5 border-l-3 border-[#C0D0ED] pl-2 w-full italic text-sm text-[#6B778F]">
                            "{{ context }}"
                        </p>
                    </div>

                    <div class="mt-6">
                        <label for="translation" class="block text-sm font-medium text-[#6B778F]">
                            Tradução
                        </label>
                        <input type="text" id="translation"
                            class="mt-2.5 block w-full rounded-xl border border-[#E0E5EE] p-2.5 text-sm"
                            :value="word" />
                    </div>

                    <button
                        class="flex items-center gap-2 self-end px-4 py-2.5 rounded-xl bg-[#1D56C9] text-white mt-8 cursor-pointer hover:bg-[#2c64d5] transition-all">
                        <BookmarkPlus class="w-4 h-4 mr-2" />
                        Salvar Palavra
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
