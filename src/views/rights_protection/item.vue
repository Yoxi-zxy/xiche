<template>
  <div class="chrray-main">
    <van-cell class="chrray-cell">
      <h1 class="cell-title">{{ pageData.companyName }}</h1>
      <div class="cell-icon-text">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
        <p class="text">{{ pageData.address }}</p>
      </div>
      <div class="cell-icon-text" @click="callPhone(pageData.phone)">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
        <p class="text">{{ pageData.phone }}</p>
      </div>
    </van-cell>
    <div class="chrray-html" v-html="pageData.rightsProtectionContext"></div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Cell, Icon, Toast } from 'vant'
export default {
  data () {
    return {
      id: '',
      pageData: {}
    }
  },
  components: {
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    //  获取详情数据
    getData () {
      let that = this
      let parmas = {
        trpId: that.id
      }
      api.protectionItem(parmas).then(res => {
        that.pageData = res.data
      }).catch(err => {
        Toast(err.msg)
      })
    },
    //  拨打电话
    callPhone (phone) {
      window.location.href = `tel:${phone}`
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
        margin: 0;
      }
      .cell-icon-text {
        display: flex;
        align-items: center;
        margin-top: 15px;
        .icon {
          font-size: 14px;
          color: #666;
          line-height: 1;
          padding-right: 10px;
        }
        .text {
          .icon;
          padding-right: 0;
        }
      }
    }
  }
</style>
