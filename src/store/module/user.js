import api from '@/api/data'
import { Toast } from 'vant'
const actions = {
  authorization ({ commit }, token) {
    return new Promise((resolve, reject) => {
      api.authorization({
        tokenId: token
      }).then(res => {
        if (res.success) {
          commit('set_userInfo', res.data)
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        if (String(error) === 'Error: Request failed with status code 500') {
          Toast(`服务器异常,请联系管理员`)
        } else {
          reject(error)
        }
      })
    })
  }
}
export default {
  actions
}
