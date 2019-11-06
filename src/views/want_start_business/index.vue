<template>
  <div class="chrray-main">
    <div class="list" v-for="(item, index) in data" :key="index">
      <div class="item-title">{{ item.title }}</div>
      <div class="item-content">
        <div class="content-list-item" v-for="(items, idx) in item.data" :key="idx">
          <div class="item-icon-box" :style="items.backgroundColor" @click="jump(items.path, items.id)">
            <van-icon class-prefix="chrray-icon" :name="items.iconName" class="icon"></van-icon>
          </div>
          <p class="text">{{ items.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      data: [
        {
          title: '我要申请资金支持',
          data: [
            {
              backgroundColor: {
                background: 'linear-gradient(#57BFFF, #3355FF)'
              },
              iconName: 'tubiaosvg-34',
              text: '个人',
              path: 'apply',
              id: 1
            },
            {
              backgroundColor: {
                background: 'linear-gradient(#29E1AB, #04C66E)'
              },
              iconName: 'tubiaosvg-23',
              text: '企业',
              path: 'apply',
              id: 2
            }
          ]
        },
        {
          title: '我要申请场地支持',
          data: [
            {
              backgroundColor: {
                background: 'linear-gradient(#FFD700, #FFAC00)'
              },
              iconName: 'tubiaosvg-33',
              text: '工位支持',
              path: 'apply',
              id: 3
            },
            {
              backgroundColor: {
                background: 'linear-gradient(#41B9FF, #4A82FE)'
              },
              iconName: 'tubiaosvg-23',
              text: '企业入驻支持',
              path: 'apply',
              id: 4
            }
          ]
        },
        {
          title: '我要创业指导',
          data: [
            {
              backgroundColor: {
                background: 'linear-gradient(#FF8835, #FC483D)'
              },
              iconName: 'tubiaosvg-26',
              text: '创业导师',
              path: 'tutor'
            },
            {
              backgroundColor: {
                background: 'linear-gradient(#28E0A9, #05C66C)'
              },
              iconName: 'tubiaosvg-29',
              text: '创业活动',
              path: 'activity'
            }
          ]
        }
      ]
    }
  },
  components: {
    [Icon.name]: Icon
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
    //  页面跳转
    jump (path, id) {
      this.$router.push({ path, query: { id } })
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  min-height: 100vh;
  background-color: #fff;
  .list {
    .item-title {
      background-color: #f2f2f2;
      padding: 15px;
      font-size: 16px;
      color: #333;
    }
    .item-content {
      background-color: #fff;
      padding: 20px 15px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .content-list-item {
        width: 33.33333%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .item-icon-box {
          width: 50PX;
          height: 50PX;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon {
            color: #fff;
            font-size: 22px;
          }
        }
        .text {
          margin-top: 15px;
          color: #333;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
