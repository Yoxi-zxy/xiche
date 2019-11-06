<template>
  <div class="chrray-main">
    <van-tabs class="chrray-tabs">
      <van-tab title="报名中" name="0">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          class="chrray-list"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多数据啦"
          @load="onLoad">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in pageIng"
              class="chrray-cell"
              :to="{ path: 'item', query: {id: item.trainProjectId, isExpired: 1} }"
              :key="index">
              <h1 class="cell-title">{{ item.trainProjectName }}</h1>
              <p class="cell-des">{{ item.trainProjectTitle }}</p>
              <p class="cell-des">报名结束时间：{{ item.registrationEndTime.split(' ')[0] }}</p>
              <p class="cell-des">培训时间：{{ item.trainStartTime.split(' ')[0] }}至{{ item.trainEndTime.split(' ')[0] }}</p>
            </van-cell>
          </van-cell-group>
        </van-list>
      </van-tab>
      <van-tab title="已过期" name="1">
        <van-list
          v-model="loadings"
          :finished="finisheds"
          :error.sync="errors"
          class="chrray-list"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多数据啦"
          @load="onLoads">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in pageExpired"
              class="chrray-cell"
              :to="{ path: 'item', query: {id: item.trainProjectId, isExpired: 0} }"
              :key="index">
              <h1 class="cell-title">{{ item.trainProjectName }}</h1>
              <p class="cell-des">{{ item.trainProjectTitle }}</p>
              <p class="cell-des">报名结束时间：{{ item.registrationEndTime.split(' ')[0] }}</p>
              <p class="cell-des">培训时间：{{ item.trainStartTime.split(' ')[0] }}至{{ item.trainEndTime.split(' ')[0] }}</p>
            </van-cell>
          </van-cell-group>
        </van-list>
      </van-tab>
    </van-tabs>
    <div class="post-btn">
      <van-button type="button" class="btn" :to="{ path: '/train/add' }">我要登记培训</van-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Tab, Tabs, List, Cell, CellGroup, Button } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      error: false,
      pageInfo1: {
        pastDue: 1,
        page: 1,
        rows: 10
      },
      pageIng: [],
      //  已过期
      loadings: false,
      finisheds: false,
      errors: false,
      pageInfo2: {
        pastDue: 0,
        page: 1,
        rows: 10
      },
      pageExpired: []
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
  },
  mounted () {
    //  自定义分享样式
    let shareData = {
      title: this.$route.meta.title,
      link: location.href
    }
    wxApi.share(shareData)
  },
  methods: {
    onLoad () {
      this.getIng()
    },
    //  已报名
    getIng () {
      let that = this
      api.trainSelect(that.pageInfo1).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo1.page += 1
          that.pageIng = that.pageIng.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    //  自动加载已过期
    onLoads () {
      this.getExpired()
    },
    //  已过期
    getExpired () {
      let that = this
      api.trainSelect(that.pageInfo2).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo2.page += 1
          that.pageExpired = that.pageExpired.concat(tempData)
        } else {
          that.finisheds = true
        }
        that.loadings = false
      }).catch(() => {
        this.errors = true
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  .chrray-list {
    padding-bottom: 64px;
  }
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
      padding: 4px 0;
      word-break: break-all;
    }
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
