import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})

// 导航收尾
router.beforeEach((to, from, next) => {
  // 判断当前是否是登录页面
  if (to.path === '/login') {
    next()
  } else {
    // 判断当前是否登录了=>看看有没有token值
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

export default router
