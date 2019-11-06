<template>
  <div class="chrray_main">
    <div class="page-title">求职意向设置</div>
    <form @submit="onSubmit">
      <van-cell-group>
        <van-field
          label="职位分类"
          placeholder="请选择职位分类"
          v-model="sort"
          readonly
          is-link
          input-align="right"
          @click="sortShow = !sortShow">
        </van-field>
        <van-field
          label="期望薪资"
          placeholder="请选择期望薪资"
          v-model="salary"
          readonly
          is-link
          input-align="right"
          @click="salaryShow = !salaryShow">
        </van-field>
        <van-field
          label="期望地区"
          placeholder="请选择期望地区"
          v-model="addres"
          readonly
          is-link
          input-align="right"
          @click="cityShow = !cityShow">
        </van-field>
        <van-field-select-picker
          label="当前状态"
          placeholder="请选择当前状态"
          @input="statusChange"
          :index="statusIndex"
          :results="status"
          input-align="right"
          :columns="statusList">
        </van-field-select-picker>
      </van-cell-group>
      <div class="form-btn">
        <button type="submit" class="btn">保存</button>
      </div>
    </form>
    <!--  弹窗部分 -->
    <!--  薪资范围 -->
    <van-popup v-model="salaryShow" position="bottom">
      <van-picker
        :columns="salaryList"
        show-toolbar
        title="薪资范围"
        @cancel="salaryShow = !salaryShow"
        @confirm="salaryConfirm">
      </van-picker>
    </van-popup>
    <!-- 职位分类弹窗 -->
    <van-popup v-model="sortShow" position="bottom">
      <van-picker
        :columns="sortList"
        show-toolbar
        value-key="joncName"
        title="职位分类"
        @change="sortChange"
        @cancel="sortShow = !sortShow"
        @confirm="sortConfirm">
      </van-picker>
    </van-popup>
    <!-- 地区选择 -->
    <van-popup v-model="cityShow" position="bottom">
      <van-picker
        :columns="columns"
        value-key="name"
        show-toolbar
        @change="parentChange"
        @cancel="cityShow = !cityShow"
        @confirm="onConfirm">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/data'
import { Field, CellGroup, Cell, Popup, Picker, Toast } from 'vant'
import vanFieldSelectPicker from '@/components/selectPicker.vue'
import wxApi from '@/utils/weixin'
export default {
  data () {
    return {
      form: {
        tokenId: '',
        expectId: '',
        jobCate: '',
        jobtwoCate: '',
        salaryStart: '',
        salaryEnd: '',
        township: '',
        cunrentStatus: ''
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
      //  地区选择
      addres: '',
      cityShow: false,
      citys: [
        {
          name: '全部',
          id: 0
        },
        {
          name: '丰都县',
          id: 31744
        }
      ],
      parent: [],
      columns: [],
      //  状态选择
      status: '',
      statusIndex: 0,
      statusList: [
        { value: 1, text: '离职,随时到岗' },
        { value: 2, text: '在职,月内到岗' },
        { value: 3, text: '在职,考虑机会' },
        { value: 4, text: '在职,暂不考虑机会' }
      ]
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    vanFieldSelectPicker
  },
  mounted () {
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
    this.getExpect()
    let shareData = {
      title: this.$route.meta.title,
      link: location.href
    }
    wxApi.share(shareData)
  },
  methods: {
    //  查询求职意向数据
    getExpect () {
      let that = this
      api.queryExpect({
        tokenId: localStorage.getItem('tokenId')
      }).then(res => {
        if (res.data !== null) {
          Object.assign(that.form, res.data)
          that.getSort(true)
          that.getParent(true)
          that.salaryData()
          that.echoStatus()
        } else {
          that.getSort()
          that.getParent()
        }
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
                if (Number(that.form.jobtwoCate) === res.data[i].children[o].joncId) {
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
    //  职位分类选择
    sortChange (picker, values) {
      picker.setColumnValues(1, values[0].children);
    },
    //  职位分类选择
    sortConfirm (val) {
      if (val[1] === undefined) {
        this.form.jobCate = val[0].joncId
        this.sort = val[0].joncName
      } else {
        this.form.jobCate = val[0].joncId
        this.form.jobtwoCate = val[1].joncId
        this.sort = val[0].joncName + '-' + val[1].joncName
      }
      this.sortShow = !this.sortShow
      // this.form.jobCate = val.value
    },
    //  回显职位分类
    sortEach () {

    },
    //  薪资范围选择
    salaryConfirm (val) {
      if (Number(val[0].value) > Number(val[1].value)) {
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
    //  回显薪资范围
    salaryData () {
      let that = this
      let data = that.form
      let startVal = that.salarySelect
      let arr = []
      startVal.forEach((item, index) => {
        if (data.salaryStart === Number(item.value)) {
          item.index = index
          arr.push(item)
        }
        if (data.salaryEnd === Number(item.value)) {
          item.index = index
          arr.push(item)
        }
      })
      this.salary = arr[0].text + '-' + arr[1].text
      that.salaryList[1].defaultIndex = arr[0].index
      that.salaryList[1].defaultIndex = arr[1].index
    },
    //  获取地区
    getParent (isEcah) {
      let that = this
      let params = {
        parentId: 31744
      }
      //  设置回显后的位置
      let Indexs = 0
      let newArr = []
      if (isEcah) {
        api.parent(params).then(res => {
          res.data.unshift({ id: 888888, name: '全县' })
          for (let i = 0; i < res.data.length; i++) {
            if (that.form.township === res.data[i].id) {
              Indexs = Number(i)
              that.Index = 1
              newArr = res.data
              that.addres = '丰都县' + '-' + res.data[i].name
              break
            } else {
              that.Index = 0
              that.addres = '全部'
            }
          }
          that.columns = [
            {
              values: that.citys,
              className: 'column1',
              defaultIndex: that.Index
            },
            {
              values: newArr,
              className: 'column2',
              defaultIndex: Indexs
            }
          ]
        })
      } else {
        that.columns = [
          {
            values: that.citys,
            className: 'column1',
            defaultIndex: that.Index
          },
          {
            values: newArr,
            className: 'column2',
            defaultIndex: Indexs
          }
        ]
      }
    },
    //  地区改变
    parentChange (pick, val) {
      //  如果点击的值和原来的值不一样
      if (pick.getColumnIndex(0) !== this.Index) {
        this.Index = pick.getColumnIndex(0);
        //  再如果点击的是0
        if (pick.getColumnIndex(0) === 0) {
          pick.setColumnValues(1, []);
        } else {
          //  再如果点击的是1
          api.parent({ parentId: val[0].id }).then(res2 => {
            res2.data.unshift({ id: 888888, name: '全县' })
            pick.setColumnValues(1, res2.data);
          })
        }
        //  如果点击的值和原来的一样,且都为0
      }
    },
    //  地区选择后回调
    onConfirm (val) {
      if (val[0].id === 0) {
        this.addres = val[0].name
        this.form.township = val[0].id
      } else {
        this.addres = val[0].name + '-' + val[1].name
        this.form.township = val[1].id
      }
      this.cityShow = !this.cityShow
    },
    //  状态选择
    statusChange (val) {
      this.status = val.text
      this.form.cunrentStatus = val.value
    },
    //  回显状态
    echoStatus () {
      let that = this
      let data = that.form
      let statusVal = that.statusList
      statusVal.forEach((item, index) => {
        if (data.cunrentStatus === item.value) {
          that.status = item.text
          that.statusIndex = index
        }
      })
    },
    //  提交表单
    onSubmit (e) {
      e.preventDefault()
      let that = this
      let data = that.form
      data.tokenId = localStorage.getItem('tokenId')
      if (!data.jobCate) {
        Toast(`请选择职位分类`)
      } else if (!data.salaryStart) {
        Toast(`想选择期望薪资`)
      } else if (!data.cunrentStatus) {
        Toast(`请选择当前状态`)
      } else {
        delete data.district
        delete data.jobName
        delete data.province
        api.editExpect(data).then(res => {
          Toast(res.msg)
          setTimeout(() => {
            that.$router.push({ path: '/job/index' })
          }, 1500)
        }).catch((error) => {
          Toast(error.msg)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.chrray_main {
  background-color: #f2f2f2;
  .page-title {
    padding: 20px 15px;
    background-color: #F2F2F2;
    color: #333;
    font-size: 15px;
    line-height: 1;
  }
}
</style>
