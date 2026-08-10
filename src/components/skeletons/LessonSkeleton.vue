<template>
    <div class="animate-pulse">
        <!-- Voltar -->
        <div class="h-4 w-32 bg-gray-200 rounded"></div>

        <!-- Tags -->
        <div class="mt-8 flex gap-2 items-center">
            <div class="h-6 w-16 bg-gray-200 rounded-full"></div>
            <div class="h-6 w-24 bg-gray-200 rounded-full"></div>
            <div class="h-6 w-16 bg-gray-200 rounded-full ml-3"></div>
        </div>

        <!-- Título -->
        <div class="mt-5 h-10 w-3/4 bg-gray-200 rounded"></div>

        <!-- Imagem -->
        <div class="mt-8 w-full h-40 sm:h-80 bg-gray-200 rounded-lg"></div>

        <!-- Audio Player -->
        <div class="mt-6 border border-[#E0E5EE] rounded-lg px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div class="w-12 h-12 shrink-0 bg-gray-200 rounded-full mx-auto sm:mx-0"></div>
            <div class="flex items-center gap-3 w-full">
                <div class="h-3 w-10 bg-gray-200 rounded"></div>
                <div class="flex-1 h-2 bg-gray-200 rounded-full"></div>
                <div class="h-3 w-10 bg-gray-200 rounded"></div>
            </div>
            <div class="w-24 h-2 bg-gray-200 rounded-full hidden sm:block"></div>
        </div>

        <!-- Translation Toolbar -->
        <div class="mt-6 border border-[#E0E5EE] rounded-lg px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div class="h-10 w-40 bg-gray-200 rounded-lg mx-auto sm:mx-0"></div>
            <div class="h-4 w-56 bg-gray-200 rounded mx-auto sm:mx-0"></div>
        </div>

        <!-- Texto (parágrafos) -->
        <div class="mt-8 space-y-6">
            <div v-for="n in 4" :key="n" class="space-y-2">
                <div class="h-4 w-full bg-gray-200 rounded"></div>
                <div class="h-4 w-full bg-gray-200 rounded"></div>
                <div class="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
        </div>

        <!-- Botão -->
        <div class="mt-12 h-12 w-56 bg-gray-200 rounded-lg mx-auto"></div>
    </div>
</template>
