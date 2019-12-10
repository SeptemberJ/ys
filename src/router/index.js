import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import store from '../vuex/store'
import {getCookie, clearCookie} from '../util/utils'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {requireAuth: false}
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {requireAuth: true}
    },
    {path: '*', redirect: '/Login'}
  ]
})

// 登录控制
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    localStorage.clear('vuex-along')
    store.dispatch('changeLocationIdx', 0)
    store.dispatch('changeSiderIdx', '1-1')
    clearCookie('btwccy_cookie')
  }
  if (to.meta.requireAuth) {
    if (getCookie('btwccy_cookie')) {
      // 登陆后可以跳转
      next()
    } else {
      localStorage.clear()
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})
export default router
