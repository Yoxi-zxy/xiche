<template>
  <div class="chrray-main">
    <van-cell class="chrray-cell">
      <h1 class="cell-title">{{ info.guidanceName }}</h1>
      <div class="cell-icon-text">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
        <p class="text">{{ info.address }}</p>
      </div>
      <div class="cell-icon-text">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-8" class="icon"></van-icon>
        <p class="text">{{ info.activityStartTime }}至{{ info.activityEndTime }}</p>
      </div>
    </van-cell>
    <div class="chrray-html" v-html="info.introduce"></div>
    <div class="chrray-bottom-btnBox">
      <van-button class="btn" round :to="{ path: 'apply', query: { id } }">申请报名</van-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Cell, Icon, Button } from 'vant'
export default {
  data () {
    return {
      id: '',
      info: {}
    }
  },
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  mounted () {
    this.id = this.$route.query.id
    this.getPageInfo()
  },
  methods: {
    //  获取页面详情
    getPageInfo () {
      let that = this
      let params = { tegId: that.id }
      api.businessDetails(params).then(res => {
        that.info = res.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 45px;
  box-sizing: border-box;
  .chrray-cell {
    padding: 15px;
    .cell-title {
      font-size: 17px;
      color: #333;
      font-weight: normal;
      line-height: 1.2;
      margin: 0;
    }
    .cell-icon-text {
      display: flex;
      align-items: flex-start;
      padding-top: 10px;
      .icon {
        font-size: 14px;
        color: #666;
        line-height: 1.2;
        padding-right: 10px;
        word-break: break-all;
      }
      .text {
        .icon;
        padding-right: 0;
      }
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
