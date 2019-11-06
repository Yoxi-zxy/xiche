<template>
  <div class="chrray-main">
    <van-cell class="chrray-cell">
      <h1 class="cell-title">{{ pageInfo.skillName }}</h1>
<!--      <p class="cell-des">报名结束时间：{{ pageInfo.registrationEndTime.split(' ')[0] }}</p>-->
<!--      <p class="cell-des">培训时间：{{ pageInfo.trainStartTime.split(' ')[0] }}至{{ pageInfo.trainEndTime.split(' ')[0] }}</p>-->
<!--      <p class="cell-des">培训地址：{{ pageInfo.detailAddress }}</p>-->
    </van-cell>
    <div class="chrray-html" v-html="pageInfo.skillContext"></div>
<!--    <div class="post-btn" v-if="isExpired">-->
<!--      <van-button type="button" class="btn" @click="signUp">我要报名</van-button>-->
<!--    </div>-->
  </div>
</template>

<script>
import api from '@/api/data'
import { Cell, Toast, Button, Dialog } from 'vant'
import { getToken } from '@/lib/util'
import { loginUrl } from '@/config/baseURL'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      pageInfo: {},
      id: '',
      isExpired: 1
    }
  },
  components: {
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  mounted () {
    // this.id = this.$route.query.id
    // this.isExpired = this.$route.query.isExpired
    this.getData()
  },
  methods: {
    //  获取参数
    getData () {
      let that = this
      api.skillsTraining().then(res => {
        that.pageInfo = res.data
        //  自定义分享样式
        let shareData = {
          title: this.$route.meta.title + '-' + res.data.skillName,
          link: location.href
        }
        wxApi.share(shareData)
      }).catch(err => {
        Toast(err.msg)
      })
    },
    //  报名培训
    signUp () {
      let that = this
      let Token = getToken()
      let fullPath = that.$route.fullPath
      if (!Token) {
        Dialog.alert({
          message: '您尚未登录,请前往登录'
        }).then(() => {
          localStorage.setItem('toPath', fullPath)
          window.location.href = loginUrl
        })
      } else {
        that.$store.dispatch('authorization', Token).then(() => {
          //  token有效
          Dialog.confirm({
            message: '本人是否对本次培训需求负责'
          }).then(() => {
            //  接口调用
            let params = {
              tokenId: localStorage.getItem('tokenId'),
              trainProjectId: that.id
            }
            api.aplayTrain(params).then(res => {
              Toast(res.msg)
            }).catch(err => {
              Toast(err.msg)
            })
          }).catch(() => {
            //
          })
        }).catch(() => {
          // token失效,重新登录
          Dialog.alert({
            message: '您的信息已过期,请重新登录'
          }).then(() => {
            localStorage.setItem('toPath', fullPath)
            localStorage.removeItem('tokenId')
            window.location.href = loginUrl
          });
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .chrray-main {
    min-height: 100vh;
    background-color: #fff;
    .chrray-cell {
      padding: 15px;
      .cell-title {
        font-size: 17px;
        color: #333;
        font-weight: normal;
        line-height: 1.2;
        padding-bottom: 10px;
        margin: 0;
      }
      .cell-des {
        font-size: 13px;
        color: #666;
        line-height: 1.5;
        margin: 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-align: left;
        word-break: break-all;
      }
    }
    .chrray-html {
      padding-bottom: 60px;
    }
    .post-btn {
      width: 100%;
      padding: 10px 15px;
      position: fixed;
      box-sizing: border-box;
      bottom: 0;
      background-color: transparent;
      text-align: center;
      .btn {
        width: 100%;
        background-color: #006cd1;
        border-radius: 5px;
        padding: 15px;
        font-size: 15px;
        color: #fff;
        line-height: 1;
        border: 0;
      }
    }
  }
</style>
