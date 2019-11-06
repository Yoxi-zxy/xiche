<template>
  <div>
    <div class="chrray_register-box">
      <ul class="ul-list">
        <li class="li-item">
          <div class="step-box">
            <div class="step-line" style="width: 50%"></div>
            <div class="step-icon" :class="step === 1 ? 'active' : ''">1</div>
          </div>
          <p>验证手机号</p>
        </li>
        <li class="li-item">
          <div class="step-box">
            <div class="step-line" style="width: 100%"></div>
            <div class="step-icon" :class="step === 2 ? 'active' : ''">2</div>
          </div>
          <p>实名认证</p>
        </li>
        <li class="li-item">
          <div class="step-box">
            <div class="step-line" style="width: 50%;left: 0"></div>
            <div class="step-icon" :class="step === 3 ? 'active' : ''">3</div>
          </div>
          <p>设置密码</p>
        </li>
      </ul>
    </div>
    <div class="stepNumber" v-if="step === 1">
      <form class="register-form" @submit="onSubmit">
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
              native-type="button"
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
      <div class="register-btn">
        <div class="xieyi-box">
          <div class="xieyi">
            <input type="checkbox" v-model="isChecked" class="cy_checkbox" id="xiyi">
            <label for="xiyi" class="text">同意</label>
            <span @click="showProtocol" class="dex">注册协议</span>
          </div>
          <router-link to="index" class="text" style="color: #006CD1">
            已有账号?立即登录
          </router-link>
        </div>
      </div>
    </div>
    <van-popup v-model="xieyiShow" round position="bottom" class="chrray-popup-protocol">
      <div class="chrray-protocol__view">
        <p class="title">用户注册协议</p>
        <div class="text">
          <p>在此特别提醒您在注册成为***用户之前,请认真阅读本《***用户注册协议》</p>
        </div>
        <van-button native-type="button" class="btn" @click="xieyiShow = false">同意并继续</van-button>
      </div>
    </van-popup>
    <div class="stepNumber" v-if="step === 2">
      <form class="register-form" @submit="onSubmitTwo">
        <van-cell-group>
          <van-field
            v-model="form.userRealName"
            placeholder="请输入真实姓名"
            label="真实姓名">
          </van-field>
          <van-field
            v-model="form.userCardId"
            placeholder="请输入身份证号"
            maxlength="18"
            label="身份证号">
          </van-field>
          <van-field-select-picker
            label="所在地区"
            @input="countyChange"
            :results="county"
            input-align="right"
            :columns="countyData">
          </van-field-select-picker>
          <van-field
            placeholder="请选择所在地"
            v-model="parent"
            readonly
            is-link
            input-align="right"
            @click="parentShow = !parentShow">
          </van-field>
          <van-field
            label="详情地址"
            input-align="right"
            placeholder="请输入详细地址"
            v-model="form.address">
          </van-field>
<!--          <van-field-->
<!--            label="年龄"-->
<!--            v-model="form.userAge"-->
<!--            placeholder="请输入年龄"-->
<!--            maxlength="18">-->
<!--          </van-field>-->
<!--          <van-field-select-picker-->
<!--            v-model="sex"-->
<!--            placeholder="请选择性别"-->
<!--            @input="onChange"-->
<!--            :columns="[{ value: 1, text: '男' }, { value: 2, text: '女' }]"-->
<!--            label="性别">-->
<!--          </van-field-select-picker>-->
        </van-cell-group>
<!--        <div class="upImg-box">-->
<!--          <div id="headImage" class="title">上传身份证照片</div>-->
<!--          <div class="upimg-box">-->
<!--            <chrray-upLoader class="img-box-item" :imgList="userFrontCardIdArr">-->
<!--              <template slot="default">-->
<!--                <van-icon class-prefix="chrray-icon" name="tubiaosvg-14" class="icon"></van-icon>-->
<!--                <span class="text">身份证正面</span>-->
<!--              </template>-->
<!--            </chrray-upLoader>-->
<!--            <chrray-upLoader class="img-box-item" :imgList="userBackCardIdArr">-->
<!--              <template slot="default">-->
<!--                <van-icon class-prefix="chrray-icon" name="tubiaosvg-14" class="icon"></van-icon>-->
<!--                <span class="text">身份证背面</span>-->
<!--              </template>-->
<!--            </chrray-upLoader>-->
<!--          </div>-->
<!--        </div>-->
        <div class="form-btn">
          <button type="submit" class="btn">下一步</button>
        </div>
      </form>
    </div>
    <div class="stepNumber" v-if="step === 3">
      <form class="register-form" @submit="onSubmitThree">
        <van-cell-group>
          <van-field
            label="输入密码"
            type="password"
            v-model="passwords"
            placeholder="请输入登录密码">
          </van-field>
          <van-field
            label="确认密码"
            type="password"
            v-model="configPassword"
            placeholder="请再次输入登录密码">
          </van-field>
        </van-cell-group>
        <div class="form-btn">
          <button type="submit" class="btn">下一步</button>
        </div>
      </form>
    </div>
    <!-- 地区三级联动 -->
    <van-popup v-model="parentShow" position="bottom">
      <van-picker
        :columns="parentList"
        show-toolbar
        value-key="name"
        title="地区选择"
        :loading="isLoading"
        @change="parentChange"
        @cancel="parentShow = !parentShow"
        @confirm="parentConfirm">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/data'
import { Field, Button, CellGroup, Cell, Uploader, Toast, Icon, Popup, Picker } from 'vant'
import vanFieldSelectPicker from '@/components/selectPicker.vue'
// import chrrayUpLoader from '@/components/upLoader'
import { seletString } from '@/lib/util'
export default {
  data () {
    return {
      step: 1,
      codeText: '获取验证码',
      isPhone: true,
      isChecked: true,
      number: 60,
      sex: '',
      passwords: '',
      configPassword: '',
      //  身份证正面
      userFrontCardIdArr: [], // 后台返回图片路径
      //  身份证反面
      userBackCardIdArr: [], // 后台返回图片路径
      form: {
        status: 0,
        userPhone: '',
        code: '',
        userRealName: '',
        userCardId: '',
        countyWithinExternal: 1,
        province: '',
        city: '',
        district: '',
        township: '',
        address: '',
        userFrontCardId: '',
        userBackCardId: '',
        userPassword: ''
      },
      //  注册协议
      xieyiShow: false,
      //  县内县外
      county: '县内',
      countyData: [
        {
          text: '县内',
          id: 1
        },
        {
          text: '县外',
          id: 0
        }
      ],
      //  地区
      parent: '',
      parentList: [],
      parentShow: false,
      isLoading: true
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    vanFieldSelectPicker
    // chrrayUpLoader
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
    onSubmit (e) {
      e.preventDefault()
      let that = this
      let data = that.form
      if (!data.userPhone) {
        Toast(`请输入手机号`)
      } else if (!data.code) {
        Toast(`请输入验证码`)
      } else if (!that.isChecked) {
        Toast(`请同意注册协议`)
      } else {
        let params = {
          status: data.status,
          userPhone: data.userPhone,
          code: data.code
        }
        api.phoneRegister(params).then((res) => {
          Toast(res.msg)
          setTimeout(() => {
            that.getCounty()
            that.step = 2
          }, 1000)
        }).catch((error) => {
          Toast(error.msg)
        })
      }
    },
    //  地区是否属于县内
    countyChange (val) {
      this.county = val.text
      if (val.id === 1) {
        this.getCounty()
        this.form.countyWithinExternal = 1
      } else {
        this.getAllParent()
        this.form.countyWithinExternal = 0
      }
    },
    //  当属于县内时加载的数据
    getCounty () {
      let that = this
      that.isLoading = true
      api.parent({ parentId: 31744 }).then(res1 => {
        that.isLoading = false
        that.parentList = [
          {
            values: [
              {
                name: '重庆市',
                id: '31068'
              }
            ]
          },
          {
            values: [
              {
                name: '丰都县',
                id: '31744'
              }
            ]
          },
          {
            values: res1.data
          }
        ]
      })
    },
    //  当属于县外时加载的数据
    getAllParent () {
      let that = this
      that.isLoading = true
      api.parent({ parentId: 1 }).then(res1 => {
        let Index1 = res1.data
        api.parent({ parentId: 2 }).then(res2 => {
          let Index2 = res2.data
          api.parent({ parentId: 3 }).then(res3 => {
            let Index3 = res3.data
            that.isLoading = false
            that.parentList = [
              {
                values: Index1
              },
              {
                values: Index2
              },
              {
                values: Index3
              }
            ]
          })
        })
      })
    },
    //  地区改变
    parentChange (pick, val, index) {
      if (index === 0) {
        api.parent({ parentId: val[0].id }).then(res1 => {
          pick.setColumnValues(1, res1.data);
          if (res1.data.length > 0) {
            api.parent({ parentId: res1.data[0].id }).then(res2 => {
              pick.setColumnValues(2, res2.data);
            })
          } else {
            pick.setColumnValues(2, []);
          }
        })
      } else if (index === 1) {
        api.parent({ parentId: val[1].id }).then(res2 => {
          pick.setColumnValues(2, res2.data);
        })
      }
    },
    //  确认地区后回调
    parentConfirm (val) {
      if (val[1] === undefined) {
        this.parent = val[0].name
        this.form.province = val.id
      } else if (val[2] === undefined) {
        this.parent = val[0].name + '-' + val[1].name
        this.form.province = val[0].id
        this.form.city = val[1].id
      } else {
        this.parent = val[0].name + '-' + val[1].name + '-' + val[2].name
        if (this.form.countyWithinExternal === 1) {
          this.form.province = val[0].id
          this.form.city = 31681
          this.form.district = val[1].id
          this.form.township = val[2].id
        } else {
          this.form.province = val[0].id
          this.form.city = val[1].id
          this.form.district = val[2].id
        }
      }
      this.parentShow = !this.parentShow
    },
    //  第二步确认
    onSubmitTwo (e) {
      e.preventDefault()
      let that = this
      let cardId = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      let cardName = /^[\u4e00-\u9fa5]{2,5}$/
      // let age = /^(?:[1-9][0-9]?|1[01][0-9]|150)$/
      let data = that.form
      that.form.userFrontCardId = seletString(that.userFrontCardIdArr, 'url')
      that.form.userBackCardId = seletString(that.userBackCardIdArr, 'url')
      if (!data.userRealName || !cardName.test(data.userRealName)) {
        Toast(`请输入真实姓名`)
      } else if (!data.userCardId) {
        Toast(`请输入身份证号码`)
      } else if (!cardId.test(data.userCardId)) {
        Toast(`请输入正确的身份证号码`)
      } else if (!data.province) {
        Toast(`请选择所在地区`)
      } else if (!data.address) {
        Toast(`请填写详细地址`)
      } else {
        setTimeout(() => {
          let params = {
            idCard: data.userCardId,
            userName: data.userRealName
          }
          api.realName(params).then(res => {
            Toast(res.msg)
            setTimeout(() => {
              that.step = 3
            }, 1000)
          }).catch(err => {
            Toast(err.msg)
          })
        }, 1000)
      }
    },
    //  第三步确认
    onSubmitThree (e) {
      e.preventDefault()
      let that = this
      let data = that.form
      if (!that.passwords) {
        Toast(`请输入登录密码`)
      } else if (!that.configPassword) {
        Toast(`请输入确认密码`)
      } else if (that.passwords !== that.configPassword) {
        Toast(`两次密码不一致,请重新输入`)
      } else if (that.passwords.length < 6) {
        Toast(`请输入6位以上的密码`)
      } else {
        data.userPassword = that.$md5(that.passwords)
        api.register(data).then((res) => {
          Toast(res.msg)
          localStorage.setItem('testToken', res.data)
          setTimeout(() => {
            that.$router.push({ path: '/login/info' })
          }, 1000)
        }).catch((error) => {
          Toast(error.msg)
        })
      }
    },
    //  选择器
    onChange (picker) {
      this.form.userSex = picker.value;
    },
    //  注册协议
    showProtocol () {
      this.xieyiShow = !this.xieyiShow
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
  padding: 46px 0px;
  display: flex;
  justify-content: center;
  .ul-list {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    position: relative;
    .li-item {
      width: 33.3333%;
      float: left;
      text-align: center;
      list-style: none;
      .step-box {
        width: 100%;
        position: relative;
        .step-line {
          position: absolute;
          height: 1px;
          top: 50%;
          right: 0;
          background-color: #E5E5E5;
        }
        .step-icon {
          width: 36PX;
          height: 36PX;
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
      p {
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
  .upImg-box {
    margin-top: 10px;
    background-color: #fff;
    padding: 15px;
    .title {
      color: #333;
      font-size: 15px;
      line-height: 1;
      text-align: left;
    }
    .image-box {
      margin-top: 20px;
      display: flex;
      .upCard {
        height: 100%;
        border: 1px solid #f2f2f2;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .icon {
          font-size: 40px;
          line-height: initial;
          color: #ccc;
        }
        .text {
          font-size: 14px;
          color: #999;
          line-height: 1;
        }
      }
    }
  }
  .register-btn {
    padding: 10px 15px 0;
    .xieyi-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .xieyi {
        .cy_checkbox {
          vertical-align: middle;
          margin-top: -2px;
          margin-bottom: 1px;
        }
      }
      .text {
        font-size: 15px;
        color: #666;
        line-height: 1;
        padding-left: 5px;
      }
      .dex {
        color: #006CD1;
        line-height: 1;
        padding-left: 2px;
        font-size: 15px;
      }
    }
  }
}
.chrray-popup-protocol {
  max-height: 70vh;
  .chrray-protocol__view {
    padding: 15px;
    .title {
      font-size: 16px;
      text-align: center;
      color: #006cd1;
    }
    .text {
      margin: 10px 0;
      line-height: 1.5;
      font-size: 14px;
      h1 {
        margin: 0;
        font-size: 16px;
      }
      p {
        font-size: 14px;
      }
    }
    .btn {
      width: 100%;
      background-color: #006CD1;
      border: 0;
      color: #fff;
      padding: 15px 0;
      line-height: 1;
    }
  }
}

</style>
