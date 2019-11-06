<template>
  <div class="chrray-main">
    <img src="../assets/img/404.jpg" alt="找不到页面啦" class="img">
    <div class="chrray-err">
      <p class="text">sorry,页面丢失啦~</p>
      <van-button class="btn" round to="/">返回首页</van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  data () {
    return {
      //
    }
  },
  components: {
    [Button.name]: Button
  }
}
</script>

<style scoped lang="less">
  .chrray-main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    flex-direction: column;
    .img {
      width: 100%;
    }
    .chrray-err {
      margin-top: 40px;
      text-align: center;
      .text {
        font-size: 24px;
      }
      .btn {
        color: #fff;
        margin-top: 10px;
        background-color: #006cd1;
      }
    }
  }
</style>
