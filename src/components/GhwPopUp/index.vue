<template>
  <div v-if="isShowPopUp">
    <div class="mask" v-if="isShowMask" @click.stop="$emit('closeMask')">
    </div>
    <!-- <div class="pop-up-outer"> -->
    <div class="pop-up-inner" :class="[popupClass]">
      <div class="pop-up-head">
        <!-- 弹出框关闭 -->
        <div class="pop-up-close" @click.stop="$emit('closePopUp')"><img :src="popUpCloseImg" alt="" v-if="isShowClose"></div>
        <!-- 弹出框标题 -->
        <div class="pop-up-title" :class="[titleClass]" v-if="isShowTitle">
          <slot name="title"></slot>
        </div>
        <!-- 弹出框正文 -->
        <div class="pop-up-content">
          <slot name="content"></slot>
        </div>
        <!-- 弹出框按钮 -->
        <div class="pop-up-btn">
          <slot name="btn"></slot>
        </div>
        <!-- 弹出框提示信息 -->
        <div class="pop-up-tip">
          <slot name="tipMessage"></slot>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwPopUp
* @desc 弹出框
* @author yang huiru
* @date 2018.6.22
* @param {String} [titleName]    - 标题名字,必传
* @param {Object} [routerName] - 更多跳转路由名,可选
* @param {Boolean} [isShowMore] - 是否显示更多操作,可选
* @example 调用示例
* <ghw-block-title :titleName="$t('message.homepage.playedApps')" :routerName="{name:'PersonalCenter'}"></ghw-block-title>
*/
import popUpCloseImg from '@/assets/img/cross-close.svg'
export default {
  name: 'GhwPopUp',
  extends: {},
  props: {
    isShowClose: {
      type: Boolean,
      default: true
    },
    isShowTitle: {
      type: Boolean,
      default: true
    },
    titleName: {
      type: String,
      default: ''
    },
    titleClass: {
      type: String,
      default: ''
    },
    isShowPopUp: {
      type: Boolean,
      default: false
    },
    isShowMask: {
      type: Boolean,
      default: true
    },
    popupClass: {
      type: String,
      default: ''
    },
    setIsShowPopup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      popUpCloseImg
    }
  },
  computed: {
  },
  components: {
  },
  watch: {
    isShowPopUp (val) {
      if (!this.setIsShowPopup) {
        this.$store.dispatch('isShowPopup', { isShowPopup: val })
      }
    }
  },
  methods: {

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
.mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
  height: 100%;
  width: 100%;
  z-index: 1000;
}
.pop-up-inner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  z-index: 1000;
}
.pop-up-close {
  text-align: right;
  height: 10px;
  margin: 10px 10px 0 0;
  img {
    width: 15px;
  }
}
.pop-up-title {
  width: 100%;
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
}
.pop-up-content {
  width: 100%;
  margin-top: 15px;
  text-align: center;
}
.pop-up-btn {
  text-align: center;
  margin-top: 25px;
}
.white-btn {
  background-image: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(23, 135, 221, 0.3);
  box-shadow: 4px 10px 10px rgba(23, 135, 221, 0.3);
  color: rgba(23, 135, 221, 1) !important;
  margin-right: 20px;
  background-color: #fff;
}
.pop-up-bottom {
  padding-bottom: 20px;
}
</style>
