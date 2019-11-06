<template>
  <div class="chrray-main">
    <van-cell-group>
      <div v-for="(item, index) in pageInfo" :key="oldIndex">
        <van-cell
          class="chrray-cell"
          :to="{ path: 'item', query: { id: item.tesId } }">
          <h1 class="cell-title">{{ item.ensTitle }}</h1>
          <p class="cell-des">{{ item.ensAbstract }}</p>
        </van-cell>
        <!-- 判断是否有活动列表 -->
        <!--<van-cell-->
          <!--v-if="item.template"-->
          <!--class="chrray-cell"-->
          <!--:to="{ path: 'activity', query: { id: item.ttmId } }">-->
          <!--<h1 class="cell-title">{{ item.schoolName }}</h1>-->
          <!--<p class="cell-des">{{ item.schoolAbstract }}</p>-->
        <!--</van-cell>-->
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import api from '@/api/data'
import { Icon, Button, Cell, CellGroup, Toast } from 'vant'
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
    //  获取参数
    getData () {
      let that = this
      api.shipList().then(res => {
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
    border-bottom: 1PX solid #f2f2f2;
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
