<template>
  <div class="chrray-main">
    <van-cell class="chrray-cell">
      <h1 class="cell-title">{{ pageInfo.ensTitle }}</h1>
      <p class="cell-des">{{ pageInfo.ensAbstract }}</p>
    </van-cell>
    <div class="chrray-html" v-html="pageInfo.ensDetails"></div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Cell, Toast } from 'vant'
export default {
  data () {
    return {
      pageInfo: {},
      id: ''
    }
  },
  components: {
    [Cell.name]: Cell,
    [Toast.name]: Toast
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    //  获取参数
    getData () {
      let that = this
      let params = {
        tesId: that.id
      }
      api.shipDetails(params).then(res => {
        that.pageInfo = res.data
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
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-align: left;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      word-break: break-all;
    }
  }
}
</style>
