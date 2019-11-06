import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '@/store'
import { getToken } from '../lib/util'
import { Dialog, Toast } from 'vant'
import { loginUrl } from '@/config/baseURL'
//  跳转获取签名
import wxApi from '@/utils/weixin'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const Token = getToken()
  let shareData = {
    title: to.meta.title,
    link: location.href
  }
  let url = location.protocol + '//' + location.host + to.fullPath
  wxApi.wxConfig(url)
  // if (to.meta.title) {
  // wxApi.share(to.meta.title, that.getSimpleText(res.data.newContext), location.href, res.data.imageList.length > 0 ? imgUrl + res.data.imageList[0].imageUrl : loginUrl)
  wxApi.share(shareData)
  // }
  if (to.meta.isToken) {
    if (Token) {
      store.dispatch('authorization', Token).then(() => {
        //  token有效
        if (to.name === 'login') next({ path: '/' })
        else next()
      }).catch(err => {
        if (err.code === '7001') {
          // token失效,重新登录
          Dialog.alert({
            message: '您的信息已过期,请重新登录'
          }).then(() => {
            localStorage.setItem('toPath', to.fullPath)
            localStorage.removeItem('tokenId')
            window.location.href = loginUrl
            // if (to.name === 'login') next()
            // else next({ name: 'login' })
          })
        } else if (err.code === '0002') {
          Toast(`系统异常`)
        }
      })
    } else {
      Dialog.alert({
        message: '您尚未登录,请前往登录'
      }).then(() => {
        localStorage.setItem('toPath', to.fullPath)
        window.location.href = loginUrl
        // if (to.name === 'login') next()
        // else next({ name: 'login' })
      });
    }
  } else {
    next()
  }
})

export default router
