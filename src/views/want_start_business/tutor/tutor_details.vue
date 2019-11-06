<template>
  <div class="chrray-main">
    <div class="hear-box">
      <img src="@/assets/img/tutorbg.png" alt="背景图" height="98" class="img">
      <div class="avatar-box">
        <van-image
          round
          width="80"
          height="80"
          fit="cover"
          class="avatar"
          :src="info.imgUrl"
        />
        <p class="name">{{ info.guidanceName }}</p>
      </div>
    </div>
    <div class="body-content">
      <div class="content-item">
        <div class="title">擅长方向</div>
        <p class="des">{{ info.goodAtDirection }}</p>
      </div>
      <div class="content-item">
        <div class="title">个人简介</div>
        <div class="chrray-html" v-html="info.introduce"></div>
      </div>
    </div>
    <div class="chrray-bottom-btnBox">
      <van-button class="btn" round :to="{ path: 'apply', query: { id } }">申请指导</van-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Image, Button } from 'vant'
export default {
  data () {
    return {
      id: '',
      info: {}
    }
  },
  components: {
    [Image.name]: Image,
    [Button.name]: Button
  },
  mounted () {
    this.id = this.$route.query.id
    this.getPageInfo()
  },
  methods: {
    //  获取页面详情
    getPageInfo () {
      let that = this
      let params = { tegId: that.id }
      api.businessDetails(params).then(res => {
        that.info = res.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  padding-bottom: 45px;
  .hear-box {
    background-color: #fff;
    padding-bottom: 20px;
    .img {
      width: 100%;
      display: block;
    }
    .avatar-box {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: -40PX;
      .avatar {
        padding: 5px;
        background-color: #fff;
      }
      .name {
        padding-top: 10px;
        font-size: 16px;
        color: #333;
      }
    }
  }
  .body-content {
    margin-top: 10px;
    background-color: #fff;
    padding: 15px;
    .content-item {
      margin-bottom: 25px;
      .title {
        font-size: 14px;
        color: #666;
        line-height: 1;
        position: relative;
        padding-left: 15px;
        margin-bottom: 15px;
        &:before {
          content: "";
          position: absolute;
          left: 2PX;
          width: 3PX;
          height: 100%;
          display: inline-block;
          background-color: #3355FF;
        }
        .des {
          font-size: 14px;
          color: #333;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .chrray-bottom-btnBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    .btn {
      width: 100%;
      border-radius: 0;
      border: 0;
      background-color: #3679FF;
      font-size: 15px;
      color: #fff;
    }
  }
}
</style>
