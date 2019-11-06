<template>
  <div class="chrray_login">
    <div class="login-head">
      <img src="@/assets/img/login-bg.png" class="login-bg">
      <img src="@/assets/img/logo.png" alt="logo" class="logo">
    </div>
    <div class="login-content">
      <form class="login_form" @submit="onSubmit">
        <div class="login_form-item">
          <van-field v-model="form.userPhone" class="input" placeholder="请输入用户名"></van-field>
          <!--<input type="text" placeholder="请输入用户名" class="input" @blur="blur1" v-model="form.userPhone">-->
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-1" class="icon"></van-icon>
        </div>
        <div class="login_form-item">
          <van-field v-model="userPassword" :type="passwordType" class="input" placeholder="请输入密码"></van-field>
          <!--<input  type="password" placeholder="请输入密码" class="input" v-model="form.userPassword">-->
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-2" class="icon"></van-icon>
          <van-icon :name="passwordType === 'password' ? 'closed-eye' : 'eye-o'" class="icon show"
                    @click="passwordShow"></van-icon>
        </div>
        <button class="loginBtn" type="submit" :disabled="isClick">登录</button>
        <div class="jump-box">
          <router-link to="register" class="text">没有账号?立即注册></router-link>
          <router-link to="retrieve" class="text gray">忘记密码?</router-link>
          <!--<a href="register.html" class="text">没有账号?立即注册</a>-->
          <!--<a href="retrieve.html" class="text gray">忘记密码?</a>-->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Field, Toast, Icon } from 'vant'
import { getRequest } from '@/lib/util'

export default {
  data () {
    return {
      userPassword: '',
      form: {
        userPhone: '',
        userPassword: '',
        code: ''
      },
      isClick: true,
      passwordType: 'password'
    }
  },
  components: {
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Icon.name]: Icon
  },
  mounted () {
    this.form.code = getRequest().code;
    // console.log(getRequest().code)
    // this.onSubmit()
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      let that = this
      //  点击后防止重复点击-关闭点击按钮
      that.isClick = true
      that.form.userPassword = that.$md5(that.userPassword)
      api.login(that.form).then(res => {
        that.isClick = false
        if (res.code === '2001') {
          Toast(`尚未完善资料,请完善资料`)
          localStorage.setItem('testToken', res.data)
          setTimeout(() => {
            that.$router.replace({ path: '/login/info' })
          }, 1500)
        } else {
          Toast(`登录成功,正在跳转..`)
          //  存储token
          localStorage.setItem('tokenId', res.data)
          //  延时一秒后跳转页面
          setTimeout(() => {
            that.$router.replace({ path: localStorage.getItem('toPath') })
            // window.location.href = localStorage.getItem('toPath')
          }, 1500)
        }
      }).catch((error) => {
        //  开启点击按钮
        that.isClick = false
        //  提示报错信息
        Toast(error.msg)
        //  跳转一次
      })
    },
    blur1 () {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    },
    //  显示密码
    passwordShow () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    }
  },
  watch: {
    //  监听输入框是否为空,为空则不允许点击登录
    'form.userPhone' (newVal) {
      let that = this
      if (that.userPassword && newVal) {
        that.isClick = false
      } else {
        that.isClick = true
      }
    },
    'userPassword' (newVal) {
      let that = this
      if (that.form.userPhone && newVal) {
        that.isClick = false
      } else {
        that.isClick = true
      }
    }
  }
}
</script>

<style scoped lang="less">
  .chrray_login {
    height: 100vh;
    overflow: hidden;
    background-color: #fff;

    .login-head {
      text-align: center;

      .login-bg {
        width: 100%;
        display: block;
      }

      .logo {
        width: 242px;
        position: relative;
        top: -57px;
      }
    }

    .login-content {
      padding: 0 25px;

      .login_form {
        .login_form-item {
          border-bottom: 1px solid #f2f2f2;
          position: relative;
          margin-bottom: 20px;

          .input {
            width: 100%;
            border: 0;
            background-color: transparent;
            padding: 12px 0 12px 50px;
            margin-bottom: 0;
            font-size: 15px;
            color: #888;
            box-sizing: border-box;
          }

          .icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 15px;
            font-size: 18px;

            &.show {
              left: auto;
              right: 10px;
            }
          }
        }

        .loginBtn {
          width: 100%;
          background-color: #006CD1;
          height: 44px;
          font-size: 15px;
          color: #fff;
          line-height: 1;
          border: 0;
          transition: none;
          border-radius: 5px;

          &:disabled {
            background-color: #929292;
          }
        }

        .jump-box {
          margin-top: 18px;
          display: flex;
          justify-content: space-between;

          .text {
            font-size: 14px;
            color: #006CD1;
            line-height: 1;

            &.gray {
              color: #666;
            }
          }
        }
      }
    }
  }
</style>
