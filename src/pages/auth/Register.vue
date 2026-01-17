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
            <h1 class="text-center text-2xl font-bold">Criar Conta</h1>
            <p class="text-sm text-[#6B778F] mt-2 text-center">Crie sua conta para continuar aprendendo</p>

            <div class="bg-[#E8EAEE] w-full p-1 mt-8 rounded-xl grid grid-cols-2 gap-1">
                <router-link to="/login"
                    class="px-4 py-2 rounded-xl cursor-pointer text-center text-sm text-[#667799] font-semibold">Entrar</router-link>
                <router-link to="/register"
                    class="bg-white px-4 py-2 rounded-xl cursor-pointer text-center text-sm font-semibold">Criar
                    conta</router-link>
            </div>

            <form action="" class="mt-8">
                <div>
                    <label for="name" class="text-sm font-medium">Nome</label>
                    <div class="flex items-center gap-2 mt-2 border border-[#E0E5EE] rounded-xl pl-2.5">
                        <User class="w-5 h-5 text-[#667799]" />
                        <input type="text" name="name" id="name" placeholder="Seu nome"
                            class="w-full p-2.5 text-sm text-[#1b2232] rounded-xl">
                    </div>
                </div>
                <div class="mt-4">
                    <label for="email" class="text-sm font-medium">Email</label>
                    <div class="flex items-center gap-2 mt-2 border border-[#E0E5EE] rounded-xl pl-2.5">
                        <Mail class="w-5 h-5 text-[#667799]" />
                        <input type="text" name="email" id="email" placeholder="seu@email.com"
                            class="w-full p-2.5 text-sm text-[#1b2232] rounded-xl">
                    </div>
                </div>
                <div class="mt-4">
                    <label for="password" class="text-sm font-medium">Senha</label>
                    <div class="flex items-center gap-2 mt-2 border border-[#E0E5EE] rounded-xl pl-2.5">
                        <Lock class="w-5 h-5 text-[#667799]" />
                        <input type="password" name="password" id="password" placeholder="Mínimo 6 caracteres"
                            class="w-full p-2.5 text-sm text-[#1b2232] rounded-xl">
                    </div>
                </div>
                <div class="mt-4">
                    <label for="password_confirmation" class="text-sm font-medium">Confirmar Senha</label>
                    <div class="flex items-center gap-2 mt-2 border border-[#E0E5EE] rounded-xl pl-2.5">
                        <Lock class="w-5 h-5 text-[#667799]" />
                        <input type="password" name="password_confirmation" id="password_confirmation"
                            placeholder="Digite a senha novamente"
                            class="w-full p-2.5 text-sm text-[#1b2232] rounded-xl">
                    </div>
                </div>
                <button
                    class="mt-6 w-full text-white bg-[#1D56C9] font-bold rounded-xl px-8 py-3 text-sm cursor-pointer hover:bg-[#3367CE] transition-all">
                    Criar conta
                </button>
            </form>
        </div>
    </main>
</template>

<script setup>
import { ArrowLeft, Lock, Mail, User } from 'lucide-vue-next';
import Logo from '../../components/Logo.vue';
</script>