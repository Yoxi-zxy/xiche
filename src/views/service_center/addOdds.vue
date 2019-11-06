<template>
  <div class="chrray_main">
    <form @submit="lookData">
      <van-cell-group>
        <van-field
          label="办事项目"
          placeholder="请选择办事项目"
          readonly
          is-link
          input-align="right"
          v-model="pageData.twoLevelName">
        </van-field>
        <van-field
          label="办事网点"
          placeholder="请选择办事网点"
          v-model="salary"
          readonly
          is-link
          input-align="right"
          @click="salaryShow = !salaryShow">
        </van-field>
        <van-field
          label="预约时间"
          placeholder="请选择预约时间"
          v-model="finiteTimeEnd"
          readonly
          is-link
          input-align="right"
          @click="timeShow = !timeShow">
        </van-field>
        <van-field
          v-model="form.explain"
          type="textarea"
          rows="5"
          placeholder="请输入办事需求说明">
        </van-field>
      </van-cell-group>
      <div class="dataTitle">所需资料-请勾选已备齐的资料</div>
      <van-cell-group>
        <van-checkbox-group v-model="checkbox" class="cy-radio-group">
          <van-cell
            class="cy-cell"
            v-for="(item, index) in pageData.meansList"
            @click="changeCheckbox(item, index)"
            :key="index">
            <div class="text-box">
              <p class="title">{{ item.meanName }}</p>
              <span class="des" v-if="item.meanType">类型: 原件</span>
              <span class="des" v-if="!item.meanType">类型: 复印件</span>
            </div>
            <van-checkbox
              slot="right-icon"
              ref="checkboxes"
              :name="item.meanId"
              class="leftIcon">
            </van-checkbox>
          </van-cell>
        </van-checkbox-group>
      </van-cell-group>
      <van-button class="sumbtn" square >立即预约</van-button>
    </form>
    <!-- 弹窗部分 -->
    <van-popup v-model="salaryShow" position="bottom" class="cy-popup">
      <div class="cy-popup-box">
        <div class="cy-popup-title">
          <p class="text">选择网点</p>
          <p class="btn" @click="confirm">确定</p>
        </div>
        <van-radio-group v-model="form.dotId" class="cy-radio-group">
          <van-cell-group>
            <van-cell
              class="firm-info__wrapper"
              v-for="(item, index) in serveList"
              @click="changeRadio(item)"
              :key="index">
              <h1 class="firm-name">{{ item.townshipName }}-{{ item.jotName }}</h1>
              <div class="firm-des">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-9" class="icon"></van-icon>
                <p class="text">{{ item.dotDetailedAddress }}</p>
              </div>
              <div class="firm-des last">
                <van-icon class-prefix="chrray-icon" name="tubiaosvg-11" class="icon"></van-icon>
                <p class="text">{{ item.dotTelephone }}</p>
              </div>
              <van-radio slot="right-icon" :name="item.dotId" class="leftIcon"></van-radio>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
    <!-- 时间选择 -->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        class="timeStyle"
        :min-minute="minNumber"
        :max-minute="maxNumber"
        @cancel="timeShow = !timeShow"
        @confirm="timeConfirm"
        :formatter="formatter"
        type="datetime">
      </van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
import api from '@/api/data'
import { Field, CellGroup, Popup, RadioGroup, Radio, Cell, Icon, DatetimePicker, Toast, Checkbox, CheckboxGroup, Button } from 'vant'
import { timestampToTime } from '@/lib/util'
export default {
  data () {
    return {
      minNumber: 0,
      maxNumber: 1,
      form: {
        detId: '',
        dotId: '',
        explain: '',
        meanIds: '',
        bookTime: '',
        tokenId: ''
      },
      //  办事项目
      sort: '',
      sortList: [
        { value: 1, text: '失业保险申领' },
        { value: 2, text: '选择二是吧是' },
        { value: 3, text: '应该是选择三' },
        { value: 4, text: '确定是选择四' },
        { value: 5, text: '保证是选择五' }
      ],
      //  办事网点
      salaryShow: false,
      salary: '',
      serveList: [
        {
          townshipName: '某某镇',
          jotName: '某某网点',
          dotId: 9999999999999999999999,
          dotDetailedAddress: '某某某某某某某某某',
          dotTelephone: '12345678910'
        }
      ],
      popupList: {},
      //  时间选择
      finiteTimeEnd: '',
      timeShow: false,
      currentDate: new Date(),
      //  办事需求
      textData: '',
      //  所需材料
      //  页面数据
      pageData: {},
      checkbox: []
      // cellList: [
      //   { title: '1、身份证正反面', des: '类型: 复印件', id: 0 },
      //   { title: '2、3张一寸彩照', des: '类型：原件', id: 1 },
      //   { title: '3、非本人意愿终止合同的证明', des: '类型：原件', id: 2 },
      //   { title: '4、就业失业证明', des: '类型：原件', id: 3 }
      // ]
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [DatetimePicker.name]: DatetimePicker,
    [Toast.name]: Toast,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Button.name]: Button
  },
  mounted () {
    let id = this.$route.query.id
    this.form.detId = id
    this.getPageData(id)
    this.getServiceDot(id)
  },
  methods: {
    //  获取页面信息
    getPageData (id) {
      let that = this
      let params = {
        detId: id
      }
      api.bookingData(params).then(res => {
        that.pageData = res.data
      }).catch((error) => {
        Toast(error.msg)
      })
    },
    //  查询办事网点
    getServiceDot (id) {
      let that = this
      api.serviceDot({ detId: id }).then(res => {
        that.serveList = res.data
      })
    },
    //  职位分类选择
    // sortChange (val) {
    //   this.form.jobCate = val.value
    //   //  清空所需资料
    //   this.cellList = []
    //   //  清空已选择的所需资料
    //   this.checkbox = []
    //   if (val.value === 2) {
    //     this.cellList = [
    //       { title: '4、就业失业证明', des: '类型：原件', id: 3 },
    //       { title: '2、3张一寸彩照', des: '类型：原件', id: 1 },
    //       { title: '1、身份证正反面', des: '类型: 复印件', id: 0 },
    //       { title: '3、非本人意愿终止合同的证明', des: '类型：原件', id: 2 }
    //     ]
    //   }
    // },
    //  办事网点选择
    changeRadio (item) {
      this.popupList = item
      this.form.dotId = item.dotId
    },
    //  办事网点选择
    confirm () {
      if (JSON.stringify(this.popupList) === '{}') {
        Toast(`请选择一个办事网点`)
        return false
      } else {
        this.salary = this.popupList.townshipName + '-' + this.popupList.jotName
        this.salaryShow = !this.salaryShow
      }
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
    //  时间确认
    timeConfirm (val) {
      let times = timestampToTime(Math.round(val.getTime() / 1000))
      let time = Math.round(val)
      // let times = val.toLocaleString().split('/').join().replace(/,/g, '-').split(':')[0] + '点'
      // let time = val.toLocaleDateString().split('/').join().replace(/,/g, '-')
      if (val < new Date()) {
        Toast(`请选择大于现在的时间`)
      } else {
        this.finiteTimeEnd = times + '点'
        this.form.bookTime = time
        this.timeShow = !this.timeShow
      }
    },
    //  复选框
    changeCheckbox (item, index) {
      this.$refs.checkboxes[index].toggle()
    },
    //  查看数据
    lookData (e) {
      e.preventDefault()
      let that = this
      let data = that.form
      data.meanIds = this.checkbox.join()
      data.tokenId = localStorage.getItem('tokenId')
      if (!data.dotId) {
        Toast(`请选择服务网点`)
        return false
      } else if (!data.bookTime) {
        Toast(`请选择预约时间`)
        return false
      } else if (!data.explain) {
        Toast(`请填写办事需求说明`)
        return false
      } else if (!data.meanIds) {
        Toast(`请勾选已备齐的资料`)
        return false
      } else {
        api.addBooking(data).then(res => {
          Toast(res.msg)
          setTimeout(() => {
            that.$router.push({
              path: 'subscribe',
              query: { tbmId: res.data }
            })
          }, 1000)
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
  .dataTitle {
    padding: 15px;
    font-size: 15px;
    color: #333;
  }
  .cy-cell {
    .text-box {
      display: flex;
      flex-direction: column;
      .title {
        color: #333;
        font-size: 15px;
      }
      .des {
        font-size: 13px;
        color: #999;
      }
    }
    .process-btn {
      border-radius: 2000px;
      border-color: #006CD1;
      color: #006CD1;
      font-size: 14px;
      height: auto;
      line-height: normal;
      padding: 7px 15px;
    }
    .btn-box {
      overflow: hidden;
      position: relative;
      border-radius: 2000px;
      display: flex;
      align-items: center;
      border: 1px solid #006CD1;
      padding: 7px 15px 7px 15px;
      font-size: 14px;
      .btn1 {
        display: inline-block;
        color: #006CD1;
      }
      .btn2 {
        color: #fff;
        position: relative;
        padding-left: 30px;
        z-index: 100;
        &:after {
          content: '';
          position: absolute;
          width: 85px;
          height: 42px;
          top: -8px;
          right: -40px;
          background-color: #006CD1;
          transform:skewX(-25deg);
          z-index: -1;
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
  .sumbtn {
    width: 100%;
    margin-top: 25px;
    background-color: #006CD1;
    border: 0;
    color: #fff;
  }
}
</style>
