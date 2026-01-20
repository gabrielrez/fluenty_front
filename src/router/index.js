import { createRouter, createWebHistory } from 'vue-router'

import Index from '../pages/Index.vue'
import Dashboard from '../pages/app/Dashboard.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
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
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '/dashboard',
                component: Dashboard,
                meta: {
                    requiresAuth: true
                }
            },
        ]
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
