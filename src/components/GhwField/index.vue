<template>
  <div class="bind-list clearfix" >
    <label>{{inputTitle}}<i class="must-star" v-if="isMustField">*</i></label>
    <input @change="$emit('change', currentValue)" ref="input" :type="typeInput" :disabled="!isEditInput" :value="currentValue" @input="handleInput" :class="isEditInput? '': 'write-unable'" class="bind-write" @click="$emit('openPicker',$event)" :readonly="readonly" :placeholder="isEditInput&&placeholder" @keyup="$emit('searchGame')" @focus="hiddenGameLists($event)" @blur="hiddenLists($event)" :maxlength="maxlength" >
  </div>
</template>
<script type="text/babel">
/**
* input输入框
* @desc  自定义input输入框
* @author yang.huiru
* @date 2018.5.01
* @param {String} [typeInput]    - 输入框类型，可配置text,email,number等
* @param {Boolean} [isEditInput] - 输入框是否可编辑
* @param {String} [inputTitle] -输入框的名字
* @param {String} placeholder 默认的提示文字
* @param {Boolean} readonly 是否可编辑
* @param {Boolean} isMustField 是否必须字段
* @param {Number} maxlength 长度
* @example 调用示例
*  <ghw-field :typeInput="'text'" v-model="serverAddArr.problemCategory" ref="search_problem" readonly :inputTitle="$t('message.me.addTicket.problemCategory')" :placeholder="$t('message.me.addTicket.problemCategory')" @openPicker="open('picker2',$event)">
   </ghw-field>
*/
export default {
  name: 'GhwField',
  extends: {},
  props: {
    typeInput: {
      type: String,
      default: 'text'
    },
    isEditInput: {
      type: Boolean,
      default: true
    },
    inputTitle: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    isMustField: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 100
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {}
  },
  data () {
    return {
      currentValue: this.value
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
    },
    hiddenGameLists (e) {
      e.target.parentElement.style.borderBottom = '1px solid #1787DD'
      e.target.classList.remove('warn-contet')
      this.$emit('hiddenGameList')
    },
    hiddenLists (e) {
      e.target.parentElement.style.borderBottom = '1px solid #eee'
      this.$emit('hiddenList')
    }
  },
  beforeMount () { },
  mounted () {
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.bind-write {
  float: left;
  width: 70%;
  height: 50px;
  padding-right: 12px;
  text-align: right;
  background: #ffffff;
  font-family: "Microsoft Yahei";
  color: #333333;
  border-bottom: 0.5px solid #eeeeee;
  font-size: 13px;
  -webkit-tap-highlight-color: transparent;
}
input:disabled {
  opacity: 1;
  -webkit-opacity: 1;
  color: rgba(51, 51, 51, 1);
  -webkit-text-fill-color: rgba(51, 51, 51, 1);
}

.bind-list {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  border-bottom: 0.5px solid #eeeeee;
}
.bind-list label {
  float: left;
  width: 30%;
  height: 50px;
  font-family: "Microsoft Yahei";
  color: #666666;
  font-size: 13px;
  padding-left: 12px;
  background: #fff;
  border-bottom: 0.5px solid #eeeeee;
}
.must-star{
  font-style: normal;
  margin-left: 4px;
  color: #FF4542;
}
input::-ms-clear{display:none;}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #cccccc;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cccccc;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cccccc;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #cccccc;
}
.warn-contet::-webkit-input-placeholder{
  color: #FF4542;
}
.warn-contet:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #FF4542;
}
.warn-contet::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #FF4542;
}
.warn-contet:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #FF4542;
}
</style>
