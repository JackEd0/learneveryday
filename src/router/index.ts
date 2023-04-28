import { createRouter, createWebHistory } from 'vue-router'
// import TagVue from '../pages/Tag.vue'
// import PostVue from '../pages/Post.vue'
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: AppVue,
      component: MainVue,
      // props: (route) => ({ tag: route.params.tag }),
    },
    {
      path: '/posts/:slug',
      name: 'posts',
      component: MainVue,
      // component: AppVue,
      // component: () => import('../components/Main.vue'),
      // props: (route) => ({ slug: route.params.slug }),
    }
  ]
})

export default router
