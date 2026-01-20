<template>
    <section class="p-5 lg:grid lg:grid-cols-2 lg:gap-12 max-w-7xl mx-auto mt-12">
        <audio ref="audio" :src="selectedVoice" preload="auto" @play="isPlaying = true" @pause="isPlaying = false"
            @ended="isPlaying = false" />
        <div>
            <div class="flex justify-center lg:justify-start items-center gap-2">
                <span
                    class="bg-[#E2F3ED] text-[#39AC86] text-xs font-semibold px-2.5 py-1 rounded-full">Iniciante</span>
                <span
                    class="bg-[#FEF1DA] text-[#F59F0A] text-xs font-semibold px-2.5 py-1 rounded-full">Intermediário</span>
                <span class="bg-[#F5DDDE] text-[#DD3C3C] text-xs font-semibold px-2.5 py-1 rounded-full">Avançado</span>
            </div>
            <div class="mt-6">
                <h1 class="text-5xl font-bold text-center lg:text-left">Domine inglês através da
                    <br />
                    <span class="text-[#1D56C9]">leitura</span>
                    e
                    <span class="text-[#DD3C3C]">escuta</span>
                </h1>
                <p class="text-lg text-[#6B778F] mt-6 text-center lg:text-left">
                    Textos autênticos, áudios nativos e progresso visível. Aprenda no seu ritmo com um método
                    comprovado.
                </p>
            </div>
            <router-link to="/dashboard"
                class="mx-auto lg:mx-0 mt-6 w-max flex items-center gap-2 bg-[#1D56C9] px-8 py-3 rounded-xl text-white font-medium hover:bg-[#3367CE] hover:scale-[98%] transition-all">Começar
                a Aprender
                <ArrowRightIcon class="w-4 h-4" />
            </router-link>
        </div>
        <div class="border border-[#E0E5EE] rounded-xl lg:mt-0 mt-12 shadow-sm bg-white">
            <div
                class="bg-[#F3F6FC] px-4 py-5 flex justify-between items-center border-b border-[#E0E5EE] rounded-t-xl">
                <div class="flex items-center gap-3">
                    <div class="bg-[#DDE6F6] p-2 rounded-xl">
                        <BookOpen class="w-5 h-5 text-[#1D56C9]" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900">A Day in London</h3>
                        <p class="text-sm text-[#6B778F]">Intermediate • 5 min</p>
                    </div>
                </div>
                <span
                    class="bg-[#FEF1DA] text-[#F59F0A] text-xs font-semibold px-2.5 py-1 rounded-full">Intermediário</span>
            </div>
            <div class="p-6">
                <p class="border-b border-[#E0E5EE] pb-4 font-[Libre_Baskerville] leading-relaxed text-gray-700">The
                    morning fog
                    lifted slowly over the River Thames, revealing
                    the iconic silhouette of Tower Bridge.
                    <span
                        class="bg-[#D2DDF4] rounded-lg p-1 cursor-pointer hover:bg-[#C0CDF0] transition-colors">Commuters</span>
                    hurried along the
                    embankment, their footsteps echoing on the ancient cobblestones...
                </p>
                <div
                    class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-4 text-sm text-[#6B778F]">
                    <select v-model="selectedVoice" @change="handleVoiceChange"
                        class="text-xs w-max self-center bg-gray-50 border border-[#E0E5EE] text-gray-700 rounded-lg focus:ring-[#1D56C9] focus:border-[#1D56C9] block p-2 outline-none cursor-pointer">
                        <option v-for="voice in VOICES" :key="voice.path" :value="voice.path">
                            {{ voice.label }}
                        </option>
                    </select>

                    <button @click="togleAudio"
                        :class="isPlaying ? 'text-[#DD3C3C] bg-red-50' : 'text-[#1D56C9] bg-blue-50'"
                        class="flex items-center w-max self-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer hover:opacity-80 transition-all font-medium">
                        <HeadphoneOffIcon v-if="isPlaying" class="w-4 h-4" />
                        <HeadphonesIcon v-if="!isPlaying" class="w-4 h-4" />
                        {{ isPlaying ? 'Parar' : 'Ouvir' }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowRightIcon, BookMarked, BookOpen, Clock, HeadphoneOffIcon, HeadphonesIcon } from 'lucide-vue-next';

const VOICES = [
    { label: 'Captivating Storyteller (Male)', path: '/audio/landing/Captivating Storyteller - male.mp3' },
    { label: 'Knowledgable, Professional (Female)', path: '/audio/landing/Knowledgable, Professional - female.mp3' },
    { label: 'Wise and Approachable (Male)', path: '/audio/landing/Wise and Approachable - male.mp3' },
];

const audio = ref(null);
const isPlaying = ref(false);
const selectedVoice = ref(VOICES[0].path);

const togleAudio = () => {
    if (!audio.value) return;

    if (isPlaying.value) {
        audio.value.pause();
        audio.value.currentTime = 0;
    } else {
        audio.value.play();
    }
}

const handleVoiceChange = () => {
    if (!audio.value) return;

    const wasPlaying = isPlaying.value;
    audio.value.pause();
    audio.value.load();
    isPlaying.value = false;

    if (wasPlaying) {
        audio.value.play().then(() => {
            isPlaying.value = true;
        }).catch(() => {
            isPlaying.value = false;
        });
    }
}
</script>
