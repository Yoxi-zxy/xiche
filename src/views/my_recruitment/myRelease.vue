<template>
  <div class="chrray_main">
    <router-link class="firm-info__wrapper" :to="{ path: '/hr/statusPage', query: { id: firmInfo.eninfoId, firmInfo: true } }">
      <h1 class="firm-name">{{ firmInfo.corporateName }}</h1>
      <div class="firm-des">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
        <p class="text" v-if="firmInfo.countyWithinExternal === 0">{{ firmInfo.provinceName }}{{ firmInfo.cityName }}{{ firmInfo.townshipName }}{{ firmInfo.companyDetailedAddress }}</p>
        <p class="text" v-if="firmInfo.countyWithinExternal === 1">{{ firmInfo.provinceName }}{{ firmInfo.districtName }}{{ firmInfo.townshipName }}{{ firmInfo.companyDetailedAddress }}</p>
      </div>
      <div class="firm-des last">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
        <!--<i class="iconfont icon-tubiaosvg-11 icon"></i>-->
        <p class="text">{{ firmInfo.contactNumber }}</p>
      </div>
      <van-icon name="arrow" class="leftIcon" size="14px"/>
    </router-link>
    <van-tabs @change="changeTab" class="cy-tabs white">
      <van-tab
        v-for="(item, index) in navList"
        :key="index"
        :title="item.title"
        :name="item.id">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多数据啦"
          @load="onLoad">
          <div class="panel-list">
            <div class="cy-card" v-for="(item, index) in conList" :key="index">
              <router-link :to="{ path: '/hr/jobDetails', query: { id: item.jobInfoId } }" class="cy-card-content">
                <div class="title-box">
                  <div class="title">{{ item.jobName }}</div>
                  <div class="money" v-if="item.salaryStart === 0">面议</div>
                  <div class="money" v-else>{{ item.salaryStart }}元-{{ item.salaryEnd }}元</div>
                </div>
                <div class="time-box">
                  <van-icon class-prefix="chrray-icon" name="tubiaosvg-8" class="icon"></van-icon>
                  <p class="text">有效期: {{ item.finiteTimeStart | timeZH }}至{{ item.finiteTimeEnd | timeZH }}</p>
                </div>
              </router-link>
              <div class="cy-card-footer" v-if="pageInfo.auditStatus !== 1">
                <van-button round type="danger" v-if="pageInfo.auditStatus === 3" class="btn" :to="{ path: '/hr/jobDetails', query: { id: item.jobInfoId } }">查看职位</van-button>
                <van-button round type="danger" v-if="pageInfo.auditStatus === 3" class="btn" @click="down(item.jobInfoId)">下线</van-button>
                <van-button round type="danger" v-if="pageInfo.auditStatus === 2" class="btn" @click="lookAlert(item.findingsOfAudit, item.jobInfoId)">查看原因</van-button>
                <van-button round type="danger" v-if="pageInfo.auditStatus === 4" class="btn" @click="remove(item.jobInfoId)">删除</van-button>
                <van-button round type="danger" v-if="pageInfo.auditStatus === 4" class="btn" @click="up(item.jobInfoId)">上线</van-button>
                <van-button round type="danger" v-if="pageInfo.auditStatus !== 3" class="btn" :to="{ path: '/hr/editJob', query: { id: item.jobInfoId } }">修改</van-button>
                <div class="remove-reason" v-if="pageInfo.auditStatus === 4 && item.delStatus === 4">
                  <p class="title">该职位存在违规情况，已被管理员删除</p>
                  <p class="des">原因：该职位涉及低俗、性暗示或色情信息。</p>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <div class="post-btn">
      <van-button type="button" class="btn" :to="{ path: '/hr/editJob' }">发布职位</van-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Cell, CellGroup, Icon, Toast, Tab, Tabs, List, Panel, Button, Dialog } from 'vant'
import { timestampToTime } from '@/lib/util'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      token: '',
      firmInfo: {},
      conList: [],
      navIndex: 3,
      navList: [
        { title: '招聘中', id: 3 },
        { title: '审核中', id: 1 },
        { title: '审核失败', id: 2 },
        { title: '已下线', id: 4 }
      ],
      pageInfo: {
        tokenId: this.token,
        auditStatus: 3,
        page: 1,
        rows: 10
      },
      error: false,
      loading: false,
      finished: false
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Panel.name]: Panel,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  //  时间过滤器
  filters: {
    timeZH (val) {
      return timestampToTime(val / 1000).split(' ')[0]
    }
  },
  mounted () {
    this.token = localStorage.getItem('tokenId')
    this.pageInfo.tokenId = localStorage.getItem('tokenId')
    this.getFirmInfo()
    this.getList()
    //  自定义分享样式
    let shareData = {
      title: this.$route.meta.title,
      link: location.href
    }
    wxApi.share(shareData)
  },
  methods: {
    getFirmInfo () {
      let that = this;
      api.getFirmInfo({ tokenId: that.token }).then((res) => {
        that.firmInfo = res.data
      }).catch((error) => {
        Toast(error.msg)
      })
    },
    //  加载列表
    getList () {
      let that = this;
      api.hierList(that.pageInfo).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo.page += 1
          that.conList = that.conList.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    //  tab切换
    changeTab (name) {
      this.pageInfo.page = 1
      this.pageInfo.auditStatus = name
      this.conList = []
      this.finished = false
      this.getList()
    },
    //  弹出审核失败原因
    lookAlert (info, id) {
      Dialog.confirm({
        message: info,
        confirmButtonText: '修改'
      }).then(() => {
        // console.warn(111)
      }).catch(() => {
        // console.warn(2222)
      });
    },
    //  职位上线
    up (id) {
      let that = this
      Dialog.confirm({
        message: '确定上线该职位吗?'
      }).then(() => {
        let params = {
          jobInfoId: id,
          auditStatus: 3
        };
        api.jobShow(params).then((res) => {
          Toast(`上线成功`);
          for (let i in that.conList) {
            if (that.conList[i].jobInfoId === id) {
              that.conList.splice(i, 1)
            }
          }
        }).catch((error) => {
          Toast(error.msg)
        })
      }).catch(() => {
        //
      });
    },
    //  职位下线
    down (id) {
      let that = this;
      Dialog.confirm({
        message: '确定下线该职位吗?'
      }).then(() => {
        let params = {
          jobInfoId: id,
          auditStatus: 4
        };
        api.jobShow(params).then((res) => {
          Toast(`下线成功`);
          for (let i in that.conList) {
            if (that.conList[i].jobInfoId === id) {
              that.conList.splice(i, 1)
            }
          }
        }).catch((error) => {
          Toast(error.msg)
        })
      }).catch(() => {
        //
      })
    },
    //  删除职位
    remove (id) {
      let that = this
      Dialog.confirm({
        message: '确认删除该职位吗?'
      }).then(() => {
        let params = {
          jobInfoId: id
        }
        api.deleteJob(params).then(res => {
          Toast(res.msg);
          for (let i in that.conList) {
            if (that.conList[i].jobInfoId === id) {
              that.conList.splice(i, 1)
            }
          }
        }).catch((error) => {
          Toast(error)
        })
      }).catch(() => {
        //
      });
    },
    //  底部加载
    onLoad () {
      if (this.pageInfo.page !== 1) {
        this.getList()
      }
    }
  }
}
</script>

<style scoped lang="less">
.chrray_main {
  background-color: #f2f2f2;
  min-height: 100vh;
  .firm-info__wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 15px;
    position: relative;
    background-color: #fff;
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
      color: #666;
      transform: translateY(-50%);
    }
  }
  .cy-tabs {
    margin-bottom: 65px;
    .panel-list {
      padding: 15px;
      .cy-card {
        background-color: #fff;
        border-radius: 3px;
        margin-bottom: 10px;
        .cy-card-content {
          padding: 15px;
          display: block;
          .title-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title {
              white-space: nowrap;
              width: 0;
              text-overflow: ellipsis;
              overflow: hidden;
              flex: 1;
              font-size: 15px;
              color: #333;
              text-align: left;
            }
            .money {
              color: #006CD1;
              font-size: 15px;
              line-height: 1;
            }
          }
          .time-box {
            display: flex;
            align-items: center;
            margin-top: 15px;
            .icon {
              line-height: 1;
              color: #666;
            }
            .text {
              font-size: 13px;
              color: #666;
              line-height: 1;
              padding-left: 8px;
            }
          }
        }
        .cy-card-footer {
          padding: 10px 15px;
          border-top: 1px solid #f2f2f2;
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
          .remove-reason {
            display: flex;
            flex-direction: column;
            text-align: left;
            .title {
              color: #ff5959;
              font-size: 14px;
              line-height: 1;
              padding-bottom: 10px;
            }
            .des {
              color: #999;
              font-size: 12px;
              line-height: 1;
            }
          }
        }
      }
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
      width: 80%;
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
