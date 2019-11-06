<template>
  <div class="chrray-main">
    <div class="chrray-word-status">
      <div class="word-status-head" v-if="info.auditStatus === 0">
        <img src="@/assets/img/status-1.png" class="head-img chrray-img"/>
        <p class="text">审核中</p>
        <p class="des">审核通过后，我们将联系您带上已审核通过的资料，来柜台办理</p>
      </div>
      <div class="word-status-head" v-if="info.auditStatus === 1">
        <img src="@/assets/img/status-3.png" class="head-img chrray-img"/>
        <p class="text">审核通过</p>
        <p class="des">请您带上已审核通过的资料 来柜台办理,如有疑问请电话联系相关网点</p>
      </div>
      <div class="word-status-head" v-if="info.auditStatus === 2">
        <img src="@/assets/img/status-2.png" class="head-img chrray-img"/>
        <p class="text">审核失败</p>
        <p class="des">{{ info.findingsOfAudit }}</p>
      </div>
      <div class="word-status-footer">
        <div class="footer-item">
          <p class="title">办事项目</p>
          <div class="des-box">
            <p class="text">{{ info.twoLevelName }}</p>
          </div>
        </div>
        <div class="footer-item">
          <p class="title">办理人</p>
          <div class="des-box">
            <p class="text">{{ info.applicant }}</p>
            <p class="text">{{ info.applicantPhone }}</p>
          </div>
        </div>
        <div class="footer-item" v-for="(item, index) in info.fileData" :key="index">
          <p class="title">{{ item.imgName }}</p>
          <div class="des-box">
            <img :src="item.imgUrlArr[0]" class="img chrray-img" @click="preview(item.imgUrlArr)"/>
            <span class="number">{{ item.imgUrlArr.length }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chrray-btn-box">
      <van-button class="sub-btn" v-if="info.auditStatus === 2" @click="jump(info.oamId, info.templateNumber)">修改</van-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Button, ImagePreview } from 'vant'
export default {
  data () {
    return {
      info: {
        // name: '失业保险申领',
        // userName: '张三丰',
        // userPhone: '1330896412',
        // imgUrl: [
        //   { name: '身份证照片', url: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'aa.jpg'] },
        //   { name: '解除劳动合同证明', url: ['https://img.yzcdn.cn/vant/apple-2.jpg', 'bb.jpg'] },
        //   { name: '户口本', url: ['https://img.yzcdn.cn/vant/apple-2.jpg', 'bb.jpg'] }
        // ],
        // status: 1,
        // shibai: '审核失败原因,我也不晓得啊'
      }
    }
  },
  components: {
    [Button.name]: Button,
    [ImagePreview.name]: ImagePreview
  },
  mounted () {
    let id = this.$route.query.id
    this.getInfo(id)
  },
  methods: {
    getInfo (id) {
      let that = this
      let params = {
        oamId: id,
        tokenId: localStorage.getItem('tokenId')
      }
      api.QueryInfo(params).then(res => {
        that.info = res.data
      })
    },
    //  跳转修改页面
    jump (id, tempId) {
      this.$router.push({
        path: '/hall/editInfo',
        query: { oamId: id, templateNumber: tempId }
      })
    },
    preview (url) {
      ImagePreview({
        images: url
      });
    }
  }
}
</script>

<style scoped lang="less">
  .chrray-main{
    padding: 15px;
    .chrray-word-status{
      .word-status-head{
        .head-img{
          width: 104px;
          height: 104px;
        }
        .text{
          font-size: 18px;
          color: #333;
          font-weight: bold;
          margin: 15px 0;
        }
        .des{
          font-size: 14px;
          color: #666;
        }
      }
      .word-status-footer{
        padding: 0 15px 17px;
        .footer-item{
          padding-top: 25px;
        }
      }
    }
    .sub-btn{
      margin-top: 20px;
    }
  }
</style>
