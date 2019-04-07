import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Roles from '@/components/roles/roles.vue'
import Rights from '@/components/rights/rights.vue'
import Categories from '@/components/categories/categories.vue'
import Goods from '@/components/goods/goods.vue'
import GoodsAdd from '@/components/goods-add/goodsAdd.vue'

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
      component: Home,
      children: [
        {
          path: '/users/:page?',
          component: Users
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        },
        { path: '/categories', component: Categories },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
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
