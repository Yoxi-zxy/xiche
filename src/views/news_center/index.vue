<template>
  <div class="chrray_main">
    <div class="banner-box">
      <van-swipe class="cy-swiper" :autoplay="5000">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <router-link :to="'/news/item/' + item.jumpUrl" class="link" v-if="item.jumpMethod === 2">
            <img :src="item.picurl" class="img">
            <p class="des">{{ item.bannerTitle }}</p>
          </router-link>
          <a :href="item.jumpUrl" class="link" v-if="item.jumpMethod === 1">
            <img :src="item.picurl" class="img">
            <p class="des">{{ item.bannerTitle }}</p>
          </a>
        </van-swipe-item>
      </van-swipe>
      <router-link to="/news/search" class="icon-box">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-" class="icon"></van-icon>
      </router-link>
    </div>
    <van-tabs @change="changeTab" class="cy-tabs">
      <van-tab
        v-for="(item, index) in navList"
        :title="item.dictName"
        :name="item.dictValue"
        :key="index">
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多数据啦"
          @load="onLoad">
          <ul class="tab-con-list">
            <li class="tab-con-item item-style" v-for="(item,index) in infoList" :key="index">
              <router-link :to="'/news/item/'+ item.newId" class="item-one" v-if="item.imageList.length === 1">
                <div class="text-box">
                  <h1 class="title">{{ item.newTiltle }}</h1>
                  <time class="time">{{ item.createTime }}</time>
                </div>
                <p class="img-list">
                  <img :src="item.imageList[0].imageUrl" class="img">
                </p>
                <!--<img :src="item.imageList[0].imageUrl" class="img"/>-->
              </router-link>
              <router-link :to="'/news/item/'+ item.newId" class="item-two" v-if="item.imageList.length === 3">
                <h1 class="title">{{ item.newTiltle }}</h1>
                <div class="img-box">
                  <p v-for="(images,idx) in item.imageList" :key="idx" class="img-list">
                    <img :src="images.imageUrl" class="img">
                  </p>
                </div>
                <time class="time">{{ item.createTime }}</time>
              </router-link>
              <router-link :to="'/news/item/'+ item.newId" class="item-two" v-if="item.imageList.length === 0">
                <h1 class="title">{{ item.newTiltle }}</h1>
                <time class="time">{{ item.createTime }}</time>
              </router-link>
            </li>
          </ul>
        </van-list>
      </van-tab>
    </van-tabs>
</div>
</template>

<script>
import api from '@/api/data'
import { Swipe, SwipeItem, Toast, Tab, Tabs, List, Cell, Icon } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      current: 0,
      bannerList: [],
      navList: [],
      infoList: [],
      pageInfo: {
        newType: 1,
        cateValue: '0',
        newTiltle: '',
        page: 1,
        rows: 5
      },
      list: [],
      error: false,
      loading: false,
      finished: false
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  mounted () {
    this.getBanner()
    this.getType()
  },
  methods: {
    //  分类查询
    getType () {
      let that = this;
      let params = {
        strValue: 'news_bulletin'
      };
      api.allSort(params).then((res) => {
        //  将数据渲染到分类导航
        that.navList = res.data
        //  将全部赋值给条件并渲染列表
        that.pageInfo.cateValue = res.data[0].dictValue
        that.getList()
      }).catch((error) => {
        Toast(error.msg)
      })
    },
    //  选项卡切换
    changeTab (name) {
      this.pageInfo.page = 1
      //  将当前id赋值到参数中
      this.pageInfo.cateValue = name
      //  清空原始数据
      this.infoList = []
      this.finished = false
      this.getList()
    },
    //  banner查询
    getBanner () {
      let that = this;
      let params = {
        positionStr: 1
      };
      api.banner(params).then((res) => {
        that.bannerList = res.data;
        // //  自定义分享样式
        // let shareData = {
        //   title: that.$route.meta.title,
        //   link: location.href,
        //   imgUrl: res.data.length > 0 ? wxApi.imgUrl + res.data[0].picurl : wxApi.shareImg
        // }
        // wxApi.share(shareData)
        //  动态加载完banner后需要调用一下mui
      }).catch((error) => {
        Toast(error.msg)
      })
    },
    //  获取数据
    getList () {
      let that = this
      api.sortData(that.pageInfo).then(res => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo.page += 1
          that.infoList = that.infoList.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    onLoad () {
      // 异步更新数据
      if (this.pageInfo.page !== 1) {
        this.getList()
      }
    }
  }
}
</script>

<style scoped lang="less">
.chrray_main {
  .banner-box {
    position: relative;
    .cy-swiper {
      height: 200px;
      .link {
        position: relative;
        display: block;
        height: 100%;
        .img {
          width: 100%;
          height: 100%;
          display: block;
        }
        .des {
          width: 100%;
          position: absolute;
          bottom: 0;
          padding: 15px;
          font-size: 15px;
          color: #fff;
          background-color: rgba(0,0,0,.5);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          box-sizing: border-box;
        }
      }
    }
    .icon-box {
      position: absolute;
      top: 10px;
      right: 0;
      background-color: #006cd1;
      padding: 8px 15px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      .icon {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>
