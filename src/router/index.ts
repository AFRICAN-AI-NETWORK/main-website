import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/ai-tools',
      name: 'AiTools',
      component: () => import('../views/AIToolsView.vue')
    },
    {
      path: '/resources/:slug',
      name: 'Resource',
      component: () => import('../views/ResourceView.vue')
    },
    {
      path: '/ai-tools/:slug',
      name: 'AiTool',
      component: () => import('../views/AIToolView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
