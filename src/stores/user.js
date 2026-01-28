import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../lib/api';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);
    const isLoaded = ref(false);

    const isAuthenticated = computed(() => !!user.value);
    const userName = computed(() => user.value?.name);
    const userPreferredName = computed(() => {
        if (!user.value?.name) return '';
        return user.value.name.split(' ')[0];
    });
    const userEmail = computed(() => user.value?.email);
    const userSequence = computed(() => user.value?.sequence || 1);

    function setUser(data) {
        user.value = data;
        isLoaded.value = true;
    }

    async function login(credentials) {
        const { data } = await api.post('/auth/login', credentials);

        localStorage.setItem('token', data.token);
        user.value = data.user;
        isLoaded.value = true;

        return data;
    }

    async function register(credentials) {
        const { data } = await api.post('/auth/register', credentials);

        localStorage.setItem('token', data.token);
        user.value = data.user;
        isLoaded.value = true;

        return data;
    }

    async function logout() {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            user.value = null;
            localStorage.removeItem('token');
        }
    }

    async function fetchUser() {
        try {
            const { data } = await api.get('/users/profile');
            user.value = data.data;
        } catch {
            logout();
        } finally {
            isLoaded.value = true;
        }
    }

    return {
        user,
        isLoaded,
        isAuthenticated,
        userName,
        userPreferredName,
        userEmail,
        userSequence,
        setUser,
        login,
        register,
        logout,
        fetchUser,
    }
});