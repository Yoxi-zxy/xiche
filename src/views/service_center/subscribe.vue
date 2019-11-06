<template>
  <div class="chrray-main">
    <div class="chrray-word-status">
      <div class="word-status-head">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-24" class="icon"></van-icon>
        <p class="text">预约成功</p>
      </div>
      <div class="word-status-footer">
        <div class="footer-item">
          <p class="title">办事项目</p>
          <div class="des-box">
            <p class="text">{{ info.twoLevelName }}</p>
          </div>
        </div>
        <div class="footer-item">
          <p class="title">办事网点</p>
          <div class="des-box">
            <p class="text">{{ info.townshipName }}-{{ info.jobName }}</p>
            <p class="addres">{{ info.dotDetailedAddress }}</p>
            <span class="phone">{{ info.dotTelephone }}</span>
          </div>
        </div>
        <div class="footer-item">
          <p class="title">预约时间</p>
          <div class="des-box">
            <p class="text">{{ info.bookTime }}点</p>
          </div>
        </div>
        <div class="footer-item">
          <p class="title">流水号</p>
          <div class="des-box">
            <p class="text">{{ info.reservationNumber }}</p>
          </div>
        </div>
        <div class="description" v-html="info.explain"></div>
      </div>
    </div>
    <div class="chrray-btn-box">
      <van-button class="sub-btn" :to="{ path: '/user/personal', query: { userSort: info.individualOrEnterprise } }">查看我的预约</van-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Icon, Button } from 'vant'
export default {
  data () {
    return {
      info: {}
    }
  },
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  mounted () {
    let id = this.$route.query.tbmId
    this.getData(id)
    //
  },
  methods: {
    //  获取数据
    getData (id) {
      let that = this
      api.bookingSuccess({
        tbmId: id
      }).then(res => {
        let replaceRegex = /(\n\r|\r\n|\r|\n)/g
        res.data.explain = res.data.explain.replace(replaceRegex, '<br/>')
        that.info = res.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main{
  padding: 15px;
  .chrray-word-status{
    .word-status-head{
      .icon{
        font-size: 35px;
        color: #006CD1;
        margin-top: 25px;
      }
      .text{
        font-size: 18px;
        color: #3679FF;
        font-weight: inherit;
        margin: 15px 0;
      }
    }
    .word-status-footer{
      padding: 0 15px 17px;
      .footer-item{
        padding-top: 25px;
      }
      .description {
        color: #333;
        font-size: 15px;
        line-height: 1.5;
        margin-top: 25px;
      }
    }
  }
  .sub-btn{
    margin-top: 20px;
  }
}
</style>
