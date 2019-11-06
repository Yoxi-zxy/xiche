import wx from 'weixin-jsapi'
import api from '@/api/data'
const getJSSDK = (url) => {
  let parmas = {
    url
    // url: location.href.split('#')[0]
    // url: location.protocol + '//' + location.host + fullPath
  }
  return new Promise((resolve, reject) => {
    api.jssdk(parmas).then(res => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
const Title = '丰都县就业和人才服务局'
const shareImg = 'https://jyjm.cqfd.gov.cn/uploadImage/20191018142544.jpg'
const imgUrl = location.protocol + '//' + location.host
const Desc = '就能育才,业兴万家'
const wxConfig = (url) => {
  return new Promise((resolve, reject) => {
    getJSSDK(url).then(async data => {
      await wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: [
          'openLocation',
          'getLocation',
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'chooseWXPay',
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ]
      })
    }).catch(error => {
      reject(error)
    })
  })
}
const share = (params) => {
  wx.ready(() => {
    wx.onMenuShareAppMessage({
      title: params.title || Title,
      desc: params.desc || Desc,
      link: params.link,
      imgUrl: params.imgUrl || shareImg,
      success: function () {
      }
    });
    wx.onMenuShareTimeline({
      title: params.title || Title,
      link: params.link,
      imgUrl: params.imgUrl || shareImg,
      success: function () {
      }
    })
  })
}
export default {
  wxConfig,
  share,
  imgUrl,
  shareImg
}
