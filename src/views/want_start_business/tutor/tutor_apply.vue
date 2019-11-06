<template>
  <div class="chrray-main">
    <van-cell-group>
      <van-field label="申请人姓名" input-align="right" v-model="form.applyPersonName" placeholder="请输入申请人姓名" />
      <van-field label="联系电话" input-align="right" v-model="form.telephone" placeholder="请输入申请人联系电话" />
      <van-field label="指导类型" input-align="right" v-model="form.guidanceType" placeholder="请输入需要专家指导的类型" />
      <van-field type="textarea" rows="5" v-model="form.remarks" placeholder="请输入备注信息" />
    </van-cell-group>
    <div class="post-btn">
      <van-button type="button" class="btn" @click="submitData">立即申请</van-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { CellGroup, Field, Button, Toast } from 'vant'
export default {
  data () {
    return {
      form: {
        tokenId: localStorage.getItem('tokenId'),
        tegId: this.$route.query.id,
        applyPersonName: '',
        telephone: '',
        guidanceType: '',
        remarks: ''
      }
    }
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  methods: {
    submitData () {
      let that = this
      let data = that.form
      let Regular = /^1[3456789]\d{9}$/
      if (!data.applyPersonName) {
        Toast(`请输入申请人姓名`)
      } else if (!data.telephone) {
        Toast(`请输入申请人联系电话`)
      } else if (!Regular.test(data.telephone)) {
        Toast(`请输入正确的申请人联系电话`)
      } else if (!data.guidanceType) {
        Toast(`请输入需要专家指导的类型`)
      } else if (!data.remarks) {
        Toast(`请输入备注信息`)
      } else {
        api.businessApply(data).then(res => {
          Toast(res.msg)
          setTimeout(() => {
            history.back()
          }, 500)
        }).catch(err => {
          Toast(err.msg)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
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
