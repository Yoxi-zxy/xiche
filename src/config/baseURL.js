export const baseURL = process.env.NODE_ENV === 'production'
  ? ''
  : ''
export const URL = process.env.NODE_ENV === 'production' ? location.protocol + '//' + location.host : 'https://car.chrray.com'
const appId = 'wx1118d6d311bdc46c'
export const loginUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${URL}/home&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
