import axios from 'axios'
import { baseURL } from '../config/baseURL'

// import { Toast } from 'vant'
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }

  //  请求全局配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl
    }
    return config
  }

  //  设置拦截器
  interceptors (instance, url) {
    //  请求拦截器
    instance.interceptors.request.use(config => {
      config.url = '/api/' + config.url
      //  添加全局loading...
      // if (!Object.keys(this.queue).length) {
      //   Toast.loading({
      //     mask: true,
      //     message: '加载中...'
      //   });
      // }
      // this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    //  返回拦截器
    instance.interceptors.response.use(res => {
      // delete this.queue[url]
      // if (JSON.stringify(this.queue) === '{}') {
      //  由于链式请求的原因,设置一秒的延时消失
      //   setTimeout(() => {
      //     Toast.clear()
      //   }, 1000)
      // }
      if (res.data.code === '2000') {
        return res.data
      } else {
        return Promise.reject(res.data)
      }
    }, error => {
      // console.log(error.response)
      if (error.response.status === 502) {
        let eror = {
          msg: '服务器出错,请联系管理员'
        }
        return Promise.reject(eror)
      } else {
        return Promise.reject(error)
      }
      // delete this.queue[url]
    })
  }

  request (options) {
    const instance = axios.create()
    //  使用object.assign将内部定义的options和传过来的options合并为一个对象,相同的key后面覆盖前面的
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
