<template>
  <div class="chrray-main">
    <div v-if="this.$route.meta.hidden">
      <van-tabs class="chrray-tabs">
        <van-tab v-for="(items, index) in testList" :key="index" :title="items.title" :name="items.name">
          <van-list
            v-if="items.name === 1"
            v-model="loading"
            :finished="finished"
            :error.sync="error"
            class="chrray-list"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多数据啦"
            @load="onLoad">
            <van-panel
              v-for="(item, index) in dataList"
              :key="index"
              class="chrray-panel">
              <div slot="header">
                <div class="sort-box" @click="jump(item.tcsId, item.type)">
                  <p class="text" v-if="item.type === 1">我申请的资金支持-个人</p>
                  <p class="text" v-if="item.type === 2">我申请的资金支持-企业</p>
                  <van-icon name="arrow" class="icon"></van-icon>
                </div>
              </div>
              <div class="panel-body">
                <div class="body-list-item one" v-if="item.type === 2">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-7" class="icon"></van-icon>
                  <p class="text">企业名称：{{ item.enterpriseName }}</p>
                </div>
                <div class="body-list-item">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-1" class="icon"></van-icon>
                  <p class="text">申请人：{{ item.applyPersonName }}</p>
                </div>
                <div class="body-list-item">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
                  <p class="text">联系电话：{{ item.telephone }}</p>
                </div>
                <div class="body-list-item">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-8" class="icon"></van-icon>
                  <p class="text">申请时间：{{ item.addTime }}</p>
                </div>
              </div>
            </van-panel>
          </van-list>
          <van-list
            v-if="items.name === 2"
            v-model="loading2"
            :finished="finished2"
            :error.sync="error2"
            class="chrray-list"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多数据啦"
            @load="onLoad2">
            <van-panel
              v-for="(item, index) in dataList2"
              :key="index"
              class="chrray-panel">
              <div slot="header">
                <div class="sort-box" @click="jump(item.tcsId, item.type)">
                  <p class="text" v-if="item.type === 3">我申请的场地支持-个人</p>
                  <p class="text" v-if="item.type === 4">我申请的场地支持-企业</p>
                  <van-icon name="arrow" class="icon"></van-icon>
                </div>
              </div>
              <div class="panel-body">
                <div class="body-list-item one" v-if="item.type === 4">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-7" class="icon"></van-icon>
                  <p class="text">企业名称：{{ item.enterpriseName }}</p>
                </div>
                <div class="body-list-item">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-1" class="icon"></van-icon>
                  <p class="text">申请人：{{ item.applyPersonName }}</p>
                </div>
                <div class="body-list-item">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
                  <p class="text">联系电话：{{ item.telephone }}</p>
                </div>
                <div class="body-list-item">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-8" class="icon"></van-icon>
                  <p class="text">申请时间：{{ item.addTime }}</p>
                </div>
              </div>
            </van-panel>
          </van-list>
          <van-list
            v-if="items.name === 3"
            v-model="loading3"
            :finished="finished3"
            :error.sync="error3"
            class="chrray-list"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多数据啦"
            @load="onLoad3">
            <van-panel
              v-for="(item, index) in dataList3"
              :key="index"
              class="chrray-panel">
              <div slot="header">
                <div class="sort-box" @click="jump(item.tcsId, item.type)">
                  <p class="text" v-if="item.type === 5">我申请的导师指导</p>
                  <p class="text" v-if="item.type === 6">我申请的创业活动</p>
                  <van-icon name="arrow" class="icon"></van-icon>
                </div>
              </div>
              <div class="panel-body">
                <div class="body-list-item one" v-if="item.type === 5">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-31" class="icon"></van-icon>
                  <p class="text">导师名称：{{ item.ensTitle }}</p>
                </div>
                <div class="body-list-item one" v-if="item.type === 6">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-4" class="icon"></van-icon>
                  <p class="text">活动名称：{{ item.ensTitle }}</p>
                </div>
                <div class="body-list-item">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-1" class="icon"></van-icon>
                  <p class="text">申请人：{{ item.applyPersonName }}</p>
                </div>
                <div class="body-list-item">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
                  <p class="text">联系电话：{{ item.telephone }}</p>
                </div>
                <div class="body-list-item">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-8" class="icon"></van-icon>
                  <p class="text">申请时间：{{ item.addTime }}</p>
                </div>
              </div>
            </van-panel>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import api from '@/api/data'
import { Tab, Tabs, List, Panel, CellGroup, Button, Icon } from 'vant'
export default {
  data () {
    return {
      //  资金
      loading: false,
      finished: false,
      error: false,
      pageInfo: {
        type: 1,
        tokenId: localStorage.getItem('tokenId'),
        page: 1,
        rows: 10
      },
      dataList: [],
      //  场地
      loading2: false,
      finished2: false,
      error2: false,
      pageInfo2: {
        type: 2,
        tokenId: localStorage.getItem('tokenId'),
        page: 1,
        rows: 10
      },
      dataList2: [],
      //  指导
      loading3: false,
      finished3: false,
      error3: false,
      pageInfo3: {
        type: 3,
        tokenId: localStorage.getItem('tokenId'),
        page: 1,
        rows: 10
      },
      dataList3: [],
      testList: [
        {
          title: '资金申请',
          name: 1
        },
        {
          title: '场地申请',
          name: 2
        },
        {
          title: '创业指导申请',
          name: 3
        }
      ]
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Panel.name]: Panel,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  methods: {
    //  资金自动加载
    onLoad () {
      // 异步更新数据
      this.getFundsList()
    },
    //  资金
    getFundsList () {
      let that = this
      api.businessApplyList(that.pageInfo).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo.page += 1
          that.dataList = that.dataList.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    //  场地自动加载
    onLoad2 () {
      // 异步更新数据
      this.getSiteList()
    },
    //  场地
    getSiteList () {
      let that = this
      api.businessApplyList(that.pageInfo2).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo2.page += 1
          that.dataList2 = that.dataList2.concat(tempData)
        } else {
          that.finished2 = true
        }
        that.loading2 = false
      }).catch(() => {
        this.error2 = true
      })
    },
    //  创业指导自动加载
    onLoad3 () {
      // 异步更新数据
      this.getGuideList()
    },
    //  创业指导
    getGuideList () {
      let that = this
      api.businessApplyList(that.pageInfo3).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo3.page += 1
          that.dataList3 = that.dataList3.concat(tempData)
        } else {
          that.finished3 = true
        }
        that.loading3 = false
      }).catch(() => {
        this.error3 = true
      })
    },
    //  跳转详情页
    jump (id, typeId) {
      console.log(id)
      console.log(typeId)
      this.$router.push({
        path: 'business/details',
        query: { id, typeId }
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  .chrray-panel {
    padding: 15px 0 15px 15px;
    .sort-box {
      border-bottom: 1PX solid #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      padding-right: 15px;
      .text {
        font-size: 15px;
        color: #333;
        line-height: 1;
      }
    }
    .panel-body {
      padding-top: 15px;
      display: flex;
      flex-wrap: wrap;
      .body-list-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        margin-right: 22px;
        &.one {
          width: 100%;
        }
        .icon {
          font-size: 14px;
          color: #666;
          line-height: 1;
        }
        .text {
          .icon;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
