<template>
  <div class="cont pad-bot">
    <div class="sub-header">
      <div class="sub-con con add">
        <p class="sub-type">类型</p>
        <p class="sub-type">{{ info.name }}</p>
      </div>
      <div class="sub-con con">
        <p class="sub-type">价格</p>
        <p class="sub-type money">${{ info.price }}</p>
      </div>
    </div>
    <van-cell-group>
      <van-field
        label="姓名"
        input-align="right"
        placeholder="请输入车主姓名"
        v-model="value"
      />
      <van-field
        label="联系电话"
        input-align="right"
        placeholder="请输入车主联系电话"
        v-model="phoneValue"
      />
      <van-cell title="预约时间" @click="showPopup" is-link :value="this.Format" />
      <van-popup
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
      </van-popup>
    </van-cell-group>
    <div class="sub-time">
      <div class="tex">选择时间</div>
      <div class="sub-position" v-if="info.type === '1'">
      <div class="sub-pos" v-for="(item, index) in data.reserveList"
           :key="index" :class="values === index ? 'wa' : ''" @click="jumpPosition(index)">
        <div class="pos-time">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-1"></van-icon>
          {{ item.label }}</div>
        <div class="pos-left">剩余{{ item.num }}位</div>
      </div>
    </div>
      <div class="sub-position" v-if="info.type === '2'">
        <div
          class="sub-pos" v-for="(item, index) in data.reserveList"
          :key="index"
          :class="[{'wa':values === index},{'ssd': item.num === 0}]"
          @click="jumpPosition(index, item)">
          <div class="pos-time">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-1"></van-icon>
            {{ item.label }}</div>
          <div class="pos-left">剩余{{ item.num }}位</div>
        </div>
      </div>
    </div>
    <button class="footer-btn" @click="jump">立即预约</button>
  </div>
</template>

<script>
import { Field, Cell, Popup, Picker, DatetimePicker, CellGroup, Icon } from 'vant';
import api from '@/api/data';
export default {
  data () {
    return {
      //   日期选择器
      show: false,
      //  当前时间/最小时间
      currentDate: new Date(),
      minDate: new Date(),
      maxDate: null,
      //  商品id
      Id: '',
      //  日期格式
      Format: '',
      //  日期选择改变
      changeTime: '',
      //  获取姓名
      value: '',
      //  获取电话
      phoneValue: '',
      //  获取类型
      valueType: 0,
      data: {},
      info: {},
      values: 0
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [Icon.name]: Icon
  },
  created () {
    //  获取详情页商品id
    this.Id = this.$route.query.id;
    this.getFormDate();
    this.getProductReserve();
    this.advanceDate()
  },
  methods: {
    //  日期选择器
    showPopup () {
      this.show = true;
    },
    //  获取商品预约信息
    getProductReserve () {
      let that = this;
      let params = `${that.Id}?date=${that.Format}`;
      api.getProductReserve(params).then(res => {
        that.data = res.data;
        that.info = res.data.info;
        that.advanceDate(res.data.info.days)
      })
    },
    //  添加订单
    addOrder () {
      let that = this;
      let params = {
        userId: '87e12d0070424ee4bde880dd23bfdc76',
        productId: that.Id,
        name: that.value,
        phone: that.phoneValue,
        date: that.Format,
        reserveType: that.valueType
      };
      api.addReserve(params).then(res => {
        let id = res.data.orderId;
        alert('预约成功！');
        this.$router.push({
          path: '/successful',
          query: { id }
        });
      }).catch(err => {
        alert(err.msg);
      })
    },
    //  跳转预约完成页
    jump () {
      this.addOrder();
    },
    //  点击切换
    jumpPosition (index, item) {
      if (item.num !== 0) {
        this.values = index;
        this.valueType = item.value
      }
    },
    //  日期格式转换
    getFormDate () {
      let that = this;
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month > 0 && month < 10) {
        month = '0' + month
      }
      if (strDate > 0 && strDate < 10) {
        strDate = '0' + strDate
      }
      that.Format = year + '-' + month + '-' + strDate
    },
    //  可提前预约日期
    advanceDate (day) {
      let that = this;
      let beforeDate = new Date();
      let date1 = new Date(beforeDate);
      that.maxDate = new Date(date1.setDate(beforeDate.getDate() + day))
    },
    //  日期选择
    change (e) {
      let that = this;
      let endTime = e.getValues();
      that.changeTime = `${endTime[0]}-${endTime[1]}-${endTime[2]}`
    },
    //  完成按钮/关闭选择器并更新预约时间
    confirm () {
      let that = this;
      this.show = false;
      that.Format = that.changeTime;
      that.getProductReserve()
    },
    //  取消按钮/关闭选择器
    cancel () {
      this.show = false;
    }
  }
};
</script>

<style scoped lang="less">
.cont {
  .sub-header {
    margin-bottom: 15px;
    background-color: white;
    .sub-con {
      display: flex;
      justify-content: space-between;
      position: relative;
      .sub-type {
        color: #333333;
        font-size: 15px;
      }
      .money {
        color:  #F0271D;
      }
    }
  }
  .sub-time {
    .tex {
      padding: 15px;
      color: #666666;
    }
    .sub-position {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 50px;
      background-color: #f2f2f2;
      .sub-pos {
        background-color: white;
        width: 49.9%;
        text-align: center;
        color: #666666;
        padding: 15px 0;
        .pos-time {
          margin-bottom: 13px;
          i {
            margin-right: 15px;
          }
        }
      }
      .wa {
        background-color: #F0271D;
        color: white;
      }
      .ssd {
        background-color: #e5e5e5;
        color: #999999;
      }
      .sub-pos:nth-child(2n-1) {
        border-bottom: .5px solid #f2f2f2;
        border-right: .5px solid #f2f2f2;
      }
      .sub-pos:nth-child(2n) {
        border-bottom: .5px solid #f2f2f2;
      }
    }
  }
}
.pad-bot {
  padding-bottom: 0;
}
</style>
