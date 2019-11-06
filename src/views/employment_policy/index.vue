<template>
  <div class="chrray_main">
    <div class="banner-box">
      <van-swipe class="cy-swiper" :autoplay="5000">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <router-link :to="'/policy/item/' + item.jumpUrl" class="link"  v-if="item.jumpMethod === 2">
            <img :src="item.picurl" class="img">
            <p class="des">{{ item.bannerTitle }}</p>
          </router-link>
          <a :href="item.jumpUrl" class="link" v-if="item.jumpMethod === 1">
            <img :src="item.picurl" class="img">
            <p class="des">{{ item.bannerTitle }}</p>
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="search-box">
      <!-- 分类按钮 -->
      <p class="selectBtn" @click="pickShow = !pickShow">{{ selectType }}</p>
      <hr class="hr">
    <form class="cy-serch-box">
      <van-search
        class="cy-serch"
        v-model="pageInfo.newTiltle"
        placeholder="请输入搜索关键词"
        @search="onSearch">
      </van-search>
    </form>
  </div>
    <div class="list-box">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多数据啦"
        @load="onLoad">
        <ul class="tab-con-list">
          <li class="tab-con-item item-style" v-for="(item,index) in infoList" :key="index">
            <router-link :to="'/policy/item/' + item.newId" class="item-one" v-if="item.imageList.length === 1">
              <div class="text-box">
                <h1 class="title">{{ item.newTiltle }}</h1>
                <time class="time">{{ item.createTime }}</time>
              </div>
              <p class="img-list">
                <img :src="item.imageList[0].imageUrl" class="img">
              </p>
              <!--<img :src="item.imageList[0].imageUrl" class="img"/>-->
            </router-link>
            <router-link :to="'/policy/item/' + item.newId" class="item-two" v-if="item.imageList.length === 3">
              <h1 class="title">{{ item.newTiltle }}</h1>
              <div class="img-box">
                <p v-for="(images,idx) in item.imageList" :key="idx" class="img-list">
                  <img :src="images.imageUrl" class="img">
                </p>
              </div>
              <time class="time">{{ item.createTime }}</time>
            </router-link>
            <router-link :to="'/policy/item/' + item.newId" class="item-two" v-if="item.imageList.length === 0">
              <h1 class="title">{{ item.newTiltle }}</h1>
              <time class="time">{{ item.createTime }}</time>
            </router-link>
          </li>
        </ul>
      </van-list>
    </div>
    <!-- 分类弹窗 -->
    <van-popup v-model="pickShow" position="bottom">
      <van-picker
        :columns="typeList"
        show-toolbar
        @cancel="pickShow = !pickShow"
        @confirm="onConfirm">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/data'
import { Swipe, SwipeItem, Toast, Tab, Tabs, List, Cell, Search, Popup, Picker } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      bannerList: [],
      typeList: [],
      infoList: [],
      selectType: '选择政策分类',
      pageInfo: {
        newType: 2,
        cateValue: '0',
        newTiltle: '',
        page: 1,
        rows: 10
      },
      pickShow: false,
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
    [Search.name]: Search,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  mounted () {
    this.getBanner()
    this.getType()
  },
  methods: {
    //  banner查询
    getBanner () {
      let that = this;
      let params = {
        positionStr: 2
      };
      api.banner(params).then((res) => {
        that.bannerList = res.data;
        //  自定义分享样式
        let shareData = {
          title: that.$route.meta.title,
          link: location.href,
          imgUrl: res.data.length > 0 ? wxApi.imgUrl + res.data[0].picurl : wxApi.shareImg
        }
        wxApi.share(shareData)
        //  动态加载完banner后需要调用一下mui
      }).catch((error) => {
        Toast(error.msg)
      })
    },
    //  获取分类
    getType () {
      let that = this
      let params = {
        strValue: 'employment_policy'
      }
      api.allSort(params).then(res => {
        for (let i in res.data) {
          res.data[i].value = res.data[i].dictValue
          res.data[i].text = res.data[i].dictName
        }
        that.typeList = res.data;
      })
    },
    //  搜索
    onSearch () {
      this.infoList = []
      this.pageInfo.page = 1
      this.getList()
    },
    //  加载列表
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
    //  选择后进行回调
    onConfirm (value) {
      let that = this;
      that.selectType = value.text;
      that.pageInfo.cateValue = value.value;
      //  将原有数据清空
      that.infoList = [];
      that.pageInfo.page = 1;
      that.getList();
      this.pickShow = !this.pickShow
    },
    //  自动加载下一页
    onLoad () {
      // 异步更新数据
      this.getList()
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
.cy-serch-box {
  flex: 1;
  .cy-serch {
    padding: 0;
  }
}

</style>
