<script setup>
import { ArrowLeft, Lock, Mail } from 'lucide-vue-next';
import Logo from '../../components/Logo.vue';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import FormError from '../../components/feedback/FormError.vue';
import { useUserStore } from '../../stores/user';

const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);
const errors = ref([]);

const form = reactive({
    email: '',
    password: '',
});

async function handleLogin() {
    loading.value = true;
    errors.value = [];

    try {
        await userStore.login(form);

        router.push('/home');
    } catch (error) {
        errors.value = error;
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <header class="fixed top-0 left-0 w-full z-50 p-5 border-b border-[#E0E5EE] bg-white">
        <div
            class="flex justify-between items-center max-w-7xl mx-auto text-[#6B778F] hover:text-[#1D56C9] transition-all">
            <router-link to="/" class="flex items-center gap-2">
                <ArrowLeft class="w-3 h-3" />
                <span class="font-medium text-sm cursor-pointer">Voltar</span>
            </router-link>
            <Logo />
        </div>
    </header>

    <main class="p-5 w-full max-w-7xl mx-auto mt-10 pt-16">
        <div class="max-w-md border border-[#E0E5EE] shadow-md rounded-xl mx-auto p-6">
            <h1 class="text-center text-2xl font-bold">Fazer login</h1>
            <p class="text-sm text-[#6B778F] mt-2 text-center">Entre na sua conta para continuar aprendendo</p>

            <div class="bg-[#E8EAEE] w-full p-1 mt-8 rounded-xl grid grid-cols-2 gap-1">
                <router-link to="/login"
                    class="bg-white px-4 py-2 rounded-xl cursor-pointer text-center text-sm font-semibold">Entrar</router-link>
                <router-link to="/register"
                    class="px-4 py-2 rounded-xl cursor-pointer text-center text-sm text-[#667799] font-semibold">Criar
                    conta</router-link>
            </div>

            <form @submit.prevent="handleLogin" class="mt-8">
                <div>
                    <label for="email" class="text-sm font-medium">Email</label>
                    <div class="flex items-center gap-2 mt-2 border border-[#E0E5EE] rounded-xl pl-2.5">
                        <Mail class="w-5 h-5 text-[#667799]" />
                        <input v-model="form.email" type="text" name="email" id="email" required
                            placeholder="seu@email.com" class="w-full p-2.5 text-sm text-[#1b2232] rounded-xl">
                    </div>
                </div>
                <div class="mt-4">
                    <label for="password" class="text-sm font-medium">Senha</label>
                    <div class="flex items-center gap-2 mt-2 border border-[#E0E5EE] rounded-xl pl-2.5">
                        <Lock class="w-5 h-5 text-[#667799]" />
                        <input v-model="form.password" type="password" name="password" required id="password"
                            placeholder="••••••••" class="w-full p-2.5 text-sm text-[#1b2232] rounded-xl">
                    </div>
                </div>
                <div class="flex justify-end mt-3">
                    <span class="text-sm text-[#1D56C9] cursor-pointer hover:underline">Esqueceu a senha?</span>
                </div>

                <FormError :errors="errors" />
                
                <button :disabled="loading"
                    class="mt-6 w-full text-white bg-[#1D56C9] rounded-xl font-bold px-8 py-3 text-sm cursor-pointer hover:bg-[#3367CE] transition-all disabled:opacity-50">
                    {{ loading ? 'Entrando...' : 'Entrar' }}
                </button>
            </form>
        </div>
    </main>
</template>