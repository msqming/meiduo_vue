import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../components/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
