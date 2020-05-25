<template>
  <input :type="inputType" class="service-cancel" :value="inputValue" @click.stop="$emit(inputSubmit)">
</template>
<script>
/**
 * @desc 公共组件按钮
 * @author chenzechao
 * @date 2018.5.28
 * @param {String} inputType - 输入框的类型
 * @param {String} inputValue-输入框的默认值
 * @param {String} inputSubmit-触发父级的方法
 * @example 调用实例 <template-button :inputType="'button'" :inputValue="$t('message.public.cancel')" :inputSubmit="'goBack'" @goBack="goBack"></template-button>
 */
export default {
  name: 'templateButton',
  props: {
    inputType: {
      type: String,
      default: ''
    },
    inputValue: {
      type: String,
      default: ''
    },
    inputSubmit: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () { },
  // 数据更新是调用
  beforeUpdate: function () { },
  // 重新渲染时调用
  updated: function () { },
  // 实例销毁前调用
  beforeDestroy: function () { },
  // 实例销毁后调用
  destroyed: function () { }

}
</script>
<style lang="scss" scoped>
.service-cancel {
  float: left;
  width: 23.5%;
  height: 26px;
  margin-top: 12px;
  font-size: 10px;
  line-height: 26px;
  text-align: center;
  color: #ffffff;
  background: url('../../../../assets/img/list_playBtn.png') no-repeat;
  background-size: 100% 100%;
}
</style>
