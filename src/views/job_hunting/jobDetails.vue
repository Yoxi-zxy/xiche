<template>
  <div class="chrray_body">
    <div class="info-head">
      <div class="title-box">
        <div class="title">{{ info.jobName }}</div>
        <div class="money" v-if="info.salaryStart === 0">面议</div>
        <div class="money" v-else>月薪:{{ info.salaryStart }}元-{{ info.salaryEnd }}元</div>
      </div>
      <div class="time-box" @click="getLocationFn(info)">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
        <p class="text" v-if="info.countyWithinExternal === '0'">{{ info.provinceName }}{{ info.cityName }}{{ info.regionStr }}{{ info.companyDetailedAddress }}</p>
        <p class="text" v-if="info.countyWithinExternal === '1'">{{ info.provinceName }}{{ info.districtName }}{{ info.regionStr }}{{ info.companyDetailedAddress }}</p>
      </div>
      <div class="justify-content">
        <div class="time-box">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-1" class="icon"></van-icon>
          <p class="text">人数: {{ info.personNum }}</p>
        </div>
        <div class="time-box">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-31" class="icon"></van-icon>
          <p class="text">学历: {{ info.educationName }}</p>
        </div>
        <div class="time-box">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-30" class="icon"></van-icon>
          <p class="text">年龄: {{ info.ageStart }}~{{ info.ageEnd }}</p>
        </div>
      </div>
<!--      <div class="justify-content">-->
<!--        <div class="time-box">-->
<!--          <van-icon class-prefix="chrray-icon" name="tubiaosvg-32" class="icon"></van-icon>-->
<!--          <p class="text" v-if="info.sex === 1">性别: 男</p>-->
<!--          <p class="text" v-if="info.sex === 2">性别: 女</p>-->
<!--          <p class="text" v-if="info.sex === 3">性别: 不限</p>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="info-content">
      <p class="text">职位详情</p>
      <div class="time-box">
        <p class="sex" v-if="info.sex === 1">性别: 男</p>
        <p class="sex" v-if="info.sex === 2">性别: 女</p>
        <p class="sex" v-if="info.sex === 3">性别: 不限</p>
      </div>
      <div v-html="info.jobIntroduce"></div>
    </div>
    <div class="info-content">
      <p class="text">公司简介</p>
      <p class="title">{{ info.corporateName }}</p>
      <div class="slider-box">
        <van-swipe class="firm-swiper">
          <van-swipe-item v-for="(item,index) in info.companyIntroductionUrlArr" :key="index">
            <div :to="item" class="link">
              <img :src="item" class="img">
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="info" v-html="info.companyIntroduction"></div>
    </div>
    <div class="tel-box">
      <a :href="'tel:'+ info.contactNumber" @click="count" class="btn-style">立即沟通</a>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Swipe, SwipeItem, Toast, Icon } from 'vant'
import wxApi from '@/utils/weixin'
import wx from 'weixin-jsapi'
export default {
  data () {
    return {
      info: {},
      addInfo: '重庆市丰都县'
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Toast.name]: Toast,
    [Icon.name]: Icon
  },
  created () {
    wxApi.wxConfig()
  },
  mounted () {
    let id = this.$route.query.id
    this.getData(id)
  },
  methods: {
    //  打开地图定位
    getLocationFn (item) {
      Toast(`定位中,请稍候`)
      wx.getLocation({
        type: 'gcj02',
        success: () => {
          let name
          if (item.countyWithinExternal === '0') {
            name = `${item.provinceName}${item.cityName}${item.regionStr}${item.companyDetailedAddress}`
          } else if (item.countyWithinExternal === '1') {
            name = `${item.provinceName}${item.districtName}${item.regionStr}${item.companyDetailedAddress}`
          }
          wx.openLocation({
            latitude: Number(item.lat),
            longitude: Number(item.lng),
            scale: 20,
            name: name,
            address: item.companyDetailedAddress
          })
        },
        fail: () => {
          Toast(`定位失败,请重试`)
        }
      })
    },
    getData (id) {
      let that = this;
      let params = {
        jobInfoId: id
      };
      api.jobInfo(params).then((res) => {
        let replaceRegex = /(\n\r|\r\n|\r|\n)/g;
        res.data.jobIntroduce = res.data.jobIntroduce.replace(replaceRegex, '<br/>');
        that.info = res.data;
        //  自定义分享样式
        let shareData = {
          title: res.data.jobName,
          desc: `${res.data.corporateName}正在招聘${res.data.jobName},点击可查看招聘详情`,
          link: location.href,
          imgUrl: res.data.companyIntroductionUrlArr.length > 0 ? wxApi.imgUrl + res.data.companyIntroductionUrlArr[0] : wxApi.shareImg
        }
        wxApi.share(shareData)
      }).catch(() => {
        alert(`数据获取失败`)
      })
    },
    count () {
      let params = {
        jobInfoId: this.$route.query.id
      }
      api.counAdd(params).then(() => {})
    }
  }
}
</script>

<style scoped lang="less">
.chrray_body {
  min-height: 100vh;
  background-color: #fff;
  padding: 15px 15px 76px 15px;
  .info-head {
    padding: 0 0 20px;
    border-bottom: 1px solid #f2f2f2;
    .title-box {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .title {
        width: 0;
        flex: 1;
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
        /*overflow: hidden;*/
        word-break: break-word;
        font-size: 23px;
        color: #333;
        font-weight: bold;
      }
      .money {
        font-size: 15px;
        color: #006CD1;
        line-height: 2;
      }
    }
    .time-box {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .icon {
        font-size: 14px;
        color: #666;
        line-height: 1;
      }
      .text {
        font-size: 14px;
        color: #666;
        line-height: 1;
        padding-left: 5px;
      }
    }
    .justify-content {
      .time-box;
      justify-content: space-between;
      margin-top: 0;
      .text {
        padding-right: 10px;
      }
    }
  }
  .info-content {
    border-bottom: 1px solid #f2f2f2;
    padding: 20px 0;
    &:last-child {
      border-bottom: 0;
    }
    .text {
      color: #333;
      font-size: 15px;
      line-height: 1;
      padding-bottom: 20px;
    }
    .sex {
      line-height: 1.6;
    }
    .title {
      font-size: 15px;
      color: #333;
      font-weight: bold;
      line-height: 1;
    }
    .slider-box {
      position: relative;
      padding: 15px 0;
      .firm-swiper {
        width: 100%;
        .link {
          display: block;
          height: 165px;
          .img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }
        }
      }
    }
    .info {
      padding-left: 5px;
      word-break: break-word;
    }
  }
  .tel-box {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 15px;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 9999;
    .btn-style {
      width: 100%;
      display: inline-block;
      background-color: #006cd1;
      color: #fff;
      border-radius: 5px;
      padding: 15px 0;
      text-align: center;
      line-height: 1;
    }
  }
}
</style>
