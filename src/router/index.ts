import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResourceView from '../views/ResourceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ai-tools',
      name: 'ai-tools',
      component: () => import('../views/AIToolsView.vue')
    },
    {
      path: '/resources/:slug',
      name: 'resource',
      component: ResourceView
    }
  ]
})

export default router
