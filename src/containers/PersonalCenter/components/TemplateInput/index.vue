<template>
   <div class="bind-list clearfix">
    <label>{{inputTitle}}</label>
    <input @change="$emit('change', currentValue)" ref="input" :type="typeInput" :disabled="!isEditInput" :value="currentValue" @input="handleInput" :class="isEditInput? '': 'write-unable'" class="bind-write" @click="$emit('openPicker',$event)" :readonly="readonly" :placeholder="placeholder" @keyup="$emit('searchGame')" @focus="$emit('hiddenGameList')" @blur="$emit('hiddenList')">
  </div>
</template>
<script type="text/babel">
/**
* input输入框
* @module @/containers/PersonalCenter/components/TemplateInput
* @desc  自定义input输入框
* @author yang.huiru
* @date 2018.5.01
* @param {String} [typeInput]    - 输入框类型，可配置text,email,number等
* @param {Boolean} [isEdit] - 输入框是否可编辑
* @param {String} [inputTitle] -输入框的名字
* @example 调用示例
* <template-input :typeInput="'text'" :isEditInput="isEdit" v-model="account.birthdate" :inputTitle="$t('message.me.profile.birthdate')" @openPicker="open('picker1')">
*/
export default {
  name: 'TemplateInput',
  extends: {},
  props: {
    typeInput: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      default: ''
    },
    isEditInput: {
      type: Boolean,
      default: true
    },
    defaultText: {
      type: String,
      default: ''
    },
    inputTitle: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {}
  },
  data () {
    return {
      currentValue: this.value,
      inputValue: 'yes'
    }
  },
  computed: {

  },
  components: {
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleInput (evt) {
      this.currentValue = evt.target.value
    }
  },
  beforeMount () { },
  mounted () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
// .bind-write {
//   float: left;
//   width: 53%;
//   height: 22px;
//   text-indent: 8px;
//   background: url("../../../../assets/img/bind_write.png") no-repeat;
//   background-size: 100% 100%;
//   // padding-top: 4px;
// }
// .write-unable {
//   background-size: 0 !important;
//   border: none;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   width: 53%;
//   text-indent: 0;
//   height: 25px;
//   border-bottom: 1px solid #e0e0e0;
//   padding-top: 4px;
// }
// input:disabled {
//   opacity: 1;
//   -webkit-opacity: 1;
//   // -webkit-text-fill-color: #000;
// }
// .service-input {
//   text-indent: 10px;
//   width: 78%;
//   background-color: #efeff4;
//   height: 21px;
//   color: #565656;
//   border-radius: 3px;
// }

.bind-write {
  float: left;
  width: 58%;
  height: 50px;
  text-indent: 8px;
  direction: rtl;
  background: #ffffff;
  font-family: 'MicrosoftYaHei';
  color: #333333;
  vertical-align: inherit;
}
input:disabled {
  opacity: 1;
  -webkit-opacity: 1;
  color:rgba(51,51,51,1);
}
.bind-list {
  width: 100%;
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eeeeee;
}
.bind-list label {
  float: left;
  width: 40%;
  font-family: 'MicrosoftYaHei';
  color: #666666;
  font-size: 13px;
  padding-left: 12px;
}
</style>
