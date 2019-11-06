<template>
  <div class="chrray_details" v-cloak>
    <div class="page_title-con">
      <h1 class="title">{{ pageData.newTiltle }}</h1>
      <div class="time-box">
        <time class="time">发布时间：{{ pageData.createTime }} </time>
        <span class="time" style="padding-left: .2rem">浏览：{{ pageData.broNumber }}次</span>
      </div>
    </div>
    <div class="page_contant-con">
      <div class="video-box" v-if="pageData.videoUrl">
        <video :src="pageData.videoUrl" controls></video>
      </div>
      <div class="chrray-html" v-html="pageData.newContext"></div>
      <div class="fujian-box">
        <p class="fujian" v-for="(item,index) in pageData.enclosure" :key="index">
          <span class="text">附件{{index+1}}:</span>
          <a :href="item.enclosureUrl">{{ item.enclosureName }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      Id: '',
      pageData: {}
    }
  },
  mounted () {
    this.Id = this.$route.params.id
    this.getData()
  },
  methods: {
    //  获取详情
    getData () {
      let that = this;
      let params = {
        newId: that.Id
      };
      api.newDetails(params).then((res) => {
        that.pageData = res.data;
        //  自定义分享样式
        let shareData = {
          title: res.data.newTiltle,
          desc: that.getSimpleText(res.data.newContext),
          link: location.href,
          imgUrl: res.data.imageList.length > 0 ? wxApi.imgUrl + res.data.imageList[0].imageUrl : wxApi.shareImg
        }
        wxApi.share(shareData)
      }).catch((error) => {
        alert(error)
      })
    },
    getSimpleText (html) {
      let msg = html
      msg = msg.replace(/(\n)/g, '')
      msg = msg.replace(/(\t)/g, '')
      msg = msg.replace(/(\r)/g, '')
      msg = msg.replace(/<\/?[^>]*>/g, '')
      msg = msg.replace(/\s*/g, '')
      msg = msg.replace(/&nbsp;/ig, '')
      return msg
    }
  }
}
</script>

<style scoped lang="less">
.chrray-html {
  padding: 0;
}
</style>
