<template>
  <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
    <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false;$emit('cancel')">{{$t("message.public.cancel")}}</span>
    <span class="mint-datetime-action mint-datetime-confirm" @click="handleIndustry">{{$t("message.public.confirm")}}</span>
    <mt-picker :slots="industrySlots" @change="onIndustryChange" :visible-item-count="5" :show-toolbar="false" class="picker-top" :value-key="transDate">
    </mt-picker>
  </mt-popup>
</template>
<style lang="scss" scoped>
.mint-popup-4 {
  width: 100%;
  cursor: default;
  .picker-slot-wrapper,
  .picker-item {
    cursor: default;
    backface-visibility: hidden;
  }
}
.picker-top {
  margin-top: 50px;
}
</style>
<script type="text/babel">
/**
* 弹窗下拉选择器
* @module @/containers/PersonalCenter/components/TemplatePicker
* @desc  弹窗下拉选择器，滑动选择数据，点击确定
* @author yang.huiru
* @date 2018.5.01
* @param {Array} [dataDict]    - 选择器插槽的对象数组
* @param {Boolean} [isRequested] - 判断插槽的动态内容是否加载完毕
* @param {Number} [defaultIndex] - 默认显示第n个数据
* @param {String} [transDate] - 配置显示数据的默认对象属性
* @example 调用示例
* <template-picker ref="picker2" :dataDict="array" @confirm="confirmIndustry" :isRequested="requestComplete" *:defaultIndex='industryIndex' *:transDate="'value'">
*/
export default {
  props: {
    dataDict: {
      type: Array,
      default () {
        return []
      }
    },
    isRequested: {
      type: Boolean,
      default: false
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    transDate: {
      type: String,
      default: 'value'
    },
    dataIndex: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      industrySlots: [],
      popupVisible: false,
      currentIndustry: null
    }
  },

  components: {
  },

  methods: {
    open () {
      this.popupVisible = true
    },
    onIndustryChange (picker, values) {
      this.currentIndustry = values[0]
    },
    handleIndustry () {
      this.popupVisible = false
      this.$emit('confirm', this.currentIndustry)
    }
  },

  computed: {

  },

  watch: {
    isRequested (val, old) {
      if (val) {
        this.industrySlots = [{
          flex: 1,
          values: this.dataDict,
          className: 'slot1',
          textAlign: 'center',
          defaultIndex: this.defaultIndex
        }]
      }
    },
    dataIndex (val) {
      this.industrySlots = [{
        flex: 1,
        values: this.dataDict,
        className: 'slot1',
        textAlign: 'center',
        defaultIndex: this.defaultIndex
      }]
    },
    defaultIndex (val) {
      this.industrySlots = [{
        flex: 1,
        values: this.dataDict,
        className: 'slot1',
        textAlign: 'center',
        defaultIndex: this.defaultIndex
      }]
    }
  },

  mounted () {
    var obj = {
      flex: 1,
      values: this.dataDict,
      className: 'slot1',
      textAlign: 'center',
      defaultIndex: this.defaultIndex
    }
    console.log('defaultIndex', this.defaultIndex)
    this.industrySlots.push(obj)
    this.currentIndustry = this.value
  }
}
</script>
