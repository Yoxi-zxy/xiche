<template>
  <div class="chrray-main">
    <van-panel class="chrray-panel">
      <div slot="header">
        <div class="sort-box">
          <p class="text" v-if="info.type === 1">我申请的资金支持-个人</p>
          <p class="text" v-if="info.type === 2">我申请的资金支持-企业</p>
          <p class="text" v-if="info.type === 3">我申请的场地支持-个人</p>
          <p class="text" v-if="info.type === 4">我申请的场地支持-企业</p>
          <p class="text" v-if="info.type === 5">我申请的导师指导</p>
          <p class="text" v-if="info.type === 6">我申请的创业活动</p>
        </div>
      </div>
      <div class="panel-body">
        <div class="body-list-item">
          <p class="text">申请人：{{ info.applyPersonName }}</p>
        </div>
        <div class="body-list-item">
          <p class="text">联系电话：{{ info.telephone }}</p>
        </div>
        <div class="body-list-item one" v-if="info.type === 1">
          <p class="text">申请人类型：{{ info.personnelTypeName }}</p>
        </div>
        <div class="body-list-item">
          <p class="text">申请时间：{{ info.addTime }}</p>
        </div>
      </div>
    </van-panel>
    <van-cell class="chrray-cell">
      <div class="cell-item" v-if="info.type === 1 || info.type === 2">
        <p class="text">贷款类型：{{ info.dictName }}</p>
      </div>
      <div class="cell-item" v-if="info.type === 1 || info.type === 2">
        <p class="text">金额：{{ info.applyPrice }}</p>
      </div>
      <div class="cell-item" v-if="info.type === 3">
        <p class="text">申请工位个数：{{ info.people }}</p>
      </div>
      <div class="cell-item" v-if="info.type === 4">
        <p class="text">入驻孵化园：{{ info.incubatorGarden }}</p>
      </div>
      <div class="cell-item" v-if="info.type === 4">
        <p class="text">办公面积：{{ info.officeArea }}㎡</p>
      </div>
      <div class="cell-item" v-if="info.type === 4">
        <p class="text">入住人数：{{ info.people }}人</p>
      </div>
      <div class="cell-item" v-if="info.type === 1 || info.type === 2">
        <p class="text">资金用途：{{ info.useOfFunds }}</p>
      </div>
      <div class="cell-item" v-if="info.type === 3 || info.type === 4">
        <p class="text">场地用途或需求：{{ info.useOfFunds }}</p>
      </div>
      <div class="cell-item" v-if="info.type === 5">
        <p class="text">导师名称：{{ info.ensTitle }}</p>
      </div>
      <div class="cell-item" v-if="info.type === 5">
        <p class="text">指导类型：{{ info.guidanceType }}</p>
      </div>
      <div class="cell-item" v-if="info.type === 6">
        <p class="text">活动所在地：{{ info.address }}</p>
      </div>
      <div class="cell-item" v-if="info.type === 6">
        <p class="text">活动时间：{{ info.activityStartTime }}至{{ info.activityEndTime }}</p>
      </div>
    </van-cell>
  </div>
</template>

<script>
import api from '@/api/data'
import { Panel, Cell, Toast } from 'vant'
export default {
  data () {
    return {
      params: {
        type: this.$route.query.typeId,
        tokenId: localStorage.getItem('tokenId'),
        tcsId: this.$route.query.id
      },
      info: {}
    }
  },
  components: {
    [Panel.name]: Panel,
    [Cell.name]: Cell,
    [Toast.name]: Toast
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      let that = this
      api.businessApplyDetails(that.params).then(res => {
        that.info = res.data
      }).catch(err => {
        Toast(err.msg)
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  .chrray-panel {
    padding: 15px 0 15px 15px;
    margin-top: 0;
    .sort-box {
      border-bottom: 1PX solid #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      padding-right: 15px;
      .text {
        font-size: 15px;
        color: #333;
        line-height: 1;
      }
    }
    .panel-body {
      padding-top: 15px;
      display: flex;
      flex-direction: column;
      .body-list-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        margin-right: 22px;
        &:last-child {
          margin-bottom: 0;
        }
        &.one {
          width: 100%;
        }
        .icon {
          font-size: 14px;
          color: #666;
          line-height: 1;
        }
        .text {
          .icon;
        }
      }
    }
  }
  .chrray-cell {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .cell-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .text {
        font-size: 14px;
        color: #666;
        line-height: 1;
      }
    }
  }
}
</style>
