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
        @change="onChange"
        @cancel="show = !show"
        @confirm="onConfirm">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import { Field, Picker, Popup } from 'vant'
export default {
  props: {
    columns: {
      type: [Array, Number]
    },
    results: {
      type: [String]
    },
    isShow: {
      type: [Boolean]
    }
  },
  data () {
    return {
      show: this.isShow
    };
  },
  components: {
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },
  methods: {
    onConfirm (value) {
      this.$emit('input', value)
      this.show = this.isShow
    },
    onChange (value, values) {
      this.$emit('chrrayChange', value, values)
    }
  }
}
</script>

<style scoped>

</style>
