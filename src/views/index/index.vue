<template>
  <div class="main">
    <div class="con" v-if="this.$route.meta.hidden">
      <div class="mg-bt">
        <div class="index-header">
          <p class="index-text">营业时间</p>
          <p class="index-time">10:00-19:30</p>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          :error.sync="error"
          @load="onLoad"
        >
          <div class="index-content" v-for="(item, index) in dataList" :key="index" @click="jump(item.id)">
            <img class="content-img" :src="item.coverImg" alt="图片">
            <div class="content-text">
              <h3>{{ item.name }}</h3>
              <div class="chy" v-if="item.isHaveClass === '1'"><i class="text-i">${{item.price}}</i></div>
              <div v-if="item.isHaveClass === '2'" class="text">
                <p
                  class="text-one"
                  v-for="(items, idx) in item.classList" :key="idx">
                  {{items.name}}
                  <i class="text-i">${{items.price}}</i>
                </p>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <van-tabbar
        route
        active-color="#000"
        inactive-color="#999">
        <van-tabbar-item
          replace
          to="/">
          <div slot="icon">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-6"></van-icon>
          </div>
          首页
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/user">
          <div slot="icon">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-5"></van-icon>
          </div>
          用户中心
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { Tabbar, TabbarItem, List, Cell, Icon } from 'vant';
import api from '@/api/data';
export default {
  data () {
    return {
      dataList: [],
      loading: false,
      finished: false,
      pageInfo: { page: 1 },
      error: false
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [List.name]: List,
    [Cell.name]: Cell,
    [Icon.name]: Icon
  },
  created () {
    //  页面加载
    this.getShopList()
  },
  mounted () {
    //
  },
  methods: {
    //  跳转详情页
    jump (id) {
      this.$router.push({
        path: '/details',
        query: { id }
      })
    },
    //  获取商品列表
    getShopList () {
      let that = this;
      api.getProductList(that.pageInfo).then(res => {
        that.dataList = res.data.data;
        let temp = res.data.data;
        if (temp.length > 9) {
          that.pageInfo.page += 1;
          that.dataList = that.dataList.concat(temp)
        } else {
          this.finished = true;
        }
        this.loading = false;
      }).catch(() => {
        this.error = true
      })
    },
    onLoad () {
      // 异步更新数据
      if (this.pageInfo.page !== 1) {
        this.getShopList()
      }
    }
  }
};
</script>

<style scoped lang="less">
.con {
  padding: 0 15px;
  box-sizing: border-box;
  .index-header {
    display: flex;
    padding: 20px 0;
    .index-text {
      color: #282828;
      font-size: 20px;
      font-weight: bold;
      margin-right: 11px;
    }
    .index-time {
      color: #282828;
      font-size: 15px;
      margin-top: 8px;
    }
  }
  .index-content {
    width: 100%;
    height: auto;
    border-radius: 15px;
    background-color: #f2f2f2;
    overflow: hidden;
    margin-bottom: 12px;
    .content-img {
      width: 100%;
      height: 185px;
    }
    .content-text {
      margin: 20px 0 20px 17px;
      display: flex;
      h3 {
        margin: 0;
      }
      .chy {
        padding-top: 2px;
        .text-i {
          font-size: 15px;
          color: red;
          margin-left: 19px;
          font-style:normal
        }
      }

      .text {
        display: flex;
        .text-one {
          font-size: 15px;
          margin-left: 19px;
          color: #333333;
          .text-i {
            color: red;
            margin-left: 5px;
            font-style:normal
          }
        }
      }
    }
  }
}
</style>
