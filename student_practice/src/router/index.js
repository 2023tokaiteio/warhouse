import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../components/index'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index
  },
]

const router = new VueRouter({
  routes
})

export default router
