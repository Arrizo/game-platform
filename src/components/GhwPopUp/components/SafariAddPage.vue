<template>
  <div v-if="isShowDownloadPage">
    <div class="mask" @click.stop="$emit('closeLeadPage')">
    </div>
    <div class="lead-load">
      <img :src="downloadBckImg" alt="" class="bck-img">
      <img :src="popUpCloseImg" alt="" @click.stop="$emit('closeLeadPage')" class="close-icon">
      <img :src="downloadMobileImg" alt="" class="mobile-img">
      <!-- <span class="lead-text">Click on “<img :src="downloadChooseImg" alt="" class="choose-img">”and then click on “<img :src="downloadAddImg" alt="" class="add-img">” to add the shorcut to Home Screen</span> -->
      <span class="lead-text">{{translateArr[0]}}<img :src="downloadChooseImg" alt="" class="choose-img">{{translateArr[1]}}<img :src="downloadAddImg" alt="" class="add-img">{{translateArr[2]}}</span>
      <!-- <span class="lead-text"> {{$t('message.me.buoy.addShortcutData.addShortcutHome',{shortcut:appName})}}</span> -->
    </div>
  </div>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwPopUp/components/safariAddPage.vue
* @desc safari添加收藏引导页
* @author yang huiru
* @date 2018.6.27
* @example 调用示例
* <safari-add-page></safari-add-page>
*/
import downloadBckImg from '@/assets/img/download-bck.png'
import downloadMobileImg from '@/assets/img/download-mobile.svg'
import downloadChooseImg from '@/assets/img/download-choose.svg'
import downloadAddImg from '@/assets/img/download-add.svg'
import popUpCloseImg from '@/assets/img/cross-close.svg'
export default {
  name: 'safariAddPage',
  extends: {},
  props: {
    isShowDownloadPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      downloadBckImg,
      downloadMobileImg,
      downloadChooseImg,
      downloadAddImg,
      popUpCloseImg,
      translateArr: []
    }
  },
  computed: {
  },
  components: {
  },
  watch: {},
  methods: {

  },
  beforeMount () { },
  mounted () {
    var str = this.$t('message.buoy.addShortcutData.addShortcutProcess', { string: '-' })
    this.translateArr = str.split('-')
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.mask {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
  height: 100%;
  width: 100%;
}
.lead-load {
  position: absolute;
  width: 213px;
  height: 165px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 15px;
  .bck-img {
    position: absolute;
    width: 213px;
  }
  .close-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 15px;
  }
  .mobile-img {
    position: absolute;
    left: 12px;
    top: 35px;
    width: 53px;
  }
  .lead-text {
    position: absolute;
    right: 18px;
    top: 36.5px;
    width: 121px;
    color: rgba(76, 76, 76, 1);
    font-size: 13px;
    .choose-img {
      width: 11px;
      margin-top: 3px;
    }
    .add-img {
      width: 14px;
      margin-top: 2px;
    }
  }
}
</style>
