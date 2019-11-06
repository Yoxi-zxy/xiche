<template>
  <div class="chrray-main">
    <van-cell-group>
      <van-cell
        class="chrray-cell"
        v-for="(item, index) in pageInfo"
        :to="{ path: 'item', query: { id: item.ttmId } }"
        :key="index">
        <h1 class="cell-title">{{ item.schoolName }}</h1>
        <p class="cell-des">{{ item.schoolAbstract }}</p>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import api from '@/api/data'
import { Icon, Button, Cell, CellGroup, Toast } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      pageInfo: []
    }
  },
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let that = this
      api.trainList().then(res => {
        that.pageInfo = res.data
      }).catch(err => {
        Toast(err.msg)
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-cell {
  padding: 15px;
  .cell-title {
    font-size: 16px;
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
</style>
