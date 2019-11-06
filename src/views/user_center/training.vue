<template>
  <div class="chrray-main">
    <van-tabs class="chrray-tabs">
      <van-tab title="我的报名" name="0">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多数据啦"
          @load="onLoad">
          <van-panel
            v-for="(item, index) in List1"
            :key="index"
            class="chrray-panel">
            <div slot="header">
              <div class="sort-box" @click="jump(item.trainProjectId)">
                <p class="text">{{ item.trainProjectName }}</p>
                <van-icon name="arrow" class="time"></van-icon>
              </div>
            </div>
            <div class="firm-info__wrapper">
              <div class="firm-des">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
                <p class="text">培训地址：{{ item.detailAddress }}</p>
              </div>
              <div class="firm-des last">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
                <p class="text">培训时间：{{ item.trainStartTime.split(' ')[0] }}至{{ item.trainEndTime.split(' ')[0] }}</p>
              </div>
              <div class="firm-des two">
                <van-icon name="orders-o" class="icon"></van-icon>
                <p class="text">报名时间：{{ item.registrationEndTime.split(' ')[0] }}</p>
              </div>
            </div>
          </van-panel>
        </van-list>
      </van-tab>
      <van-tab title="我的培训需求" name="1">
        <van-list
          v-model="loadings"
          :finished="finisheds"
          :error.sync="errors"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多数据啦"
          @load="onLoads">
          <van-panel v-for="(item, index) in List2" :key="index" class="chrray-panel">
            <div slot="header">
              <div class="sort-box">
                <p class="text" v-if="!item.jobTwoCate">{{ item.jobCate }}</p>
                <p class="text" v-if="item.jobTwoCate">{{ item.jobCate }}-{{ item.jobTwoCate }}</p>
                <time class="time">提交时间: {{ item.addTime.split(' ')[0] }}</time>
              </div>
            </div>
            <div class="firm-info__wrapper">
              <div class="firm-des">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
                <p class="text">培训地区：{{ item.regionName }}</p>
              </div>
              <div class="firm-des last">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
                <p class="text">培训时间：{{ item.trainStartTime | timeComp }} {{ item.trainCycle }}天 {{ item.dayAndNight === 1 ? '白天' : '晚上' }} {{ item.upAndDown === 1 ? '线上' : '线下' }}</p>
              </div>
              <div class="firm-des two ">
<!--                <van-icon name="orders-o" class="icon"></van-icon>-->
                <p class="text left0">培训要求：{{ item.trainAsk }}</p>
              </div>
            </div>
          </van-panel>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from '@/api/data'
import { Tab, Tabs, List, Icon, Panel, Button } from 'vant'
import { timestampToTime } from '@/lib/util'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      error: false,
      pageInfo1: {
        tokenId: localStorage.getItem('tokenId'),
        page: 1,
        rows: 10
      },
      List1: [],
      loadings: false,
      finisheds: false,
      errors: false,
      pageInfo2: {
        tokenId: localStorage.getItem('tokenId'),
        page: 1,
        rows: 10
      },
      List2: []
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Panel.name]: Panel
  },
  //  过滤器
  filters: {
    timeComp (time) {
      return timestampToTime(time / 1000).split(' ')[0]
    }
  },
  methods: {
    //  我的报名自动加载
    onLoad () {
      this.getSign()
    },
    //  我的报名数据
    getSign () {
      let that = this
      api.signUpData(that.pageInfo1).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo1.page += 1
          that.List1 = that.List1.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    //  跳转报名详情页
    jump (id) {
      this.$router.push({ path: '/train/item', query: { id } })
    },
    //  我的培训需求自动加载
    onLoads () {
      this.getDemand()
    },
    //  我的培训需求
    getDemand () {
      let that = this
      api.demandData(that.pageInfo2).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo2.page += 1
          that.List2 = that.List2.concat(tempData)
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
  .chrray-panel {
    /*713736*/
    .sort-box {
      border-bottom: 1PX solid #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      .text {
        font-size: 15px;
        color: #333;
        line-height: 1;
      }
      .time {
        .text;
        color: #999;
      }
      .status {
        .text;
        color: #006CD1;
        &.red {
          color: #FF1A03;
        }
      }
    }
    .firm-info__wrapper {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 15px 0 10px;
      background-color: #fff;
      &.typeOne {
        flex-direction: row;
        .typeOne-text {
          font-size: 15px;
          color: #333;
        }
        .typeOne-content {
          padding-left: 15px;
          .text {
            color: #666;
            font-size: 15px;
            margin-bottom: 15px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .firm-name {
        font-size: 16px;
        color: #333;
        line-height: 1;
        font-weight: 400;
        margin: 0;
        text-align: left;
      }
      .firm-des {
        margin: 15px 0;
        display: flex;
        align-items: center;
        &.last {
          margin: 0;
        }
        &.two {
          margin-bottom: 0;
        }
        .icon {
          font-size: 14px;
          color: #666;
          line-height: 1;
        }
        .text {
          padding-left: 10px;
          &.left0 {
            padding-left: 0;
          }
          .icon
        }
      }
      .leftIcon {
        position: absolute;
        right: 15px;
        top: 50%;
        color: #006CD1;
        padding: 5px 0;
        transform: translateY(-50%);
      }
    }
    .cy-card-footer {
      text-align: right;
      .btn {
        background-color: transparent;
        height: auto;
        border: 1px solid #e5e5e5;
        border-radius: 2000px;
        font-size: 14px;
        color: #666;
        line-height: 1;
        padding: 8px 17px;
        &:not(:last-child) {
          margin-right: 15px;
        }
      }
      .text {
        color: #666;
        font-size: 14px;
      }
    }
  }
}
</style>
