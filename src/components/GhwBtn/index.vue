<template>
  <div class="wrap-box-btn clearfix">
    <input :type="inputType" :class="['button-' + type, 'button-' + size,ownStyle]" :accept='accept' @change="$emit('changeImage',$event)" @click.stop="$emit('triggerEvent')" :value="isHasSpinner&&isShowSpinner?'':inputValue" :disabled="isShowSpinner">
    <div class="btn-loadding" v-if="isHasSpinner&&isShowSpinner">
    <mt-spinner type="fading-circle" color="#fff" :size="20"></mt-spinner>
  </div>
  </div>
</template>
<script>
/**
* @desc 使用自定义按钮
* @author chenzechao
 * @date 2018.5.29
* @param {String} inputValue-按钮的文本
* @param {String} type -按钮的样式类型
* @param {String} size-按钮的背景样式
* @param {String} inputType -输入框的类型
* @param {String} [accept] -选择文件的类型
* @param {Boolean} isHasSpinner-是否有加载图
* @example 调用实例 <ghw-btn :inputType="'button'" :inputValue="$t('message.public.edit')" :size="'largeRectangular'" :type="'public'"  @triggerEvent='isEdit=true' />
*
 */
export default {
  name: 'GhwBtn',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    inputValue: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    },
    // 从父组件传过来的自定义样式
    ownStyle: {
      type: String,
      default: ''
    },
    isHasSpinner: {
      type: Boolean,
      default: false
    },
    isShowSpinner: {
      type: Boolean,
      default: false
    }
  },
  // 挂载之前调用
  beforeMount: function () { },
  // 挂载到实例上调用
  mounted: function () {
  },
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
.button-return {
  width: 33px;
  height: 33px;
  background: url('../../assets/img/per-return.png') no-repeat;
  background-size: 100% 100%;
  -webkit-tap-highlight-color: transparent;
}
.button-rectangular {
  width: 100px;
  height: 30px;
  font-size: 11px;
  border-radius: 30px;
  line-height: 26px;
  overflow: hidden;
}
// 椭圆按钮
.button-ellipse {
  display: inline-block;
  width: 67px;
  height: 24px;
  font-size: 10px;
  line-height: 23.5px;
  border-radius: 30px;
}

.button-public:active {
  background: linear-gradient(#1072d7, #34dff8) center; /* 标准的语法 */
  box-shadow: 0px 0px 0px rgba(23, 135, 221, 0.3);
  color: #a1defd;
}
.button-largeRectangular {
  display: inline-block;
  width: 63.5px;
  height: 23.5px;
  font-size: 9px;
  line-height: 23.5px;
  border-radius: 30px;
}
.button-public {
  text-align: center;
  font-family: 'Microsoft YaHei';
  color: #fcfcfc;
  background: linear-gradient(to top, rgb(16, 114, 215) 0%, rgb(52, 223, 248) 100%) center;
  box-shadow: 0px 4px 9px 1px rgba(23, 135, 221, 0.3);
  -webkit-tap-highlight-color: transparent;
}
.button-big-ellipse {
  width: 180px;
  height: 34px;
  line-height: 34px;
  border-radius: 17px;
}
//弹窗确认按钮
.button-popup {
  float: left;
  width: 100px;
  height: 30px;
  border-radius: 15px;
  font-size: 13px;
  line-height: 30px;
}
//弹窗取消按钮
.button-cancle {
  float: left;
  background-image: none;
  width: 100px;
  height: 30px;
  font-size: 10px;
  border-radius: 15px;
  font-size: 13px;
  line-height: 30px;
  color: rgba(23, 135, 221, 1);
  margin-right: 20px;
  background-color: #fff !important;
  -webkit-appearance: none;
  border: 1px solid rgba(23, 135, 221, 0.3);
  box-shadow: none;
   &:active {
    color: rgba(23, 135, 221, 0.5);
  }
}
.wrap-box-btn {
  position: relative;
  .btn-loadding{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index:10;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.button-cancel {
  font-size: 13px;
  font-family: 'Microsoft YaHei';
  background: transparent;
  border: 1px solid RGBA(23, 135, 221, 0.3);
  color: #1787dd;
  background-image: none;
  -webkit-appearance: none;
  &:active {
    color: rgba(23, 135, 221, 0.5);
  }
}
.button-underMaint {
 background:linear-gradient(to top, RGB(128, 128, 128) 0%, RGB(218, 216, 216) 100%) center;
  box-shadow: 2px 5px 5px rgba(128, 128, 128, 0.3);
  -webkit-tap-highlight-color: transparent;
  cursor: not-allowed;
  color: #efeff4;
}
.wrap-box-btn input[type='file'] {
  position: absolute;
  height: 35px;
  right: 0px;
  z-index: 100;
  width: 40px;
  bottom: -15px;
  opacity: 0;
}
</style>
