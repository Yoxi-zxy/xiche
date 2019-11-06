<template>
  <div>
    <van-tabs @change="changeTab" class="cy-tabs white">
      <van-tab v-for="(item, index) in tabNav" :key="index">
        <div slot="title" class="asdhkajhdkjas">
          <van-icon v-if="index === 0" class-prefix="chrray-icon" name="tubiaosvg-13"></van-icon>
          <van-icon v-if="index === 1" class-prefix="chrray-icon" name="tubiaosvg-10"></van-icon>
          {{ item.title }}
        </div>
        <div>
          <div  v-if="index === 0">
            <div class="tab-content-head">
              <router-link :to="{ path: '/job/intent' }" class="text-box">
                <span class="text">求职意向设置</span>
                <van-icon name="arrow" class="icon"></van-icon>
              </router-link>
            </div>
          </div>
          <div class="search-box" v-if="index === 1">
            <!-- 分类按钮 -->
            <p class="selectBtn " @click="cityShow = !cityShow">{{ parentText }}</p>
            <hr class="hr">
            <p class="selectBtn ellipsis" @click="sortShow = !sortShow">{{ sortText }}</p>
            <hr class="hr">
            <form class="cy-serch-box">
              <van-search
                class="cy-serch"
                v-model="pageInfo.jobName"
                placeholder="请输入搜索关键词"
                @search="onSearch">
              </van-search>
            </form>
          </div>
          <van-list
            v-model="loading"
            :finished="finished"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多数据啦"
            @load="onLoad">
            <ul class="tab-content-list">
              <li class="tab-content-item" v-for="item in jobList" :key="item.jobInfoId">
                <router-link :to="{ path: '/job/item', query: { id: item.jobInfoId } }" class="cy-card">
                  <div class="card-title-box">
                    <div class="title">{{ item.jobName }}</div>
                    <div class="money" v-if="item.salaryStart === 0">面议</div>
                    <div class="money" v-else>{{ item.salaryStart }}元-{{ item.salaryEnd }}元</div>
                  </div>
                  <div class="card-body-box">
                    <div class="card-body-item">
                      <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
                      <p class="text" v-if="item.countyWithinExternal === '0'">{{ item.provinceName }}{{ item.cityName }}{{ item.regionStr }}{{ item.companyDetailedAddress }}</p>
                      <p class="text" v-if="item.countyWithinExternal === '1'">{{ item.provinceName }}{{ item.districtName }}{{ item.regionStr }}{{ item.companyDetailedAddress }}</p>
                    </div>
                    <div class="card-body-item">
                      <van-icon class-prefix="chrray-icon" name="tubiaosvg-7" class="icon"></van-icon>
                      <!--<i class="iconfont icon-tubiaosvg-7 icon"></i>-->
                      <p class="text">{{ item.corporateName }}</p>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 弹窗选择 -->
    <!-- 地区选择 -->
    <van-popup v-model="cityShow" position="bottom">
      <van-picker
        :columns="parent"
        value-key="name"
        show-toolbar
        @change="parentChange"
        @cancel="cityShow = !cityShow"
        @confirm="onConfirm">
      </van-picker>
    </van-popup>
    <!-- 分类选择 -->
    <van-popup v-model="sortShow" position="bottom">
      <van-picker
        :columns="sortList"
        show-toolbar
        value-key="joncName"
        @change="onChange"
        @cancel="sortShow = !sortShow"
        @confirm="sortConfirm">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/data'
import { Tab, Tabs, Icon, List, Cell, Toast, Search, Popup, Picker } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      tabNav: [
        { title: '精品推荐' },
        { title: '全部职位' }
      ],
      curIndex: 0,
      parentText: '选择地区',
      sortText: '职位分类',
      jobList: [],
      pageInfo: {
        jobName: '',
        jobCate: '',
        jobTwoCate: '',
        township: '',
        tokenId: '',
        page: 1,
        rows: 10
      },
      //  精品职位加载状态
      loading: false,
      finished: false,
      error: false,
      //  地区选择
      cityShow: false,
      parent: [],
      //  职位分类
      sortShow: false,
      sortList: [],
      //  地区选择的第一项判断是否一样
      Index: 0
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [List.name]: List,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Search.name]: Search,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  mounted () {
    this.pageInfo.tokenId = localStorage.getItem('tokenId')
    this.getBoutiqueJob()
    this.getParent()
    this.getSort()
    //  自定义分享样式
    let shareData = {
      title: this.$route.meta.title,
      link: location.href
    }
    wxApi.share(shareData)
  },
  methods: {
    onLoad () {
      if (this.pageInfo.page !== 1) {
        if (this.curIndex === 0) {
          this.getBoutiqueJob()
        } else if (this.curIndex === 1) {
          this.getAllJob()
        }
      }
    },
    //  tab切换
    changeTab (name) {
      this.pageInfo.page = 1
      this.jobList = []
      this.finished = false
      this.curIndex = name
      if (name === 0) {
        this.getBoutiqueJob()
      } else if (name === 1) {
        this.getAllJob()
      }
    },
    //  精品职位查询
    getBoutiqueJob () {
      let that = this;
      api.boutiqueJob(that.pageInfo).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo.page += 1
          that.jobList = that.jobList.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    //  全部职位查询
    getAllJob () {
      let that = this
      let data = that.pageInfo
      api.allJob(data).then(res => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo.page += 1
          that.jobList = that.jobList.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    //  获取地区
    getParent () {
      let that = this
      let params = {
        parentId: 31744
      }
      api.parent(params).then(res => {
        for (let i in res.data) {
          res.data[i].text = res.data[i].name
          res.data[i].value = res.data[i].id
        }
        let all = {
          text: '全部',
          value: ''
        }
        res.data.unshift(all)
        that.parent = [
          {
            values: [
              {
                name: '全部',
                id: ''
              },
              {
                name: '丰都县',
                id: '31744'
              }
            ]
          },
          {
            values: []
          }
        ]
      }).catch(err => {
        Toast(err.msg)
      })
    },
    //  地区改变
    parentChange (pick, val) {
      console.log(val)
      api.parent({ parentId: val[0].id }).then(res2 => {
        pick.setColumnValues(1, res2.data);
      })
    },
    //  地区选择后回调
    onConfirm (val) {
      if (val[0].id === '') {
        this.parentText = val[0].name
        this.pageInfo.township = val[0].id
      } else {
        this.parentText = val[1].name
        this.pageInfo.township = val[1].id
      }
      this.pageInfo.page = 1
      this.jobList = []
      this.getAllJob()
      this.cityShow = !this.cityShow
    },
    //  获取职位分类
    getSort () {
      let that = this
      let params = {
        classType: 1
      }
      api.jobSort(params).then(res => {
        let all = {
          joncName: '全部',
          joncId: '',
          children: []
        }
        res.data.unshift(all)
        let listData = res.data
        that.sortList = [
          {
            values: listData,
            className: 'column1',
            defaultIndex: that.sortIndex1
          },
          {
            values: listData[0].children,
            className: 'column2',
            defaultIndex: that.sortIndex2
          }
        ]
        // that.sortList = res.data
      })
    },
    //  职位分类变化
    onChange (picker, values) {
      picker.setColumnValues(1, values[0].children);
    },
    //  职位分类选择后回调
    sortConfirm (val) {
      this.sortText = val.text
      if (val[1] === undefined) {
        this.pageInfo.jobCate = val[0].joncId
        this.sortText = val[0].joncName
      } else {
        this.pageInfo.jobCate = val[0].joncId
        this.pageInfo.jobTwoCate = val[1].joncId
        this.sortText = val[0].joncName + '-' + val[1].joncName
      }
      // this.pageInfo.jobCate = val.value
      this.pageInfo.page = 1
      this.jobList = []
      this.getAllJob()
      this.sortShow = !this.sortShow
    },
    //  提交全部职位查询条件
    onSearch () {
      this.pageInfo.page = 1
      this.jobList = []
      this.getAllJob()
    }
  }
}
</script>

<style scoped lang="less">
.tab-content-head {
  background-color: #fff;
  text-align: center;
  padding: 15px 0;
  .text-box {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      font-size: 15px;
      color: #666;
      line-height: 1;
    }
    .icon {
      .text
    }
  }
}
.tab-content-list {
  padding: 15px;
  .tab-content-item {
    list-style: none;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 5px;
    .cy-card {
      display: block;
      padding: 15px;
      .card-title-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
          white-space: nowrap;
          width: 0;
          text-overflow: ellipsis;
          overflow: hidden;
          flex: 1;
          font-size: 15px;
          color: #333;
        }
        .money {
          color: #006CD1;
          font-size: 15px;
          line-height: 1;
        }
      }
      .card-body-box {
        .card-body-item {
          display: flex;
          align-items: center;
          margin-top: 15px;
          .icon {
            line-height: 1;
            color: #666;
            font-size: 14px;
          }
          .text {
            font-size: 14px;
            color: #666;
            line-height: 1;
            padding-left: 8px;
          }
        }
      }
    }
  }
}
.search-box {
  height: 45px;
  .selectBtn {
    width: 60px;
    padding-left: 0;
    &.ellipsis {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.cy-serch-box {
  flex: 1;
  .cy-serch {
    padding: 0;
  }
}
</style>
