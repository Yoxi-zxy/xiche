<template>
  <div class="chrray_main">
    <form>
      <van-search
        v-model="pageInfo.newTiltle"
        placeholder="请输入搜索关键词"
        @search="onSearch">
      </van-search>
    </form>
    <div class="list-box">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多数据啦"
        @load="onLoad">
        <ul class="tab-con-list">
          <li class="tab-con-item item-style" v-for="(item,index) in infoList" :key="index">
            <router-link :to="'item/'+ item.newId" class="item-one" v-if="item.imageList.length === 1">
              <div class="text-box">
                <h1 class="title">{{ item.newTiltle }}</h1>
                <time class="time">{{ item.createTime }}</time>
              </div>
              <p class="img-list">
                <img :src="item.imageList[0].imageUrl" class="img">
              </p>
              <!--<img :src="item.imageList[0].imageUrl" class="img"/>-->
            </router-link>
            <router-link :to="'item/'+ item.newId" class="item-two" v-if="item.imageList.length === 3">
              <h1 class="title">{{ item.newTiltle }}</h1>
              <div class="img-box">
                <p v-for="(images,idx) in item.imageList" :key="idx" class="img-list">
                  <img :src="images.imageUrl" class="img">
                </p>
              </div>
              <time class="time">{{ item.createTime }}</time>
            </router-link>
            <router-link :to="'item/'+ item.newId" class="item-two" v-if="item.imageList.length === 0">
              <h1 class="title">{{ item.newTiltle }}</h1>
              <time class="time">{{ item.createTime }}</time>
            </router-link>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Search, List } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      value: '',
      infoList: [],
      pageInfo: {
        newType: 1,
        cateValue: '0',
        newTiltle: '',
        page: 1,
        rows: 10
      },
      error: false,
      loading: false,
      finished: false
    }
  },
  components: {
    [Search.name]: Search,
    [List.name]: List
  },
  mounted () {
    //  自定义分享样式
    let shareData = {
      link: location.href
    }
    wxApi.share(shareData)
  },
  methods: {
    //  确认
    onSearch () {
      let that = this
      that.pageInfo.page = 1
      that.infoList = []
      that.loading = true
      that.finished = false
      that.getList()
    },
    //  加载数据
    getList () {
      let that = this
      api.sortData(that.pageInfo).then(res => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo.page += 1
          that.infoList = that.infoList.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    onLoad () {
      // 异步更新数据
      // console.log(`加载....`)
      // let that = this;
      this.getList()
    }
  }
}
</script>

<style scoped lang="less">
.list-box {
  margin-top: 10px;
}
</style>
