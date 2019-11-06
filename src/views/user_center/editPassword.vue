<template>
  <div>
    <div class="oldPhone">请输入{{ userInfo.userNickName }}的验证码</div>
    <form class="register-form" @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="form.code"
          center
          clearable
          label-align="left"
          label="验证码"
          maxlength="6"
          placeholder="请输入短信验证码">
          <van-button
            slot="button"
            size="small"
            class="fd-theme"
            type="info"
            @click="getCode"
            :disabled="isPhone">{{ codeText }}</van-button>
        </van-field>
        <van-field
          label="输入密码"
          v-model="passwords"
          placeholder="请输入登录密码"
          type="password"
          label-align="left">
        </van-field>
        <van-field
          label="确认密码"
          v-model="configPassword"
          placeholder="请再次输入登录密码"
          type="password"
          label-align="left">
        </van-field>
      </van-cell-group>
      <div class="form-btn">
        <button type="submit" class="btn">修改</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '@/api/data'
import { Toast, Field, Button, CellGroup, Cell } from 'vant'
import { loginUrl } from '@/config/baseURL'
export default {
  data () {
    return {
      userInfo: {},
      codeText: '获取验证码',
      isPhone: false,
      number: 60,
      passwords: '',
      configPassword: '',
      form: {
        tokenId: '',
        userPhone: '',
        code: '',
        passWord: ''
      }
    }
  },
  components: {
    [Toast.name]: Toast,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  mounted () {
    this.token = localStorage.getItem('tokenId')
    this.form.tokenId = localStorage.getItem('tokenId')
    this.getInfo()
  },
  methods: {
    //  获取信息
    getInfo () {
      let that = this
      let params = { tokenId: that.token }
      api.authorization(params).then((res) => {
        that.userInfo = res.data
        that.form.userPhone = res.data.userPhone;
      }).catch((error) => {
        Toast(error.msg)
      })
    },
    //  获取验证码
    getCode () {
      let that = this
      let data = this.userInfo
      let params = {
        status: 1,
        userPhone: data.userPhone
      }
      api.getCond(params).then((res) => {
        Toast(res.msg)
        that.timer = setInterval(() => {
          if (that.number === 0) {
            that.isPhone = false
            that.codeText = '重新获取'
            that.number = 60;
            clearInterval(that.timer)
          } else {
            that.isPhone = true;
            that.codeText = this.number + 's'
            that.number--
          }
        }, 1000)
      }).catch((error) => {
        Toast(error.msg)
      });
    },
    //  提交新密码
    onSubmit (e) {
      e.preventDefault()
      let that = this;
      let data = that.form
      if (!data.code) {
        Toast(`请输入验证码`)
      } else if (!that.passwords) {
        Toast(`请输入新登录密码`)
      } else if (!that.configPassword) {
        Toast(`请输入再次新登录密码`)
      } else if (that.passwords !== that.configPassword) {
        Toast(`两次密码不一致,请重新输入`)
      } else if (that.passwords.length < 6) {
        Toast(`请输入6位以上的密码`)
      } else {
        data.passWord = that.$md5(that.passwords)
        api.changePassword(data).then((res) => {
          Toast(`修改密码成功,请重新登录`)
          setTimeout(() => {
            localStorage.removeItem('tokenId')
            //  重定向一下进入页面
            localStorage.setItem('toPath', '/user/index')
            window.location.href = loginUrl
            // that.$router.push({ name: 'login' })
          }, 2000)
        }).catch(err => {
          Toast(err.msg)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.setp-box {
  background-color: #f2f2f2;
}
.oldPhone {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #333;
}
</style>
