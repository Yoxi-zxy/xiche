<template>
  <div class="cont">
    <div class="cont-img">
      <div class="cont-box">
        <div class="cont-text" v-if="data.status === '0'">
          <p class="title-text">已下单</p>
          <p class="vice-text">请稍提前一点时间到店，并出示右上角预约号。</p>
        </div>
        <div class="cont-text" v-if="data.status === '1'">
          <p class="title-text">已接单</p>
          <p class="vice-text">请稍提前一点时间到店，并出示右上角预约号。</p>
        </div>
        <div class="cont-text" v-if="data.status === '2'">
          <p class="title-text">已完成</p>
          <p class="vice-text">感谢你的支持！</p>
        </div>
        <p class="number">{{ data.seqNum }}</p>
      </div>
    </div>
    <div class="cont-information">
      <van-cell-group>
        <van-cell title="类型" :value="data.productName" />
        <van-cell title="价格">
          <div slot="default">
            <div class="default-text">${{ data.productPrice }}</div>
          </div>
        </van-cell>
        <van-cell title="车主姓名" :value="data.name" />
        <van-cell title="联系电话" :value="data.phone" />
        <van-cell title="联系电话">
          <div slot="default">
            <div>{{ data.reserveDate }}</div>
            <div>{{ data.reserveTime }}</div>
          </div>
        </van-cell>
        <van-cell title="下单时间" :value="data.createTime" />
      </van-cell-group>
    </div>
    <div class="btn" v-if="data.status === '0'">
      <button class="footer-btn cont-btn" @click="cancelOrder(data.id)">取消订单</button>
    </div>
    <div class="btn" v-if="data.status === '2'">
      <button class="footer-btn cont-btn" @click="deleteOrder(data.id)">删除订单</button>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Dialog } from 'vant';
import api from '@/api/data';
export default {
  data () {
    return {
      Id: '',
      data: {}
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.Component.name]: Dialog.Component
  },
  created () {
    this.Id = this.$route.query.id;
    this.getOrder()
  },
  methods: {
    //  获取订单详情
    getOrder () {
      let that = this;
      api.getOrder(that.Id).then(res => {
        that.data = res.data
      })
    },
    //  取消订单
    cancelOrder (id) {
      Dialog.confirm({
        title: '确认取消订单吗？'
      }).then(() => {
        api.cancelOrder(id).then(res => {
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
          this.$router.push({
            path: '/user'
          })
        });
      }).catch(() => {
        // on cancel
      });
    },
  }
};
</script>

<style scoped>

</style>
