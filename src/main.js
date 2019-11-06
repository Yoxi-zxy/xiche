import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
//  引入rem适配
import 'lib-flexible'
//  引入icon
import '@/assets/icon/iconfont.css'
import '@/assets/css/style.less'
import '@/assets/css/common.css'
//  引入MD5加密
import md5 from 'js-md5'
//  引入wx-jssdk
// import wx from 'weixin-jsapi'
//  全局注入md5
Vue.prototype.$md5 = md5
//  全局注入wx-jssdk
// Vue.prototype.$wx = wx
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
