<template>
  <div>
    <form @submit="submitData">
      <div class="typeCard top0">
        <p class="title">选择人员分类 (必选)</p>
        <div class="typeCard-list">
          <div v-for="(item, index) in list" :key="index" class="type-item">
            <label :for="item.dictId" class="checkbox-label">
              <input type="checkbox" :value="item.dictValue" :id="item.dictId" class="checkbox cy_checkbox renyuan">
              {{ item.dictName }}
            </label>
          </div>
        </div>
      </div>
      <div class="typeCard">
        <p class="title">选择技能 (非必选)</p>
        <div class="typeCard-list">
          <div v-for="(item, index) in skill" :key="index" class="type-item">
            <label :for="item.dictId" class="checkbox-label">
              <input type="checkbox" :value="item.dictValue" :id="item.dictId" class="checkbox cy_checkbox skill">
              {{ item.dictName }}
            </label>
          </div>
        </div>
        <div class="upImg-box">
          <div class="up-title">上传技能证书 (非必选)</div>
          <chrray-upLoader :imgList="killCertArr" :maxCount="20">
            <template slot="default">
              <van-icon class-prefix="chrray-icon" name="tubiaosvg-15" class="icon"></van-icon>
            </template>
          </chrray-upLoader>
        </div>
        <div class="upImg-box">
          <div class="up-title">上传资格证明 (非必选)</div>
          <chrray-upLoader :imgList="qualArr" :maxCount="20">
            <template slot="default">
              <van-icon class-prefix="chrray-icon" name="tubiaosvg-15" class="icon"></van-icon>
            </template>
          </chrray-upLoader>
        </div>
      </div>
      <div class="form-btn">
        <button type="submit" class="btn">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Field, Toast, Icon, CellGroup, Popup, Picker } from 'vant'
import api from '@/api/data'
import chrrayUpLoader from '@/components/upLoader'
// import vanFieldSelectPicker from '@/components/selectPicker.vue'
import { seletString } from '@/lib/util'
import { loginUrl } from '@/config/baseURL'
export default {
  data () {
    return {
      list: [],
      skill: [],
      killCert: [],
      killCertArr: [],
      qual: [],
      qualArr: [],
      form: {
        tokenId: '',
        addres: '',
        personCateArr: '',
        killsArr: '',
        killCertArr: '',
        qualArr: ''
      }
    }
  },
  mounted () {
    this.getPersonnel()
    this.getSkill()
  },
  components: {
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    // vanFieldSelectPicker,
    chrrayUpLoader
  },
  methods: {
    //  获取人员分类
    getPersonnel () {
      let that = this;
      let params = {
        strValue: 'personnel_classification'
      }
      api.allSort(params).then(res => {
        that.list = res.data
      }).catch(error => {
        Toast(error.msg)
      })
    },
    //  获取技能分类
    getSkill () {
      let that = this;
      let params = {
        strValue: 'skill'
      };
      api.allSort(params).then((res) => {
        that.skill = res.data;
      }).catch(error => {
        Toast(error.msg)
      })
    },
    //  提交
    submitData (e) {
      e.preventDefault()
      let that = this;
      let cate = document.querySelectorAll('.renyuan')
      let kills = document.querySelectorAll('.skill')
      that.form.tokenId = localStorage.getItem('testToken')
      that.form.personCateArr = seletString(cate, 'value')
      that.form.killsArr = seletString(kills, 'value')
      that.form.killCertArr = seletString(that.killCertArr, 'url')
      that.form.qualArr = seletString(that.qualArr, 'url')
      if (!that.form.personCateArr) {
        Toast(`必选项不能为空,请选择`)
      } else {
        api.finshedInfo(that.form).then(res => {
          // let path = localStorage.getItem('toPath')
          //  存在测试id则为登录页跳转过来的
          Toast(`完善资料成功.请重新登录..`)
          // if (localStorage.getItem('testId')) {
          //   setTimeout(() => {
          //     that.$router.push({ path: path })
          //   }, 1500)
          // } else {
          localStorage.removeItem('testToken')
          setTimeout(() => {
            window.location.href = loginUrl
            // that.$router.push({ path: '/login/index' })
          }, 1500)
          // }
        }).catch(error => {
          Toast(error.msg)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.typeCard {
  background-color: #fff;
  margin-top: 10px;
  &.top0 {
    margin-top: 0;
  }
  .title {
    color: #333;
    font-size: 15px;
    line-height: 1;
    padding: 15px;
    border-bottom: 1px solid #f2f2f2;
    margin: 0;
    text-align: left;
  }
  .typeCard-list {
    padding: 0 15px;
    overflow: hidden;
    .type-item {
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
  .upImg-box {
    margin-top: 10px;
    background-color: #fff;
    padding: 15px;
    border-top: 1PX solid #f2f2f2;
    .up-title {
      color: #333;
      font-size: 15px;
      line-height: 1;
      text-align: left;
      margin-bottom: 15px;
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
}
</style>
