<template>
  <div>
    <div class="drap-img" :class="{'start-transition': startTransition, 'newest':isShowRDBuoy}" :appId='appId' v-show="!isShowMenu">
      <img :src="staffFloatImg" alt="" :class="{'reduce-opacity':!(isMovingPc||isMovingMoblie)}">
    </div>
    <!-- 浮标菜单 -->
    <div class="float-menu" @click.stop="isShowMenu=false" v-if="isShowMenu">
    </div>
    <buoy-menu :appIconUrl="appIconUrl" :appName="appName" @closeMenu="isShowMenu=false" :isShowMenu="isShowMenu" :isAddShortCut="isAddShortCut" v-if="isShowMenu"></buoy-menu>
    <div class="top-div" v-if="isMovingPc||isMovingMoblie"></div>
  </div>
</template>
<script>
/**
* 浮标
* @module @/components/GhwStaffFloat
* @desc 浮标
* @author yang huiru
* @date 2018.6.19
* @example 调用示例
* @update 2018.08.28
*
*/
import staffFloatImg from '@/assets/img/staff-float.svg'
import GhwPopUp from '@/components/GhwPopUp'
import GhwBtn from '@/components/GhwBtn'
import { mapState } from 'vuex'
import BuoyMenu from '@/components/GhwStaffFloat/components/BuoyMenu'
import * as BrowserUtils from '@/utils/BrowserUtils'
import isMobile from '@/utils/isMobile'
import * as constVar from '@/config/const'
import * as services from '@/services'

export default {
  name: 'GhwStaffFloat',
  extends: {},
  props: {
    appIconUrl: {
      type: String,
      default: ''
    },
    appName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      staffFloatImg,
      startTransition: false,
      isShowMennu: false,
      // 用于判断各个方向，改变宽度
      targetDirection: 'target-right',
      // 用于判断动画效果
      animationDirection: 'right-hide',
      isShowMenu: false,
      buoyHideDistanceX: 0,
      buoyHideDistanceY: 0,
      cursorIconX: 0,
      cursorIconY: 0,
      isMovingPc: false,
      isMovingMoblie: false,
      historyLength: 0,
      shortcutReddot: 0,
      isAddShortCut: false
    }
  },
  computed: {
    ...mapState({
      appId: state => state.user.appId,
      isLogin: state => state.user.isLogin,
      isForcedCircle: state => state.user.isForcedCircle,
      isExitGame: state => state.user.isExitGame,
      isLeaveGame: state => state.user.isLeaveGame,
      isShowRDPersonalService: state => state.redDotPush.redDotList[constVar.RED_DOT_PERSONAL_SERVICE].hasRead,
      isShowRDShortcut: state => state.redDotPush.shortcutReddot,
      isShowRDShare: state => state.redDotPush.shareReddot,
      userId: state => state.user.userObj.userId
    }),
    isShowRDBuoy () {
      return this.isShowRDPersonalService || this.isShowRDShortcut || this.isShowRDShare
    }
  },
  components: {
    GhwPopUp,
    GhwBtn,
    BuoyMenu
  },
  watch: {
    isExitGame (val) {
      if (val) {
        this.isShowMenu = true
      }
    }
  },
  methods: {
    // 判断靠边方向
    ajustDirecment (left, top, right, bottom, elem) {
      if (this.targetDirection === 'target-left') {
        elem.style.left = left
      }
      if (this.targetDirection === 'target-top') {
        elem.style.top = top
      }
      if (this.targetDirection === 'target-right') {
        elem.style.left = right
      }
      if (this.targetDirection === 'target-bottom') {
        elem.style.top = bottom
      }
    },
    keepToSide (touchX, touchY) {
      var drapImg = document.getElementsByClassName('drap-img')[0]
      var screenHeight = document.documentElement.clientHeight
      var screenWidth = document.documentElement.clientWidth
      if (touchY <= (screenHeight / 2)) { // 在上半部分
        if (touchX <= (screenWidth / 2)) { // 在左半部分
          if (touchX > touchY) { // 靠近上方
            this.targetDirection = 'target-top'
            drapImg.style.top = -this.buoyHideDistanceY + 'px'
          } else { // 靠近左边
            this.targetDirection = 'target-left'
            drapImg.style.left = -this.buoyHideDistanceX + 'px'
          }
        } else { // 在右半部分
          if (screenWidth - touchX > touchY) { // 靠近上方
            this.targetDirection = 'target-top'
            drapImg.style.top = -this.buoyHideDistanceY + 'px'
          } else { // 靠近右边
            this.targetDirection = 'target-right'
            drapImg.style.left = (screenWidth - this.buoyHideDistanceX) + 'px'
          }
        }
      } else { // 下半部分
        if (touchX <= (screenWidth / 2)) { // 在左半部分
          if (touchX > screenHeight - touchY) { // 靠近下方
            this.targetDirection = 'target-bottom'
            drapImg.style.top = (screenHeight - this.buoyHideDistanceY) + 'px'
          } else { // 靠近左边
            this.targetDirection = 'target-left'
            drapImg.style.left = -this.buoyHideDistanceX + 'px'
          }
        } else { // 在右半部分
          if (screenWidth - touchX > screenHeight - touchY) { // 靠近下方
            this.targetDirection = 'target-bottom'
            drapImg.style.top = (screenHeight - this.buoyHideDistanceY) + 'px'
          } else { // 靠近右边
            this.targetDirection = 'target-right'
            drapImg.style.left = (screenWidth - this.buoyHideDistanceX) + 'px'
          }
        }
      }
    },
    getCursorIconXY (x, y) {
      var drapImg = document.getElementsByClassName('drap-img')[0]
      this.cursorIconX = x - parseInt(drapImg.style.left)
      this.cursorIconY = y - parseInt(drapImg.style.top)
    },
    setBuoyMove (event, x, y) {
      // event.preventDefault()// 阻止其他事件
      var drapImg = document.getElementsByClassName('drap-img')[0]
      var screenWidth = document.documentElement.clientWidth
      var screenHeight = document.documentElement.clientHeight
      if (event == null) { event = window.event }// IE
      if ((y - this.cursorIconY) <= 0) { // 超过顶部
        drapImg.style.top = '0px'
      } else if ((y - this.cursorIconY) > (screenHeight - 2 * this.buoyHideDistanceY)) { // 超过底部
        drapImg.style.top = (screenHeight - 2 * this.buoyHideDistanceY) + 'px'
      } else {
        drapImg.style.top = (y - this.cursorIconY) + 'px'
      }
      if ((x - this.cursorIconX) <= 0) { // 超过左边
        drapImg.style.left = '0px'
      } else if ((x - this.cursorIconX) > (screenWidth - 2 * this.buoyHideDistanceX)) { // 超过右边
        drapImg.style.left = (screenWidth - 2 * this.buoyHideDistanceX) + 'px'
      } else {
        drapImg.style.left = (x - this.cursorIconX) + 'px'
      }
    },
    showMenu () {
      // var drapImg = document.getElementsByClassName('drap-img')[0]
      // var screenHeight = document.documentElement.clientHeight
      // var screenWidth = document.documentElement.clientWidth
      // this.ajustDirecment(0, 0, (screenWidth - this.buoyHideDistanceX * 2) + 'px', (screenHeight - this.buoyHideDistanceY * 2) + 'px', drapImg)
      this.isShowMenu = true
    },
    // 获取游戏相关红点显示状态
    setGameRedDots () {
      const obj = {
        appId: this.appId,
        userId: this.userId
      }
      services.getIconStateQuery(obj).then(
        (res) => {
          if (this.isAddShortCut) {
            this.$store.commit('changeGameRedDotStatus', { redDotLoca: 'shortcutReddot', ReddotStatus: res.data.shortcutReddot })
          }
          this.$store.commit('changeGameRedDotStatus', { redDotLoca: 'shareReddot', ReddotStatus: res.data.shareReddot })
        })
    },
    // 是否显示添加收藏的按钮
    isShowAddGame () {
      // var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
      if (isMobile()) {
        try {
          if (BrowserUtils.isiOS()) {
            this.isAddShortCut = true
          } else {
            this.isAddShortCut = false
          }
        } catch (error) {
          this.isAddShortCut = false
        }
      } else {
        this.isAddShortCut = true
      }
    }
  },
  beforeMount () { },
  mounted () {
    // 是否显示添加收藏的图标
    this.isShowAddGame()
    this.setGameRedDots()
    // 监听游戏后退事件
    var _this = this
    // var state = {
    //   title: 'IframeWrapper',
    //   url: window.location.href
    // }
    // if (StoreUtil.getItemFromLSCookie('gameRefresh') === '0' || !StoreUtil.getItemFromLSCookie('gameRefresh')) {
    //   window.history.pushState(state, 'IframeWrapper', window.location.href)
    //   StoreUtil.setItemToLSCookie('gameRefresh', '1')
    // }
    // this.$store.dispatch('setLeaveGameStatus', { isLeaveGame: false })
    // window.addEventListener('popstate', function (e) {
    //   if (!_this.isLeaveGame) {
    //     window.history.pushState(state, 'IframeWrapper', window.location.href)
    //     _this.$store.dispatch('setExitGameStatus', { isExitGame: true })
    //   }
    // }, false)
    var drapImg = document.getElementsByClassName('drap-img')[0]
    var screenHeight = document.documentElement.clientHeight
    var screenWidth = document.documentElement.clientWidth
    this.buoyHideDistanceY = parseInt(drapImg.clientWidth) / 2
    this.buoyHideDistanceX = parseInt(drapImg.clientWidth) / 2
    drapImg.style.top = (screenHeight / 2 - this.buoyHideDistanceY) + 'px'
    drapImg.style.left = (screenWidth - this.buoyHideDistanceX) + 'px'
    var mouseDownAndUpTimer = null
    // 按下鼠标记录鼠标位置
    drapImg.onmousedown = function (e) {
      _this.startTransition = false
      e.preventDefault()// 阻止其他事件
      if (!e) { e = window.event } // IE
      _this.getCursorIconXY(e.clientX, e.clientY)
      document.onmousemove = mousemove
      mouseDownAndUpTimer = setTimeout(() => {
        _this.isMovingPc = true
      }, 200)
    }
    // 释放时自动贴到最近位置
    drapImg.onmouseup = function (e) {
      document.onmousemove = null
      e.preventDefault()// 阻止其他事件
      _this.startTransition = true
      if (_this.isMovingPc) {
        if (e.pageY) {
          var touchY = e.pageY
          var touchX = e.pageX
          _this.keepToSide(touchX, touchY)
          _this.isMovingPc = false
        }
      } else {
        clearTimeout(mouseDownAndUpTimer)// 清除延迟时间
        _this.showMenu() // 触发点击事件
      }
    }
    // 鼠标移动事件
    function mousemove (event) {
      if (event == null) { event = window.event }// IE
      // event.preventDefault()// 阻止其他事件
      _this.setBuoyMove(event, event.clientX, event.clientY)
    }
    window.onresize = function () { // 窗口大小改变事件
      var screenWidth = document.documentElement.clientWidth
      var screenHeight = document.documentElement.clientHeight
      var drapImg = document.getElementsByClassName('drap-img')[0]
      drapImg.style.left = (screenWidth - _this.buoyHideDistanceX) + 'px'
      drapImg.style.top = (screenHeight / 2 - _this.buoyHideDistanceY) + 'px'
    }
    drapImg.addEventListener('touchstart', function (event) {
      _this.startTransition = false
      _this.getCursorIconXY(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
    }, false)
    drapImg.addEventListener('touchmove', function (event) {
      _this.isMovingMoblie = true
      // 如果这个元素的位置内只有一个手指的话
      var ev = event.changedTouches[0]
      _this.setBuoyMove(event, ev.clientX, ev.clientY)
    }, false)
    drapImg.addEventListener('touchend', function (event) {
      _this.startTransition = true
      if (_this.isMovingMoblie) {
        var touchY = event.changedTouches[0].pageY
        var touchX = event.changedTouches[0].pageX
        _this.keepToSide(touchX, touchY)
        _this.isMovingMoblie = false
      } else {
        // 防止事件冒泡
        event.preventDefault()
        _this.showMenu() // 触发点击事件
      }
    }, false)
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss" scoped>
.reduce-opacity {
  opacity: 0.6;
}
.drap-img {
  position: absolute;
  width: 44px;
  height: 44px;
  z-index: 3;
  &.newest::before {
    right: 39px;
    top: 10px;
  }
}
.start-transition {
  transition: top 0.5s ease, left 0.5s ease, right 0.5s ease, bottom 0.5s ease;
}
.float-menu {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.top-div {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.newest::before {
  z-index: 4;
}
</style>
