<template>
    <div v-if="props.errors.length" class="mt-4 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
        <div class="flex items-start gap-3">
            <AlertTriangle class="w-5 h-5 text-red-600 mt-0.5" />

            <div class="flex-1">
                <p class="text-sm font-semibold text-red-800 mb-1">
                    Ops!
                </p>

                <ul class="list-disc list-inside space-y-1">
                    <li v-for="(error, index) in props.errors" :key="index" class="text-sm text-red-700">
                        {{ error }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { AlertTriangle } from 'lucide-vue-next';

const props = defineProps({
    errors: {
        type: Array,
        required: true,
    },
});
</script>