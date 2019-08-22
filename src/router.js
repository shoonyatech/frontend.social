import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('./views/City.vue')
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('./views/Jobs.vue')
    },
    {
      path: '/conferences',
      name: 'conferences',
      component: () => import('./views/Conferences.vue')
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import('./views/Learn.vue')
    }
  ]
})
