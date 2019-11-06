<template>
  <div class="cy-main">
    <div class="mengber-info-box">
      <div class="info-box">
        <img :src="userInfo.userHeadUrl" alt="头像" class="avatar">
        <div class="name-box">
          <p class="name">{{ userInfo.userRealName }}</p>
          <span class="isName"></span>
          <van-icon v-if="userInfo.userNature === 2" class-prefix="chrray-icon" name="tubiaosvg-12" class="icon"></van-icon>
        </div>
        <p class="phone">{{ userInfo.userPhone }}</p>
      </div>
    </div>
    <div class="menber-list">
      <van-cell-group>
        <van-cell title="更换绑定手机" class="icon-box" is-link to="editPhone">
          <div slot="icon" class="icon">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
          </div>
        </van-cell>
        <van-cell title="修改密码"  class="icon-box" is-link to="editPassword">
          <div slot="icon" class="icon">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-6" class="icon"></van-icon>
          </div>
        </van-cell>
        <van-cell title="我的个人办事" class="icon-box" is-link :to="{ path: 'personal', query: { userSort: 0 } }">
          <div slot="icon" class="icon">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-7" class="icon"></van-icon>
          </div>
        </van-cell>
        <van-cell title="我的企业办事" class="icon-box" is-link :to="{ path: 'personal', query: { userSort: 1 } }">
          <div slot="icon" class="icon">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-16" class="icon"></van-icon>
          </div>
        </van-cell>
        <van-cell title="我的培训" class="icon-box" is-link :to="{ path: 'training' }">
          <div slot="icon" class="icon">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-27" class="icon"></van-icon>
          </div>
        </van-cell>
        <van-cell title="我要创业" class="icon-box" is-link :to="{ path: 'business' }">
          <div slot="icon" class="icon">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-35" class="icon"></van-icon>
          </div>
        </van-cell>
        <van-cell title="退出登录" class="icon-box" is-link @click="signOut">
          <div slot="icon" class="icon">
            <van-icon class-prefix="chrray-icon" name="tubiaosvg-5" class="icon"></van-icon>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Toast, Cell, CellGroup, Dialog, Icon } from 'vant'
import { loginUrl } from '@/config/baseURL'
export default {
  data () {
    return {
      token: '',
      userInfo: {}
    }
  },
  components: {
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon
  },
  created () {
  },
  mounted () {
    this.token = localStorage.getItem('tokenId')
    this.getInfo();
  },
  methods: {
    //  获取页面信息
    getInfo () {
      let that = this
      let params = { tokenId: that.token }
      api.authorization(params).then((res) => {
        that.userInfo = res.data
      }).catch((error) => {
        Toast(error.msg)
      })
    },
    //  退出
    signOut () {
      let that = this;
      Dialog.confirm({
        title: '提示',
        message: '确认退出登录?'
      }).then(() => {
        api.singOut({ tokenId: that.token }).then((res) => {
          Toast(res.msg)
          localStorage.removeItem('tokenId')
          setTimeout(() => {
            window.location.href = loginUrl
            // that.$router.push({ name: 'login' })
          }, 2000)
        }).catch((error) => {
          Toast(error.msg)
        })
      }).catch(() => {
        //
      })
    }
  }
}
</script>

<style scoped lang="less">
.cy-main {
  background-color: #fff;
  min-height: 100vh;
  .mengber-info-box {
    width: 100%;
    height: 190px;
    background-image: url("../../assets/img/info.png");
    background-size: 100%;
    background-repeat: no-repeat;
    .info-box {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .avatar {
        width: 65px;
        height: 65px;
        border-radius: 50%;
      }
      .name-box {
        margin-top: 20px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        .name {
          color: #dcefff;
          font-size: 15px;
          line-height: 1;
        }
        .isName {
          width: 24px;
          height: 14px;
          display: inline-block;
          background-image: url("../../assets/img/name.png");
          background-size: cover;
          margin: 0 5px;
        }
        .icon {
          color: #71baff;
        }
      }
      .phone {
        color: #dcefff;
        font-size: 15px;
        line-height: 1;
      }
    }
  }
  .menber-list {
    margin-top: 20px;
  }
}

</style>
