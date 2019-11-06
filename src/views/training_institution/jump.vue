<template>
  <div class="chrray-main">
    <div class="top" @click="goRouter">
      <img src="@/assets/img/sanxia2.png" alt="短期技能培训部" class="img">
      <p class="text">短期技能培训部</p>
    </div>
    <div class="bottom" @click="jump">
      <img src="@/assets/img/sanxia1.png" alt="全日制教学部" class="img">
      <p class="text">全日制教学部</p>
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
      window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI1MjY5MzMxMg==&scene=124#wechat_redirect'
    },
    goRouter () {
      this.$router.push({ path: '/agency/details' })
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
      width: 56px;
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
      width: 56.5px;
    }
  }
}
</style>
