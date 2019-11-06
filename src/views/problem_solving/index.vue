<template>
  <div class="chrray_main">
    <div class="search-box">
      <!-- 分类按钮 -->
      <p class="selectBtn" @click="pickShow = !pickShow">{{ selectType }}</p>
      <hr class="hr">
      <form class="cy-serch-box">
        <van-search
          class="cy-serch"
          v-model="pageInfo.newTiltle"
          placeholder="请输入搜索关键词"
          @search="onSearch">
        </van-search>
      </form>
    </div>
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
            <router-link :to="'/answer/item/' + item.newId" class="item-one" v-if="item.imageList.length === 1">
              <div class="text-box">
                <h1 class="title">{{ item.newTiltle }}</h1>
                <time class="time">{{ item.createTime }}</time>
              </div>
              <p class="img-list">
                <img :src="item.imageList[0].imageUrl" class="img">
              </p>
              <!--<img :src="item.imageList[0].imageUrl" class="img"/>-->
            </router-link>
            <router-link :to="'/answer/item/' + item.newId" class="item-two" v-if="item.imageList.length === 3">
              <h1 class="title">{{ item.newTiltle }}</h1>
              <div class="img-box">
                <p v-for="(images,idx) in item.imageList" :key="idx" class="img-list">
                  <img :src="images.imageUrl" class="img">
                </p>
              </div>
              <time class="time">{{ item.createTime }}</time>
            </router-link>
            <router-link :to="'/answer/item/' + item.newId" class="item-two" v-if="item.imageList.length === 0">
              <h1 class="title">{{ item.newTiltle }}</h1>
              <time class="time">{{ item.createTime }}</time>
            </router-link>
          </li>
        </ul>
      </van-list>
    </div>
    <!-- 分类弹窗 -->
    <van-popup v-model="pickShow" position="bottom">
      <van-picker
        :columns="typeList"
        show-toolbar
        @cancel="pickShow = !pickShow"
        @confirm="onConfirm">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/data'
import { Search, Popup, Picker, List } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      typeList: [],
      infoList: [],
      selectType: '选择问题分类',
      pageInfo: {
        newType: 3,
        cateValue: '0',
        newTiltle: '',
        page: 1,
        rows: 10
      },
      pickShow: false,
      error: false,
      loading: false,
      finished: false
    }
  },
  components: {
    [List.name]: List,
    [Search.name]: Search,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  mounted () {
    this.getType()
    //  自定义分享样式
    let shareData = {
      title: this.$route.meta.title,
      link: location.href
    }
    wxApi.share(shareData)
  },
  methods: {
    //  获取分类
    getType () {
      let that = this;
      let params = {
        strValue: 'question_jied'
      };
      api.allSort(params).then(res => {
        for (let i in res.data) {
          res.data[i].value = res.data[i].dictValue;
          res.data[i].text = res.data[i].dictName
        }
        that.typeList = res.data;
      })
    },
    //  搜索
    onSearch () {
      this.infoList = [];
      this.pageInfo.page = 1;
      this.getList()
    },
    //  加载列表
    getList () {
      let that = this;
      api.sortData(that.pageInfo).then(res => {
        let tempData = res.data;
        if (tempData.length > 0) {
          that.pageInfo.page += 1;
          that.infoList = that.infoList.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    //  选择后进行回调
    onConfirm (value) {
      let that = this;
      that.selectType = value.text;
      that.pageInfo.cateValue = value.value;
      //  将原有数据清空
      that.infoList = [];
      that.pageInfo.page = 1;
      that.getList();
      this.pickShow = !this.pickShow
    },
    //  自动加载下一页
    onLoad () {
      // 异步更新数据
      this.getList()
    }
  }
}
</script>

<style scoped lang="less">
  .cy-serch-box {
    flex: 1;
    .cy-serch {
      padding: 0;
    }
  }
  .list-box{
    margin-top: 10px;
  }

</style>
