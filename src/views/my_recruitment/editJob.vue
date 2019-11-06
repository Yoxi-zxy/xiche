<template>
  <div class="chrray_main">
    <form @submit="onSubmit">
      <div class="cy-plate">
        <van-cell-group>
          <van-field
            label="职位名称"
            input-align="right"
            placeholder="请输入职位名称"
            v-model="form.jobName">
          </van-field>
          <van-field
            label="职位分类"
            placeholder="请选择职位分类"
            v-model="sort"
            readonly
            input-align="right"
            is-link
            @click="sortShow = !sortShow">
          </van-field>
          <van-field
            label="薪资范围"
            placeholder="请选择薪资范围"
            v-model="salary"
            readonly
            input-align="right"
            is-link
            @click="salaryShow = !salaryShow">
          </van-field>
          <van-field-select-picker
            label="学历要求"
            placeholder="请选择学历要求"
            @input="educationConfirm"
            :valueKey="'dictName'"
            :index="educationIndex"
            :results="education"
            input-align="right"
            :columns="educationList">
          </van-field-select-picker>
          <chrray-select-picker
            label="性别"
            placeholder="请选择性别要求"
            @chrrayChange="sexChange"
            @input="sexConfirm"
            :valueKey="'name'"
            :index="sexIndex"
            :results="sex"
            :isShow="sexShow"
            input-align="right"
            :columns="sexList">
          </chrray-select-picker>
          <chrray-select-picker
            label="年龄"
            placeholder="请选择年龄段"
            @chrrayChange="ageChange"
            @input="ageConfirm"
            :valueKey="'name'"
            :results="age"
            :isShow="ageShow"
            input-align="right"
            :columns="ageList">
          </chrray-select-picker>
          <van-field
            label="人数"
            input-align="right"
            placeholder="请输入招聘人数"
            v-model="form.personNum ">
          </van-field>
          <van-field
            label="联系电话"
            input-align="right"
            placeholder="请输入联系电话"
            v-model="form.contactNumber">
          </van-field>
          <van-field
            label="有效时间"
            placeholder="请选择有效时间"
            v-model="endTime"
            readonly
            is-link
            input-align="right"
            @click="timeShow = !timeShow">
          </van-field>
        </van-cell-group>
      </div>
      <div class="cy-plate">
        <van-cell-group>
          <van-field
            type="textarea"
            placeholder="请输入职位要求及待遇"
            rows="10"
            v-model="form.jobIntroduce">
          </van-field>
        </van-cell-group>
      </div>
      <div class="form-btn">
        <button type="submit" class="btn">提交审核</button>
      </div>
    </form>
    <!-- 弹窗部分 -->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        @cancel="timeShow = !timeShow"
        @confirm="timeConfirm"
        type="date">
      </van-datetime-picker>
    </van-popup>
    <van-popup v-model="salaryShow" position="bottom">
      <van-picker
        :columns="salaryList"
        show-toolbar
        title="薪资范围"
        @cancel="salaryShow = !salaryShow"
        @confirm="salaryConfirm">
      </van-picker>
    </van-popup>
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
  </div>
</template>

<script>
import api from '@/api/data'
import { Field, Button, CellGroup, Cell, Toast, DatetimePicker, Popup, Picker, Dialog } from 'vant'
import { timestampToTime } from '@/lib/util'
import vanFieldSelectPicker from '@/components/selectPicker.vue'
import chrraySelectPicker from '@/components/sortPicker.vue'
export default {
  data () {
    return {
      form: {
        tokenId: '',
        jobInfoId: '',
        jobName: '',
        jobCate: '',
        jobTwoCate: '',
        salaryStart: '',
        salaryEnd: '',
        contactNumber: this.$store.state.info.userPhone,
        finiteTimeEnd: '',
        jobIntroduce: '',
        education: '',
        sex: '3',
        personNum: '',
        ageStart: '',
        ageEnd: ''
      },
      //  职业分类
      sortIndex1: 0,
      sortIndex2: 0,
      sort: '',
      sortList: [],
      sortShow: false,
      //  薪资范围
      salaryShow: false,
      Indexs: 0,
      salarySelect: [
        { text: '1000元', value: 1000 },
        { text: '2000元', value: 2000 },
        { text: '3000元', value: 3000 },
        { text: '4000元', value: 4000 },
        { text: '5000元', value: 5000 },
        { text: '6000元', value: 6000 },
        { text: '7000元', value: 7000 },
        { text: '8000元', value: 8000 },
        { text: '9000元', value: 9000 },
        { text: '10000元', value: 10000 },
        { text: '15000元', value: 15000 },
        { text: '20000元', value: 20000 },
        { text: '25000元', value: 25000 },
        { text: '30000元', value: 30000 },
        { text: '35000元', value: 35000 },
        { text: '40000元', value: 40000 },
        { text: '45000元', value: 45000 },
        { text: '50000元', value: 50000 },
        { text: '55000元', value: 55000 }
      ],
      salary: '',
      salaryList: [],
      //  当前时间
      timeShow: false,
      currentDate: new Date(),
      endTime: '',
      //  最低工资
      minWage: '',
      //  学历要求
      education: '',
      educationIndex: 0,
      educationList: [],
      //  性别要求
      sex: '不限',
      sexIndex: 0,
      sexShow: false,
      sexList: [
        { name: '不限', text: 'unlimited', id: 3 },
        { name: '男', text: 'man', id: 1 },
        { name: '女', text: 'woman', id: 2 }
      ],
      //  年龄要求
      legaAge: {},
      ageType: 3,
      ageIndex1: 0,
      ageIndex2: 0,
      age: '',
      ageShow: false,
      ageList: []
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Dialog.name]: Dialog,
    vanFieldSelectPicker,
    chrraySelectPicker
  },
  mounted () {
    let id = this.$route.query.id
    this.getLegalAge()
    this.getMin()
    this.getEducation()
    if (id) {
      this.getJobInfo(id)
    } else {
      this.getSort()
    }
    this.salaryList = [
      {
        values: this.salarySelect,
        className: 'column1',
        defaultIndex: 0
      },
      {
        values: this.salarySelect,
        className: 'column2',
        defaultIndex: 0
      }
    ]
  },
  methods: {
    //  编辑时获取一下职位信息
    getJobInfo (id) {
      let that = this
      let data = that.form
      let parmas = {
        jobInfoId: id
      }
      api.jobDetails(parmas).then(res => {
        data.jobInfoId = id
        data.jobName = res.data.jobName
        data.jobCate = res.data.jobCate
        data.jobTwoCate = res.data.jobTwoCate
        data.salaryStart = res.data.salaryStart
        data.salaryEnd = res.data.salaryEnd
        data.contactNumber = res.data.contactNumber
        data.finiteTimeEnd = res.data.finiteTimeEnd
        data.jobIntroduce = res.data.jobIntroduce
        data.education = res.data.education
        data.personNum = res.data.personNum
        data.sex = res.data.sex
        data.ageStart = res.data.ageStart
        data.ageEnd = res.data.ageEnd
        //  有效时间
        that.endTime = timestampToTime(res.data.finiteTimeEnd / 1000).split(' ')[0]
        that.currentDate = new Date(data.finiteTimeEnd)
        //  职位分类
        that.getSort(true)
        that.eductionEcho()
        that.sexEcho()
        //  薪资范围
        let startVal = that.salarySelect
        let arr = []
        startVal.map((item, index) => {
          if (data.salaryStart === item.value) {
            item.index = index
            arr.push(item)
          }
          if (data.salaryEnd === item.value) {
            item.index = index
            arr.push(item)
          }
        })
        this.salary = arr[0].text + '-' + arr[1].text
        that.salaryList[1].defaultIndex = arr[0].index
        that.salaryList[1].defaultIndex = arr[1].index
      })
    },
    //  获取最低工资
    getMin () {
      let that = this
      api.minMumWage().then(res => {
        that.minWage = res.data.mininumWage
      })
    },
    //  获取职位分类
    getSort (isParams) {
      let that = this
      let params = {
        classType: 1
      }
      api.jobSort(params).then(res => {
        for (let i in res.data) {
          if (isParams && Number(that.form.jobCate) === res.data[i].joncId) {
            that.sort = res.data[i].joncName
            that.sortIndex1 = Number(i)
            if (res.data[i].children.length > 0) {
              for (let o in res.data[i].children) {
                if (Number(that.form.jobTwoCate) === res.data[i].children[o].joncId) {
                  that.sort = res.data[i].joncName + '-' + res.data[i].children[o].joncName
                  that.sortIndex1 = Number(i)
                  that.sortIndex2 = Number(o)
                }
              }
            }
          }
        }
        let listData = res.data
        that.sortList = [
          {
            values: listData,
            className: 'column1',
            defaultIndex: that.sortIndex1
          },
          {
            values: listData[that.sortIndex1].children,
            className: 'column2',
            defaultIndex: that.sortIndex2
          }
        ]
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
        this.sort = val[0].joncName
      } else {
        this.form.jobCate = val[0].joncId
        this.form.jobTwoCate = val[1].joncId
        this.sort = val[0].joncName + '-' + val[1].joncName
      }
      this.sortShow = !this.sortShow
      // this.form.jobCate = val.value
    },
    //  薪资范围选择
    salaryConfirm (val) {
      if (Number(val[0].value) <= this.minWage) {
        Toast(`最低工资不能少于${this.minWage}元`)
      } else if (Number(val[0].value) > Number(val[1].value)) {
        Toast(`请选择正确的薪资范围`)
      } else {
        //  确认后显示的值
        this.salary = val[0].text + '-' + val[1].text
        //  将确认后显示的值放回去
        this.form.salaryStart = val[0].value
        this.form.salaryEnd = val[1].value
        this.salaryShow = !this.salaryShow
      }
    },
    //  时间确认
    timeConfirm (val) {
      let time = Math.round(val)
      let times = val.toLocaleDateString().split('/').join().replace(/,/g, '-')
      if (val < new Date()) {
        Toast(`请选择大于今天的时间`)
      } else {
        this.endTime = times
        this.form.finiteTimeEnd = time
        this.timeShow = !this.timeShow
      }
    },
    //  学历要求-获取数据
    getEducation () {
      let that = this
      let params = {
        strValue: 'education'
      }
      api.allSort(params).then(res => {
        that.educationList = res.data
      }).catch(err => {
        Toast(err.msg)
      })
    },
    //  学历要求-数据回显
    eductionEcho () {
      let that = this
      let data = this.educationList
      data.map((item, index) => {
        if (that.form.education === item.dictValue) {
          that.education = item.dictName
          that.educationIndex = index
        }
      })
    },
    //  学历要求-确认
    educationConfirm (val) {
      this.education = val.dictName
      this.form.education = val.dictValue
    },
    //  性别-回显
    sexEcho () {
      this.sexList.map((item, index) => {
        if (this.form.sex === item.id) {
          this.sex = item.name
          this.ageType = item.id
          this.sexIndex = index
          this.computeAge(true)
        }
      })
    },
    //  性别-改变
    sexChange (pick, val) {
      this.sexShow = false
    },
    //  性别-确认
    sexConfirm (val) {
      this.sex = val.name
      this.ageType = val.id
      this.form.sex = val.id
      this.age = ''
      this.form.ageStart = ''
      this.form.ageEnd = ''
      this.computeAge()
    },
    //  年龄-请求法定年龄
    getLegalAge () {
      let that = this
      api.LegalAgeList().then(res => {
        that.legaAge = res.data
        that.computeAge()
      })
    },
    //  年龄-根据后台计算年龄段
    computeAge (isEcho = false) {
      let data = this.legaAge
      data.map(item => {
        if (this.ageType === item.personType) {
          if (isEcho) {
            this.ageEcho()
            this.ageNumber(item.mininumAge, item.maxAge)
          } else {
            this.ageNumber(item.mininumAge, item.maxAge)
          }
        }
      })
    },
    //  年龄-回显
    ageEcho () {
      let start = this.ageList[0].values
      let end = this.ageList[1].values
      let startName
      let endName
      start.map((item, index) => {
        if (this.form.ageStart === item.id) {
          this.ageIndex1 = index
          startName = item.name
        }
      })
      end.map((item, index) => {
        if (this.form.ageEnd === item.id) {
          this.ageIndex2 = index
          endName = item.name
        }
      })
      this.age = startName + '-' + endName
    },
    //  年龄-数据获取
    ageNumber (minAge = 16, maxAge = 60) {
      this.ageList = []
      this.ageList.push({ values: [], defaultIndex: this.ageIndex1 }, { values: [], defaultIndex: this.ageIndex2 })
      for (let i = minAge; i < maxAge; i++) {
        let obj1 = { name: i + '岁', id: i }
        let obj2 = { name: i + 1 + '岁', id: i + 1 }
        this.ageList[0].values.push(obj1)
        this.ageList[1].values.push(obj2)
      }
    },
    //  年龄-改变
    ageChange (pick, val) {
      if (val[0].id > val[1].id) {
        this.ageShow = true
      } else {
        this.ageShow = false
      }
    },
    //  年龄-确认
    ageConfirm (val) {
      if (val[0].id > val[1].id) {
        Toast(`请选择正确的年龄段`)
      } else {
        this.age = `${val[0].name}-${val[1].name}`
        this.form.ageStart = val[0].id
        this.form.ageEnd = val[1].id
      }
    },
    //  提交
    onSubmit (e) {
      e.preventDefault()
      let that = this
      that.form.tokenId = localStorage.getItem('tokenId')
      // that.form.tokenId = '5e2da4aed4d84407930dfc9994b7f953'
      //  进行验证
      let data = that.form
      if (!data.jobName) {
        Toast(`请输入职位名称`)
      } else if (!data.jobCate) {
        Toast(`请选择职位分类`)
      } else if (!data.salaryStart) {
        Toast(`请选择薪资范围`)
      } else if (!data.salaryEnd) {
        Toast(`请选择薪资范围`)
      } else if (!data.education) {
        Toast(`请选择学历要求`)
      } else if (!data.sex) {
        Toast(`请选择性别`)
      } else if (!data.ageStart) {
        Toast(`请选择年龄`)
      } else if (!data.personNum) {
        Toast(`请输入招聘人数`)
      } else if (!data.contactNumber) {
        Toast(`请输入联系电话`)
      } else if (!data.finiteTimeEnd) {
        Toast(`请选择有效时间`)
      } else if (!data.jobIntroduce) {
        Toast(`请输入职位要求或介绍`)
      } else {
        Dialog.confirm({
          message: '我保证发布信息属实'
        }).then(() => {
          api.editJob(that.form).then(res => {
            Toast(res.msg)
            setTimeout(() => {
              that.$router.push({ path: '/hr/myRelease' })
            }, 1000)
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
  }
</style>
