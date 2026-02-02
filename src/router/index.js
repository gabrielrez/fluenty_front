import { createRouter, createWebHistory } from 'vue-router'

import Index from '../pages/Index.vue'
import Dashboard from '../pages/app/Dashboard.vue'
import Library from '../pages/app/Library.vue'
import Profile from '../pages/app/Profile.vue'
import Progress from '../pages/app/Progress.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Dictionary from '../pages/app/Dictionary.vue'
import Lesson from '../pages/app/Lesson.vue'

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
            {
                path: '/library',
                component: Library,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/lesson/:id',
                component: Lesson,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/dictionary',
                component: Dictionary,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/profile',
                component: Profile,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/progress',
                component: Progress,
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
