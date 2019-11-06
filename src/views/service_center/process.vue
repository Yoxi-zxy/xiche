<template>
  <div class="chrray-main">
    <div class="head-box">
      <h4 class="title">{{ title }}</h4>
      <div class="details-box">
        <p class="des">简介</p>
        <div class="text-box">
          <p class="text" v-html="introduce"></p>
        </div>
      </div>
    </div>
    <van-tabs class="cy-tabs pd-45">
      <van-tab title="办事流程" name="1">
        <ul class="cy-steps">
          <li class="cy-step" v-for="(item, index) in pageInfo.processList" :key="index">
            <i class="icon">{{ index + 1 }}</i>
            <div class="cy-step-content">
              <h3 class="cy-step-title">{{ item.tppTitle }}</h3>
              <p class="des" v-html="item.tppContext"></p>
            </div>
          </li>
        </ul>
      </van-tab>
      <van-tab title="所需资料" name="2">
        <van-cell class="cy-cell start" v-for="(item, index) in pageInfo.meansList" :key="index">
          <div class="text-box">
            <p class="title">{{ item.meanName }}</p>
            <span class="des" v-if="item.meanType === 0">类型：复印件</span>
            <span class="des" v-if="item.meanType === 1">类型：原件</span>
          </div>
          <van-button @click="look(item.urlList)" class="process-btn" v-if="item.iscase && !item.isEnclosure">查看范例</van-button>
          <!--<a @click="downs(item.enclosureUrlStr)" class="process-btn" v-if="item.isEnclosure && !item.iscase">下载附件</a>-->
          <a :href="item.enclosureUrlStr"  class="process-btn" v-if="item.isEnclosure && !item.iscase">下载附件</a>
          <div class="btn-box" v-if="item.iscase && item.isEnclosure">
            <div class="btn1" @click="look(item.urlList)">查看范例</div>
            <a :href="item.enclosureUrlStr" class="btn2">下载</a>
            <!--<div class="btn2" @click="downs(item.enclosureUrlStr)"></div>-->
          </div>
        </van-cell>
      </van-tab>
      <van-tab title="服务网点" name="3">
        <van-cell class="firm-info__wrapper" v-for="(item, index) in pageInfo.dotList" :key="index">
          <h1 class="firm-name">{{ item.townshipName }}-{{ item.jotName }}</h1>
          <div class="firm-des">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
            <p class="text">重庆市丰都县{{ item.dotDetailedAddress }}</p>
          </div>
          <div class="firm-des last" @click="callPhone(item.dotTelephone)">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
            <p class="text">{{ item.dotTelephone }}</p>
          </div>
          <van-icon @click="getLocationFn(item)" class-prefix="chrray-icon" name="tubiaosvg-25" class="leftIcon iconfont" size="14px"></van-icon>
        </van-cell>
      </van-tab>
    </van-tabs>
    <div class="footer-btn">
      <van-button :icon="edit" v-if="pageInfo.templateNumber" square class="btn-style1" :to="{ path: 'editInfo', query: { id: pageInfo.detId, templateNumber: pageInfo.templateNumber } }">在线审核</van-button>
      <van-button :icon="edits" square class="btn-style" :class="pageInfo.templateNumber ? '' : 'one' " :to="{ path: 'addOdds', query: { id: pageInfo.detId } }">预约办事</van-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Step, Steps, Tab, Tabs, Cell, Button, Icon, ImagePreview, Toast } from 'vant'
import wxApi from '@/utils/weixin'
import wx from 'weixin-jsapi'
export default {
  data () {
    return {
      detId: '',
      templateNumber: '',
      title: '',
      pageInfo: {},
      introduce: '',
      isellip: true,
      edit: require('../../assets/img/edit.png'),
      edits: require('../../assets/img/edits.png')
    }
  },
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ImagePreview.name]: ImagePreview,
    [Toast.name]: Toast
  },
  mounted () {
    this.detId = this.$route.query.id
    // this.title = this.$route.query.title
    this.getData(this.detId)
    // this.getLocationFn()
    // this.stepList = this.stepList.replace(replaceRegex, '<br/>');
  },
  methods: {
    getLocationFn (item) {
      Toast(`定位中,请稍候`)
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          wx.openLocation({
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
            scale: 20,
            name: item.jotName + '-' + item.townshipName,
            address: item.dotDetailedAddress
          })
        },
        fail: () => {
          Toast(`定位失败,请重试`)
        }
      })
    },
    getData (id) {
      let that = this
      let params = {
        detId: id
      }
      api.processData(params).then(res => {
        let replaceRegex = /(\n\r|\r\n|\r|\n)/g
        let data = res.data.processList
        for (let i in data) {
          data[i].tppContext = data[i].tppContext.replace(replaceRegex, '<br/>')
        }
        that.pageInfo = res.data
        that.title = res.data.twoLevelName
        //  自定义分享样式
        let shareData = {
          title: res.data.twoLevelName,
          desc: res.data.introduce,
          link: location.href
        }
        wxApi.share(shareData)
        that.all()
      })
    },
    all () {
      let that = this
      let str = that.pageInfo.introduce
      let subStr = str.substring(0, 88)
      if (str.length > 88 && this.isellip) {
        that.introduce = subStr + '...' + '<span class="all" id="allText">查看更多</span>'
        that.mord()
      } else if (str.length > 88 && !this.isellip) {
        that.introduce = str + '&nbsp;&nbsp;<span class="all" id="allText">收起</span>'
        that.mord()
      } else {
        that.introduce = str
      }
    },
    mord () {
      let that = this
      setTimeout(() => {
        document.getElementById('allText').addEventListener('click', function () {
          that.isellip = !that.isellip
          that.all()
        })
      }, 500)
    },
    look (arr) {
      ImagePreview(arr);
    },
    //  拨打电话
    callPhone (phone) {
      window.location.href = `tel:${phone}`
    }
  },
  beforeRouteEnter (to, from, next) {
    if (window.__wxjs_is_wkwebview === true && to.path !== location.pathname) {
      location.assign(to.fullPath)
    } else {
      next()
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  min-height: 100vh;
  background-color: #fff;
  .head-box {
    background: linear-gradient(to bottom right, #3e4af7 , #0000b7);
    padding: 15px;
    .title {
      text-align: center;
      font-size: 17px;
      color: #fff;
      margin: 0;
      padding: 5px 0 15px;
      line-height: 1;
      font-weight: initial;
    }
    .details-box {
      background-color: #fff;
      border-radius: 5px;
      padding: 15px 20px;
      .des {
        font-size: 14px;
        color: #666;
        text-align: center;
        padding-bottom: 5px;
      }
      .text-box {
        .text {
          margin: 0;
          font-size: 14px;
          color: #666;
          text-indent: 2em;
          &.ellip {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            line-clamp: 4;
            -webkit-box-orient: vertical;
          }
        }
        .all {
          font-size: 14px;
          color: #006CD1;
        }
      }
    }
  }
  .cy-steps {
    padding: 15px;
    background-color: #fff;
    .cy-step {
      position: relative;
      &:last-child {
        &:before {
          content: none;
        }
      }
      &:before {
        content: "";
        position: absolute;
        left: 10px;
        top: 0;
        z-index: 0;
        width: 1px;
        height: 100%;
        background-color: #3679FF;
      }
      .icon {
        width: 20PX;
        height: 20PX;
        border-radius: 20PX;
        background-color: #006CD1;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-style: normal;
        color: #fff;
      }
      .cy-step-content {
        padding-left: 30px;
        color: #666;
        .cy-step-title {
          font-size: 15px;
          margin: 0;
          color: #333;
        }
        .des {
          padding: 10px 0;
          color: #666;
          font-size: 13px;
        }
      }
    }
  }
  .cy-cell {
    .text-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-right: 20px;
      .title {
        color: #333;
        font-size: 15px;
      }
      .des {
        font-size: 13px;
        color: #999;
      }
    }
    .process-btn {
      width: 88px;
      border-radius: 2000px;
      color: #006CD1;
      font-size: 14px;
      height: auto;
      line-height: normal;
      padding: 7px 15px;
      border: 1px solid #006CD1;
      box-sizing: border-box;
    }
    .btn-box {
      overflow: hidden;
      position: relative;
      border-radius: 2000px;
      display: flex;
      align-items: center;
      border: 1PX solid #006CD1;
      padding: 5px 15px 5px 15px;
      font-size: 14px;
      box-sizing: border-box;
      .btn1 {
        display: inline-block;
        color: #006CD1;
      }
      .btn2 {
        color: #fff;
        position: relative;
        padding-left: 30px;
        z-index: 100;
        &:after {
          content: '';
          position: absolute;
          display: block;
          width: 85px;
          height: 45px;
          top: -10px;
          right: -40px;
          background-color: #006CD1;
          transform:skewX(-25deg);
          z-index: -1;
        }
      }
    }
  }
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
      color: #006CD1;
      transform: translateY(-50%);
    }
  }
  .footer-btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 100;
    .btn-style {
      width: 50%;
      color: #fff;
      background-color: #006CD1;
      border-color: #006CD1;
      border-bottom: 0;
      &.one {
        width: 100%;
      }
    }
    .btn-style1 {
      width: 50%;
      color: #006CD1;
      border-color: #006CD1;
      border-bottom: 0;
      background-color: #fff;
      border-left: 0;
    }
  }
}
</style>
