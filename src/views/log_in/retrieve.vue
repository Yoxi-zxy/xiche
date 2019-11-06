<template>
  <div>
    <div class="chrray_register-box">
      <ul class="ul-list">
        <li class="li-item">
          <div class="step-box">
            <div class="step-line" style="width: 50%"></div>
            <div class="step-icon" :class="step === 1 ? 'active' : ''">1</div>
          </div>
          <p>验证信息</p>
        </li>
        <li class="li-item">
          <div class="step-box">
            <div class="step-line" style="width: 50%;left: 0"></div>
            <div class="step-icon" :class="step === 2 ? 'active' : ''">2</div>
          </div>
          <p>修改密码</p>
        </li>
      </ul>
    </div>
    <div class="stepNumber" v-if="step === 1">
      <form class="register-form" @submit="submitData">
        <van-cell-group>
          <van-field
            v-model="form.userRealName"
            placeholder="请输入真实姓名"
            label-align="left"
            label="真实姓名">
          </van-field>
          <van-field
            v-model="form.userCardId"
            placeholder="请输入身份证号"
            label-align="left"
            label="身份证号">
          </van-field>
          <van-field
            v-model="form.userPhone"
            placeholder="请输入手机号码"
            label-align="left"
            label="手机号码">
          </van-field>
          <van-field
            v-model="form.code"
            center
            clearable
            maxlength="12"
            label-align="left"
            label="验证码"
            placeholder="请输入短信验证码">
            <van-button
              slot="button"
              native-type="button"
              maxlength="4"
              size="small"
              type="info"
              @click="getCode"
              :disabled="isPhone">{{ codeText }}</van-button>
          </van-field>
        </van-cell-group>
        <div class="form-btn">
          <button type="submit" class="btn">下一步</button>
        </div>
      </form>
    </div>
    <div class="stepNumber" v-if="step === 2">
      <form class="register-form" @submit="submitNewPassword">
        <van-cell-group>
          <van-field
            v-model="passwords"
            type="password"
            placeholder="请输入登录密码"
            label-align="left"
            label="输入密码">
          </van-field>
          <van-field
            v-model="configPassword"
            type="password"
            placeholder="请再次输入登录密码"
            label-align="left"
            label="确认密码">
          </van-field>
        </van-cell-group>
        <div class="form-btn">
          <button type="submit" class="btn">修改</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Field, Button, CellGroup, Cell, Toast } from 'vant'
import { loginUrl } from '@/config/baseURL'
export default {
  data () {
    return {
      step: 1,
      codeText: '获取验证码',
      number: 60,
      isPhone: true,
      passwords: '',
      configPassword: '',
      form: {
        status: 1,
        userPhone: '',
        userRealName: '',
        userCardId: '',
        code: '',
        userPassword: ''
      }
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Toast.name]: Toast
  },
  methods: {
    // 获取验证码
    getCode () {
      let that = this;
      let data = this.form;
      let params = {
        status: data.status,
        userPhone: data.userPhone
      }
      api.getCond(params).then((res) => {
        Toast(res.msg)
        that.timer = setInterval(() => {
          if (that.number === 0) {
            that.isPhone = false;
            that.codeText = '重新获取';
            that.number = 60;
            clearInterval(that.timer);
          } else {
            that.isPhone = true;
            that.codeText = this.number + 's';
            that.number--
          }
        }, 1000)
      }).catch((error) => {
        Toast(error.msg)
      });
    },
    //  第一步确认
    submitData (e) {
      e.preventDefault();
      let that = this;
      let cardId = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
      let data = that.form;
      if (!data.userRealName) {
        Toast(`请输入真实姓名`);
      } else if (!data.userCardId) {
        Toast(`请输入身份证号码`);
      } else if (!cardId.test(data.userCardId)) {
        Toast(`请输入正确的身份证号码`);
      } else if (!data.userPhone) {
        Toast(`请输入手机号码`);
      } else if (!(/^1[3456789]\d{9}$/.test(data.userPhone))) {
        Toast(`请输入正确的手机号`);
      } else if (!data.code) {
        Toast(`请输入验证码`);
      } else {
        api.forgerPassword(data).then((res) => {
          Toast(`验证成功,正在跳转,请稍候..`);
          setTimeout(() => {
            that.step = 2;
          }, 1000)
        }).catch((error) => {
          Toast(error.msg);
        })
      }
    },
    //  第二部确认
    submitNewPassword (e) {
      e.preventDefault()
      let that = this
      let data = that.form
      if (!that.passwords) {
        Toast(`请输入登录密码`)
      } else if (!that.configPassword) {
        Toast(`请再次输入登录密码`)
      } else if (that.passwords !== that.configPassword) {
        Toast(`两次密码不一致,请重新输入`)
      } else if (that.passwords.length < 6) {
        Toast(`请输入6位以上的密码`)
      } else {
        data.userPassword = that.$md5(that.passwords)
        api.editPassword(data).then(() => {
          Toast(`修改成功,请登录..`)
          setTimeout(() => {
            window.location.href = loginUrl
          }, 2000)
        }).catch((error) => {
          Toast(error.msg)
        })
      }
    }
  },
  watch: {
    //  监听是否填写手机号
    'form.userPhone' (newVal) {
      if (!(/^1[3456789]\d{9}$/.test(newVal))) {
        this.isPhone = true;
      } else {
        this.isPhone = false;
      }
    }
  }
}
</script>

<style scoped lang="less">
.chrray_register-box {
  padding: 46px 0;
  display: flex;
  justify-content: center;
  .ul-list {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    position: relative;
    .li-item {
      width: 50%;
      float: left;
      text-align: center;
      list-style: none;
      .step-box {
        position: relative;
        width: 100%;
        .step-line {
          position: absolute;
          height: 1px;
          top: 50%;
          right: 0;
          background-color: #E5E5E5;
        }
        .step-icon {
          width: 36px;
          height: 36px;
          margin: 0 auto;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          border: 1px solid #e5e5e5;
          position: relative;
          &.active {
            background-color: #006CD1;
            color: #fff;
          }
        }
      }
      &p {
        margin: 10px 0 0 0;
        font-size: 14px;
        color: #333;
        line-height: 1;
      }
    }
  }
}
.stepNumber {
  .register-form {
    .form-btn {
      padding: 0 15px;
      .btn {
        width: 100%;
        margin: 20px 0;
        background-color: #006CD1;
        border: 0;
        color: #fff;
        padding: 15px 0;
        line-height: 1;
      }
    }
    .form-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      border-bottom: 1px solid #f2f2f2;
      background-color: #fff;
      .cy_input {
        flex: 1;
        height: auto;
        border: none;
        text-align: right;
        font-size: 15px;
        color: #999;
        padding: 10px 0;
        margin: 0;
        &.code {
          padding: 10px 30px 10px 0;
        }
      }
      .cy_label {
        width: 70px;
        font-size: 15px;
        color: #333;
        line-height: 1;
      }
      .codeBtn {
        width: 80px;
        color: #fff;
        background-color: #006cd1;
        padding: 8px 0;
        line-height: 1;
        border: 0;
      }
      .upImg-box {
        margin-top: 10px;
        background-color: #fff;
        padding: 15px;
        .title {
          color: #333;
          font-size: 15px;
          line-height: 1;
        }
      }
    }
  }
}
</style>
