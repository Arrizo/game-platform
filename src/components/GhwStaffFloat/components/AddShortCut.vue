<template>
  <div>
    <ghw-pop-up :isShowPopUp="isAddShortCut" @closePopUp="$emit('closeAddShortCut')" @closeMask="$emit('closeAddShortCut')" v-if="isAddShortCut">
      <div slot="title" class="add-game-title">
        <img :src="addGameImg" alt="">
        <ghw-game-icon :appIconUrl="appIconUrl" :appIconSize="'large'"></ghw-game-icon>
      </div>
      <div slot="content" class="add-game-content">
        {{$t('message.buoy.addShortcutData.addShortcutHome',{string:appName})}}
      </div>
      <div slot="btn" class="add-game-btn">
        <ghw-btn :type="'cancle'" :inputValue="$t('message.public.cancel')" :inputType="'button'" @triggerEvent="$emit('closeAddShortCut')"></ghw-btn>
        <ghw-btn :type="'popup'" :inputValue="$t('message.buoy.addShortcutData.add')" :size="'public'" :inputType="'button'" @triggerEvent="addGameToDeskTop"></ghw-btn>
      </div>
    </ghw-pop-up>
    <!-- safari添加收藏引导页 -->
    <safari-add-page :isShowDownloadPage="isShowDownloadPage" @closeLeadPage="isShowDownloadPage=false"></safari-add-page>
  </div>
</template>
<script>
/**
* 公共标题栏
* @module @/components/GhwStaffFloat/components/ExitGame.vue
* @desc 隐私政策
* @author yang huiru
* @date 2018.7.16
* @example 调用示例
* <exit-game></exit-game>
*/
import GhwPopUp from '@/components/GhwPopUp'
import GhwBtn from '@/components/GhwBtn'
import GhwGameIcon from '@/components/GhwGameIcon'
import { mapState } from 'vuex'
import { getShortcut } from '@/services'
import isMobile from '@/utils/isMobile'
import SafariAddPage from '@/components/GhwStaffFloat/components/SafariAddPage.vue'
import addGameImg from '@/assets/img/add-game.svg'
import * as BrowserUtils from '@/utils/BrowserUtils.js'
export default {
  name: 'PrivacyPolicy',
  extends: {},
  props: {
    isAddShortCut: {
      type: Boolean,
      default: false
    },
    appName: {
      type: String,
      default: ''
    },
    appIconUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShowDownloadPage: false,
      addGameImg
    }
  },
  computed: {
    ...mapState({
      appId: state => state.user.appId,
      isLogin: state => state.user.isLogin
    })
  },
  components: {
    GhwPopUp,
    GhwBtn,
    GhwGameIcon,
    SafariAddPage
  },
  watch: {
    isShowDownloadPage (val) {
      this.$emit('isShowDownloadPage')
    }
  },
  methods: {
    // 收藏游戏到桌面
    addGameToDeskTop () {
      if (isMobile()) {
        if (BrowserUtils.isiOS()) {
          this.isShowDownloadPage = true
        }
        this.$emit('closeAddShortCut')
      } else {
        const obj = {
          appId: this.appId
        }
        getShortcut(obj).then(res => {
          this.$emit('closeAddShortCut')
          window.location.href = res.data.scLink
        })
      }
    }
  },
  beforeMount () { },
  mounted () {
    BrowserUtils.changeAddGameIcon(this.appIconUrl, this.appName)
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.add-game-title {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  img {
    position: absolute;
    width: 18px;
    right: -7.5px;
    top: -8px;
  }
}
.add-game-content {
  margin: 0 15px;
  color: rgba(76, 76, 76, 1);
  font-size: 13px;
}
.add-game-btn {
  margin-bottom: 20px;
  .wrap-box-btn{
    display: inline-block !important;
  }
}
</style>
