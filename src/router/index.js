import { createRouter, createWebHistory } from 'vue-router'

import Index from '../pages/Index.vue'
import Home from '../pages/app/Home.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
            breadcrumb: 'Início',
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token')

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ path: '/login' })
    } else {
        next()
    }
})

export default router
