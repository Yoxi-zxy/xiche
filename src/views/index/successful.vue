<template>
  <div>
    <div class="cont">
      <div class="cont-img">
        <div class="cont-box">
          <div class="cont-text">
            <p class="title-text">预约成功</p>
            <p class="vice-text">请稍提前一点时间到店，并出示右上角预约号</p>
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
          <van-cell title="预约时间">
            <div slot="default">
              <div>{{ data.reserveDate }}</div>
              <div>{{ data.reserveTime }}</div>
            </div>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="btn">
        <button class="footer-btn cont-btn" @click="jumpOrder">查看订单</button>
        <div class="index" @click="jumpIndex">返回首页>></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant';
import api from '@/api/data';
export default {
  data () {
    return {
      //  预约成功订单id
      Id: '',
      data: {}
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  created () {
    this.Id = this.$route.query.id;
    this.getOrder();
  },
  methods: {
    //  获取订单详情
    getOrder () {
      let that = this;
      api.getOrder(that.Id).then(res => {
        that.data = res.data
      })
    },
    //  跳转首页
    jumpIndex () {
      this.$router.push({
        path: '/'
      })
    },
    //  跳转查看订单
    jumpOrder () {
      this.$router.push({
        path: '/user'
      })
    }
  }
};
</script>

<style scoped lang="less">

</style>
