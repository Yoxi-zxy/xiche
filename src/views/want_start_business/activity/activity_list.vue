<template>
  <div class="chrray-main">
    <div v-if="this.$route.meta.hidden">
<!--      <van-cell class="chrray-cell">-->
<!--        <h1 class="cell-title">创业项目推荐</h1>-->
<!--        <p class="cell-des">后台可以发布展示型网页，发布专家信息，联系电话等。将成立专家咨询团，创业指导师，创业精英，各乡管单位</p>-->
<!--      </van-cell>-->
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        class="chrray-list activity-list"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多数据啦"
        @load="onLoad">
        <div v-for="(item, index) in activityList" :key="index">
          <van-card
            @click="jump(item.tegId)"
            class="chrray-card">
            <div slot="thumb">
              <img :src="item.imgUrl" alt="图片" class="thumb-img">
            </div>
            <div slot="title">
              <p class="title">{{ item.guidanceName }}</p>
            </div>
            <div slot="desc">
              <div class="desc-box">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
                <p class="text">{{ item.address }}</p>
              </div>
              <div class="desc-box">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-8" class="icon"></van-icon>
                <p class="text">{{ item.activityStartTime }}至{{ item.activityEndTime }}</p>
              </div>
            </div>
          </van-card>
        </div>
      </van-list>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import api from '@/api/data'
import { List, Cell, Icon, Card } from 'vant'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      error: false,
      pageInfo: {
        type: 2,
        page: 1,
        rows: 10
      },
      activityList: []
    }
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Card.name]: Card
  },
  mounted () {
    //
  },
  methods: {
    //  自动加载
    onLoad () {
      // 异步更新数据
      // let data = [
      //   {
      //     img: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
      //     title: '渝创渝新',
      //     addres: '重庆市丰都县141县道南100米',
      //     statTime: '2019-07-12',
      //     endTime: '2019-09-05'
      //   },
      //   {
      //     img: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
      //     title: '泛海扬帆',
      //     addres: '重庆市丰都县141县道南100米',
      //     statTime: '2019-07-12',
      //     endTime: '2019-09-05'
      //   }
      // ]
      // setTimeout(() => {
      //   for (let i = 0; i < data.length; i++) {
      //     this.listData.push(data[i]);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //
      //   // 数据全部加载完成
      //   if (this.pageIng.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 500);
      this.getActivityList()
    },
    //  获取活动列表
    getActivityList () {
      let that = this
      api.businessList(that.pageInfo).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo.page += 1
          that.activityList = that.activityList.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    },
    jump (id) {
      this.$router.push({
        path: 'activity/item',
        query: { id }
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  min-height: 100vh;
  background-color: #fff;
  .chrray-cell {
    padding: 15px;
    .cell-title {
      font-size: 17px;
      color: #333;
      font-weight: normal;
      line-height: 1.2;
      padding-bottom: 10px;
      margin: 0;
    }
    .cell-des {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-align: left;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      word-break: break-all;
    }
  }
  .activity-list {
    padding: 0 0 15px 15px;
    .chrray-card {
      background-color: #fff;
      border-bottom: 1PX solid #f2f2f2;
      padding: 15px 0;
      .thumb-img {
        width: 73px;
        height: 73px;
        display: block;
      }
      .title {
        font-size: 15px;
        color: #333;
        line-height: 1.2;
      }
      .icon {
        font-size: 14px;
        color: #666;
        line-height: 1.2;
        padding-right: 10px;
        word-break: break-all;
      }
      .desc-box {
        display: flex;
        align-items: flex-start;
        padding-top: 15px;
        .text {
          .icon;
          padding-right: 0;
        }
      }
    }
  }
}
</style>
