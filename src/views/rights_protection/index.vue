<template>
  <div class="chrray-main">
    <div class="head">
      <p class="title">市外维权服务简介</p>
      <p class="text">根据重庆市农民工办委托协议，我市在外务工人员正当合法权益受到严重损害（如工伤事故、劳资纠纷、突发事件等）且多方维权无效时，可向务工区域所驻办事处求助。</p>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      class="chrray-list"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多数据啦"
      @load="onLoad">
      <van-cell-group class="list-group">
<!--        :to="{ path: 'tutor/item', query: { id: 1 } }"-->
        <van-cell
          v-for="(item, index) in dataList"
          class="chrray-cell"
          :key="index">
          <h1 class="cell-title">{{ item.companyName }}</h1>
          <div class="cell-icon-text">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
            <p class="text">{{ item.address }}</p>
          </div>
          <div class="cell-icon-text" @click="callPhone(item.phone)">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
            <p class="text">{{ item.phone }}</p>
          </div>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import api from '@/api/data'
import { List, Cell, CellGroup, Icon, Toast } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      error: false,
      pageInfo: {
        page: 1,
        rows: 10
      },
      dataList: []
    }
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  mounted () {
    //  自定义分享样式
    let shareData = {
      title: this.$route.meta.title,
      link: location.href
    }
    wxApi.share(shareData)
  },
  methods: {
    //  自动加载
    onLoad () {
      this.getData()
    },
    //  获取数据
    getData () {
      let that = this
      api.protectionList(that.pageInfo).then(res => {
        let tempData = res.data;
        if (tempData.length > 0) {
          that.pageInfo.page += 1;
          that.dataList = that.dataList.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    //  拨打电话
    callPhone (phone) {
      window.location.href = `tel:${phone}`
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  .head {
    padding: 15px;
    background-color: #fff;
    .title {
      color: #006CD1;
      font-size: 15px;
    }
    .text {
      padding-top: 10px;
      font-size: 13px;
      line-height: 1.8;
      color: #666;
    }
  }
  .chrray-list {
    margin-top: 15px;
    .list-group {
      background-color: #f2f2f2;
      .chrray-cell {
        margin-bottom: 15px;
        .cell-title {
          font-size: 17px;
          color: #333;
          font-weight: normal;
          line-height: 1.2;
          margin: 0;
        }
        .cell-icon-text {
          display: flex;
          align-items: center;
          padding-top: 10px;
          .icon {
            font-size: 14px;
            color: #666;
            line-height: 1;
            padding-right: 10px;
          }
          .text {
            .icon;
            padding-right: 0;
          }
        }
      }
    }
  }
}
</style>
