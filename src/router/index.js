import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Tag from '@/pages/Tag'
import About from '@/pages/About'
import Login from '@/pages/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/tag',
      name: 'Tag',
      component: Tag
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/out',
      name: 'Out',
      component: Login
    }
  ]
})

export default router
