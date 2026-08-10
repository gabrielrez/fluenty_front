<script setup>
import { Settings } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import FormError from '../feedback/FormError.vue'

const props = defineProps({
    modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const userStore = useUserStore()

const name = ref('')
const currentPassword = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const errors = ref([])
const isSaving = ref(false)
const successMessage = ref('')

function close() {
    emit('update:modelValue', false)
}

function resetForm() {
    name.value = userStore.userName || ''
    currentPassword.value = ''
    password.value = ''
    passwordConfirmation.value = ''
    errors.value = []
    successMessage.value = ''
}

async function handleSubmit() {
    errors.value = []
    successMessage.value = ''

    const payload = {}

    if (name.value !== userStore.userName) {
        payload.name = name.value
    }

    if (password.value) {
        payload.current_password = currentPassword.value
        payload.password = password.value
        payload.password_confirmation = passwordConfirmation.value
    }

    if (Object.keys(payload).length === 0) {
        close()
        return
    }

    isSaving.value = true

    try {
        await userStore.updateUser(payload)
        successMessage.value = 'Dados atualizados com sucesso!'
        currentPassword.value = ''
        password.value = ''
        passwordConfirmation.value = ''
    } catch (error) {
        errors.value = error
    } finally {
        isSaving.value = false
    }
}

watch(
    () => props.modelValue,
    (open) => {
        if (open) resetForm()
    }
)
</script>

<template>
    <transition name="fade">
        <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div class="absolute inset-0 bg-black/50" @click="close" />

            <div class="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 z-10">
                <header class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <Settings class="w-6 h-6 text-[#1D56C9]" />
                        <h2 class="text-lg font-semibold">Editar Perfil</h2>
                    </div>

                    <button @click="close" class="text-gray-400 hover:text-gray-600 cursor-pointer">
                        ✕
                    </button>
                </header>

                <FormError :errors="errors" />

                <div v-if="successMessage"
                    class="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                    {{ successMessage }}
                </div>

                <form @submit.prevent="handleSubmit" class="flex flex-col mt-6">
                    <div>
                        <label for="edit-name" class="block text-sm font-medium text-[#6B778F]">
                            Nome
                        </label>
                        <input id="edit-name" type="text" v-model="name"
                            class="mt-2.5 block w-full rounded-lg border border-[#E0E5EE] p-2.5 text-sm focus:outline-none focus:border-[#1D56C9]" />
                    </div>

                    <hr class="my-6 border-[#E0E5EE]" />

                    <p class="text-sm text-[#6B778F] mb-4">
                        Preencha os campos abaixo apenas se deseja alterar sua senha.
                    </p>

                    <div>
                        <label for="edit-current-password" class="block text-sm font-medium text-[#6B778F]">
                            Senha Atual
                        </label>
                        <input id="edit-current-password" type="password" v-model="currentPassword"
                            class="mt-2.5 block w-full rounded-lg border border-[#E0E5EE] p-2.5 text-sm focus:outline-none focus:border-[#1D56C9]" />
                    </div>

                    <div class="mt-4">
                        <label for="edit-password" class="block text-sm font-medium text-[#6B778F]">
                            Nova Senha
                        </label>
                        <input id="edit-password" type="password" v-model="password"
                            class="mt-2.5 block w-full rounded-lg border border-[#E0E5EE] p-2.5 text-sm focus:outline-none focus:border-[#1D56C9]" />
                    </div>

                    <div class="mt-4">
                        <label for="edit-password-confirmation" class="block text-sm font-medium text-[#6B778F]">
                            Confirmar Nova Senha
                        </label>
                        <input id="edit-password-confirmation" type="password" v-model="passwordConfirmation"
                            class="mt-2.5 block w-full rounded-lg border border-[#E0E5EE] p-2.5 text-sm focus:outline-none focus:border-[#1D56C9]" />
                    </div>

                    <button type="submit" :disabled="isSaving"
                        class="flex items-center justify-center gap-2 self-end px-6 py-2.5 rounded-lg mt-8 transition-all cursor-pointer bg-[#1D56C9] hover:bg-[#2c64d5] text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isSaving">Salvando...</span>
                        <span v-else>Salvar</span>
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
