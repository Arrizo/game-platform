<template>
  <div class="layout-wrapper" ref="layoutWrapper">
    <!-- <router-view class="main-view" /> -->
    <div class="inner-wrapper" ref="innerWrapper" id="innerWrapper" :class="{'not-scroll':isShowPopup}">
      <ghw-header v-if="hasHeader"></ghw-header>
      <router-view :key="$route.fullPath" class="main-view" :class="{'main-view-bot':!hasFooter,'service-footer':isService}"></router-view>
      <ghw-footer v-if="hasFooter&&showFooterFlag&&isShowPopup&&!isService" :curIndex="curIndex" :isShowPopup="isShowPopup"></ghw-footer>
      <privacy-reminder :isShowReminder="reminderdelayed&&isShowReminder" :privacyUrl="privacyUrl" @closeReminder="isShowReminder=false"></privacy-reminder>
    </div>
    <ghw-footer v-if="hasFooter&&showFooterFlag&&!isShowPopup&&!isService" :curIndex="curIndex"></ghw-footer>
    <ghw-return-top />
    <!-- <ghw-login v-if="showLoginPopup" @hideLogin="hideLoginPopup" /> -->
    <!-- 封号 -->
    <ghw-account-freeze></ghw-account-freeze>
  </div>
</template>
<script>
import GhwAccountFreeze from '@/components/GhwAccountFreeze'
import GhwFooter from '@/components/GhwFooter'
import GhwHeader from '@/components/GhwHeader'
import GhwReturnTop from '@/components/GhwReturnTop'
import GhwLogin from '@/containers/PersonalCenter/Login'
import * as postMessageEvent from '@/config/postMessageEvent'
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
// import Toast from '@/components/GhwToast/index.js'
import { API_PATH } from '@/config/env'
import CookieUtil from '@/utils/CookieUtil'
import * as rotate from '@/utils/rotate'
import { getQrCode, getUnreadCount } from '@/services'
import getCookie from '@/utils/getCookie'
import crossHandler from '@/utils/crossHandler'
import * as BrowserUtils from '@/utils/BrowserUtils'
import PrivacyReminder from '@/components/GhwPopUp/components/PrivacyReminder.vue'
import StompObj from '../../../static/js/stomp_2.3.3.js'
// import SockJS from '../../../static/js/sockjs_1.1.4.js'
import SockJS from '../../../static/js/sockjs.min.js'
import notifyHandler from '@/utils/handler/notifyHandler'
import gameStart from '@/utils/gameStart'

var Stomp = StompObj.Stomp

export default {
  name: 'Layout',
  extends: {},
  props: {},
  data () {
    return {
      reminderdelayed: this.isLogin,
      stompFlag: true,
      newsMessageNumber: 0,
      webSocketFun: null,
      isShowReminder: false
    }
  },
  computed: {
    ...mapState({
      isShowPopup: state => state.user.isShowPopup,
      isLogin: state => state.user.isLogin,
      showLoginPopup: state => state.user.showLoginPopup,
      isPlaying: state => state.user.isPlaying,
      triggerLogin: state => state.user.triggerLogin,
      appId: state => state.user.appId,
      showFooterFlag: state => state.home.showFooterFlag,
      userObj: state => state.user.userObj,
      privacyUrl: state => state.user.privacyUrl,
      isService: state => state.user.isService
    }),
    // 通过router的参数 meta.hasHeader 和 meta.hasFooter 控制是否显页头和页脚
    hasHeader () {
      if (typeof (this.$route.meta.hasHeader) === 'undefined') {
        return true
      } else {
        return this.$route.meta.hasHeader
      }
    },
    hasFooter () {
      if (typeof (this.$route.meta.hasFooter) === 'undefined') {
        return true
      } else {
        return this.$route.meta.hasFooter
      }
    },
    curIndex () {
      if (typeof (this.$route.meta.curIndex) === 'undefined') {
        return 0
      } else {
        return this.$route.meta.curIndex
      }
    }
  },
  components: {
    GhwFooter,
    GhwHeader,
    GhwReturnTop,
    GhwLogin,
    PrivacyReminder,
    GhwAccountFreeze
  },
  watch: {
    // 每次url状态改变，都改变隐私政策弹出框的状态
    privacyUrl (val) {
      this.isShowReminder = val !== '-1'
    },
    isLogin (val, oldVal) {
      // 隐私政策在登录状态改变后1500MS再提示
      setTimeout(() => {
        this.reminderdelayed = val
      }, 1500)

      this.initWebsocket()
      window.postMessage(JSON.stringify({
        isLogin: this.isLogin
      }), '*')
      // if (this.isLogin && this.triggerLogin) {
      //   Toast({
      //     message: this.$t('message.public.loginSucc'),
      //     iconClass: 'iconfont icon-toast-tick'
      //   })
      // }
    },
    $route (to, from, next) {
      this.$store.dispatch('hideLoginPopup')
      if (from.name === 'IframeWrapper' && to.name !== 'IframeWrapper') {
        setTimeout(function () {
          rotate.setRotate0()
        }, 500)
        this.$store.dispatch('changePlayingStatus', { isPlaying: false })
        crossHandler(postMessageEvent.SET_IFRAME_VERTICAL)
        top.postMessage(JSON.stringify({
          cmd: postMessageEvent.NO_PLAYING_GAME,
          data: {
            isPlaying: this.isPlaying
          }
        }), '*')
      }
      // 每次跳转的时候都隐藏二维码
      top.postMessage(JSON.stringify({
        cmd: postMessageEvent.CLOSE_QRCODE,
        data: {
          qrCodeShow: false
        }
      }), '*')
      // 每次跳转都关掉弹出框
      MessageBox.close()
    },
    // 强制旋转的游戏要移除自动旋转的事件，使之保持横屏的状态不变
    isPlaying (val) {
      if (val) {
        rotate.removeDefaultListener()
      } else {
        rotate.removeOrientationListener()
        rotate.addDefaultListener()
      }
    }
  },
  methods: {
    addPMListener () {
      const self = this
      const doSth = {
        [postMessageEvent.SHOW_INFORMAITON] () {
          // 当处于home页面的时候，home页面也相应此post message，在页面内做跳转
          self.$router.push({ name: 'HomeTab', params: { tab: 'navBar3' } })
          self.$store.dispatch('setPcPostEventStatus', { isPcPostEvent: true })
        },
        [postMessageEvent.HOME] () {
          // 当处于home页面的时候，home页面也相应此post message，在页面内做跳转
          self.$router.push({ name: 'HomeTab', params: { tab: 'navBar1' } })
          self.$store.dispatch('setPcPostEventStatus', { isPcPostEvent: true })
        },
        [postMessageEvent.MY_PAGE] () {
          self.$router.push({ name: 'PersonalCenter' })
          self.$store.dispatch('setPcPostEventStatus', { isPcPostEvent: true })
        },
        [postMessageEvent.USER_LOGIN] () {
          self.$loginBox().then(() => {
            gameStart(self.isLogin, self.appId, '', '', self, '', true)
          }).catch(err => {
            console.log(err)
          })
          // self.$loginBox().then().catch(err => console.log(err))
        },
        [postMessageEvent.MY_MESSAGE] () {
          self.$router.push({ name: 'MyMessageList' })
          self.$store.dispatch('setPcPostEventStatus', { isPcPostEvent: true })
        },
        [postMessageEvent.USER_SERVICE] () {
          self.$router.push({ name: 'ServiceMain' })
          self.$store.dispatch('setPcPostEventStatus', { isPcPostEvent: true })
        },
        [postMessageEvent.EXCHANGE_USER] () {
        },
        [postMessageEvent.REFRESH_QRCODE] () {
          self.setQrCode()
        },
        [postMessageEvent.SEARCH_URL] (data) {
          // const winLocation = window.location
          // window.location.href = winLocation.origin + winLocation.pathname + winLocation.hash + data.serchUrl
          self.$router.push({
            name: 'Home',
            query: BrowserUtils.getUrlParams(data.serchUrl)
          })
        },
        [postMessageEvent.SHOW_MESSAGE_NUM] () {
          // 当触发事件时调用接口
          self.setUnreadCount()
          setTimeout(() => {
            self.crossParentHandler(postMessageEvent.SHOW_MESSAGE_NUM, self.newsMessageNumber)
          }, 50)
        },
        [postMessageEvent.RESIZE_PC_FRAME] () {
          rotate.resizePCFrame()
        }
      }
      window.addEventListener('message', function (e) {
        try {
          // console.log('isPcPostEventmessage', JSON.parse(e.data))
          let cmd = JSON.parse(e.data).cmd
          if (doSth[cmd]) {
            // console.log('isPcPostEvent', JSON.parse(e.data).data.isPcPostEvent)
            // if (JSON.parse(e.data).data.isPcPostEvent) {
            //   console.log('isPcPostEvent', JSON.parse(e.data).data.isPcPostEvent)
            //   self.$store.dispatch('setPcPostEventStatus', { isPcPostEvent: JSON.parse(e.data).data.isPcPostEvent })
            // }
            doSth[cmd](JSON.parse(e.data).data)
          }
        } catch (error) {
          console.warn('Unknown message received, drop it...')
        }
      })
    },
    hideLoginPopup () {
      this.$store.dispatch('hideLoginPopup')
    },
    // websocket开启
    initWebsocket () {
      if (!Stomp) {
        setTimeout(function () {
          this.initWebsocket()
        }, 1000)
        return
      }
      const self = this
      var socket = this.webSocket = new SockJS(API_PATH + '/ws/user/init') // 1连接SockJS的endpoint是“wingSDK-endpoint”，与后台代码中注册的endpoint要一样。
      this.stompClient = Stomp.over(socket)// 2创建STOMP协议的webSocket客户端。
      this.stompClient.debug = false
      this.stompClient.connect({}, function (frame) { // 3连接webSocket的服务端。
        // 4通过stompClient.subscribe（）订阅服务器的目标是'/topic/allUsers'发送过来的地址，与@SendTo中的地址对应。
        // self.stompClient.unsubscribe('/topic/notify', function (respnose) {
        //   console.log('---closeEEEEEEE--')
        // })
        // 连接websocket初始数据
        let firstRedDotList = JSON.parse(frame.body).data.pushList
        // self.$store.dispatch('showRedDot', firstRedDotList)
        notifyHandler(firstRedDotList)

        // 全体推送数据
        self.stompClient.subscribe('/topic/notify', function (respnose) {
          let redDotList = JSON.parse(respnose.body).data.pushList
          // self.$store.dispatch('showRedDot', redDotList)
          notifyHandler(redDotList)
        })
        if (self.isLogin) {
          // 判断是否登录，推送一对一信息
          self.webSocketFun = self.stompClient.subscribe('/user/' + self.userObj.userId + '/msg', function (respnose) {
            let redDotList = JSON.parse(respnose.body).data.pushList
            // self.$store.dispatch('showRedDot', redDotList)
            notifyHandler(redDotList)
            // 处理推送过来的消息
          })
          self.stompClient.send('/push/bind', {}, JSON.stringify({ 'userid': self.userObj.userId }))
        }
        // this.webSocketFun()
        // 4通过stompClient.subscribe（）订阅服务器的目标是'/user/' + userId + '/msg'接收一对一的推送消息,其中userId由服务端传递过来,用于表示唯一的用户,通过此值将消息精确推送给一个用户
        //            stompClient.subscribe('/user/' + userId + '/msg', function(respnose){
        //                console.log(respnose);
        //                showResponse1(JSON.parse(respnose.body).responseMessage);
        //            });
      }, function (error, i, j) {
        setTimeout(function () {
          self.initWebsocket()
        }, 3000)
        console.log('error cb:::', error, i, j)
      })
    },
    // PC二维码生成
    setQrCode () {
      // Amended by Zping on 20180409
      let sdkUserId = CookieUtil.getInstance().getSdkUserIdFromCookie()
      let h5Token = CookieUtil.getInstance().getDecryptH5TokenFromCookie()
      let sdkToken = CookieUtil.getInstance().getDecryptSdkTokenFromCookie()
      const obj = {
        userId: sdkUserId || '',
        h5Token: h5Token || '',
        sdkToken: sdkToken || '',
        appId: this.isPlaying ? this.appId : '',
        cookies: 'privacyUrl=' + getCookie('privacyUrl')
      }
      // end
      getQrCode(obj).then(res => {
        if (top.location !== self.location) {
          // 判断到是处于iframe中，向父窗口发消息
          top.postMessage(JSON.stringify({
            cmd: postMessageEvent.INIT_QRCODE,
            data: {
              initQCode: res.data.qrLink
            }
          }), '*')
        }
      })
    },
    // 获取pc端未读新消息的数量
    setUnreadCount () {
      let obj = {
        userId: CookieUtil.getInstance().getSdkUserIdFromCookie(),
        userToken: CookieUtil.getInstance().getDecryptH5TokenFromCookie(),
        notifStatus: 1
      }
      getUnreadCount(obj).then(res => {
        try {
          this.newsMessageNumber = res.data.unreadCount
        } catch (error) {
          console.warn('Unknown value')
        }
      })
    },
    crossParentHandler (event, data) {
      if (top.location !== self.location) {
        window.top.postMessage(JSON.stringify({
          cmd: event,
          data: data
        }), '*')
      }
    }
  },
  beforeCreate () {
  },
  beforeMount () {
  },
  mounted () {
    // 初始化时如果已经二次登录则`reminderdelayed`为 true
    if (this.isLogin) {
      this.reminderdelayed = true
    }

    // 登陆后只要还没同意过隐私政策则弹出隐私政策
    var privacyUrl = getCookie('privacyUrl')
    this.isShowReminder = privacyUrl !== '-1'
    console.log('isShowReminder===================', this.isShowReminder)
    this.$store.dispatch('setPrivacyUrl', { privacyUrl: privacyUrl })
    // Websocket连接红点
    this.initWebsocket()
    this.addPMListener()
    crossHandler(postMessageEvent.HIDE_LOADING_HOME)
    top.postMessage(JSON.stringify({
      cmd: postMessageEvent.START_SHARE_GAME,
      data: {
      }
    }), '*')
    if (BrowserUtils.isMobile()) {
      this.$refs.layoutWrapper.style.height = document.documentElement.clientHeight + 'px'
      // 强制旋转使用
      // this.$refs.layoutWrapper.style.width = document.documentElement.clientWidth + 'px'
    } else {
      this.$refs.layoutWrapper.style.height = document.documentElement.clientHeight + 'px'
    }
    rotate.addDefaultListener()
  },
  beforeUpdate () {
  },
  updated () {

  },
  beforeDestroy () { },
  destroyed () { }
}
</script>
<style lang="scss">
.main-view {
  padding-bottom: 60px;
}
.main-view-bot {
  padding-bottom: 0;
}
.layout-wrapper {
  height: 100%;
  overflow: auto;
  position: relative;
  .inner-wrapper {
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    background: rgba(246, 246, 246, 1);
  }
}
.not-scroll {
  overflow: hidden !important;
}
.service-footer {
  padding-bottom: 0;
}
</style>
