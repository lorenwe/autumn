import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/pages/Admin'
import Canvas from '@/pages/Canvas'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Canvas',
      name: 'Canvas',
      component: Canvas,
      children: [
        {
          path: '/Login',
          component: resolve => require(['@/pages/Login.vue'], resolve)
        },
        {
          path: '/Regist',
          component: resolve => require(['@/pages/Regist.vue'], resolve)
        }
      ],
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/Home',
          component: resolve => require(['@/pages/Home.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/Admin/',
          redirect: '/Home'
        },
        {
          path: '/Tag',
          component: resolve => require(['@/pages/Tag.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/About',
          component: resolve => require(['@/pages/About.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/Out',
          component: resolve => require(['@/pages/Out.vue'], resolve),
          meta: {
            requireAuth: true
          }
        }
      ],
      meta: {
        requireAuth: true
      }
    }
  ]
})

// 验证 token，存在才跳转
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})

export default router
