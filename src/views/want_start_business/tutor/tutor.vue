<template>
  <div class="chrray-main">
    <div v-if="this.$route.meta.hidden">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        class="chrray-list"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多数据啦"
        @load="onLoad">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in tutorList"
            class="chrray-cell"
            :to="{ path: 'tutor/item', query: { id: item.tegId } }"
            :key="index">
            <div class="item-box">
              <van-image
                round
                width="70"
                height="70"
                fit="cover"
                :src="item.imgUrl"
              />
              <div class="item-right">
                <p class="name">{{ item.guidanceName }}</p>
                <p class="des">{{ item.goodAtDirection }}</p>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import api from '@/api/data'
import { List, Cell, CellGroup, Button, Image } from 'vant'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      error: false,
      pageInfo: {
        type: 1,
        page: 1,
        rows: 10
      },
      tutorList: []
    }
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Image.name]: Image
  },
  methods: {
    //  自动加载第一次
    onLoad () {
      this.getTutorList()
    },
    //  请求数据
    getTutorList () {
      let that = this
      api.businessList(that.pageInfo).then((res) => {
        let tempData = res.data
        if (tempData.length > 0) {
          that.pageInfo.page += 1
          that.tutorList = that.tutorList.concat(tempData)
        } else {
          that.finished = true
        }
        that.loading = false
      }).catch(() => {
        this.error = true
      })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  .chrray-list {
    .item-box {
      display: flex;
      align-items: flex-start;
      .item-right {
        flex: 1;
        padding-left: 15px;
        min-width: 0;
        .name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 15px;
          color: #333;
          font-weight: 500;
        }
        .des {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          padding-top: 5px;
          word-break: break-all;
        }
      }
    }
  }
}
</style>
