<template>
  <div class="chrray-main">
    <div class="chrray-apply-content">
      <h1 class="title">{{ info.ensTitle }}</h1>
      <div class="chrray-html" v-html="info.ensDetails"></div>
    </div>
    <div class="chrray-bottom-btnBox">
      <van-button class="btn" round :to="{ path: 'form', query: { id: info.tesId } }">我要申请</van-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Button, Toast } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      info: {}
    }
  },
  components: {
    [Button.name]: Button
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    //  获取申请类型
    getData () {
      let that = this
      let params = {
        type: that.id
      }
      api.fundsDetails(params).then(res => {
        that.info = res.data
        //  自定义分享样式
        let shareData = {
          title: res.data.ensTitle,
          link: location.href
        }
        wxApi.share(shareData)
      }).catch(err => {
        Toast(err.msg)
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  min-height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
  .chrray-apply-content {
    padding: 15px 15px 45px;
    .title {
      font-size: 18px;
      color: #333;
      margin: 0;
    }
    .chrray-html {
      padding: 0;
      padding-top: 15px;
    }
  }
  .chrray-bottom-btnBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    .btn {
      width: 100%;
      border-radius: 0;
      border: 0;
      background-color: #3679FF;
      font-size: 15px;
      color: #fff;
    }
  }
}
</style>
