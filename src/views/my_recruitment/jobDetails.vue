<template>
  <div class="chrray_body">
    <div class="info-head">
      <div class="title-box">
        <div class="title">{{ info.jobName }}</div>
        <div class="money" v-if="info.salaryStart === 0">面议</div>
        <div class="money" v-else>月薪:{{ info.salaryStart }}元-{{ info.salaryEnd }}元</div>
      </div>
      <div class="time-box">
        <van-icon class-prefix="chrray-icon" name="tubiaosvg-8" class="icon"></van-icon>
        <p class="text">有效期: {{ info.finiteTimeStart | timeZH }}至{{ info.finiteTimeEnd | timeZH }}</p>
      </div>
      <div class="justify-content">
        <div class="time-box">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-1" class="icon"></van-icon>
          <p class="text">人数: {{ info.personNum }}</p>
        </div>
        <div class="time-box">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-31" class="icon"></van-icon>
          <p class="text">学历: {{ info.educationName }}</p>
        </div>
        <div class="time-box">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-30" class="icon"></van-icon>
          <p class="text">年龄: {{ info.ageStart }}~{{ info.ageEnd }}</p>
        </div>
      </div>
      <div class="justify-content">
        <div class="time-box">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-32" class="icon"></van-icon>
          <p class="text" v-if="info.sex === 1">性别: 男</p>
          <p class="text" v-if="info.sex === 2">性别: 女</p>
          <p class="text" v-if="info.sex === 3">性别: 不限</p>
        </div>
      </div>
    </div>
    <div class="info-content">
      <p class="text">职位详情</p>
      <div v-html="info.jobIntroduce"></div>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Icon } from 'vant'
import { timestampToTime } from '@/lib/util'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      info: {}
    }
  },
  components: {
    [Icon.name]: Icon
  },
  //  时间过滤器
  filters: {
    timeZH (val) {
      return timestampToTime(val / 1000).split(' ')[0]
    }
  },
  mounted () {
    let id = this.$route.query.id
    this.getData(id)
  },
  methods: {
    getData (id) {
      let that = this;
      let params = {
        jobInfoId: id
      };
      api.jobDetails(params).then((res) => {
        let replaceRegex = /(\n\r|\r\n|\r|\n)/g
        res.data.jobIntroduce = res.data.jobIntroduce.replace(replaceRegex, '<br/>');
        that.info = res.data;
        that.pageData = res.data
        //  自定义分享样式
        let shareData = {
          title: res.data.jobName,
          desc: res.data.jobIntroduce,
          link: location.href
        }
        wxApi.share(shareData)
      }).catch((error) => {
        alert(error)
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray_body {
  background-color: #fff;
  padding: 15px;
  min-height: calc(100vh - 30px);
  .info-head {
    padding: 0 0 20px;
    border-bottom: 1px solid #f2f2f2;
    .title-box {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .title {
        width: 0;
        flex: 1;
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
        /*overflow: hidden;*/
        word-break: break-word;
        font-size: 23px;
        color: #333;
        font-weight: bold;
        /*text-align: left;*/
      }
      .money {
        font-size: 15px;
        color: #006CD1;
        line-height: 2;
      }
    }
    .time-box {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .icon {
        font-size: 15px;
        color: #666;
        line-height: 1;
      }
      .text {
        font-size: 15px;
        color: #666;
        line-height: 1;
        padding-left: 5px;
      }
    }
    .justify-content {
      .time-box;
      justify-content: space-between;
      margin-top: 0;
      .text {
        padding-right: 10px;
      }
    }
  }
  .info-content {
    .text {
      padding: 20px 0;
      text-align: left;
      font-size: 15px;
      color: #333;
    }
  }
}
</style>
