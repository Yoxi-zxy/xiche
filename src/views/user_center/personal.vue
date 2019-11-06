<template>
  <div class="chrray-main">
    <van-tabs class="chrray-tabs">
      <van-tab title="我的预约" name="0">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多数据啦"
          @load="onLoad">
          <van-panel v-for="(item, index) in List1" :key="index" class="chrray-panel">
            <div slot="header">
              <div class="sort-box">
                <p class="text">{{ item.twoLevelName }}</p>
                <time class="time">预约时间: {{ item.bookTime }}点</time>
              </div>
            </div>
            <div class="firm-info__wrapper">
              <h1 class="firm-name">{{ item.townshipName }}-{{ item.jotName }}</h1>
              <div class="firm-des">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
                <p class="text">{{ item.dotDetailedAddress }}</p>
              </div>
              <div class="firm-des last">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
                <p class="text">{{ item.dotTelephone }}</p>
              </div>
              <div class="firm-des two">
                <van-icon name="orders-o" class="icon"></van-icon>
                <p class="text">{{ item.reservationNumber }}</p>
              </div>
            </div>
          </van-panel>
        </van-list>
      </van-tab>
      <van-tab title="我的审核" name="1">
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
              <p class="text">{{ item.twoLevelName }}</p>
              <p class="status" v-if="item.auditStatus === 0">审核中</p>
              <p class="status" v-if="item.auditStatus === 1">审核通过</p>
              <p class="status red" v-if="item.auditStatus === 2">审核失败</p>
            </div>
          </div>
          <router-link :to="{ path: 'curStatus', query: { id: item.oamId }}">
            <div class="firm-info__wrapper typeOne">
              <p class="typeOne-text">办理人</p>
              <div class="typeOne-content">
                <p class="text">{{ item.applicant }}</p>
                <p class="text">{{ item.applicantPhone }}</p>
              </div>
            </div>
          </router-link>
          <div slot="footer">
            <div class="cy-card-footer">
              <van-button class="btn" v-if="item.auditStatus === 0" :to="{ path: 'curStatus', query: { id: item.oamId } }">查看资料</van-button>
              <van-button class="btn" v-if="item.auditStatus === 2" @click="lookAlert(item.findingsOfAudit, item.oamId, item.templateNumber)">查看原因</van-button>
              <van-button class="btn" v-if="item.auditStatus === 2" @click="jump(item.oamId, item.templateNumber)">修改</van-button>
              <p class="text" v-if="item.auditStatus === 1">请带上已审核通过的资料，来柜台办理</p>
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
import { Tab, Tabs, List, Icon, Panel, Button, Dialog } from 'vant';
export default {
  data () {
    return {
      loading: false,
      finished: false,
      error: false,
      loadings: false,
      finisheds: false,
      errors: false,
      List1: [],
      List2: [],
      bookingInfo: {
        page: 1,
        rows: 10,
        tokenId: '',
        individualOrEnterprise: ''
      },
      auditInfo: {
        page: 1,
        rows: 10,
        tokenId: '',
        individualOrEnterprise: ''
      }
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Panel.name]: Panel,
    [Dialog.name]: Dialog
  },
  mounted () {
    this.auditInfo.tokenId = localStorage.getItem('tokenId')
    this.auditInfo.individualOrEnterprise = this.$route.query.userSort
    this.bookingInfo.tokenId = localStorage.getItem('tokenId')
    this.bookingInfo.individualOrEnterprise = this.$route.query.userSort
  },
  methods: {
    //  获取我的预约信息
    getList () {
      let that = this
      api.bookingList(that.bookingInfo).then(res => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.bookingInfo.page += 1
          that.List1 = that.List1.concat(tempData)
        } else {
          that.finished = true
        }
        this.loading = false;
      }).catch(() => {
        this.error = true
      })
    },
    //  获取我的审核列表
    getList2 () {
      let that = this
      api.auditList(that.auditInfo).then(res => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.auditInfo.page += 1
          that.List2 = that.List2.concat(tempData)
        } else {
          that.finisheds = true
        }
        this.loadings = false
      }).catch(() => {
        this.errors = true
      })
    },
    //  自动加载我的预约
    onLoad () {
      // if (this.List1.length !== 9) {
      this.getList()
      // }
    },
    //  自动加载我的审核
    onLoads () {
      this.getList2()
    },
    //  查看失败原因
    lookAlert (info, id, tempId) {
      Dialog.confirm({
        message: info,
        confirmButtonText: '修改'
      }).then(() => {
        this.jump(id, tempId)
      }).catch(() => {
        // console.warn(2222)
      });
    },
    //  跳转修改页面
    jump (id, tempId) {
      this.$router.push({
        path: '/hall/editInfo',
        query: { oamId: id, templateNumber: tempId }
      })
    }
  }
}
</script>

<style scoped lang="less">
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
</style>
