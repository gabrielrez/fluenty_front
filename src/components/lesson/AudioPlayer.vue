<script setup>
import { ref, computed, watch } from 'vue'
import { Download } from 'lucide-vue-next'

const props = defineProps({
    lesson: {
        type: Object,
        required: true,
    },
})

const audioRef = ref(null)

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const volume = ref(1)
const isDownloading = ref(false)

const audioSrc = computed(() => props.lesson.audio_url)
const totalDuration = computed(() => props.lesson.duration)

const togglePlay = async () => {
    if (!audioRef.value) return

    if (audioRef.value.paused) {
        await audioRef.value.play()
        isPlaying.value = true
    } else {
        audioRef.value.pause()
        isPlaying.value = false
    }
}

const seek = () => {
    if (!audioRef.value || !duration.value) return
    audioRef.value.currentTime = (progress.value / 100) * duration.value
}

const changeVolume = () => {
    if (!audioRef.value) return
    audioRef.value.volume = volume.value
}

const onLoadedMetadata = () => {
    duration.value = audioRef.value.duration || totalDuration.value || 0
}

const onTimeUpdate = () => {
    currentTime.value = audioRef.value.currentTime
    progress.value = duration.value
        ? (currentTime.value / duration.value) * 100
        : 0
}

const onEnded = () => {
    isPlaying.value = false
    progress.value = 0
    currentTime.value = 0
}

const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${String(s).padStart(2, '0')}`
}

const downloadAudio = async () => {
    if (isDownloading.value) return
    isDownloading.value = true

    try {
        const response = await fetch(audioSrc.value)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = `${props.lesson.title}.mp3`
        a.click()

        URL.revokeObjectURL(url)
    } finally {
        isDownloading.value = false
    }
}

const progressStyle = computed(() => ({
    background: `linear-gradient(to right, #1D56C9 ${progress.value}%, #E5E7EB ${progress.value}%)`,
}))

const volumeStyle = computed(() => ({
    background: `linear-gradient(to right, #1D56C9 ${volume.value * 100}%, #E5E7EB ${volume.value * 100}%)`,
}))

watch(
    () => props.lesson.id,
    () => {
        isPlaying.value = false
        currentTime.value = 0
        duration.value = 0
        progress.value = 0
    }
)
</script>

<template>
    <div class="mt-6 border border-[#E0E5EE] rounded-xl shadow-sm
               px-4 py-4 sm:px-6
               flex flex-col sm:flex-row
               sm:items-center gap-3 sm:gap-4">
        <button @click="togglePlay" class="w-12 h-12 shrink-0 flex items-center justify-center rounded-full
                   bg-[#1D56C9] text-white hover:bg-[#164ebd]
                   cursor-pointer transition-all mx-auto sm:mx-0">
            {{ isPlaying ? '❚❚' : '▶' }}
        </button>

        <div class="flex items-center gap-3 w-full">
            <span class="text-xs text-[#6B778F] w-10 text- center">
                {{ formatTime(currentTime) }}
            </span>

            <input type="range" min="0" max="100" step="0.1" v-model="progress" @input="seek" class="audio-range flex-1"
                :style="progressStyle" />

            <span class="text-xs text-[#6B778F] w-10 text-center">
                {{ formatTime(duration) }}
            </span>
        </div>

        <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="changeVolume"
            class="audio-range w-24 hidden sm:block" :style="volumeStyle" />

        <button @click="downloadAudio"
            class="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-[#E0E5EE] text-[#6B778F] hover:text-[#1D56C9] hover:border-[#1D56C9] transition-all cursor-pointer hidden sm:flex"
            :class="isDownloading ? 'opacity-50 cursor-not-allowed' : ''" :disabled="isDownloading"
            :title="isDownloading ? 'Baixando...' : 'Baixar áudio'">
            <Download class="w-4 h-4" />
        </button>

        <audio ref="audioRef" :src="audioSrc" preload="metadata" @loadedmetadata="onLoadedMetadata"
            @timeupdate="onTimeUpdate" @ended="onEnded" />
    </div>
    <div @click="downloadAudio" class="mt-6 flex items-center justify-center gap-3
             bg-[#1D56C9] text-white
             px-4 py-2 rounded-xl
             cursor-pointer
             hover:scale-95 transition
             w-full sm:hidden">
        <Download class="w-4 h-4" />
        Download
    </div>
</template>

<style>
.audio-range {
    appearance: none;
    height: 8px;
    border-radius: 9999px;
    cursor: pointer;
}

.audio-range::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background-color: #1D56C9;
    border-radius: 9999px;
}

.audio-range::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background-color: #1D56C9;
    border-radius: 9999px;
}
</style>