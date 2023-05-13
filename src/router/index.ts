import { createRouter, createWebHistory } from 'vue-router'
import AppVue from '../App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppVue
    },
    {
      path: '/tags/:tag',
      name: 'tags',
      component: AppVue,
    },
    {
      path: '/posts/:slug',
      name: 'posts',
      component: AppVue,
    },
    {
      path: '/search/:search',
      name: 'search',
      component: AppVue,
    }
  ]
})

export default router
