export const baseURL = process.env.NODE_ENV === 'production'
  ? ''
  : ''
export const URL = process.env.NODE_ENV === 'production' ? location.protocol + '//' + location.host : 'https://jyjm.cqfd.gov.cn'
const appId = 'wxba797acea100b703'
export const loginUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${URL}/login/index&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
