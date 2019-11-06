<template>
  <div class="chrray-main">
    <van-cell-group class="chrray-plate">
      <van-field v-if="id === 2 || id === 4" label="企业名称" input-align="right" placeholder="请输入企业名称" v-model="form.enterpriseName" />
      <van-field v-if="id === 2 || id === 4" label="社会统一信用代码" input-align="right" placeholder="请输入社会统一信用代码" v-model="form.orgCode" label-width="3.5rem" />
      <van-field label="申请人姓名" input-align="right" placeholder="请输入申请人姓名" v-model="form.applyPersonName" />
      <van-field v-if="id === 1 || id === 3" label="年龄" input-align="right" placeholder="请输入年龄" v-model="form.applyPersonAge" />
      <van-field-select-picker v-if="id === 1 || id === 3" label="性别" placeholder="请选择性别" input-align="right" @input="sexConfirm" :results="sex" :valueKey="'name'" :columns="sexList" />
      <van-field label="联系电话" input-align="right" placeholder="请输入申请人联系电话" v-model="form.telephone" />
    </van-cell-group>
    <van-cell-group class="chrray-plate" v-if="id === 1">
      <p class="plate-title">申请人类型</p>
      <div class="plate-checkbox-box">
        <div v-for="(item, index) in personList" :key="index" class="checkbox-item">
          <label :for="item.dictId" class="checkbox-label">
            <input type="checkbox" :value="item.dictValue" :id="item.dictId" class="checkbox cy_checkbox renyuan">
            {{ item.dictName }}
          </label>
        </div>
      </div>
    </van-cell-group>
    <van-cell-group class="chrray-plate" v-if="id === 1 || id === 2">
      <van-field
        label="贷款类型"
        input-align="right"
        placeholder="请选择贷款类型"
        v-model="loan"
        is-link
        readonly
        @click="loanShow = !loanShow">
      </van-field>
      <van-field label="申请贷款金额" input-align="right" placeholder="请输入申请贷款金额" v-model="form.applyPrice" maxlength="10"/>
    </van-cell-group>
    <van-cell-group class="chrray-plate">
      <van-field v-if="id === 3" label="申请工位个数" input-align="right" placeholder="请输入申请工位个数" v-model="form.people" maxlength="10"/>
      <van-field v-if="id === 4" label="入驻孵化园" input-align="right" placeholder="请输入入驻孵化园" v-model="form.incubatorGarden" />
      <van-field v-if="id === 4" label="办公面积" input-align="right" placeholder="请输入办公面积" v-model="form.officeArea" maxlength="10"/>
      <van-field v-if="id === 4" label="入住人数" input-align="right" placeholder="请输入入住人数" v-model="form.people" maxlength="10"/>
      <van-field type="textarea" autosize :placeholder="placeholders" v-model="form.useOfFunds" />
    </van-cell-group>
    <div class="post-btn">
      <van-button v-if="id === 1 || id === 2" type="button" class="btn" @click="fundsApply">立即申请</van-button>
      <van-button v-if="id === 3 || id === 4" type="button" class="btn" @click="siteApply">立即申请</van-button>
    </div>
    <!-- 弹出 -->
    <van-popup v-model="loanShow" position="bottom" class="cy-popup">
      <div class="cy-popup-box">
        <div class="cy-popup-title">
          <p class="text">选择贷款类型</p>
          <p class="btn" @click="confirm">确定</p>
        </div>
        <van-radio-group v-model="form.loanType" class="cy-radio-group">
          <van-cell-group>
            <van-cell
              class="firm-info__wrapper"
              v-for="(item, index) in loanList"
              @click="changeRadio(item)"
              :key="index">
              <h1 class="firm-name">{{ item.dictName }}</h1>
              <van-radio slot="right-icon" :name="item.dictId" class="leftIcon"></van-radio>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/data'
import { CellGroup, Button, field, RadioGroup, Radio, Cell, Popup, Toast } from 'vant'
import vanFieldSelectPicker from '@/components/selectPicker.vue'
import { seletString } from '@/lib/util'
export default {
  data () {
    return {
      id: '',
      form: {
        tokenId: localStorage.getItem('tokenId'),
        tesId: this.$route.query.id,
        enterpriseName: '',
        orgCode: '',
        applyPersonName: '',
        applyPersonSex: '',
        applyPersonAge: '',
        telephone: '',
        personnelType: '',
        loanType: '',
        applyPrice: '',
        useOfFunds: '',
        //  场地
        people: '',
        incubatorGarden: '',
        officeArea: ''
      },
      //  字段
      placeholders: '',
      //  性别
      sex: '',
      sexList: [
        {
          name: '男',
          id: 1
        },
        {
          name: '女',
          id: 2
        }
      ],
      //  人员类型
      personList: [],
      //  贷款方式
      loan: '',
      loanShow: false,
      popupList: {},
      loanList: []
    }
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [field.name]: field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    vanFieldSelectPicker
  },
  mounted () {
    this.id = Number(this.$route.query.id)
    if (this.id === 1 || this.id === 2) {
      this.placeholders = '请输入资金用途'
    } else if (this.id === 3 || this.id === 4) {
      this.placeholders = '请输入用途或需求'
    }
    this.getPerson()
    this.getLoan()
  },
  methods: {
    //  性别选择
    sexConfirm (val) {
      this.sex = val.name
      this.form.applyPersonSex = val.id
    },
    //  获取人员分类
    getPerson () {
      let that = this
      let params = {
        strValue: 'apply_person'
      }
      api.allSort(params).then(res => {
        that.personList = res.data
      })
    },
    //  获取贷款方式
    getLoan () {
      let that = this
      let params = {
        strValue: 'loan_mode'
      }
      api.allSort(params).then(res => {
        that.loanList = res.data
      })
    },
    //  贷款方式选择
    changeRadio (item) {
      this.popupList = item
    },
    //  贷款方式确认
    confirm () {
      if (JSON.stringify(this.popupList) === '{}') {
        Toast(`请选择一个付款方式`)
        return false
      } else {
        this.form.loanType = this.popupList.dictId
        this.loan = this.popupList.dictName
        this.loanShow = !this.loanShow
      }
    },
    //  资金申请
    fundsApply () {
      let that = this;
      let params = that.form
      let cate = document.querySelectorAll('.renyuan')
      let Regular = /^1[3456789]\d{9}$/
      let coding = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{18}$/
      params.personnelType = seletString(cate, 'value')
      if (!params.enterpriseName && that.id === 2) {
        Toast(`请输入企业名称`)
      } else if (!params.orgCode && that.id === 2) {
        Toast(`请输入社会统一信用代码`)
      } else if (!coding.test(params.orgCode) && that.id === 2) {
        Toast(`请输入正确的社会统一代码`)
      } else if (!params.applyPersonName) {
        Toast(`请输入申请人姓名`)
      } else if (!params.applyPersonAge && that.id === 1) {
        Toast(`请输入年龄`)
      } else if (!params.applyPersonSex && that.id === 1) {
        Toast(`请选择性别`)
      } else if (!params.telephone) {
        Toast(`请输入申请人联系电话`)
      } else if (!Regular.test(params.telephone)) {
        Toast(`请输入正确的申请人联系电话`)
      } else if (!params.personnelType && that.id === 1) {
        Toast(`请选择人员分类`)
      } else if (!params.loanType) {
        Toast(`请选择贷款类型`)
      } else if (!params.applyPrice) {
        Toast(`请输入申请贷款金额`)
      } else if (!params.useOfFunds) {
        Toast(`请输入资金用途`)
      } else {
        api.fundsApply(params).then(res => {
          Toast(res.msg)
          history.back()
        })
      }
    },
    //  场地申请
    siteApply () {
      let that = this;
      let params = that.form
      let Regular = /^1[3456789]\d{9}$/
      let coding = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{18}$/
      if (!params.enterpriseName && that.id === 4) {
        Toast(`请输入企业名称`)
      } else if (!params.orgCode && that.id === 4) {
        Toast(`请输入社会统一信用代码`)
      } else if (!coding.test(params.orgCode) && that.id === 4) {
        Toast(`请输入正确的社会统一代码`)
      } else if (!params.applyPersonName) {
        Toast(`请输入申请人姓名`)
      } else if (!params.applyPersonAge && that.id === 3) {
        Toast(`请输入年龄`)
      } else if (!params.applyPersonSex && that.id === 3) {
        Toast(`请选择性别`)
      } else if (!params.telephone) {
        Toast(`请输入申请人联系电话`)
      } else if (!Regular.test(params.telephone)) {
        Toast(`请输入正确的申请人联系电话`)
      } else if (!params.people && that.id === 3) {
        Toast(`请输入申请工位个数`)
      } else if (!params.incubatorGarden && that.id === 4) {
        Toast(`请输入入驻孵化园`)
      } else if (!params.officeArea && that.id === 4) {
        Toast(`请输入办公面积`)
      } else if (!params.people && that.id === 4) {
        Toast(`请输入入住人数`)
      } else {
        api.siteApply(params).then(res => {
          Toast(res.msg)
          history.back()
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  margin-bottom: 64px;
  .chrray-plate {
    margin-bottom: 10px;
    .plate-title {
      padding: 10px 15px;
      border-bottom: 1PX solid #f2f2f2;
      font-size: 15px;
    }
    .plate-checkbox-box {
      padding: 0 15px;
      overflow: hidden;
      .checkbox-item {
        display: inline-block;
        float: left;
        padding: 10px 20px 10px 0;
        .checkbox {
          vertical-align: middle;
          margin-top: -2px;
          margin-bottom: 1px;
        }
        .checkbox-label {
          color: #333;
          font-size: 15px;
          line-height: 1;
        }
      }
    }
  }
  .cy-popup {
    max-height: 500px;
    .cy-popup-box {
      position: relative;
      .cy-popup-title {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        position: absolute;
        top: 0;
        .text {
          font-size: 15px;
          color: #333;
        }
        .btn {
          font-size: 15px;
          color: #006CD1;
        }
      }
      .cy-radio-group {
        padding-top: 40px;
        .firm-info__wrapper {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          padding: 15px;
          position: relative;
          background-color: #fff;
          .firm-name {
            font-size: 16px;
            color: #333;
            line-height: 1;
            font-weight: 400;
            margin: 0;
            text-align: left;
          }
          .firm-des {
            margin: 15px 0;
            display: flex;
            align-items: center;
            &.last {
              margin: 0;
            }
            .icon {
              font-size: 14px;
              color: #666;
              line-height: 1;
            }
            .text {
              padding-left: 10px;
              .icon
            }
          }
          .leftIcon {
            position: absolute;
            right: 15px;
            top: 50%;
            color: #006CD1;
            padding: 5px 0;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
  .post-btn {
    width: 100%;
    padding: 10px 15px;
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    background-color: transparent;
    text-align: center;
    .btn {
      width: 100%;
      background-color: #006cd1;
      border-radius: 5px;
      padding: 15px;
      font-size: 15px;
      color: #fff;
      line-height: 1;
      border: 0;
    }
  }
}
</style>
