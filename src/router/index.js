import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Tag from '@/pages/Tag'
import About from '@/pages/About'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
