<template>
  <div>
    <div class="buoy-menu" v-if="isShowBuoyMenu">
      <img :src="buoyPopup" alt="" class="menu-background">
      <div class="menu-content clearfix">
        <div class="menu-item" :class="{'newest':isShowRDShortcut}" @click.stop="showShortcut()" v-if="isAddShortCut">
          <img :src="addShortCutImg" alt="">
          <p>{{$t('message.buoy.addShortcut')}}</p>
        </div>
        <div class="menu-item" @click.stop="swichAccount">
          <img :src="switchAccountImg" alt="">
          <p>{{$t('message.buoy.switchAccount')}}</p>
        </div>

        <div class="menu-item" @click.stop="isAddGame=true" v-if="!isAddShortCut" :class="{'hide-add-game': !isAddShortCut}">
          <img :src="addShortCutImg" alt="">
          <p>{{$t('message.buoy.addShortcut')}}</p>
        </div>

        <div class="menu-item" :class="{'newest':isShowRDShare}" @click.stop="showShareGame()">
          <img :src="shareImg" alt="">
          <p>{{$t('message.buoy.share')}}</p>
        </div>
        <div class="menu-item" :class="{'newest':isShowRDPersonalService}" @click.stop="showService()">
          <img :src="customServiceImg" alt="">
          <p>{{$t('message.me.help')}}</p>
        </div>
        <div class="menu-item">
          <p></p>
        </div>
        <div class="menu-item" @click.stop="exitGame">
          <img :src="exitGameImg" alt="">
          <p>{{$t('message.buoy.exitGame')}}</p>
        </div>
      </div>
      <img :src="staffFloatImg" alt="" class="menu-footer" @click.stop="$emit('closeMenu')">
    </div>
    <!-- 退出游戏弹出框 -->
    <!-- <exit-game @closeLeaveGame="closeExitGame" v-if="isExitGame"></exit-game> -->
    <!-- 收藏游戏弹出框 -->
    <add-short-cut :isAddShortCut="isAddGame" @closeAddShortCut="isAddGame=false" :appName="appName" :appIconUrl="appIconUrl"></add-short-cut>
    <!-- 浮标客服弹出框 -->
    <custom-service :isShowService="isShowService" @closeService="closeService" v-if="isShowService" :appName="appName"></custom-service>
    <!-- 分享游戏弹出框 -->
    <share-game @cancleShare="cancleShare" :isShareGame="isShareGame" v-if="isShareGame"></share-game>
  </div>

</template>
<script>
import staffFloatImg from '@/assets/img/staff-float.svg'
import exitGameImg from '@/assets/img/exit-game.svg'
import addShortCutImg from '@/assets/img/add-shortcut.svg'
import switchAccountImg from '@/assets/img/switch-account.svg'
import shareImg from '@/assets/img/share.svg'
import customServiceImg from '@/assets/img/custom-service.svg'
import buoyPopup from '@/assets/img/buoy-popup.png'
import getCookie from '@/utils/getCookie'
import AddShortCut from '@/components/GhwStaffFloat/components/AddShortCut.vue'
import CustomService from '@/components/GhwStaffFloat/components/CustomService'
import ShareGame from '@/components/GhwStaffFloat/components/ShareGame'
import { mapState } from 'vuex'
import * as constVar from '@/config/const'
import gameStart from '@/utils/gameStart'
import * as services from '@/services'

/**
  * 公共标题栏
  * @module @/components/GhwStaffFloat/components/CustomService
  * @desc 浮标的客服
  * @author yang huiru
  * @date 2018.7.23
  * @param {String} [titleName]    - 标题名字,必传
  * @param {Object} [routerName] - 更多跳转路由名,可选
  * @param {Boolean} [isShowMore] - 是否显示更多操作,可选
  * @example 调用示例
  * <buoy-menu></buoy-menu>
  */
export default {
  name: 'BuoyMenu',
  extends: {},
  props: {
    appIconUrl: {
      type: String,
      default: ''
    },
    appName: {
      type: String,
      default: ''
    },
    isShowMenu: {
      type: Boolean,
      default: false
    },
    isAddShortCut: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      staffFloatImg,
      exitGameImg,
      addShortCutImg,
      switchAccountImg,
      buoyPopup,
      isAddGame: false,
      shareImg,
      customServiceImg,
      isCustomService: false,
      isShareGame: false,
      isShowBuoyMenu: true,
      isShowService: false
    }
  },
  computed: {
    ...mapState({
      isExitGame: state => state.user.isExitGame,
      isShowRDPersonalService: state => state.redDotPush.redDotList[constVar.RED_DOT_PERSONAL_SERVICE].hasRead,
      isShowRDShortcut: state => { return !!state.redDotPush.shortcutReddot },
      isShowRDShare: state => { return !!state.redDotPush.shareReddot },
      isLogin: state => state.user.isLogin,
      appId: state => state.user.appId,
      userId: state => state.user.userObj.userId
    })
  },
  components: {
    // ExitGame,
    AddShortCut,
    CustomService,
    ShareGame
  },
  watch: {
    isShareGame () {
      if (this.isShareGame) {
        this.isShowBuoyMenu = false
      } else {
        this.isShowBuoyMenu = true
      }
    },
    isExitGame (val) {
      if (val) {
        this.isAddGame = false
        this.isShareGame = false
        this.isShowService = false
        this.$store.dispatch('hideLoginPopup')
      }
    }
  },
  methods: {
    // update by Dicky 2018.09.11
    showService () {
      this.isShowService = true
      this.$store.dispatch('changeRedDotStatus', { redDotLoca: constVar.RED_DOT_PERSONAL_SERVICE, ignore: false })
    },
    showShortcut () {
      this.isAddGame = true
      const obj = {
        appId: this.appId,
        userId: this.userId,
        shortcutReddot: constVar.RED_DOT_HIDDEN
      }
      services.setIconState(obj).then((res) => {
        this.$store.commit('changeGameRedDotStatus', { redDotLoca: 'shortcutReddot', ReddotStatus: constVar.RED_DOT_HIDDEN })
      })
    },
    showShareGame () {
      this.isShareGame = true
      const obj = {
        appId: this.appId,
        userId: this.userId,
        shareReddot: constVar.RED_DOT_HIDDEN
      }
      services.setIconState(obj).then((res) => {
        this.$store.commit('changeGameRedDotStatus', { redDotLoca: 'shareReddot', ReddotStatus: constVar.RED_DOT_HIDDEN })
      })
    },
    // 关闭服务
    closeService () {
      setTimeout(() => {
        this.isShowService = false
      }, 500)
    },
    cancleShare () {
      setTimeout(() => {
        this.isShareGame = false
      }, 500)
    },
    // 关闭离开游戏弹出框
    closeExitGame () {
      this.$store.dispatch('setExitGameStatus', { isExitGame: false })
    },
    // 弹出离开游戏的弹出框
    exitGame () {
      if (!getCookie('showExiGame', false)) {
        this.$store.dispatch('setExitGameStatus', { isExitGame: true })
      } else {
        this.$store.dispatch('setExitGameStatus', { isExitGame: false })
        this.$store.dispatch('setLeaveGameStatus', { isLeaveGame: false })
        this.$router.back()
      }
    },
    // 切换账号玩游戏
    swichAccount () {
      this.$loginBox().then(() => {
        gameStart(this.isLogin, this.appId, '', '', this, '', true)
      }).catch(err => {
        console.log(err)
      })
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
.buoy-menu {
  width: 240px;
  height: 185px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .menu-background {
    position: absolute;
    width: 240px;
    top: 0;
    left: 0;
  }
  .menu-content {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 27px;
    .menu-item {
      float: left;
      width: 35px;
      margin: 16px 40px 9px 0;
      z-index: 2;
      &.newest {
        position: relative;
        &:before {
          right: 4px;
          top: 1px;
        }
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
      img {
        width: 35px;
      }
      p {
        width: 35px;
        font-size: 7px;
        color: rgba(255, 255, 255, 1);
        line-height: 10px;
        text-align: center;
        margin: 0 auto;
        margin-top: 5px;
      }
    }
  }
  .menu-footer {
    position: absolute;
    bottom: 5px;
    width: 44px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.show-menu {
  animation: showMenu 1s;
  animation-fill-mode: forwards;
}
.hide-menu {
  animation: hideMenu 1s;
  animation-fill-mode: forwards;
}
@keyframes showMenu {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes hideMenu {
  from {
    bottom: 1;
  }
  to {
    bottom: 0;
  }
}
.hide-add-game {
  visibility: hidden;
}
</style>
