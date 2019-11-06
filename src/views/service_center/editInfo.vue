<template>
  <div class="chrray-main">
    <form @submit="onSubmit" class="chrray-form">
      <van-cell-group>
        <van-field
          label="姓名"
          input-align="right"
          placeholder="请输入姓名"
          v-model="form.applicant">
        </van-field>
        <van-field
          label="联系电话"
          input-align="right"
          placeholder="请输入联系电话"
          v-model="form.applicantPhone">
        </van-field>
      </van-cell-group>
      <div class="dataTitle">所需资料上传</div>
      <div class="upInfo-box">
        <div class="cy-upload-panel" v-if="sortOne">
          <div class="title">{{ sortOneText }}</div>
          <div class="upimg-box">
            <cyHead class="img-box-item" :imgList="sortOneFront">
              <template slot="default">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-14" class="icon"></van-icon>
                <span class="text">身份证正面</span>
              </template>
            </cyHead>
            <cyHead class="img-box-item" :imgList="sortOneBack">
              <template slot="default">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-14" class="icon"></van-icon>
                <span class="text">身份证背面</span>
              </template>
            </cyHead>
          </div>
        </div>
        <div class="cy-upload-panel" v-if="sortTwo">
          <div class="title">{{ sortTwoText }}</div>
          <cyHead :imgList="sortTwoImg">
            <template slot="default">
              <van-icon class-prefix="chrray-icon" name="tubiaosvg-14" class="icon"></van-icon>
            </template>
          </cyHead>
        </div>
        <div class="cy-upload-panel" v-if="sortThree">
          <div class="title">{{ sortThreeText }}</div>
          <cyHead :imgList="sortThreeImg" :maxCount="20">
            <template slot="default">
              <van-icon class-prefix="chrray-icon" name="tubiaosvg-15" class="icon"></van-icon>
            </template>
          </cyHead>
        </div>
      </div>
      <van-button square class="sumbtn">提交审核</van-button>
    </form>
  </div>
</template>

<script>
import api from '@/api/data'
import { Field, CellGroup, Uploader, Icon, Button, Toast } from 'vant'
import cyHead from '@/components/upLoader'
import { seletString } from '@/lib/util'
export default {
  data () {
    return {
      form: {
        detId: '',
        applicant: '',
        applicantPhone: '',
        dataStr: [],
        tokenId: '',
        oamId: '',
        templateNumber: ''
      },
      //  上传模板一
      sortOne: false,
      sortOneText: '',
      sortOneFront: [],
      sortOneBack: [],
      //  上传模板二
      sortTwo: false,
      sortTwoText: '',
      sortTwoImg: [],
      //  上传模板三
      sortThree: false,
      sortThreeText: '',
      sortThreeImg: []
    }
  },
  mounted () {
    this.form.templateNumber = this.$route.query.templateNumber
    this.form.detId = this.$route.query.id
    let tempId = this.form.templateNumber
    let oamId = this.$route.query.oamId
    if (oamId) {
      this.pageData(oamId)
    }
    if (Number(tempId) === 1) {
      this.sortOne = true
      this.sortTwo = true
      this.sortThree = true
      this.sortOneText = '身份证照片'
      this.sortTwoText = '解除劳动合同证明书'
      this.sortThreeText = '户口本'
    } else if (Number(tempId) === 2) {
      this.sortOne = true
      this.sortThree = true
      this.sortOneText = '身份证照片'
      this.sortThreeText = '劳动合同原件照片'
    } else if (Number(tempId) === 3) {
      this.sortTwo = true
      this.sortTwoText = '工商营业执照'
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Toast.name]: Toast,
    cyHead
  },
  methods: {
    //  回显数据
    pageData (oamId) {
      let that = this
      api.QueryInfo({
        oamId: oamId,
        tokenId: localStorage.getItem('tokenId')
      }).then(res => {
        that.form.applicant = res.data.applicant
        that.form.applicantPhone = res.data.applicantPhone
        that.form.oamId = res.data.oamId
        if (res.data.templateNumber === 1) {
          that.echoCard(res.data.fileData[0])
          that.echoOne(res.data.fileData[1])
          that.echoMore(res.data.fileData[2])
        } else if (res.data.templateNumber === 2) {
          that.echoCard(res.data.fileData[0])
          that.echoMore(res.data.fileData[1])
        } else if (res.data.templateNumber === 3) {
          that.echoOne(res.data.fileData[0])
        }
      })
    },
    //  身份证回显
    echoCard (data) {
      this.sortOneFront.push({ url: data.imgUrlArr[0], id: 0 })
      this.sortOneBack.push({ url: data.imgUrlArr[1], id: 1 })
    },
    //  单张图片回显
    echoOne (data) {
      this.sortTwoImg.push({ url: data.imgUrlArr[0], id: 3 })
    },
    //  多张图片回显
    echoMore (data) {
      for (let i in data.imgUrlArr) {
        this.sortThreeImg.push({ url: data.imgUrlArr[i], id: Number(i) + 3 })
      }
    },
    //  身份证上传数据验证
    cardIdUp () {
      let that = this
      if (!that.sortOneFront.length) {
        Toast(`请上传身份证正面`)
        return false
      } else if (!that.sortOneBack.length) {
        Toast(`请上传身份证反面`)
        return false
      } else {
        let url = that.sortOneFront[0].url + ',' + that.sortOneBack[0].url
        let data = {
          fileName: that.sortOneText,
          fileUrl: url
        }
        return data
      }
    },
    //  单张图片上传验证
    oneUp () {
      let that = this
      if (!that.sortTwoImg.length) {
        Toast(`请上传${that.sortTwoText}`)
        return false
      } else {
        let url = that.sortTwoImg[0].url
        let data = {
          fileName: that.sortTwoText,
          fileUrl: url
        }
        return data
      }
    },
    //  多图上传验证
    moreUp () {
      let that = this
      if (!that.sortThreeImg.length) {
        Toast(`请上传${that.sortThreeText}`)
        return false
      } else {
        let url = seletString(that.sortThreeImg, 'url')
        let data = {
          fileName: that.sortThreeText,
          fileUrl: url
        }
        return data
      }
    },
    //  新增审核数据
    addAudit () {
      let that = this
      that.form.tokenId = localStorage.getItem('tokenId')
      api.auditInfo(that.form).then(res => {
        Toast(res.msg)
        setTimeout(() => {
          that.$router.push({ path: '/hall/auditState', query: { id: res.data } })
        })
      })
    },
    //   提交数据
    onSubmit (e) {
      e.preventDefault()
      //  处理数据
      let that = this
      let data = that.form
      if (!data.applicant) {
        Toast(`请填写姓名`)
        return false
      } else if (!data.applicantPhone) {
        Toast(`请填写联系电话`)
        return false
      } else if (!(/^1[3456789]\d{9}$/.test(data.applicantPhone))) {
        Toast(`请输入正确的联系电话`)
        return false
      } else if (Number(data.templateNumber) === 1) {
        let dataStr = []
        if (that.cardIdUp()) {
          dataStr.push(that.cardIdUp())
          if (that.oneUp()) {
            dataStr.push(that.oneUp())
            if (that.moreUp()) {
              dataStr.push(that.moreUp())
              that.form.dataStr = JSON.stringify(dataStr)
              that.addAudit()
            }
          }
        }
      } else if (Number(data.templateNumber) === 2) {
        let dataStr = []
        if (that.cardIdUp()) {
          dataStr.push(that.cardIdUp())
          if (that.moreUp()) {
            dataStr.push(that.moreUp())
            that.form.dataStr = JSON.stringify(dataStr)
            that.addAudit()
          }
        }
      } else if (Number(data.templateNumber) === 3) {
        let dataStr = []
        if (that.oneUp()) {
          dataStr.push(that.oneUp())
          that.form.dataStr = JSON.stringify(dataStr)
          that.addAudit()
        }
      }
      // let paramsOne = {}
      // //  上传模板一存在
      // if (Number(data.templateNumber) === 1) {
      //   if (that.sortOneFront.length > 0 && that.sortOneBack.length > 0) {
      //     let url = that.sortOneFront[0].url + ',' + that.sortOneBack[0].url
      //     paramsOne = {
      //       fileName: that.sortOneText,
      //       fileUrl: url
      //     }
      //   } else {
      //     alert(`请上传身份证正反面`)
      //   }
      // }
      // //  上传模板二存在
      // let paramsTwo = {}
      // if (that.sortTwo && that.sortTwoImg.length > 0) {
      //   let url = that.sortTwoImg[0].url
      //   paramsTwo = {
      //     fileName: that.sortTwoText,
      //     fileUrl: url
      //   }
      // }
      // //  上传模板三存在
      // let paramsThree = {}
      // if (that.sortThree && that.sortThreeImg.length > 0) {
      //   let url = seletString(that.sortThreeImg, 'url')
      //   paramsThree = {
      //     fileName: that.sortThreeText,
      //     fileUrl: url
      //   }
      // }
      // that.form.dataStr = [
      //   paramsOne,
      //   paramsTwo,
      //   paramsThree
      // ]
      // // that.form.dataStr.comm(paramsOne, paramsTwo, paramsThree)
      // that.form.tokenId = localStorage.getItem('tokenId')
      // that.form.dataStr = JSON.stringify(that.form.dataStr)
      // api.auditInfo(that.form).then(res => {
      //   console.log(res)
      // })
      // console.warn(that.form)
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  .chrray-form {
    .dataTitle {
      padding: 15px;
      font-size: 15px;
      color: #333;
    }
    .sumbtn {
      width: 100%;
      margin-top: 25px;
      background-color: #006CD1;
      border: 0;
      color: #fff;
    }
  }
}
</style>
