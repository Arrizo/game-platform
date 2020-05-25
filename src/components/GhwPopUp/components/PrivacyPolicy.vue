<template>
  <ghw-pop-up :isShowPopUp="isShowPolicy" @closePopUp="$emit('closePolicy')" @closeMask="$emit('closePolicy')" :setIsShowPopup="setIsShowPopup">
    <!-- 为了兼容隐私协议的html，暂时把标题注释 -->
    <!-- <div slot="title">
      {{$t('message.buoy.privacy.privacy')}}
    </div> -->
    <div slot="content" class="policy-content">
      <iframe :src="privacyUrl" frameborder="0">
      </iframe>
    </div>
  </ghw-pop-up>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwPopUp/components/PrivacyPolicy.vue
* @desc 隐私政策
* @author yang huiru
* @date 2018.7.09
* @example 调用示例
* <privacy-policy></privacy-policy>
*/
import GhwPopUp from '@/components/GhwPopUp'
import GhwBtn from '@/components/GhwBtn'
export default {
  name: 'PrivacyPolicy',
  extends: {},
  props: {
    isShowPolicy: {
      type: Boolean,
      default: false
    },
    privacyUrl: {
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
    }
  },
  computed: {
  },
  components: {
    GhwPopUp,
    GhwBtn
  },
  watch: {},
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
.policy-content {
  width: 255px;
  height: 326px;
  margin: auto;
  overflow: auto;
  iframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.pop-up-inner {
  z-index: 1001!important;
}
</style>
