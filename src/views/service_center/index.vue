<template>
  <div class="chrray-main">
    <form v-if="!isQR">
      <van-search placeholder="请输入相关内容" v-model="searchVal" @search="onSearch"/>
    </form>
    <div class="hall-select" v-if="!isQR">
      <div class="section-list" v-for="(item, index) in infoList" :key="index">
        <div class="title-box">
          <van-icon class-prefix="chrray-icon" :name="item.icon" class="icon"></van-icon>
          <p class="title">{{ item.oneLevelName }}</p>
        </div>
        <div class="con-list">
          <router-link
            :to="{ path: '/hall/process', query: { id: items.detId } }"
            class="con-list-item"
            v-for="(items, index) in item.towLevel"
            :key="index">
            {{ items.twoLevelName }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="hall-select top0" v-if="isQR">
      <div class="section-list">
        <div class="title-box">
          <van-icon class-prefix="chrray-icon" :name="qrTitle.icon" class="icon"></van-icon>
          <p class="title">{{ qrTitle.oneLevelName }}</p>
        </div>
        <div class="section-con">
          <p class="titles" v-if="qrList1.towLevel">个人办事</p>
          <div class="con-list">
            <router-link
              :to="{ path: '/hall/process', query: { id: items.detId, title: items.twoLevelName } }"
              class="con-list-item"
              v-for="(items, index) in qrList1.towLevel"
              :key="index">
              {{ items.twoLevelName }}
            </router-link>
          </div>
          <p class="titles" v-if="qrList2.towLevel">企业办事</p>
          <div class="con-list">
            <router-link
              :to="{ path: '/hall/process', query: { id: items.detId, title: items.twoLevelName } }"
              class="con-list-item"
              v-for="(items, index) in qrList2.towLevel"
              :key="index">
              {{ items.twoLevelName }}
            </router-link>
          </div>
        </div>
        <!--<div class="con-list">-->
          <!--<router-link-->
            <!--:to="{ path: '/hall/process', query: { id: items.detId, title: items.twoLevelName } }"-->
            <!--class="con-list-item"-->
            <!--v-for="(items, index) in item.towLevel"-->
            <!--:key="index">-->
            <!--{{ items.twoLevelName }}-->
          <!--</router-link>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Search, Cell, CellGroup, Icon, Toast } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      Id: '',
      QR: '',
      isQR: false,
      searchVal: '',
      infoList: [],
      qrTitle: {},
      qrList1: [],
      qrList2: []
    }
  },
  components: {
    [Search.name]: Search,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  mounted () {
    if (this.$route.query.userType) {
      this.Id = this.$route.query.userType
      this.getData()
    } else if (this.$route.query.oneLevelNumber) {
      this.QR = this.$route.query.oneLevelNumber
      this.getQRData()
    }
    let shareData = {
      title: this.$route.meta.title,
      link: location.href
    }
    wxApi.share(shareData)
  },
  methods: {
    //  获取数据
    getData () {
      let that = this
      let params = {
        individualOrEnterprise: that.Id
      }
      api.hallData(params).then(res => {
        that.infoList = res.data
      }).catch(err => {
        Toast(err.msg)
      })
    },
    //  通过二维码进入的页面
    getQRData () {
      let that = this
      that.isQR = true
      let params = {
        oneLevelNumber: that.QR
      }
      api.qrIndex(params).then(res => {
        that.qrTitle = res.data.enterprise[0] || res.data.person[0]
        that.qrList1 = res.data.person[0] || []
        that.qrList2 = res.data.enterprise[0] || []
      }).catch(err => {
        Toast(err.msg)
      })
    },
    //  搜索
    onSearch () {
      let that = this
      let id = that.$route.query.userType
      let params = {
        individualOrEnterprise: id,
        levelName: that.searchVal
      }
      api.hallData(params).then(res => {
        that.infoList = res.data
      })
    }
  },
  watch: {
    'searchVal' (newVal) {
      if (newVal === '') {
        this.getData()
      }
    }
  }
}
</script>

<style scoped lang="less">
.hall-select {
  margin-top: 10px;
  background-color: #fff;
  padding: 15px;
  &.top0 {
    margin-top: 0;
  }
  .section-list {
    .title-box {
      display: flex;
      align-items: center;
      .icon {
        font-size: 15px;
        color: #006CD1;
      }
      .title {
        padding-left: 15px;
        .icon
      }
    }
    .section-con {
      .titles {
        padding-top: 15px;
        padding-bottom: 5px;
        font-size: 15px;
        color: #006CD1;
      }
    }
    .con-list {
      display: flex;
      /*align-items: center;*/
      flex-wrap: wrap;
      padding: 10px 0;
      .con-list-item {
        width: 50%;
        /*padding: 10px 10px 10px 0;*/
        box-sizing: border-box;
        padding-right: 10px;
        margin-bottom: 20px;
        border-right: 1px solid #f2f2f2;
        /*border-bottom: 1px solid red;*/
        /*border-right: 1px solid #f2f2f2;*/
        font-size: 15px;
        color: #333;
        &:nth-child(2n) {
          border-right: 0;
          padding-left: 10px;
          padding-right: 0;
        }
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
}
</style>
