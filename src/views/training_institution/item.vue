<template>
  <div class="chrray-main">
    <div class="cy-firm-info">
      <van-swipe class="firm-swiper">
        <van-swipe-item v-for="(item,index) in info.schoolImage" :key="index">
          <img :src="item" class="img" @click="imgView(index)">
        </van-swipe-item>
      </van-swipe>
      <div class="cy-info__wrapper">
        <h1 class="firm-name">{{ info.schoolName }}</h1>
        <div class="firm-des">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
          <p class="text">{{ info.schoolAddress }}</p>
        </div>
        <div class="firm-des" @click="callPhone(info.schoolPhone)">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
          <p class="text">{{ info.schoolPhone }}</p>
        </div>
      </div>
    </div>
    <div class="chrray-html" v-html="info.schoolDetails"></div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Swipe, SwipeItem, Toast, Button, Icon, ImagePreview } from 'vant'
export default {
  data () {
    return {
      info: {}
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ImagePreview.name]: ImagePreview
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    getData () {
      let that = this
      let parmas = {
        ttmId: that.id
      }
      api.trainItem(parmas).then(res => {
        that.info = res.data
      }).catch(err => {
        Toast(err.msg)
      })
    },
    //  拨打电话
    callPhone (phone) {
      window.location.href = `tel:${phone}`
    },
    //  图片预览
    imgView (index) {
      ImagePreview({
        images: this.info.schoolImage,
        startPosition: index
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  background-color: #fff;
  .cy-firm-info {
    padding: 0 0 15px;
    border-bottom: 1PX solid #f2f2f2;
    .firm-swiper {
      height: 165px;
      .img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }
    .cy-info__wrapper {
      padding: 0 15px;
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
}
</style>
