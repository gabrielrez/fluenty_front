<script setup>
import { ref, computed, watch } from 'vue'

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
    <div class="mt-6 border border-[#E0E5EE] rounded-xl shadow-sm px-6 py-4 flex items-center gap-4">
        <button @click="togglePlay" class="w-12 h-12 flex items-center justify-center rounded-full
                   bg-[#1D56C9] text-white hover:bg-[#164ebd] cursor-pointer transition-all">
            {{ isPlaying ? '❚❚' : '▶' }}
        </button>

        <span class="text-xs text-[#6B778F] w-10 text-center">
            {{ formatTime(currentTime) }}
        </span>

        <input type="range" min="0" max="100" step="0.1" v-model="progress" @input="seek" class="audio-range flex-1"
            :style="progressStyle" />

        <span class="text-xs text-[#6B778F] w-10 text-center">
            {{ formatTime(duration) }}
        </span>

        <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="changeVolume" class="audio-range w-24"
            :style="volumeStyle" />

        <audio ref="audioRef" :src="audioSrc" preload="metadata" @loadedmetadata="onLoadedMetadata"
            @timeupdate="onTimeUpdate" @ended="onEnded" />
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