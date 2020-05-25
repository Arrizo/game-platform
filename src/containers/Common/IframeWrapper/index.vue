<template>
  <div ref="iframeCont" style="overflow: hidden;-webkit-overflow-scrolling:touch;width:100%;height:100%;position:relative;top:0;left
  0;" id="iframeCont">
    <!-- TODO：v1.0版本出现兼容性问题，暂时使用直接跳转方法解决。后续还需要调整iframe的兼容性 -->
    <iframe :src="iframeSrc" frameborder="0" ref="gameIframe" v-if="iframeSrc"></iframe>
    <div class="gameLoadedIcon" v-if="showGameloaed">
      <img :src="gameLoaded">
    </div>
    <ghw-staff-float :appIconUrl="appIconUrl" :appName="appName" v-if="isShowStaffFloat"></ghw-staff-float>
    <!-- 退出游戏弹出框 -->
    <exit-game @closeLeaveGame="closeExitGame"></exit-game>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
import concatUrl from '@/utils/concatUrl'
import CookieUtil from '@/utils/CookieUtil'
import * as rotate from '@/utils/rotate'
import * as postMessageEvent from '@/config/postMessageEvent'
import * as constVar from '@/config/const'
import * as services from '@/services'
import isMobile from '@/utils/isMobile'
import crossHandler from '@/utils/crossHandler'
import gameLoaded from '@/assets/img/game-start-page.png'
import StoreUtil from '@/utils/StoreUtil'
import GhwStaffFloat from '@/components/GhwStaffFloat'
import getCookie from '@/utils/getCookie'
import ExitGame from '@/components/GhwStaffFloat/components/ExitGame.vue'
// import addIframe from '@/utils/dynamicIframe'

export default {
  name: 'IframeWrapper',
  extends: {},
  props: {},
  data: function () {
    return {
      gameUrl: '',
      iframeSrc: '',
      domain: '',
      SDK_TOKEN: 'sdkToken',
      CURRENT_GAME_URL: 'cuGUrl',
      loadinggame: false,
      gameLoaded,
      showGameloaed: true,
      appIconUrl: this.$route.query.appIconUrl,
      appName: this.$route.query.appName,
      isShowStaffFloat: false,
      isOutOfStock: false,
      isForceLandscape: false
    }
  },
  computed: {
    ...mapState({
      userToken: state => state.user.userToken,
      isLogin: state => state.user.isLogin,
      userObj: state => state.user.userObj,
      isExitGame: state => state.user.isExitGame,
      isLeaveGame: state => state.user.isLeaveGame,
      userId: state => state.user.userObj.userId,
      isPlaying: state => state.user.isPlaying,
      appId: state => state.user.appId
    })
  },
  components: {
    GhwStaffFloat,
    ExitGame
  },
  watch: {
    // isLogin (newVal) {
    //   if (newVal) {
    //     this.checkLogin()
    //   }
    // },
    // userId: function (newvalue, oldvalue) {
    //   if (this.isPlaying && newvalue + '' !== oldvalue + '') {
    //     gameStart(this.isLogin, this.appId, '', '', this, '', true)
    //   }
    // }
  },
  methods: {
    // 关闭离开游戏弹出框
    closeExitGame () {
      this.$store.dispatch('setExitGameStatus', { isExitGame: false })
    },
    checkLogin () {
      if (this.isLogin) {
        setTimeout(() => {
          this.runGame()
        }, 500)
      } else {
        this.$store.dispatch('showLoginPopup')
      }
    },
    getProtocolDomain (url) {
      let urlArr = url.split('//')
      let domain = urlArr[1].substring(0, urlArr[1].indexOf('/'))// stop省略，截取从start开始到结尾的所有字
      return urlArr[0] + '//' + domain
    },
    setDomain (gameUrl) {
      this.domain = this.getProtocolDomain(gameUrl)
    },
    // sendMsg () {
    //   window.postMessage(this.userToken, this.domain)
    // },
    addListener () {
      let that = this // 闭包需要中转
      window.addEventListener('message', function (event) {
        if (!event || !event.data) {
          return
        }
        // 如果是字符串（必须是json形式），先转为json对象
        var eventObj = {}
        if (typeof event.data === 'string') {
          try {
            eventObj = JSON.parse(event.data)
          } catch (error) {
            // console.warn('Unknown message source, drop it.')
          }
        } else if (typeof event.data === 'object') {
          eventObj = event.data
        }
        // 处理不同消息来源
        // 1.处理token过期重新登录游戏，请勿动
        if (eventObj && eventObj.cmd === postMessageEvent.CHANGE_LOGIN_STATUS &&
          eventObj.data.isLogin && eventObj.data.sdkToken
        ) {
          var currentGameUrl = StoreUtil.getInstance().getItemFromSSCookie()
          that.iframeSrc = concatUrl(currentGameUrl, that.SDK_TOKEN, eventObj.data.sdkToken)
        } else if (eventObj.isFromGame === 1) {
          // 游戏返回的数据中包含字段isFromGame，非游戏返回的数据没有包含该数据
          // var origin = event.origin || event.originalEvent.origin
          // if (this.domain !== origin) return //这个先不校验，有可能游戏跳转后和原域名不一样
          // var dataObj = JSON.parse(eventObj)
          if (eventObj.code === 200) {
            // this.$store.dispatch('reLogin')// to be deleted
          } else if (eventObj.code === 4014) {
            // 处理缓存被清理但是页面变量还存在的情况
            if (!StoreUtil.getInstance().getItemFromSSCookie(constVar.SESSION_IS_LOGIN) || !CookieUtil.getInstance().getDecryptSdkTokenFromCookie()) {
              that.$router.replace({ name: 'Home' }) // 直接返回首页 并弹出登录页面
              // that.$store.dispatch('showLoginPopup')
            } else {
              that.$store.dispatch('reLogin')
            }
          } else {
            // console.error('Login game fail with unknown error, error code is:' + eventObj.code)
          }
        }
      }, false)
    },
    runGame () {
      const self = this
      const obj = {
        appId: this.$route.query.appId,
        userId: this.userObj.userId
      }
      services.getAppDetail(obj).then((res) => {
        if (res.data.userStatus === constVar.USER_ACCOUNT_FREEZE) {
          this.$store.dispatch('accountFreeze', true)
          this.$router.push({ name: 'Home' })
          return false
        }
        if (res.data.appStatus === constVar.OUT_OF_STOCK) {
          let outOfStockReason = ''
          // 0-新游上架
          // 1-维护完毕
          // 2-测试完毕
          // 3-关服下架
          // 4-维护状态
          // 5-测试
          // 6-停用
          switch (res.data.onOffReason) {
            case 0:
              outOfStockReason = this.$t('message.public.newArrival')
              break
            case 1:
              outOfStockReason = this.$t('message.public.maintenComplete')
              break
            case 2:
              outOfStockReason = this.$t('message.public.testFinished')
              break
            case 3:
              outOfStockReason = this.$t('message.public.closeService')
              break
            case 4:
              outOfStockReason = this.$t('message.public.maintenanceStatus')
              break
            case 5:
              outOfStockReason = this.$t('message.public.testing')
              break
            case 6:
              outOfStockReason = this.$t('message.public.disabled')
              break
          }
          this.isOutOfStock = true
          MessageBox({
            title: outOfStockReason,
            message: res.data.onOffDesc === '' ? ' ' : res.data.onOffDesc,
            cancelButtonText: this.$t('message.public.back'),
            confirmButtonText: this.$t('message.public.details'),
            closeOnClickModal: false,
            showCancelButton: true
          }).then(
            action => {
              if (action === 'confirm') {
                this.$router.push({ name: 'Information', query: { newsId: res.data.linkedNewsId } })
              }
              if (action === 'cancel') {
                this.isOutOfStock = false
                this.$router.back()
              }
            }
          )
        } else {
          // Updated by Zping on 20180611
          // 尝试写session，无痕模式不支持的情况下写cookie
          StoreUtil.getInstance().setItemToSSCookie(self.CURRENT_GAME_URL, res.data.appUrl)
          let gameUrl = concatUrl(res.data.appUrl, self.SDK_TOKEN, CookieUtil.getInstance().getDecryptSdkTokenFromCookie())
          self.setDomain(gameUrl)
          // 判断是否使用iframe，判断iframe是否设置为水平
          if (res.data.iframe === constVar.IFRAME_OFF && isMobile()) {
            setTimeout(
              () => {
                window.location.replace(gameUrl)
              }, 800
            )
          } else {
            self.iframeSrc = gameUrl
            // 是否强制横屏，判断iframe是否设置为水平
            if (res.data.screenType === constVar.IFRAME_HORIZONTAL) {
              this.isForceLandscape = true
              // 竖屏旋转iframe，手机竖屏,pc电脑进行强制横屏
              if (window.orientation === 180 || window.orientation === 0 || !isMobile()) {
                rotate.setRotate90()
              }
              crossHandler(postMessageEvent.SET_IFRAME_HORIZONTAL)
              rotate.addOrientationListener()
            } else {
              // 非强制横屏，浮标显示
              this.isShowStaffFloat = true
            }
            let _this = this
            this.$nextTick(() => {
              var iframe = document.getElementsByTagName('iframe')[0]
              if (iframe.attachEvent) {
                iframe.attachEvent('onload', function () {
                  _this.showGameloaed = false
                })
              } else {
                iframe.onload = iframe.onreadystatechange = function () {
                  if (this.readyState && this.readyState !== 'loaded') {
                  } else {
                    _this.showGameloaed = false
                  }
                }
              }
            })
          }
        }
      })
    }
  },
  created () {
    this.$store.dispatch('setLeaveGameStatus', { isLeaveGame: false })
  },
  beforeMount () { },
  mounted () {
    // this.checkLogin()
    this.runGame()
    this.$store.dispatch('changePlayingStatus', {
      isPlaying: true
    })
    this.$store.dispatch('setPlayingAppId', { appId: this.$route.query.appId })
    this.$store.commit('PLAYING_GAME_APPNAME', this.$route.query.appName)
    // PLAYING_GAME_APPNAME
    // this.sendMsg()
    // 外链接的隐藏加载图
    if (this.$route.query.gameIcon) {
      this.showGameloaed = false
    }
    this.addListener()
  },
  beforeUpdate () {
    // this.$refs.iframe.style.width = 100 + '%'
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('setLeaveGameRouter', to)
    // 今天之内不再显示，点击leaveGame，强制横屏的游戏都直接退出，不弹窗
    if (!getCookie('showExiGame', false) && !this.isLeaveGame && !this.isForceLandscape) {
      if (!this.isOutOfStock) {
        this.$store.dispatch('setExitGameStatus', { isExitGame: true })

        next(false)
      } else {
        next()
      }
    } else {
      this.$store.dispatch('setExitGameStatus', { isExitGame: false })
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
iframe {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  // z-index: -1;
  // overflow: scroll;
  // -webkit-overflow-scrolling: touch;
  // min-width: 100%;
  // *width: 100%;
  // width: 1px;
}
.gameLoadedIcon {
  height: 100%;
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0px;
  top: 0px;
  background: #cfeeff;
}
.gameLoadedIcon img:first-child {
  height: 100%;
}
</style>
<style lang="scss">
.mint-msgbox-content {
  padding: 18px 0px 22px 0px;
  border-bottom: none !important;
}
.mint-msgbox {
  border-radius: 16px !important;
  padding-bottom: 20px;
}
.mint-msgbox-btns {
  padding: 0 30px;
}
.mint-msgbox-btn {
  border-radius: 16px !important;
  margin: 0 12px !important;
  height: 26px;
  line-height: 12px !important;
  color: #fff !important;
  font-size: 11px !important;
  background: linear-gradient(to top, rgb(16, 114, 215) 0%, rgb(52, 223, 248) 100%);
  box-shadow: 0px 4px 9px 1px rgba(23, 135, 221, 0.3);
  -webkit-tap-highlight-color: transparent;
}
.mint-msgbox-btn:active {
  background: linear-gradient(#1072d7, #34dff8); /* 标准的语法 */
  box-shadow: 0px 0px 0px rgba(23, 135, 221, 0.3);
  color: #a1defd;
}
</style>
