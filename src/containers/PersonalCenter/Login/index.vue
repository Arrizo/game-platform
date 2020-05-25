<template>
  <transition name="toast">
    <div v-show="visible" class="login-wrapper">
      <!--弹窗-->
      <div class="mobile-mask" @click="hideLogin"></div>
      <div class="mobile-pop">
        <!--标题-->
        <div class="mobile-top">
          <div class="mobile-top-close" @click="hideLogin" v-if="closeBtn"><img :src="closeLoginImg" alt=""></div>
          <span class="mobile-top-login">{{$t('message.me.login')}}</span>
        </div>
        <!--内容区域-->
        <div class="mobile-content" :class="{'bottom-none':!isShowAllLogin&&loginWayList.length>3,'show-all-login':isShowAllLogin}">
          <div v-for="(item,index) in loginWayList" :key="'item'+index" class="mobile-content-item">
            <div>
              <img :src="item.logoUrl" alt="" @error="setDefaultImg(item.platform)" :id="item.platform" @click="login(index)">
            </div>
            <p>{{item.isActive ? $t('message.public.loggingIn') : item.platform}}</p>
          </div>
        </div>
        <div class="mobile-footer" v-if="loginWayList.length>3">
          <img :src="footerBcgImg" alt="" class="footer-background" v-if="!isShowAllLogin">
          <img :src="pulldownImg" alt="" class="footer-pull" @click="isShowAllLogin=!isShowAllLogin" :class="{'show-class':isShowAllLogin}">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import facebookIcon from '@/assets/img/facebook.png'
import googleIcon from '@/assets/img/google.png'
import guestIcon from '@/assets/img/guest.png'
import { getLoginWay, login } from '@/services'
import { fbParam, ggParam, loginParam } from '@/config/env'
import { mapState } from 'vuex'
import getCurrentOs from '@/utils/getCurrentOs'
import CookieUtil from '@/utils/CookieUtil'
import StoreUtil from '@/utils/StoreUtil'
import { CLIENT_ID } from '@/config/const'
import * as UserLogin from '@/utils/vendor/init'
import closeLoginImg from '@/assets/img/close-login.svg'
import footerBcgImg from '@/assets/img/half-opacity.png'
import pulldownImg from '@/assets/img/pull-down.svg'

export default {
  name: 'Login',
  extends: {},
  props: {
    closeBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false,
      callback: null,
      defaultImg: 'this.src="' + require('@/assets/img/btn.png') + '"',
      facebookIcon,
      googleIcon,
      guestIcon,
      clientId: '',
      currentOs: '',
      params: {},
      googleAuth2: null,
      loginWayList: [],
      showHideBtn: true,
      closeLoginImg,
      footerBcgImg,
      pulldownImg,
      isShowAllLogin: false,
      isLoging: false,
      userLogin1: false,
      userLogin2: false,
      userLogin3: false
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      isPlaying: state => state.user.isPlaying,
      appId: state => state.user.appId
    })
    // loginWayArr: function () {
    //   let miniClient = StoreUtil.getItemFromLSCookie('miniClient')
    //   let loginWayArr = this.loginWayList
    //   // 微端打包过滤google登陆
    //   if (miniClient) {
    //     return loginWayArr.filter(function (item) {
    //       return item.platform !== 'GOOGLE'
    //     })
    //   } else {
    //     return loginWayArr
    //   }
    // }
  },
  component: {

  },
  watch: {
    visible (val) {
      if (!val) {
        if (this.loginWayList.length) {
          this.loginWayList.forEach(item => {
            item.isActive = false
          })
        }
      }
    }
  },
  methods: {
    hideLogin () {
      if (this.closeBtn) {
        this.visible = false
      }
      // this.$emit('hideLogin')
    },
    initialize () {
      // Updated by Zping on 20180611
      this.clientId = StoreUtil.getInstance().getItemFromLSCookie(CLIENT_ID)
      // End
      // 获取当前os
      var osArr = getCurrentOs()
      if (osArr) {
        for (var os in osArr) {
          this.currentOs = os
        }
      }
      // 必须获取到clientId才可以进行下一步
      var that = this
      if (!this.clientId) {
        setTimeout(function () {
          that.initialize()
        }, 500)
      } else {
        this.getLoginWay()
      }
    },
    setDefaultImg (platform) {
      if (!platform) return
      var imgEl = document.getElementById(platform)
      switch (platform) {
        case 'FACEBOOK':
          imgEl.src = facebookIcon
          break
        case 'GOOGLE':
          imgEl.src = googleIcon
          break
        case 'GUEST':
          imgEl.src = guestIcon
          break
        default:
      }
    },

    getLoginWay () {
      this.params.os = this.currentOs
      this.params.clientId = this.clientId
      this.params.v = new Date().getTime()
      getLoginWay(this.params).then(res => {
        if (res.data) {
          if (res.data.loginWayList && res.data.loginWayList.length > 0) {
            this.loginWayList = res.data.loginWayList.map(item => {
              item.isActive = false
              return item
            })
            // 微端打包过滤google登陆
            let miniClient = StoreUtil.getItemFromLSCookie('miniClient')
            if (miniClient) {
              this.loginWayList = this.loginWayList.filter(function (item) {
                return item.platform !== 'GOOGLE'
              })
            }
            for (var platformObj of res.data.loginWayList) {
              switch (platformObj.platform) {
                case 'FACEBOOK':
                  UserLogin.initFacebook()
                  continue
                case 'GOOGLE':
                  this.initGoogle()
                  continue
                case 'GUEST':
                  continue
                default:
              }
            }
          }
        }
      }, error => {
        console.log(error)
      })
    },
    // 登录入口
    login (index) {
      const platform = this.loginWayList[index].platform
      this.isLoging = true
      if (platform === '' || platform === null) return

      this.loginWayList[index].isActive = true

      switch (platform) {
        case 'FACEBOOK':
          this.userLogin2 = true
          this.loginFacebook()
          break
        case 'GOOGLE':
          this.userLogin3 = true
          this.loginGoogle()
          break
        case 'GUEST':
          this.userLogin1 = true
          this.loginGuest()
          break
        default:
      }
    },
    initFacebook () {
      /* eslint-disable no-undef */
      FB.init({
        appId: fbParam.appId,
        cookie: true,
        xfbml: true,
        version: fbParam.apiVer
      })
      /* eslint-able */
    },
    // 登录Facebook
    loginFacebook () {
      /* eslint-disable no-undef */
      let that = this // 闭包需要中转
      FB.login(function (response) {
        if (response != null && response.status === 'connected') {
          that.params.platform = 'FACEBOOK'
          that.params.os = that.currentOs
          that.params.clientId = that.clientId
          that.params.accessToken = response.authResponse.accessToken
          // that.$store.dispatch('doH5Login', that.params)
          that.$store.dispatch('doH5Login', that.params).then(() => {
            that.visible = false
            that.callback(that)
          }).catch(() => {
            that.callback(that, false)
            that.loginWayList.forEach((item, index) => {
              that.$set(item, 'isActive', false)
            })
          })
          // that.doH5Login(that.params)
        } else {
          // MessageBox('error:' + 401)
          that.userLogin2 = false
          console.error('facebook login error') // facebook login error
        }
      })
      /* eslint-able */
    },
    initGoogle () {
      var that = this
      if (window.gapi && Object.keys(window.gapi).length) {
        gapi.load('auth2', function () {
          that.googleAuth2 = gapi.auth2.init({
            client_id: ggParam.clientId,
            cookiepolicy: ggParam.cookiePolicy,
            scope: ggParam.scope
          })
        })
      } else {
        setTimeout(function () {
          that.initGoogle()
        }, 1000)
      }
    },
    loginGoogle () {
      // 必须获取到clientId才可以进行下一步
      var that = this
      if (!this.googleAuth2) {
        setTimeout(function () {
          that.loginGoogle()
        }, 1000)
      } else {
        (function googleSign () {
          that.googleAuth2.signIn().then((googleUser) => {
            that.params.platform = 'GOOGLE'
            that.params.os = that.currentOs
            that.params.clientId = that.clientId
            that.params.accessToken = googleUser.getAuthResponse().id_token
            that.$store.dispatch('doH5Login', that.params).then(() => {
              that.visible = false
              that.callback(that)
            }).catch(() => {
              that.callback(that, false)
              that.loginWayList.forEach((item, index) => {
                that.$set(item, 'isActive', false)
              })
            })
          }).catch((error) => {
            // ie没有权限的情况才进行递归
            if (error.number === -2146828218) {
              googleSign()
            }
          })
        })()
      }
    },
    loginGuest () {
      this.params.platform = 'GUEST'
      this.params.os = this.currentOs
      this.params.clientId = this.clientId
      // this.doH5Login(this.params)
      this.$store.dispatch('doH5Login', this.params).then((res) => {
        this.visible = false
        this.callback(this)
      }).catch((err) => {
        console.log(err)
        this.loginWayList.forEach((item, index) => {
          this.$set(item, 'isActive', false)
        })
        this.callback(this, false)
      })
    },
    // 公用登录，登录H5服务端
    doH5Login (params) {
      login(params).then(res => {
        if (res.data) {
          if (res.code === 200) {
            // setCookie('sdkToken', res.data.sdkToken, 6)
            // setCookie('h5Token', res.data.h5Token, 6)
            // setCookie('sdkUserId', res.data.userId, 6)
            CookieUtil.getInstance().setEncryptH5Token2Cookie(res.data.h5Token, 6)
            CookieUtil.getInstance().setEncryptSdkToken2Cookie(res.data.sdkToken, 6)
            CookieUtil.getInstance().setSdkUserId2Cookie(res.data.userId, 6)
            CookieUtil.getInstance().setLoginPlatform2Cookie(params.platform, 6)
          }
        }
      }, error => {
        console.log(error)
      })
    }
  },
  created () {
    this.params = {
      sdkVer: loginParam.sdkVer,
      sdkType: loginParam.sdkType,
      runPlatform: loginParam.runPlatform
    }
  },
  beforeMount () {
  },
  mounted () {
    this.initialize()
  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () {

  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}
img {
  max-width: 100%;
}
.clearfix:after {
  content: '';
  display: table;
  clear: both;
}
.op0 {
  opacity: 0;
}

html,
body {
  height: 100%;
}
body {
  width: 100%;
  font-size: 10px;
  font-family: 'Arial';
  color: #ffffff;
}

/*弹窗*/
.mobile-mask,
.mobile-mask2 {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
.mobile-mask2 {
  background-color: #ffffff;
}
.mobile-pop,
.mobile-bind-pop,
.mobile-pay-pop {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 286px;
  margin: auto;
  background-color: #ffffff;
  z-index: 1000;
  overflow: hidden;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.mobile_payPop {
  height: 250px;
}
.mobile-top {
  // position: relative;
  height: 133px;
  text-align: center;
  background: url('../../../assets/img/top-bg.png') no-repeat;
  background-size: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  .mobile-top-close {
    width: 15px;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
    img {
      height: 15px;
    }
  }
  .mobile-top-login {
    color: rgba(0, 160, 233, 1);
    font-size: 14px;
    position: absolute;
    top: 112px;
    left: 126px;
    height: 15px;
    line-height: 15px;
    width: 36px;
    text-align: center;
  }
}
.mobile-content {
  margin: 0 30px 20px 30px;
  min-height: 80px;
  max-height: 150px;
  .mobile-content-item {
    width: 60px;
    margin-right: 22px;
    display: inline-block;
    margin-top: 11px;
    div {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      box-shadow: 0px 1px 10px 0px rgba(102, 102, 102, 0.15);
      overflow: hidden;
      margin: auto;
    }
    img {
      width: 50px;
    }
    p {
      width: 60px;
      // height: 30px;
      text-align: center;
      color: rgba(153, 153, 153, 1);
      font-size: 10px;
      margin-top: 8px;
      overflow: hidden;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.bottom-none {
  margin-bottom: 0;
}
.mobile-footer {
  .footer-background {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .footer-pull {
    width: 13px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin-left: -6px;
  }
  .show-class {
    transform: rotate(180deg);
  }
}
.mobile-return {
  position: absolute;
  top: 10px;
  left: 12px;
  width: 21px;
  height: 21px;
  background: url('../../../assets/img/return.png') no-repeat;
  background-size: 100% 100%;
}
.mobile-logo {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  background: url('../../../assets/img/login-logo.png') no-repeat;
  background-size: 100% 100%;
}
.mobile-title {
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  letter-spacing: 2px;
}
.mobile-line {
  width: 96%;
  height: 1px;
  border-bottom: 1.5px solid rgba(254, 252, 251, 0.3);
  margin: 0 auto;
}
.mobile-box,
.mobile-payBox {
  width: 93%;
  height: 158.5px;
  padding-bottom: 20px;
  margin-left: 3.5%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.mobile-payBox {
  height: 208.5px;
}
.mobile-btn {
  float: left;
  margin-left: 3.2%;
  width: 45.16%;
  height: 30px;
  margin-top: 16px;
}

/*页面绑定*/
.mobile-nav {
  position: relative;
  width: 100%;
  height: 40px;
  background: url('../../../assets/img/nav_bg.png') no-repeat;
  background-size: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.mobile-return2 {
  position: absolute;
  left: 16px;
  top: 8px;
  width: 7.97%;
  height: 24px;
  background: url('../../../assets/img/return2.png') no-repeat;
  background-size: 100% 100%;
}
.mobile-nav p {
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  line-height: 40px;
  font-weight: bold;
}
.mobile-bind-box {
  margin-top: 80px;
  width: 80%;
  max-height: 280px;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;
  padding-bottom: 20px;
}
.mobile-bind-input {
  width: 100%;
  height: 36px;
  overflow: hidden;
  color: #1787dd;
  background-color: #e5e5e5;
  margin-bottom: 15px;
}
.mobile-bind-input span {
  float: left;
  width: 28%;
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  text-align: right;
  font-weight: bold;
}
.mobile-bind-input input {
  float: left;
  width: 51%;
  height: 36px;
  line-height: 36px;
  text-indent: 5px;
  background-color: transparent;
  color: #1787dd;
}
.mobile-bind-btn {
  float: right;
  width: 18%;
  height: 22px;
  margin-top: 7px;
  text-align: center;
  margin-right: 3%;
  background: url('../../../assets/img/bind.png') no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  font-size: 10px;
  font-weight: bold;
}
.mobile-bind-account,
.mobile-bind-change {
  margin-top: 20px;
  float: left;
  width: 48%;
  height: 33px;
  text-align: center;
  color: #ffffff;
  line-height: 33px;
  font-weight: bold;
  font-size: 13px;
  background: url('../../../assets/img/btn.png') no-repeat;
  background-size: 100% 100%;
}
.mobile-bind-change {
  margin-left: 4%;
}
.mobile-bind-pop {
  width: 90%;
  height: 160px;
  background-color: #ffffff;
}
.mobile-bind-title {
  text-align: center;
  line-height: 36px;
  height: 36px;
  background: url('../../../assets/img/nav_bg.png') no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
}
.mobile-bind-pop p {
  width: 88%;
  margin: 10px auto 0;
  font-size: 12px;
  line-height: 15px;
  height: 60px;
  color: #1787dd;
}
.mobile-bind-popBtn {
  width: 90%;
  margin: auto;
}
.mobile-bind-popBtn button {
  margin-top: 10px;
}

/*支付渠道*/
.mobile-close {
  position: absolute;
  top: 8px;
  right: 16px;
  width: 7.97%;
  height: 24px;
  background: url('../../../assets/img/close.png') no-repeat;
  background-size: 100% 100%;
  z-index: 100;
}
.mobile-iframe {
  width: 100%;
  height: 90%;
  -webkit-height: calc(100% - 40px);
  -webkit-height: calc(100% - 40px);
  -webkit-height: calc(100% - 40px);
}
.mobile-iframe iframe {
  width: 100%;
  height: 100%;
}
.mobile-pay-pop {
  width: 80%;
  height: 130px;
  background-color: #ffffff;
  text-align: center;
}
.mobile-imgCenter {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.mobile-imgCenter img {
  display: inline-block;
  vertical-align: middle;
  width: 16.875%;
  height: 40px;
  margin-right: 10px;
}
.mobile-imgCenter span {
  display: inline-block;
  vertical-align: middle;
  font-size: 13px;
  font-weight: 600;
  color: #6b5e5e;
}

/*横屏显示*/
@media screen and (orientation: landscape) {
  // .mobile-pop {
  //   width: 200px;
  // }
}
// @media screen and (min-aspect-ratio: 13/8) {
//   .mobile-pop,
//   .mobile-bind-pop {
//     width: 70%;
//     height: 130px;
//   }
//   .mobile-box,
//   .mobile-payBox {
//     height: 90px;
//   }
//   .mobile-bind-box {
//     margin-top: 20px;
//     max-height: 100px;
//   }
//   .mobile-top {
//     height: 28px;
//   }
//   .mobile-return {
//     top: 5px;
//     left: 3%;
//     height: 21px;
//   }
//   .mobile-logo {
//     height: 20px;
//   }
//   .mobile-title,
//   .mobile-nav p,
//   .mobile-bind-title {
//     height: 28px;
//     line-height: 28px;
//     font-size: 13px;
//   }
//   .mobile-line,
//   .mobile-nav {
//     border-bottom: 1px solid rgba(254, 252, 251, 0.3);
//   }
//   .mobile-btn {
//     margin-left: 5%;
//     width: 42.5%;
//     height: 24px;
//     margin-top: 18px;
//   }
//   .mobile-nav {
//     height: 28px;
//   }
//   .mobile-return2,
//   .mobile-close {
//     width: 6%;
//     height: 18px;
//     top: 5px;
//   }
//   .mobile-bind-box {
//     width: 70%;
//   }
//   .mobile-bind-input {
//     height: 26px;
//     margin-bottom: 12px;
//   }
//   .mobile-bind-input span {
//     width: 24%;
//     height: 26px;
//     line-height: 26px;
//     font-size: 10px;
//   }
//   .mobile-bind-input input {
//     width: 60%;
//     height: 26px;
//     line-height: 26px;
//   }
//   .mobile-bind-btn {
//     width: 13%;
//     height: 16px;
//     margin-top: 5px;
//     font-size: 6px;
//     -webkit-border-radius: 5px;
//     border-radius: 5px;
//   }
//   .mobile-bind-account,
//   .mobile-bind-change {
//     margin-top: 5px;
//     height: 22px;
//     line-height: 22px;
//     font-size: 9px;
//   }
//   .mobile-bind-pop p {
//     font-size: 9px;
//     line-height: 12px;
//     height: 46px;
//   }
//   .mobile-iframe {
//     height: 90%;
//     -webkit-height: calc(100% - 28px);
//     -moz-height: calc(100% - 28px);
//     height: calc(100% - 28px);
//   }
//   .mobile-pay-pop {
//     width: 60%;
//     height: 60px;
//   }
//   .mobile-imgCenter img {
//     width: 11%;
//     height: 22px;
//     margin-right: 6px;
//   }
//   .mobile-imgCenter span {
//     font-size: 11px;
//   }
// }
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.1s;
}
.toast-enter,
.toast-leave-to {
  opacity: 0;
}
.show-all-login {
  max-height: none !important;
}
</style>
