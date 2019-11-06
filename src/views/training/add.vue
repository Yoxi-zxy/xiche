<template>
  <div class="chrray-main">
    <form @submit="onsubmit" class="chrray-form">
      <div class="cy-plate">
        <van-cell-group>
          <van-field
            label="培训工种"
            placeholder="请选择培训工种"
            v-model="sort"
            readonly
            is-link
            input-align="right"
            @click="sortShow = !sortShow">
          </van-field>
          <van-field
            label="培训开始时间"
            placeholder="请选择期望开始培训时间"
            v-model="trainStartTime"
            readonly
            is-link
            input-align="right"
            @click="startShow = !startShow">
          </van-field>
          <van-field
            label="培训时长"
            placeholder="请输入期望培训天数"
            type="number"
            v-model="form.trainCycle"
            input-align="right">
          </van-field>
          <van-field-select-picker
            label="培训时间"
            placeholder="请选择期望培训时间"
            @input="timeChange"
            :results="period"
            input-align="right"
            :columns="periodList">
          </van-field-select-picker>
          <van-field-select-picker
            label="培训方式"
            placeholder="请选择期望培训方式"
            @input="wayChange"
            :results="way"
            input-align="right"
            :columns="wayList">
          </van-field-select-picker>
          <van-field
            label="培训地区"
            placeholder="请选择期望培训地区"
            v-model="parent"
            readonly
            is-link
            input-align="right"
            @click="parentShow = !parentShow">
          </van-field>
<!--          <van-field-->
<!--            label="详情地址"-->
<!--            input-align="right"-->
<!--            placeholder="请输入详细地址"-->
<!--            v-model="form.addres">-->
<!--          </van-field>-->
          <van-field
            label="联系电话"
            input-align="right"
            placeholder="请输入联系电话"
            v-model="form.userPhone">
          </van-field>
        </van-cell-group>
      </div>
      <div class="cy-plate">
        <van-cell-group>
          <div class="typeCard">
            <p class="title">选择人员分类</p>
            <div class="typeCard-list">
              <div v-for="(item, index) in personnelSortList" :key="index" class="type-item">
                <label :for="item.dictId" class="checkbox-label">
                  <input type="checkbox" :value="item.dictValue" :id="item.dictId" class="checkbox cy_checkbox renyuan">
                  {{ item.dictName }}
                </label>
              </div>
            </div>
          </div>
        </van-cell-group>
      </div>
      <div class="cy-plate">
        <van-cell-group>
          <van-field
            type="textarea"
            rows="5"
            placeholder="请输入培训需求"
            v-model="form.trainAsk">
          </van-field>
        </van-cell-group>
      </div>
      <div class="form-btn">
        <button type="submit" class="btn">提交</button>
      </div>
    </form>
    <!-- 職位分類彈窗 -->
    <van-popup v-model="sortShow" position="bottom">
      <van-picker
        :columns="sortList"
        show-toolbar
        value-key="joncName"
        title="职位分类"
        @change="onChange"
        @cancel="sortShow = !sortShow"
        @confirm="sortConfirm">
      </van-picker>
    </van-popup>
    <!-- 开始时间弹窗 -->
    <van-popup v-model="startShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        @cancel="startShow = !startShow"
        @confirm="startConfirm"
        :formatter="formatter"
        type="date">
      </van-datetime-picker>
    </van-popup>
    <!-- 结束时间弹窗 -->
    <van-popup v-model="endShow" position="bottom">
      <van-datetime-picker
        v-model="currentDates"
        @cancel="endShow = !endShow"
        @confirm="endConfirm"
        type="date">
      </van-datetime-picker>
    </van-popup>
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
import { Field, CellGroup, Cell, Popup, Picker, DatetimePicker, Toast, Dialog } from 'vant'
import vanFieldSelectPicker from '@/components/selectPicker.vue'
import { seletString } from '@/lib/util'
export default {
  data () {
    return {
      form: {
        tokenId: '',
        jobCate: '',
        trainStartTime: '',
        trainEndTime: '',
        township: '',
        personCate: '',
        trainAsk: '',
        userPhone: this.$store.state.info.userPhone,
        addres: '',
        trainCycle: '',
        dayAndNight: '',
        upAndDown: ''
      },
      //  深拷贝表单
      oldForm: {},
      //  职位分类
      sort: '',
      sortList: [],
      sortShow: false,
      //  开始时间
      startShow: false,
      currentDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      trainStartTime: '',
      //  期望培训时间
      period: '',
      periodList: [
        {
          id: 1,
          text: '白天'
        },
        {
          id: 2,
          text: '晚上'
        }
      ],
      //  期望培训方式
      way: '',
      wayList: [
        {
          id: 1,
          text: '线上'
        },
        {
          id: 2,
          text: '线下'
        }
      ],
      //  结束时间
      endShow: false,
      currentDates: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
      trainEndTime: '',
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
      //  人员分类
      personnelSortList: []
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Dialog.name]: Dialog,
    [Picker.name]: Picker,
    vanFieldSelectPicker
  },
  created () {
    this.oldForm = { ...this.form }
  },
  mounted () {
    this.getSort()
    this.getCounty()
    this.getPersonnel()
  },
  methods: {
    //  获取职位分类数据
    getSort () {
      let that = this
      let params = {
        classType: 2
      }
      api.jobSort(params).then(res => {
        let listData = res.data
        that.sortList = [
          {
            values: listData,
            className: 'column1'
          },
          {
            values: listData[0].children,
            className: 'column2',
            defaultIndex: 0
          }
        ]
      }).catch(error => {
        Toast(error.msg)
      })
    },
    //  职位分类变化
    onChange (picker, values) {
      picker.setColumnValues(1, values[0].children);
    },
    //  职位分类选择
    sortConfirm (val) {
      if (val[1] === undefined) {
        this.form.jobCate = val[0].joncId
        this.form.jobTwoCate = ''
        this.sort = val[0].joncName
      } else {
        this.form.jobCate = val[0].joncId
        this.form.jobTwoCate = val[1].joncId
        this.sort = val[0].joncName + '-' + val[1].joncName
      }
      this.sortShow = !this.sortShow
      // this.form.jobCate = val.value
    },
    //  选择职位后回调
    sortChange (val) {
      this.form.jobCate = val.value
    },
    //  处理时间
    formatter (type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      } else if (type === 'hour') {
        return `${val}时`
      }
      return val
    },
    //  确认开始时间后回调
    startConfirm (val) {
      if (val < new Date()) {
        Toast(`请选择正确的时间`)
      } else {
        this.trainStartTime = val.toLocaleDateString().split('/').join().replace(/,/g, '-')
        this.form.trainStartTime = Math.round(val)
        this.startShow = !this.startShow
      }
    },
    //  确认结束时间后回调
    endConfirm (val) {
      if (val < new Date(new Date().getTime() + 24 * 60 * 60 * 1000)) {
        Toast(`请选择正确的时间`)
      } else {
        this.trainEndTime = val.toLocaleDateString().split('/').join().replace(/,/g, '-')
        this.form.trainEndTime = Math.round(val)
        this.endShow = !this.endShow
      }
    },
    //  期望培训时间
    timeChange (val) {
      this.period = val.text
      this.form.dayAndNight = val.id
    },
    //  期望培训方式
    wayChange (val) {
      this.way = val.text
      this.form.upAndDown = val.id
    },
    //  地区是否属于县内
    // countyChange (val) {
    //   this.county = val.text
    //   if (val.id === 1) {
    //     this.parent = ''
    //     this.getCounty()
    //   } else {
    //     this.getAllParent()
    //   }
    // },
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
                id: '31681'
              }
            ]
          },
          {
            values: res1.data
          }
        ]
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
      console.log(val)
      if (val[1] === undefined) {
        this.parent = val[0].name
      } else if (val[2] === undefined) {
        this.parent = val[0].name + '-' + val[1].name
      } else {
        this.parent = val[0].name + '-' + val[1].name + '-' + val[2].name
      }
      this.form.township = val[2].id
      this.parentShow = !this.parentShow
    },
    //  获取人员分类
    getPersonnel () {
      let that = this;
      let params = {
        strValue: 'personnel_classification'
      }
      api.allSort(params).then(res => {
        that.personnelSortList = res.data
      }).catch(error => {
        Toast(error.msg)
      })
    },
    //  提交
    onsubmit (e) {
      e.preventDefault()
      let that = this
      let data = that.form
      let cate = document.querySelectorAll('.renyuan')
      that.form.personCate = seletString(cate, 'value')
      that.form.tokenId = localStorage.getItem('tokenId')
      if (!data.jobCate) {
        Toast(`请选择培训分类`);
      } else if (!data.trainStartTime) {
        Toast(`请选择培训开始时间`)
      } else if (!data.trainCycle) {
        Toast(`请选择培训周期`)
      } else if (!data.dayAndNight) {
        Toast(`请选择培训时间`)
      } else if (!data.upAndDown) {
        Toast(`请选择培训方式`)
      } else if (!data.township) {
        Toast(`请选择培训地区`)
      } else if (!data.userPhone) {
        Toast(`请输入联系电话`)
      } else if (!(/^1[3456789]\d{9}$/.test(data.userPhone))) {
        Toast(`请输入正确的联系电话`)
      } else if (!data.personCate) {
        Toast(`请选择人员分类`)
      } else {
        Dialog.confirm({
          message: '本人是否对本次培训需求负责'
        }).then(() => {
          api.addTrain(data).then(res => {
            Toast(res.msg)
            setTimeout(() => {
              that.sort = ''
              that.form.trainCycle = ''
              that.period = ''
              that.way = ''
              that.trainStartTime = ''
              that.trainEndTime = ''
              that.parent = ''
              that.form.userPhone = ''
              cate.forEach(item => {
                item.checked = false
              })
              that.form.trainAsk = ''
              data = that.oldForm
            }, 1500)
          }).catch(error => {
            Toast(error.msg)
          })
        }).catch(() => {
          //
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cy-plate {
  margin-top: 10px;
  &:first-child {
    margin-top: 0;
  }
  .typeCard {
    .title {
      padding: 15px;
      border-bottom: 1PX solid #f2f2f2;
      box-sizing: border-box;
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
  }
}
</style>
