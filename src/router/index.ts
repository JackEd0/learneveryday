import { createRouter, createWebHistory } from 'vue-router'
import MainVue from '../components/Main.vue'
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
      // component: MainVue,
      component: AppVue,
    },
    {
      path: '/posts/:slug',
      name: 'posts',
      component: AppVue,
    }
  ]
})

export default router
