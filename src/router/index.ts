import { storageHandler } from '@/lib/localStorage'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../pages/AboutPage.vue')
    },
    {
      path: '/auth',
      name: 'Auth',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('../pages/auth/LoginPage.vue')
        },
        {
          path: 'signup',
          name: 'Signup',
          component: () => import('../pages/auth/SignupPage.vue')
        }
      ]
    },
    {
      path: '/ai-tools',
      name: 'AiTools',
      component: () => import('../pages/AiToolsPage.vue')
    },
    {
      path: '/ai-tools/:slug',
      name: 'AiTool',
      component: () => import('../pages/AiToolPage.vue')
    },
    {
      path: '/ai-tool-categories/:name',
      name: 'AiToolCategory',
      component: () => import('../pages/AiToolCategoryPage.vue')
    },
    {
      path: '/resources/:slug',
      name: 'Resource',
      component: () => import('../pages/ResourcePage.vue')
    },
    {
      path: '/countries',
      name: 'Countries',
      component: () => import('../pages/CountriesPage.vue')
    },
    {
      path: '/countries/:name',
      name: 'Country',
      component: () => import('../pages/CountryPage.vue')
    },
    {
      path: '/courses',
      name: 'Courses',
      component: () => import('../pages/CoursesPage.vue')
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import('../pages/EventsPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../pages/NotFoundPage.vue')
    }
  ]
})

const isAuthenticated = storageHandler.getToken()!!

router.beforeEach((to, from, next) => {
  if (to.name === 'Home') next()
  else if (to.path.startsWith('/auth') && isAuthenticated) next({ name: 'Home' })
  else if (!to.path.startsWith('/auth') && !isAuthenticated)
    next({ name: 'Login', state: { redirectUrl: to.path } })
    
  else next()
})

export default router
