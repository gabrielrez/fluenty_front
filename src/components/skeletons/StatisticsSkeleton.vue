<template>
    <div class="border border-[#e0e5eea3] rounded-xl flex flex-col justify-center items-center p-6 sm:p-9 animate-pulse">
        <div class="w-[120px] h-[120px] rounded-full bg-gray-200"></div>
        <div class="mt-4 h-4 w-28 bg-gray-200 rounded"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        <div v-for="n in 2" :key="n" class="border border-[#e0e5eea3] rounded-xl px-5 py-3 flex justify-between animate-pulse">
            <div>
                <div class="h-4 w-28 bg-gray-200 rounded"></div>
                <div class="mt-4 h-7 w-12 bg-gray-200 rounded"></div>
                <div class="mt-2 h-3 w-24 bg-gray-200 rounded"></div>
            </div>
            <div class="bg-gray-200 rounded-xl w-10 h-10"></div>
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        <div v-for="n in 2" :key="n" class="border border-[#e0e5eea3] rounded-xl px-5 py-3 flex justify-between animate-pulse">
            <div>
                <div class="h-4 w-28 bg-gray-200 rounded"></div>
                <div class="mt-4 h-7 w-12 bg-gray-200 rounded"></div>
                <div class="mt-2 h-3 w-24 bg-gray-200 rounded"></div>
            </div>
            <div class="bg-gray-200 rounded-xl w-10 h-10"></div>
        </div>
    </div>
</template>
