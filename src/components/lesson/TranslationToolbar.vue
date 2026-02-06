<script setup>
import { Languages, MousePointerClick } from 'lucide-vue-next'

defineProps({
  isTranslated: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <div
    class="mt-6 flex flex-col sm:flex-row
           sm:justify-between sm:items-center
           gap-4
           border border-[#E0E5EE]
           rounded-xl px-4 sm:px-6 py-4"
  >
    <button
      @click="emit('toggle')"
      class="flex items-center justify-center gap-3
             border border-[#E0E5EE]
             px-4 py-2 rounded-xl
             cursor-pointer
             hover:scale-95 transition
             w-full sm:w-auto"
    >
      <Languages class="w-4 h-4" />
      {{ isTranslated ? 'Ocultar tradução' : 'Ver tradução' }}
    </button>

    <div
      class="flex items-center justify-center sm:justify-end
             gap-2 text-[#6B778F]
             text-xs sm:text-sm text-center sm:text-right"
    >
      <MousePointerClick class="w-4 h-4 sm:w-5 sm:h-5" />
      <span>
        Clique em uma palavra para salvar
      </span>
    </div>
  </div>
</template>
