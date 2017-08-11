import Vue from 'vue'
import VueRouter from 'vue-router'
// import Resource from 'vue-resource'
import routes from './router/router'
import Swiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'  // 引入图片懒加载模块
import infiniteScroll from 'vue-infinite-scroll';  // 引入滑动模块,无限加载
import axios from 'axios'      //使用axios进行ajax的交互
import VueAxios from 'vue-axios'
import store from './vuex/store'
import './config/rem.js'
// Vue.prototype.$http = axios;
import App from './App'

// Vue.use(axios)
Vue.use(VueRouter)
// Vue.use(Resource)
Vue.use(Swiper)
Vue.use(infiniteScroll)
Vue.use(VueLazyload,{
  error: require('./assets/404.png'),
  loading: require('./assets/loading.gif'),
  attempt: 1
})

const router = new VueRouter({
  mode: 'history',
  routes
})

//全局过滤的方法
Vue.filter("money",(value)=>{
  return "¥" + value.toFixed(2)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // render: h => h(App)
  template: '<App/>',
  components: { App }
})
