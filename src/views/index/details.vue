<template>
  <div class="vh">
    <div v-if="this.$route.meta.hiddens">
      <div class="details-header">
        <van-swipe
          :autoplay="3000"
          :height= 201
          indicator-color="white">
          <van-swipe-item v-for="(img, index) in data.bannerList" :key="index">
            <img class="details-img" :src="img.url" alt="图片">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="detalis-tlt">
        <h3>{{ info.name }}</h3>
        <p class="tlt-text tlt-pad">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-3"></van-icon>
          电话：{{ info.phone }}</p>
        <p class="tlt-text">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-2"></van-icon>
          地址：{{ info.address }}</p>
      </div>
      <div v-if="info.isHaveClass === '1'">
          <div class="cy">
            <div class="con-text mony">价格：<i>${{ info.price }}</i></div>
            <p class="tlt">
              <van-icon class-prefix="chrray-icon" name="tubiaosvg-"></van-icon>
              详情</p>
            <div class="details" v-html="info.content"></div>
          </div>
          <button class="footer-btn"  @click="jump(info.id)">我要预约</button>
      </div>
      <van-tabs
        background="#f2f2f2"
        title-active-color="#F0271D"
        v-if="info.isHaveClass === '2'"
      >
        <div>
          <van-tab v-for="(item, index) in info.classList" :key="index" :title="item.name">
            <div class="cy">
              <div class="con-text">价格：<i>${{ item.price }}</i></div>
              <p class="tlt">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-"></van-icon>
                详情</p>
              <div class="details" v-html="item.content"></div>
            </div>
            <button class="footer-btn"  @click="jump(item.id)">我要预约</button>
          </van-tab>
        </div>
      </van-tabs>
    </div>
    <router-view />
  </div>
</template>

<script>
import { Tab, Tabs, Icon, Swipe, SwipeItem } from 'vant';
import api from '@/api/data';
export default {
  data () {
    return {
      Id: '',
      bannerList: [],
      data: {},
      info: {}
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  created () {
    this.Id = this.$route.query.id;
    this.getDetails()
  },
  mounted () {
    //
  },
  methods: {
    //  查询商品详情
    getDetails () {
      let that = this;
      api.getProduct(that.Id).then(res => {
        that.data = res.data;
        that.info = res.data.info
      })
    },
    //  跳转预约页（带id）
    jump (id) {
      this.$router.push({
        path: '/details/subscribe',
        query: { id }
      })
    }
  }
};
</script>

<style scoped lang="less">
.details-header {
  .van-swipe-item{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .details-img {
    width: 100%;
    height: auto;
  }
}
.detalis-tlt {
  padding: 20px 15px;
  h3 {
    margin: 0 0 18px;
    position: relative;
  }
  .tlt-text {
    font-size: 14px;
    color: #666666;
    i {
      margin-right: 12px;
    }
  }
  .tlt-pad {
    margin-bottom: 12px;
  }
}
.cy{
  padding: 0 15px 50px;
  background-color: #ffffff;
  .con-text {
    font-size: 13px;
    margin: 26px 0;
    i {
      color: #F0271D;
      font-style:normal;
      font-size: 20px;
    }
  }
  .mony {
    position: absolute;
    right: 15px;
    top: 194px;
  }
  .tlt {
    text-align: center;
    color: #999999;
    position: relative;
    i {
      margin-right: 7px;
      font-style:normal;
      position: relative;
    }
    &:after {
      content: '';
      width: 31px;
      position: absolute;
      height: 1px;
      transform: scale(.5);
      background-color: #f2f2f2;
      bottom: 8px;
      left: 105px;
    }
    &:before {
      content: '';
      width: 31px;
      position: absolute;
      height: 1px;
      transform: scale(.5);
      background-color: #f2f2f2;
      bottom: 8px;
      right: 105px;
    }
  }
  .details {
    margin-top: 20px;
  }
}
</style>
