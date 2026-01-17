<template>
    <section class="p-5 lg:grid lg:grid-cols-2 lg:gap-12 max-w-7xl mx-auto mt-12">
        <audio ref="audio" src="/audio/a-day-in-london.mp3" preload="auto" @play="isPlaying = true"
            @pause="isPlaying = false" @ended="isPlaying = false" />
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
            <router-link to="/home"
                class="mx-auto lg:mx-0 mt-6 w-max flex items-center gap-2 bg-[#1D56C9] px-8 py-3 rounded-xl text-white font-medium hover:bg-[#3367CE] hover:scale-[98%] transition-all">Começar
                a Aprender
                <ArrowRightIcon class="w-4 h-4" />
            </router-link>
        </div>
        <div class="border border-[#E0E5EE] rounded-xl lg:mt-0 mt-12">
            <div class="bg-[#F3F6FC] px-4 py-5 flex justify-between items-center border-b border-[#E0E5EE]">
                <div class="flex items-center gap-3">
                    <div class="bg-[#DDE6F6] p-2 rounded-xl">
                        <BookOpen class="w-5 h-5 text-[#1D56C9]" />
                    </div>
                    <div>
                        <h3 class="font-semibold">A Day in London</h3>
                        <p class="text-sm text-[#6B778F]">Intermediate • 5 min</p>
                    </div>
                </div>
                <span
                    class="bg-[#FEF1DA] text-[#F59F0A] text-xs font-semibold px-2.5 py-1 rounded-full">Intermediário</span>
            </div>
            <div class="p-6">
                <p class="border-b border-[#E0E5EE] pb-4 font-[Libre_Baskerville] leading-relaxed">The morning fog
                    lifted slowly over the River Thames, revealing
                    the iconic silhouette of Tower Bridge.
                    <span class="bg-[#D2DDF4] rounded-lg p-1 cursor-pointer">Commuters</span> hurried along the
                    embankment, their footsteps echoing on the ancient cobblestones...
                </p>
                <div class="flex justify-between items-center mt-4 text-sm text-[#6B778F]">
                    <div class="flex items-center gap-4">
                        <span class="flex items-center gap-1.5">
                            <Clock class="w-4 h-4" /> 5 min
                        </span>
                        <span class="flex items-center gap-1.5">
                            <BookMarked class="w-4 h-4" />
                            12 palavras salvas
                        </span>
                    </div>
                    <span @click="togleAudio" :class="isPlaying ? 'text-[#DD3C3C]' : 'text-[#1D56C9]'"
                        class="flex items-center gap-1.5 cursor-pointer hover:scale-110 hover:-rotate-2 transition-all">
                        <HeadphoneOffIcon v-if="isPlaying" class="w-4 h-4" />
                        <HeadphonesIcon v-if="!isPlaying" class="w-4 h-4" />
                        {{ isPlaying ? 'Parar' : 'Ouvir' }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowRightIcon, BookMarked, BookOpen, Clock, HeadphoneOffIcon, HeadphonesIcon } from 'lucide-vue-next';

const audio = ref(null);
const isPlaying = ref(false);

const togleAudio = () => {
    if (!audio.value) return;

    if (isPlaying.value) {
        audio.value.pause();
        audio.value.currentTime = 0;
    } else {
        audio.value.play();
    }
}
</script>
