<template>
  <div class="chrray_body">
    <div class="cy-firm-info">
      <van-swipe class="firm-swiper">
        <van-swipe-item v-for="(item,index) in info.companyIntroductionUrlArr" :key="index">
          <div class="link">
            <img :src="item" class="img">
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="cy-info__wrapper">
        <h1 class="firm-name">{{ info.corporateName }}</h1>
        <div class="firm-des">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
          <p class="text" v-if="info.countyWithinExternal === 0">{{ info.provinceName }}{{ info.cityName }}{{ info.townshipName }}{{ info.companyDetailedAddress }}</p>
          <p class="text" v-if="info.countyWithinExternal === 1">{{ info.provinceName }}{{ info.districtName }}{{ info.townshipName }}{{ info.companyDetailedAddress }}</p>
        </div>
        <div class="firm-des">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
          <p class="text">{{ info.contactNumber }}</p>
        </div>
      </div>
    </div>
    <div v-if="!$route.query.firmInfo">
      <div v-if="info.auditStatus === 1" class="cy-review-status">
        <img src="@/assets/img/status-1.png" alt="审核中" class="statusImg">
        <p class="title">审核中</p>
        <p class="des">请耐心等候</p>
      </div>
      <div v-if="info.auditStatus === 2" class="cy-review-status">
        <img src="@/assets/img/status-2.png" alt="审核失败" class="statusImg">
        <p class="title">审核失败</p>
        <p class="des">{{ info.findingsOfAudit }}</p>
        <van-button type="info" class="btn" :to="{ path: '/hr/addInfo', query: { eninfoId } }">返回修改</van-button>
      </div>
      <div v-if="info.auditStatus === 3" class="cy-review-status">
        <img src="@/assets/img/status-3.png" alt="审核通过" class="statusImg">
        <p class="title">审核通过</p>
        <van-button type="info" class="btn" :to="{ path: '/hr/myRelease' }">发布职位</van-button>
        <!--<button type="button" class="btn" onclick="window.location.href = 'releasePost.html'">发布职位</button>-->
      </div>
      <div v-if="info.auditStatus === 4" class="cy-review-status">
        <img src="@/assets/img/status-2.png" alt="审核失败" class="statusImg">
        <p class="title">您的账户因存在违规情况 已作“限制登录”</p>
        <p class="des">如需解除限制请联系相关部门</p>
        <!--<van-button type="info" class="btn" :to="{ path: '/hr/addInfo', query: { eninfoId } }">返回修改</van-button>-->
      </div>
    </div>
    <div v-else class="firm-info">
      <div class="firm-des">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-7" class="icon"></van-icon>
        <p class="text" v-html="info.companyIntroduction"></p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Swipe, SwipeItem, Toast, Button, Icon } from 'vant'
export default {
  data () {
    return {
      eninfoId: '',
      info: {},
      he: ''
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  mounted () {
    this.eninfoId = this.$route.query.id
    this.getFirmStatus()
  },
  methods: {
    getFirmStatus () {
      let that = this
      let params = {
        eninfoId: that.eninfoId
      }
      api.firmStatus(params).then(res => {
        that.info = res.data
      }).catch((error) => {
        Toast(error.msg)
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray_body {
  padding: 15px;
  min-height: calc(100vh - 30px);
  background-color: #fff;
  .cy-firm-info {
    .firm-swiper {
      height: 165px;
      .link {
        display: block;
        box-sizing: border-box;
        height: 100%;
        .img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      }
    }
    .cy-info__wrapper {
      margin-top: 15px;
      .firm-name {
        font-size: 15px;
        color: #333;
        line-height: 1;
        font-weight: 400;
        text-align: left;
      }
      .firm-des {
        margin: 15px 0;
        display: flex;
        align-items: center;
        &:last-child {
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
    }
  }
  .cy-review-status {
    margin-top: 10px;
    height: calc(100vh - 291px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .statusImg {
      width: 104px;
      display: block;
    }
    .title {
      color: #333;
      font-size: 17px;
      font-weight: bold;
      line-height: 1;
      margin: 10px 0;
    }
    des {
      color: #666;
      font-size: 14px;
      line-height: 1;
    }
    .btn {
      margin-top: 40px;
      background-color: #006CD1;
      border: 0;
      padding: 12px 40px;
      border-radius: 5px;
      font-size: 14px;
      color: #fff;
      line-height: 1;
    }
  }
  .firm-info {
    margin-top: 15px;
    .firm-des {
      display: flex;
      align-items: flex-start;
      .icon {
        font-size: 14px;
        color: #666;
        line-height: 1;
      }
      .text {
        padding-left: 10px;
        word-break: break-word;
        .icon
      }
    }
  }
}
</style>
