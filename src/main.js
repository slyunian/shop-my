// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './comment/css/comment.css'
import axios from 'axios'
// 树结构表格
import ElTreeGrid from 'element-tree-grid'
Vue.component(ElTreeGrid.name, ElTreeGrid)
// 设置基础路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$axios = axios
// 在所有的請求前先执行统一处理,处理后就不用单独设置请求头了
//  方法1
axios.defaults.headers['Authorization'] = localStorage.getItem('token')
// axios拦截器
// axios.interceptors.request.use(
//   config => {
//     config.headers.Authorization = localStorage.getItem('token')
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
