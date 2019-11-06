<template>
  <div class="chrray-main"></div>
</template>

<script>
export default {
  data () {
    return {
      href: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI1MTY3MTI0OQ==&scene=124#wechat_redirect'
    }
  },
  created () {
    location.replace(this.href)
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  background-color: #fff;
}
</style>
