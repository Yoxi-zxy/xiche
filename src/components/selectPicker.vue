<template>
  <div>
    <van-field
      v-model="results"
      v-bind="$attrs"
      readonly
      is-link
      @click="show = !show">
    </van-field>
    <van-popup v-model="show" position="bottom">
      <van-picker
        :columns="columns"
        show-toolbar
        :default-index="$attrs.index"
        :title="$attrs.label"
        :value-key="$attrs.valueKey"
        @cancel="show = !show"
        @confirm="onConfirm">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import { Field, Picker, Popup } from 'vant'
export default {
  // model: {
  //   prop: 'selectValue'
  // },
  props: {
    columns: {
      type: [Array, Number]
    },
    results: {
      type: [String]
    }
    // selectValue: {
    //   type: [String, Object, Array]
    // }
  },
  data () {
    return {
      show: false
      // result: this.selectValue
    };
  },
  components: {
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },
  methods: {
    onConfirm (value) {
      this.$emit('input', value);
      this.show = !this.show;
    }
  }
  // watch: {
  //   selectValue: function (newVal) {
  //     let texts = this.$attrs.valueKey
  //     console.log(this.results)
  //     if (newVal.length === undefined) {
  //       this.result = newVal[texts]
  //     }
  //     if (newVal.length === 2) {
  //       this.result = newVal[0][texts] + '-' + newVal[1][texts]
  //     }
  //   }
  // }
}
</script>

<style scoped>

</style>
