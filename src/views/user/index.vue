<template>
  <div class="cont">
    <div v-if="this.$route.meta.hidden">
      <div>
        <div class="user-header">
          <div class="user-portrait">
            <div class="user-con"></div>
          </div>
          <p class="user-name">张三丰</p>
          <div class="user-service">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-4"></van-icon>
            <a class="user-kf" href="tel:123456">客服</a>
          </div>
        </div>
        <van-tabs title-active-color="#F0271D" @click="tabClick">
          <van-tab v-for="(item, index) in classList" :key="index" :title="item.name" :name="item.status">
            <div class="user-box" v-for="(items, index) in dataList" :key="index">
              <div @click="jumpTheOrder(items.id)">
                <div class="order-time add">
                  <p class="time-text">预约时间 {{ items.reserveDate }} {{ items.reserveTime }}</p>
                </div>
                <div class="order-time center add">
                  <img class="order-img" :src="items.img" alt="图片">
                  <div class="information">
                    <p class="inform-one text-mag">{{ items.productName }}</p>
                    <p class="inform-two text-mag">预约号：{{ items.seqNum }}</p>
                    <p class="inform-three">${{ items.productPrice }}</p>
                  </div>
                </div>
              </div>
              <div class="order-time btn" v-if="item.status === '0'">
                <button class="order-btn" @click="cancelOrder(items.id)">取消订单</button>
                <van-dialog
                  v-model="show"
                  title="标题"
                  show-cancel-button
                >
                </van-dialog>
              </div>
              <div class="order-time btn" v-if="item.status === '2'">
                <button class="order-btn" @click="deleteOrder(items.id)">删除订单</button>
              </div>
            </div>
          </van-tab>
        </van-tabs>
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
    </div>
    <router-view />
  </div>
</template>

<script>
import { Tab, Tabs, Tabbar, TabbarItem, Button, Icon, Dialog } from 'vant';
import api from '@/api/data';
import { getToken } from '@/lib/util';
export default {
  data () {
    return {
      //  总页数
      pageInfo: { page: 1 },
      classList: [
        {
          status: '0',
          name: '已下单'
        },
        {
          status: '1',
          name: '已接单'
        },
        {
          status: '2',
          name: '已完成'
        }
      ],
      status: '0',
      dataList: [],
      show: false,
      userMsg: null,
      information: {}
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component
  },
  created () {
    this.getOrderList()
  },
  mounted () {
    let that = this;
    //  获取用户信息
    that.userMsg = getToken(JSON.parse('openId'));
    let params = {
      openId: that.userMsg.openid,
      accessToken: that.userMsg.access_token
    };
    api.getUserInfo(params).then(res => {
      that.information = res.data
    })
  },
  methods: {
    //  查询订单列表
    getOrderList () {
      let that = this;
      let params = {
        page: that.pageInfo.page,
        userId: '87e12d0070424ee4bde880dd23bfdc76',
        status: that.status
      };
      api.getOrderList(params).then(res => {
        that.dataList = res.data.data
      })
    },
    //  取消订单
    cancelOrder (id) {
      Dialog.confirm({
        title: '确认取消订单吗？'
      }).then(() => {
        api.cancelOrder(id).then(res => {
          this.getOrderList()
        });
      }).catch(() => {
        // on cancel
      });
    },
    //  删除订单
    deleteOrder (id) {
      Dialog.confirm({
        title: '确认删除订单吗？'
      }).then(() => {
        api.deleteOrder(id).then(res => {
          this.getOrderList()
        });
      }).catch(() => {
        // on cancel
      });
    },
    //  状态切换
    tabClick (name) {
      this.status = name;
      this.pageInfo.page = 1;
      this.getOrderList()
    },
    //  跳转订单详情页
    jumpTheOrder (id) {
      this.$router.push({
        path: '/user/order',
        query: { id }
      })
    }
  }
};
</script>

<style scoped lang="less">
.cont {
  .user-header {
    background: url("../../assets/img/about-successful.png");
    background-size: 100%;
    width: 100%;
    height: 143px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    .user-portrait {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 72px;
      height: 72px;
      border: 1px solid #ffffff;
      opacity: .2;
      border-radius: 50%;
      padding: 6px;
      margin: 0 15px;
      box-sizing: border-box;
      .user-con {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: black;
      }
    }
    .user-name {
      font-size: 16px;
      color: #ffffff;
    }
    .user-service {
      position: absolute;
      background-color: #000000;
      border-radius: 15px 0 0 15px;
      right: 0;
      padding: 8px 15px;
      .user-kf {
        margin-left: 6px;
        color: #ffffff;
        font-size: 13px;
        letter-spacing: 2px;
      }
    }
  }
  .user-box {
    .order-time {
      padding: 15px;
      position: relative;
      .time-text {
        color: #666666;
        font-size: 15px;
      }
      .order-img {
        width: 127px;
        height: 68px;
        margin-right: 15px;
      }
      .information {
        .text-mag {
          margin-bottom: 4px;
        }
        .inform-one {
          font-size: 16px;
          color: #000000;
        }
        .inform-two {
          color: #666666;
          font-size: 14px;
        }
        .inform-three {
          color: #F0271D;
          font-size: 16px;
        }
      }
    }
    .btn {
      display: flex;
      justify-content: flex-end;
      .order-btn {
        border-style: none;
        padding: 7px 16px;
        border-radius: 16px;
        color: #666666;
        background-color: #f2f2f2;
      }
    }
    .center {
      display: flex;
    }
  }
}
</style>
