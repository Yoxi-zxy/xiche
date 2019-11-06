<template>
  <div class="chrray-main">
    <div class="top" @click="jump">
      <img src="@/assets/img/select_1.png" alt="重庆就业网" class="img">
      <p class="text">重庆就业网</p>
    </div>
    <div class="bottom" @click="goRouter">
      <img src="@/assets/img/select_2.png" alt="本地求职" class="img">
      <p class="text">本地求职</p>
    </div>
  </div>
</template>

<script>
import wxApi from '@/utils/weixin'
export default {
  mounted () {
    //  自定义分享样式
    let shareData = {
      title: this.$route.meta.title,
      link: location.href
    }
    wxApi.share(shareData)
  },
  methods: {
    jump () {
      window.location.href = 'http://rlsbj.cq.gov.cn/cqjy/index.html'
      // window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4NDM5OTAwOA==&scene=124#wechat_redirect'
    },
    goRouter () {
      this.$router.push({ path: '/job/index' })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  min-height: 100vh;
  background-color: #006CD1;
  .top {
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    border-bottom: 1PX solid rgba(255, 255, 255, .1);
    box-sizing: border-box;
    flex-direction: column;
    .img {
      width: 55px;
      height: 56.5px;
      display: block;
    }
    .text {
      font-size: 18px;
      margin-top: 20px;
    }
  }
  .bottom {
    .top;
    border-bottom: 0;
    .img {
      width: 56px;
      height: 39px;
    }
  }
}
</style>
