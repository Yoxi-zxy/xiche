<template>
  <div class="setp-box">
    <div v-if="step === 1">
      <div class="oldPhone">请输入{{ userInfo.userNickName }}的验证码</div>
      <form class="register-form" @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="oldCode"
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
        </van-cell-group>
        <div class="form-btn">
          <button type="submit" class="btn">下一步</button>
        </div>
      </form>
    </div>
    <div v-if="step === 2">
      <form class="register-form" style="margin-top: 27px" @submit="editPhone">
        <van-cell-group>
          <van-field
            v-model="form.userPhone"
            placeholder="请输入手机号码"
            label-align="left"
            maxlength="11"
            label="手机号码">
          </van-field>
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
              type="info"
              @click="getCodes"
              :disabled="newIsPhone">{{ newCodeText }}</van-button>
          </van-field>
        </van-cell-group>
        <div class="form-btn">
          <button type="submit" class="btn">完成</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Toast, Field, Button, CellGroup, Cell } from 'vant'
export default {
  data () {
    return {
      token: '',
      step: 1,
      codeText: '获取验证码',
      isPhone: false,
      number: 60,
      userInfo: {},
      oldCode: '',
      newIsPhone: true,
      newNumber: 60,
      newCodeText: '获取验证码',
      form: {
        userPhone: '',
        code: ''
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
    this.getInfo()
  },
  methods: {
    //  获取信息
    getInfo () {
      let that = this
      let params = { tokenId: that.token }
      api.authorization(params).then((res) => {
        that.userInfo = res.data
      }).catch((error) => {
        Toast(error.msg)
      })
    },
    // 获取验证码
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
    //  获取原手机验证
    onSubmit (e) {
      e.preventDefault()
      let that = this
      let params = {
        status: 1,
        userPhone: that.userInfo.userPhone,
        code: that.oldCode
      }
      if (!that.oldCode) {
        Toast(`请输入验证码`)
      } else {
        api.phoneRegister(params).then(() => {
          Toast(`验证成功,请稍候`)
          setTimeout(() => {
            that.step = 2
          }, 1500)
        }).catch((error) => {
          Toast(error.msg)
        })
      }
    },
    //  获取新手机验证码
    getCodes () {
      let that = this
      let data = this.form
      let params = {
        status: 0,
        userPhone: data.userPhone
      }
      api.getCond(params).then((res) => {
        Toast(res.msg)
        that.timer = setInterval(() => {
          if (that.newNumber === 0) {
            that.newIsPhone = false;
            that.newCodeText = '重新获取';
            that.newNumber = 60;
            clearInterval(that.timers);
          } else {
            that.newIsPhone = true;
            that.newCodeText = that.newNumber + 's';
            that.newNumber--
          }
        }, 1000)
      }).catch((error) => {
        Toast(error.msg)
      })
    },
    //  设置新手机
    editPhone (e) {
      e.preventDefault()
      let that = this
      let data = that.form
      if (!data.userPhone) {
        Toast(`请输入新手机号`)
      } else if (!data.code) {
        Toast(`请输入验证码`)
      } else {
        let params = {
          status: 0,
          userPhone: data.userPhone,
          code: data.code
        }
        api.phoneRegister(params).then(() => {
          // Toast(`验证成功,请稍候`);
          api.changePhone({
            tokenId: that.token,
            userPhone: data.userPhone
          }).then((data) => {
            Toast(data.msg);
            setTimeout(() => {
              that.$router.push({ path: '/user/index' })
            }, 1000)
          }).catch((errors) => {
            Toast(errors.msg);
          })
        }).catch((error) => {
          Toast(error.msg);
        })
      }
    }
  },
  watch: {
    'form.userPhone' (newVal) {
      if (!(/^1[3456789]\d{9}$/.test(newVal))) {
        this.newIsPhone = true;
      } else {
        this.newIsPhone = false;
      }
    }
  }
}
</script>

<style scoped lang="less">
.setp-box {
  background-color: #f2f2f2;
  .oldPhone {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #333;
  }
}
</style>
