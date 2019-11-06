<template>
 <div class="chrray_main">
   <form @submit="onSubmit">
     <div class="cy-plate">
       <van-cell-group>
         <van-field
           label="公司名称"
           placeholder="请输入公司名称"
           label-width="3.5rem"
           input-align="right"
           v-model="form.corporateName">
         </van-field>
         <van-field
           label="社会统一代码"
           label-width="3.5rem"
           input-align="right"
           placeholder="请输入社会统一代码"
           v-model="form.creditCoding">
         </van-field>
         <van-field
           label="法人姓名"
           label-width="3.5rem"
           input-align="right"
           placeholder="请输入法人姓名"
           v-model="form.legalPersonName">
         </van-field>
         <van-field
           label="联系电话"
           label-width="3.5rem"
           input-align="right"
           placeholder="请输入联系电话"
           v-model="form.contactNumber">
         </van-field>
         <van-field-select-picker
           label="所在地区"
           @input="countyChange"
           :results="form.countyWithinExternal === 1 ? '县内' : '县外'"
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
           v-model="form.companyDetailedAddress">
         </van-field>
       </van-cell-group>
     </div>
     <div class="cy-plate">
       <van-cell-group>
         <van-field
           type="textarea"
           rows="8"
           placeholder="请输入公司介绍"
           v-model="form.companyIntroduction">
         </van-field>
       </van-cell-group>
     </div>
     <div class="upImg-box">
       <div class="title">上传法人身份证照片</div>
       <div class="upimg-box">
         <chrray-upLoader class="img-box-item" :imgList="userFrontCardIdArr">
           <template slot="default">
             <van-icon class-prefix="chrray-icon" name="tubiaosvg-14" class="icon"></van-icon>
             <span class="text">身份证正面</span>
           </template>
         </chrray-upLoader>
         <chrray-upLoader class="img-box-item" :imgList="userBackCardIdArr">
           <template slot="default">
             <van-icon class-prefix="chrray-icon" name="tubiaosvg-14" class="icon"></van-icon>
             <span class="text">身份证正面</span>
           </template>
         </chrray-upLoader>
       </div>
     </div>
     <div class="upImg-box">
       <div class="up-title">上传营业执照</div>
       <chrray-upLoader :imgList="LicenseArr">
         <template slot="default">
           <van-icon class-prefix="chrray-icon" name="tubiaosvg-14" class="icon"></van-icon>
         </template>
       </chrray-upLoader>
     </div>
     <div class="upImg-box">
       <div class="up-title">上传公司照片（最多三张）</div>
       <chrray-upLoader :imgList="firmImgArr" :maxCount="3">
         <template slot="default">
           <van-icon class-prefix="chrray-icon" name="tubiaosvg-15" class="icon"></van-icon>
         </template>
       </chrray-upLoader>
     </div>
     <div class="form-btn">
       <button type="submit" class="btn">提交审核</button>
     </div>
   </form>
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
import { Field, CellGroup, Cell, Uploader, Toast, Popup, Picker, Icon } from 'vant'
import vanFieldSelectPicker from '@/components/selectPicker.vue'
import chrrayUpLoader from '@/components/upLoader'
import { seletString } from '@/lib/util'
import TMap from 'qqmap'
export default {
  data () {
    return {
      // License: [],
      LicenseArr: [],
      // firmImg: [],
      firmImgArr: [],
      //  身份证正面
      userFrontCardIdArr: [], // 后台返回图片路径
      //  身份证反面
      userBackCardIdArr: [], // 后台返回图片路径
      form: {
        tokenId: '',
        corporateName: '',
        creditCoding: '',
        legalPersonName: '',
        // contactNumber: '13410512271',
        contactNumber: this.$store.state.info.userPhone,
        countyWithinExternal: 1,
        province: '',
        city: '',
        district: '',
        township: '',
        companyDetailedAddress: '',
        companyIntroduction: '',
        businessLicenseUrl: '',
        companyIntroductionUrl: '',
        lat: '',
        lng: ''
      },
      addres: '',
      citys: [
        {
          text: '丰都县',
          value: 31744
        }
      ],
      timeshow: true,
      //  用来存储二级选择
      columns: [],
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
      isLoading: true,
      //  腾讯地图
      TXMap: '',
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Icon.name]: Icon,
    chrrayUpLoader,
    vanFieldSelectPicker
  },
  mounted () {
    /* eslint-disable */
    // TMap.init('IGMBZ-4G6K5-FM2IL-Q7Y7D-MF7HT-N7FN6', () => {
    //   this.TXMap = new qq.maps.Geocoder(callbacks);
    // })
    /* eslint-disable */
    let id = this.$route.query.eninfoId
    if (id) {
      this.getOldInfo(id)
      this.form.eninfoId = id
    } else {
      // this.getParent()
      this.getCounty()
    }
  },
  methods: {
    //  从修改页过来,获取原来的信息
    getOldInfo (id) {
      let that = this
      let params = {
        tokenId: localStorage.getItem('tokenId')
      }
      api.editFirmInfo(params).then(res => {
        //  将数据回显回去
        try {
          that.form.corporateName = res.data.corporateName
          that.form.creditCoding = res.data.creditCoding
          that.form.legalPersonName = res.data.legalPersonName
          that.form.contactNumber = res.data.contactNumber
          that.form.countyWithinExternal = res.data.countyWithinExternal
          that.form.province = res.data.province
          that.form.city = res.data.city
          that.form.district = res.data.district
          that.form.township = res.data.township
          that.form.companyDetailedAddress = res.data.companyDetailedAddress
          that.form.companyIntroduction = res.data.companyIntroduction
          that.userFrontCardIdArr.push({ url: res.data.legalPersonCardPositive, id: 0 })
          that.userBackCardIdArr.push({ url: res.data.legalPersonCardBack, id: 1 })
          that.LicenseArr.push({ url: res.data.businessLicenseUrl, id: 2 })
          //  地区回显
          that.parentEcho()
          //  将公司照片回显回去(同上)
          let firmImgArr = res.data.companyIntroductionUrlArr
          that.echoMore(firmImgArr)
          // that.getParent()
        } catch (err) {
          Toast(`页面出现错误,请联系管理员`)
        }
      }).catch((error) => {
        Toast(error.msg)
      })
    },
    //  多张图片回显
    echoMore (data) {
      for (let i in data) {
        this.firmImgArr.push({ url: data[i], id: Number(i) + 3 })
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
      this.parent = ''
      this.form.province = ''
      this.form.city = ''
      this.form.district = ''
      this.form.township = ''
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
        this.form.province = val[0].id
        this.form.city = ''
        this.form.district = ''
        this.form.township = ''
      } else if (val[2] === undefined) {
        this.parent = val[0].name + '-' + val[1].name
        this.form.province = val[0].id
        this.form.city = val[1].id
        this.form.district = ''
        this.form.township = ''
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
          this.form.township = ''
        }
      }
      this.parentShow = !this.parentShow
    },
    //  地区回显
    parentEcho () {
      let that = this
      let data = that.form
      that.isLoading = true
      if (data.city === null) {
        let currIndex1 = {}
        api.parent({ parentId: 1 }).then(res1 => {
          let Index1 = res1.data
          res1.data.forEach((item, index) => {
            if (item.id === data.province) {
              currIndex1.index = index
              currIndex1.name = item.name
            }
          })
          that.isLoading = false
          this.parent = currIndex1.name
          that.parentList = [
            {
              values: Index1,
              defaultIndex: currIndex1.index
            },
            {
              values: []
            },
            {
              values: []
            }
          ]
        })
      } else if (data.township === null) {
        let currIndex1 = {}
        let currIndex2 = {}
        let currIndex3 = {}
        api.parent({ parentId: 1 }).then(res1 => {
          let Index1 = res1.data
          res1.data.forEach((item, index) => {
            if (item.id === data.province) {
              currIndex1.index = index
              currIndex1.name = item.name
            }
          })
          api.parent({ parentId: data.province }).then(res2 => {
            let Index2 = res2.data
            res2.data.forEach((item, index) => {
              if (item.id === data.city) {
                currIndex2.index = index
                currIndex2.name = item.name
              }
            })
            api.parent({ parentId: data.city }).then(res3 => {
              let Index3 = res3.data
              res3.data.forEach((item, index) => {
                if (item.id === data.district) {
                  currIndex3.index = index
                  currIndex3.name = item.name
                }
              })
              that.isLoading = false
              this.parent = currIndex1.name + '-' + currIndex2.name + '-' + currIndex3.name
              that.parentList = [
                {
                  values: Index1,
                  defaultIndex: currIndex1.index
                },
                {
                  values: Index2,
                  defaultIndex: currIndex2.index
                },
                {
                  values: Index3,
                  defaultIndex: currIndex3.index
                }
              ]
            })
          })
        })
      } else {
        let currIndex1 = {}
        api.parent({ parentId: 31744 }).then(res1 => {
          let Index1 = res1.data
          res1.data.forEach((item, index) => {
            if (item.id === data.township) {
              currIndex1.index = index
              currIndex1.name = item.name
            }
          })
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
              values: Index1,
              defaultIndex: currIndex1.index
            }
          ]
          this.parent = '重庆市' + '-' + '丰都县' + '-' + currIndex1.name
        })
      }
    },
    //  提交信息
    onSubmit (e) {
      e.preventDefault()
      let that = this
      let data = that.form
      let coding = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{18}$/
      data.tokenId = localStorage.getItem('tokenId')
      that.form.businessLicenseUrl = seletString(that.LicenseArr, 'url')
      that.form.companyIntroductionUrl = seletString(that.firmImgArr, 'url')
      that.form.legalPersonCardPositive = seletString(that.userFrontCardIdArr, 'url')
      that.form.legalPersonCardBack = seletString(that.userBackCardIdArr, 'url')
      let address = that.parent.replace(/-/g,',') + ',' + that.form.companyDetailedAddress
      if (!data.corporateName) {
        Toast(`请输入公司名称`)
      } else if (!data.creditCoding) {
        Toast(`请输入社会统一代码`)
      } else if (!coding.test(data.creditCoding)) {
        Toast(`请输入正确的社会统一代码`)
      } else if (!data.legalPersonName) {
        Toast(`请输入法人姓名`)
      } else if (!data.contactNumber) {
        Toast(`请输入联系电话`)
      } else if (!(/^1[3456789]\d{9}$/.test(data.contactNumber))) {
        Toast(`请输入正确的联系电话`)
      } else if (!data.province) {
        Toast(`请选择地区`)
      } else if (!data.legalPersonCardPositive) {
        Toast(`请上传法人身份证正面`)
      } else if (!data.legalPersonCardBack) {
        Toast(`请上传法人身份证反面`)
      } else if (!data.companyDetailedAddress) {
        Toast(`请输入公司详细地址`)
      } else if (!data.companyIntroduction) {
        Toast(`请输入公司介绍`)
      } else if (!data.businessLicenseUrl) {
        Toast(`请上传营业执照`)
      } else if (!data.companyIntroductionUrl) {
        Toast(`请上传公司图片`)
      } else {
        TMap.init('IGMBZ-4G6K5-FM2IL-Q7Y7D-MF7HT-N7FN6', () => {
          let geocoder = new qq.maps.Geocoder(callbacks)
          geocoder.getLocation(address)
        })
        let callbacks = {
          complete: res => {
            data.lng = res.detail.location.lng
            data.lat = res.detail.location.lat
            api.addFirmInfo(that.form).then(res => {
              Toast(`添加成功,请等待审核`)
              setTimeout(() => {
                that.$router.push({ path: '/hr/statusPage', query: { id: res.data } })
              }, 1000)
            })
          }
        }

      }
    }
  },
  beforeRouteEnter (to, from, next) {
    //  判断用户为什么用户
    const getUserType = () => {
      let params = {
        tokenId: localStorage.getItem('tokenId')
      }
      if (to.query.eninfoId) {
        next()
      } else {
        api.userType(params).then(res => {
          if (res.data.auditStatus === 4) {
            next({ path: '/hr/statusPage', query: { id: res.data.eninfoId } })
          } else if (res.data.ifEnterprise === 2 && res.data.ifJobData) {
            next({ path: '/hr/myRelease' })
          } else if (res.data.ifEnterprise === 2 && res.data.auditStatus < 4) {
            next({ path: '/hr/statusPage', query: { id: res.data.eninfoId } })
          } else {
            next()
          }
        })
      }
    }
    getUserType()
  }
}
</script>

<style scoped lang="less">
.cy-plate {
  margin-top: 10px;
  &:first-child {
    margin-top: 0;
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
  .up-title {
    color: #333;
    font-size: 15px;
    line-height: 1;
    text-align: left;
    margin: 0;
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
</style>
