<template>
  <div class="field-warning" :class="getWarnStyle()" v-if="isShowWarn">
    {{warnContent}}
  </div>
</template>

<script>
/**
* 公共标题栏
* @module @/components/GhwWarnPop
* @desc 提示框
* @author chenzechao
* @date 2018.7.23
* @param {String} [warnContent]    - 提示名字,必传
* @param {Boolean} isShowWarn - 是否有提示框
* @param {Boolean} [isChangeContent] -是否改变文本
* @param {String} serviceAnimation-动画效果
* @example 调用示例
* <ghw-warn-pop :isShowWarn="isShowWarn" :warnContent="warnContent" :isChangeContent="isChangeContent" class="location"></ghw-warn-pop>
*/
export default {
  name: 'GhwWarnPop',
  props: {
    isShowWarn: {
      type: Boolean,
      default: false
    },
    warnContent: {
      type: String,
      default: ''
    },
    isChangeContent: {
      type: Boolean,
      default: false
    },
    serviceAnimation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShowWranContent: false
    }
  },
  methods: {
    getWarnStyle () {
      return this.serviceAnimation ? { 'service-animation': this.isShowWranContent } : { 'field-animation': this.isShowWranContent }
    }
  },
  watch: {
    isChangeContent () {
      if (!this.isShowWranContent) {
        this.isShowWranContent = true
        setTimeout(() => {
          this.isShowWranContent = false
        }, 2000)
      }
    }
  },
  beforeMount: function () {
  },
  // 挂载到实例上调用
  mounted: function () {
  },
  // 数据更新是调用
  beforeUpdate: function () {
  },
  // 重新渲染时调用
  updated: function () {
  },
  // 实例销毁前调用
  beforeDestroy: function () { },
  // 实例销毁后调用
  destroyed: function () { }
}

</script>
<style lang="scss" scoped>
.field-warning {
  height: 30px;
  background: #ff4542;
  line-height: 30px;
  font-family: 'Microsoft YaHei';
  text-align: center;
  color: #ffffff;
  font-size: 13px;
  position: relative;
  z-index: -1;
}
.field-animation {
  animation: warning 2s ease-out;
}
.service-pop-background .service-animation {
  display: block;
  animation: servicewarning 2s ease-out;
}
@keyframes warning {
  0% {
    top: -30px;
  }
  20% {
    opacity: 1;
    top: 0px;
  }
  60% {
    top: 0px;
    opacity: 1;
  }
  100% {
    top: 0px;
    opacity: 0;
  }
}
@keyframes servicewarning {
  0% {
    opacity: 0;
    top: 25px;
  }
  30% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
