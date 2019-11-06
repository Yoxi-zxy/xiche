<template>
  <div class="chrray-main">
    <van-cell-group>
      <van-cell class="firm-info__wrapper" v-for="(item, index) in pageInfo" :key="index">
        <h1 class="firm-name">{{ item.jotName }}-{{ item.townshipName }}</h1>
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
    </van-cell-group>
  </div>
</template>

<script>
import api from '@/api/data'
import { Icon, Button, Cell, CellGroup, Toast } from 'vant'
import wxApi from '@/utils/weixin'
import wx from 'weixin-jsapi'
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
    this.getPage()
    //  自定义分享样式
    let shareData = {
      title: this.$route.meta.title,
      link: location.href
    }
    wxApi.share(shareData)
  },
  methods: {
    getLocationFn (item) {
      Toast(`定位中,请稍候`)
      wx.getLocation({
        type: 'gcj02',
        success: () => {
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
    getPage () {
      let that = this
      api.selectAllDot().then(res => {
        that.pageInfo = res.data
      })
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
    line-height: 1.5;
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
</style>
