import {
  SET_USER_INFO,
  INCREMENT,
  RESET,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SHOW_LOGIN_POPUP,
  TRIGGER_LOGIN,
  HIDE_LOGIN_POPUP,
  PLAYING_GAME,
  NO_PLAYING_GAME,
  CLEAR_CALLBACK,
  SET_CALLBACK,
  PLAYING_GAME_APPID,
  PLAYING_GAME_APPNAME,
  ACCOUNT_FREEZE,
  // USER_STATUS_FREEZE
  IS_SHOW_POPUP,
  SET_PRIVACY_URL,
  IS_FORCED_CIRCLE,
  IS_FLOAT_SERVICE,
  IS_EXIT_GAME,
  IS_LEAVE_GAME,
  FROM_QR,
  NOT_FROM_QR,
  LEAVE_GAME_ROUTER,
  IS_PC_POST_EVENT,
  IS_SHARE_CHANNEL,
  SET_RELOGIN_WATCH
} from '@/store/mutationTypes'
import {
  login,
  logout,
  getPersonCenter
} from '@/services'
import getCookie from '@/utils/getCookie'
import CookieUtil from '@/utils/CookieUtil'
import getCurrentOs from '@/utils/getCurrentOs'
import {
  loginParam
} from '@/config/env'
import * as postMessageEvent from '@/config/postMessageEvent'
import {
  viewPage
} from '@/business_modules/apis/viewPage'
import * as anConst from '@/config/analyticsConst.js'

// linux上building出现问题，提示 defaultVal moudule not found
// import * as defaultVal from '@/config/defaultval'

import defaultIcon2 from '@/assets/img/default_icon3.png'
import * as constVar from '@/config/const'
import gameStart from '@/utils/gameStart'
import StoreUtil from '@/utils/StoreUtil'
import * as AnalyticsEnv from '@/business_modules/apis/analyticsEnv'
import setCookie from '@/utils/setCookie'

const state = {
  reLoginWatch: false,
  count: 0,
  isLogin: false,
  todos: [{
    id: 1,
    text: '...',
    done: true
  },
  {
    id: 2,
    text: '...',
    done: false
  }
  ],
  showLoginPopup: false,
  isPlaying: false,
  userObj: null,
  triggerLogin: false,
  callback: null,
  callbackObj: null,
  appId: 0,
  isAccountFreeze: false,
  // userStatus: 1
  isShowPopup: false,
  privacyUrl: '-1',
  isForcedCircle: false,
  isService: false,
  isExitGame: false,
  isLeaveGame: false,
  isFromQR: false,
  leaveGameRouter: {
    name: 'Home'
  },
  isPcPostEvent: false,
  isShareChannel: false,
  appName: ''
}
// let _this = this
var userInfo = {}

const actions = {
  doH5Login ({
    commit,
    state
  }, params) {
    return new Promise((resolve, reject) => {
      // actions.logout({commit, state})

      // 记录二次登录进入
      commit(SET_RELOGIN_WATCH, true)

      params.browser = AnalyticsEnv.getBrowser()
      params.browserVersion = AnalyticsEnv.getBrowserVersion()
      params.browserType = AnalyticsEnv.getBrowserType()
      login(params).then(

        async res => {
          if (res.data) {
            if (res.code === 200) {
              // logout操作
              // actions.logout({commit, state}, params, res)
              // logout begin ///////////////
              // StoreUtil.getInstance().setItemToSSCookie(constVar.COOKIE_USER_STATUS, res.data.userStatus)
              // 初始登录触发事件将值保存在userStatus，再次自动登录将执行userInit()方法
              // commit(USER_STATUS_FREEZE, res.data.userStatus)
              var paramsOri = {}
              paramsOri.h5Token = CookieUtil.getInstance().getDecryptH5TokenFromCookie()
              paramsOri.userId = CookieUtil.getInstance().getSdkUserIdFromCookie()
              // Updated by Zping on 20180611
              paramsOri.clientId = StoreUtil.getInstance().getItemFromLSCookie(constVar.CLIENT_ID)

              paramsOri.runPlatform = loginParam.runPlatform
              var h5TokenFromCookie = CookieUtil.getInstance().getH5TokenFromCookie()
              if (
                paramsOri.h5Token &&
                  paramsOri.userId &&
                  paramsOri.clientId &&
                  CookieUtil.getInstance().getDecryptH5TokenFromCookie(h5TokenFromCookie) !==
                  CookieUtil.getInstance().getDecryptH5TokenFromCookie(res.data.h5Token)
              ) {
                // 只对h5Token不为空且拥有不同h5Token的用户进行登出，否则有可能登录成功后立即logout了这个用户
                // cookie中的h5Token与登录后h5Token相等的情况下如果logout则会登出已经登录的用户
                // 同时向父窗口以及同级窗口发送通知
                // 1.父窗口
                if (top.location !== self.location) {
                  // 判断到是处于iframe中，向父窗口发消息
                  top.postMessage(
                    JSON.stringify({
                      cmd: postMessageEvent.CHANGE_LOGIN_STATUS,
                      data: {
                        isLogin: false
                      }
                    }),
                    '*'
                  )
                }

                // 2.同级窗口
                window.postMessage(
                  JSON.stringify({
                    cmd: postMessageEvent.CHANGE_LOGIN_STATUS,
                    data: {
                      isLogin: false
                    }
                  }),
                  '*'
                )
                // postmessage end
                commit(LOGOUT_SUCCESS)
                logout(paramsOri).then(
                  res => {
                    if (res.code === 200) {}
                  },
                  error => {
                    console.log(error)
                  }
                )
              }
              /// logout end ///////////////

              // Updated by Zping on 20180611
              // 尝试写session，无痕模式不支持的情况下写cookie
              StoreUtil.getInstance().setItemToSSCookie('isLogin', true)
              // End
              // setCookie('sdkToken', res.data.sdkToken, 6)
              // setCookie('h5Token', res.data.h5Token, 6)
              // setCookie('sdkUserId', res.data.userId, 6)
              // setCookie('loginPlatform', params.platform, 6)
              CookieUtil.getInstance().setEncryptH5Token2Cookie(res.data.h5Token, 6)
              CookieUtil.getInstance().setEncryptSdkToken2Cookie(res.data.sdkToken, 6)
              CookieUtil.getInstance().setSdkUserId2Cookie(res.data.userId, 6)
              CookieUtil.getInstance().setLoginPlatform2Cookie(params.platform, 6)

              // 登录成功后获取用户信息存储在全局变量当中
              var privacyUrlCookie = getCookie('privacyUrl')
              var userParams = {}
              if (!res.data.privacyUrl || res.data.privacyUrl === '' || res.data.privacyUrl === '-1') {
                if (privacyUrlCookie === '-1' || privacyUrlCookie === undefined) {
                  commit(SET_PRIVACY_URL, '-1')
                  setCookie('privacyUrl', '-1')
                }
              } else {
                commit(SET_PRIVACY_URL, res.data.privacyUrl)
                setCookie('privacyUrl', res.data.privacyUrl)
              }
              userParams.userId = res.data.userId
              userParams.userToken = CookieUtil.getInstance().getDecryptH5TokenFromCookie(res.data.h5Token)
              getPersonCenter(userParams).then(userInfoRes => {
                if (userInfoRes.code === 200) {
                  // 切换账号保存信息
                  const iconUrl = userInfoRes.data.iconUrl
                  const nickname = userInfoRes.data.nickname
                  const email = userInfoRes.data.email
                  // const genderValue = userInfo.data.genderValue
                  // const birthdate = userInfo.data.birthdate
                  // const mobile = userInfo.data.mobile
                  // const industryValue = userInfo.data.industryValue
                  // Updated by Zping on 20180611
                  // 尝试写session，无痕模式不支持的情况下写cookie
                  StoreUtil.getInstance().setItemToSSCookie(constVar.SESSION_ICON_URL, iconUrl)
                  StoreUtil.getInstance().setItemToSSCookie(constVar.SESSION_NICKNAME, nickname)
                  StoreUtil.getInstance().setItemToSSCookie(constVar.SESSION_EMAIL, email)
                  // End

                  userInfo.nickname = nickname === 'null' || !nickname ? 'Guest' : nickname
                  userInfo.iconUrl = iconUrl === 'null' || !iconUrl ? defaultIcon2 : iconUrl
                  userInfo.email = email === 'null' || !email ? '' : email
                  // userInfo.genderValue = genderValue === 'null' || !genderValue ? '' : genderValue
                  // userInfo.birthdate = birthdate === 'null' || !birthdate ? '' : birthdate
                  // userInfo.mobile = mobile === 'null' || !mobile ? '' : mobile
                  // userInfo.industryValue = industryValue === 'null' || !industryValue ? '' : industryValue
                  userInfo.userId = res.data.userId
                  userInfo.h5Token = CookieUtil.getInstance().getDecryptH5TokenFromCookie(res.data.h5Token)
                  userInfo.sdkToken = CookieUtil.getInstance().getDecryptSdkTokenFromCookie(res.data.sdkToken)
                  commit(SET_USER_INFO, userInfo)
                  top.postMessage(
                    JSON.stringify({
                      cmd: postMessageEvent.USER_INFO,
                      data: {
                        userInfo: userInfo,
                        isLogin: true
                      }
                    }),
                    '*'
                  )
                }
              })

              // 登录状态延时，隐私政策出现
              commit(LOGIN_SUCCESS)
              commit(HIDE_LOGIN_POPUP)

              console.log('H5_API_FLAG_IS_FROM_QR', getCookie(constVar.H5_API_FLAG_IS_FROM_QR))
              console.log('H5_API_FLAG_IS_FROM_QR===1', parseInt(getCookie(constVar.H5_API_FLAG_IS_FROM_QR)) === 1)
              console.log('H5_API_FLAG_IS_FROM_QR===undefiend', getCookie(constVar.H5_API_FLAG_IS_FROM_QR))
              console.log('H5_API_FLAG_IS_FROM_QR-flag', getCookie(constVar.H5_API_FLAG_IS_FROM_QR) &&
                  parseInt(getCookie(constVar.H5_API_FLAG_IS_FROM_QR)) === 1)
              if (
                getCookie(constVar.H5_API_FLAG_IS_FROM_QR) &&
                  parseInt(getCookie(constVar.H5_API_FLAG_IS_FROM_QR)) === 1
              ) {
                console.log('H5_API_FLAG_IS_FROM_QR')
                commit(FROM_QR)
                viewPage(21, 'ComeFromQR')
              } else {
                commit(NOT_FROM_QR)
              }
              CookieUtil.clearCookie(constVar.H5_API_FLAG_IS_FROM_QR)
              // TRIGGER_LOGIN用于弹出登陆成功消息提醒
              commit(TRIGGER_LOGIN, true)
              // 同时向父窗口以及同级窗口发送通知
              // 1.父窗口
              if (top.location !== self.location) {
                // 判断到是处于iframe中，向父窗口发消息
                console.log('--------iframe------------------------')
                top.postMessage(
                  JSON.stringify({
                    cmd: postMessageEvent.CHANGE_LOGIN_STATUS,
                    data: {
                      isLogin: true,
                      sdkToken: CookieUtil.getInstance().getDecryptSdkTokenFromCookie(res.data.sdkToken),
                      h5Token: CookieUtil.getInstance().getDecryptH5TokenFromCookie(res.data.h5Token),
                      userId: res.data.userId
                    }
                  }),
                  '*'
                )
              }

              // 2.同级窗口
              window.postMessage(
                JSON.stringify({
                  cmd: postMessageEvent.CHANGE_LOGIN_STATUS,
                  data: {
                    isLogin: true,
                    sdkToken: CookieUtil.getInstance().getDecryptSdkTokenFromCookie(res.data.sdkToken),
                    h5Token: CookieUtil.getInstance().getDecryptH5TokenFromCookie(res.data.h5Token),
                    userId: res.data.userId
                  }
                }),
                '*'
              )

              // 登录成功后所做的一些公用方法
              // const awaitSomething = () => {
              //   return new Promise((resolve, reject) => {
              //     setTimeout(() => {
              //       resolve()
              //     }, 1000)
              //   })
              // }
              // await awaitSomething()
              resolve() // 确定commit token后才执行resolve
            } else if (
              res.code === constVar.H5_API_CODE_TOKEN_INVALID ||
                res.code === '' + constVar.H5_API_CODE_TOKEN_INVALID
            ) {
              // token已失效处理
              // 清空session以及cookie中的登录信息
              CookieUtil.getInstance().clearLoginInfo()
              sessionStorage.removeItem(constVar.SESSION_NICKNAME)
              sessionStorage.removeItem(constVar.SESSION_ICON_URL)
              sessionStorage.removeItem(constVar.SESSION_IS_LOGIN)
              // 强行刷新页面
              // parent.location.reload()
              // token已失效，重新弹出登录页面
              // commit(SHOW_LOGIN_POPUP)
            }

            // 开始游戏前登陆，判断如果有callbackobj，登陆成功后直接进入游戏
            if (state.callbackObj) {
              gameStart(
                state.isLogin,
                state.callbackObj.appId,
                state.callbackObj.appName,
                state.callbackObj.url,
                state.callbackObj.self,
                state.callbackObj.goBackType,
                state.callbackObj.isPlayOtherGame
              )
              commit(CLEAR_CALLBACK)
            }
          } else if (res.code !== 200) {
            reject(res.msg)
          }

          // 记录二次登录结束
          commit(SET_RELOGIN_WATCH, false)
        },
        error => {
          commit(SET_RELOGIN_WATCH, false)
          console.log(error)
          reject(error)
        }
      )
    })
  },

  // logout ({commit, state}, loginParams, res) {
  //   // commit(LOGOUT_SUCCESS)// only for test, to be deleted
  //   var paramsOri = {}
  //   paramsOri.h5Token = CookieUtil.getInstance().getDecryptH5TokenFromCookie()
  //   paramsOri.userId = CookieUtil.getInstance().getSdkUserIdFromCookie()
  //   paramsOri.clientId = localStorage.getItem('clientId')
  //   paramsOri.runPlatform = loginParam.runPlatform

  //   if (!paramsOri.h5Token || !paramsOri.userId || !paramsOri.clientId || !paramsOri.runPlatform) {
  //     return
  //   }
  //   // 只对h5Token不为空且拥有不同h5Token的用户进行登出，否则有可能登录成功后立即logout了这个用户
  //   // cookie中的h5Token与登录后h5Token相等的情况下如果logout则会登出已经登录的用户
  //   if (CookieUtil.getInstance().getH5TokenFromCookie() !== res.data.h5Token) {
  //     // 同时向父窗口以及同级窗口发送通知
  //     // 1.父窗口
  //     if (top.location !== self.location) {
  //       // 判断到是处于iframe中，向父窗口发消息
  //       console.log('--------iframe------------------------')
  //       top.postMessage(JSON.stringify({
  //         cmd: postMessageEvent.CHANGE_LOGIN_STATUS,
  //         data: {
  //           isLogin: false
  //         }
  //       }), '*')
  //     }

  //     // 2.同级窗口
  //     window.postMessage(JSON.stringify({
  //       cmd: postMessageEvent.CHANGE_LOGIN_STATUS,
  //       data: {
  //         isLogin: false
  //       }
  //     }), '*')
  //     // postmessage end
  //     console.log('logout...')

  //     commit(LOGOUT_SUCCESS)
  //     logout(paramsOri).then(res => {
  //       if (res.code === 200) {
  //         console.log('Logout successfully...')
  //       }
  //     }, error => {
  //       console.log(error)
  //     })
  //   }
  // },

  userInit ({
    commit,
    state
  }) {
    // 检查session storage中登录标识位
    let userInfo = {
      nickname: 'Guest',
      iconUrl: defaultIcon2
    }
    if (window.sessionStorage) {
      // if (sessionStorage.getItem(constVar.SESSION_IS_LOGIN) && getCookie(constVar.H5_API_FLAG_IS_FROM_QR) !== 1 && getCookie(constVar.H5_API_FLAG_IS_FROM_QR) !== '1') {
      if (
        StoreUtil.getInstance().getItemFromSSCookie(constVar.SESSION_IS_LOGIN) &&
        getCookie(constVar.H5_API_FLAG_IS_FROM_QR) !== 1 &&
        getCookie(constVar.H5_API_FLAG_IS_FROM_QR) !== '1'
        // parseInt(StoreUtil.getInstance().getItemFromSSCookie(constVar.COOKIE_USER_STATUS)) === 1
      ) {
        // 已经登录，只是发通知，不做后台请求
        commit(LOGIN_SUCCESS)
        let nickname = StoreUtil.getInstance().getItemFromSSCookie(constVar.SESSION_NICKNAME)
        let iconUrl = StoreUtil.getInstance().getItemFromSSCookie(constVar.SESSION_ICON_URL)
        let email = StoreUtil.getInstance().getItemFromSSCookie(constVar.SESSION_EMAIL)
        let clientId = StoreUtil.getInstance().getItemFromLSCookie(constVar.LOCALSTORAGE_CLIENT)
        // let userStatus = StoreUtil.getInstance().getItemFromSSCookie(constVar.COOKIE_USER_STATUS)
        userInfo.nickname = nickname === 'null' || !nickname ? 'Guest' : nickname
        userInfo.iconUrl = iconUrl === 'null' || !iconUrl ? defaultIcon2 : iconUrl
        userInfo.email = email === 'null' || !email ? '' : email
        userInfo.clientId = clientId === 'null' || !clientId ? '' : clientId
        // commit(USER_STATUS_FREEZE, JSON.parse(userStatus))
        userInfo.userId = CookieUtil.getInstance().getSdkUserIdFromCookie()
        userInfo.h5Token = CookieUtil.getInstance().getDecryptH5TokenFromCookie()
        userInfo.sdkToken = CookieUtil.getInstance().getDecryptSdkTokenFromCookie()
        // userInfo.privacyUrl = StoreUtil.getInstance().getItemFromLSCookie('privacyUrl')
        // 已经登录，向pc端父级发送通知
        top.postMessage(
          JSON.stringify({
            cmd: postMessageEvent.USER_INFO,
            data: {
              userInfo: userInfo,
              isLogin: true
            }
          }),
          '*'
        )
      } else {
        actions.reLogin({
          commit,
          state
        })
      }
    }
    commit(SET_PRIVACY_URL, getCookie('privacyUrl'))
    commit(SET_USER_INFO, userInfo)
  },

  // 二次登录
  reLogin ({
    commit,
    state
  }) {
    var aH5Token = CookieUtil.getInstance().getDecryptH5TokenFromCookie()
    // cookie中有值才做处理，无值代表还没有登录，什么都不做
    if (aH5Token) {
      var aSdkToken = CookieUtil.getInstance().getDecryptSdkTokenFromCookie()
      var sdkUserId = CookieUtil.getInstance().getSdkUserIdFromCookie()
      var loginPlatform = CookieUtil.getInstance().getLoginPlatformFromCookie()
      // var privacyUrl = StoreUtil.getInstance().getItemFromLSCookie('privacyUrl')
      var params = {}
      params.sdkVer = loginParam.sdkVer
      params.sdkType = loginParam.sdkType
      params.runPlatform = loginParam.runPlatform
      params.platform = loginPlatform
      params.userId = sdkUserId
      params.sdkToken = aSdkToken
      params.h5Token = aH5Token
      // params.privacyUrl = privacyUrl
      // Updated by Zping on 20180611
      params.clientId = StoreUtil.getInstance().getItemFromLSCookie(constVar.CLIENT_ID)
      params.os = getCurrentOs()
      params.v = new Date().getTime()

      actions.doH5Login({
        commit,
        state
      },
      params
      )
    }
  },

  changePlayingStatus ({
    commit
  }, {
    isPlaying
  }) {
    if (isPlaying) {
      commit(PLAYING_GAME)
    } else {
      commit(NO_PLAYING_GAME)
    }
  },
  setPlayingAppId ({
    commit
  }, {
    appId
  }) {
    if (appId) {
      commit(PLAYING_GAME_APPID, appId)
    }
  },
  showLoginPopup ({
    commit,
    state
  }, obj) {
    viewPage(anConst.SIGN_IN_PAGE_ID, anConst.SIGN_IN_PAGE_NAME)
    viewPage(anConst.SIGN_UP_PAGE_ID, anConst.SIGN_UP_PAGE_NAME)
    commit(SHOW_LOGIN_POPUP)
    if (obj) {
      commit(SET_CALLBACK, obj)
    }
  },

  hideLoginPopup ({
    commit,
    state
  }) {
    commit(HIDE_LOGIN_POPUP)
  },
  accountFreeze ({
    commit,
    state
  }, isFeeze) {
    commit(ACCOUNT_FREEZE, isFeeze)
  },
  increment ({
    commit,
    state
  }) {
    if (state.count >= 6) {
      commit(RESET)
    }
    commit(INCREMENT)
  },
  setFromQr ({
    commit,
    state
  }, isFromQR) {
    isFromQR ? commit(FROM_QR) : commit(NOT_FROM_QR)
  },
  isShowPopup ({
    commit,
    state
  }, {
    isShowPopup
  }) {
    commit(IS_SHOW_POPUP, isShowPopup)
  },
  setPrivacyUrl ({
    commit,
    state
  }, {
    privacyUrl
  }) {
    commit(SET_PRIVACY_URL, privacyUrl)
  },
  updateUserInfo ({
    commit
  }, {
    userObj
  }) {
    if (userObj) {
      commit(SET_USER_INFO, userObj)
    }
  },
  changeCircleState ({
    commit,
    state
  }, {
    isForcedCircle
  }) {
    commit(IS_FORCED_CIRCLE, isForcedCircle)
  },
  isFloatService ({
    commit,
    state
  }, {
    isService
  }) {
    commit(IS_FLOAT_SERVICE, isService)
  },
  setExitGameStatus ({
    commit,
    state
  }, {
    isExitGame
  }) {
    commit(IS_EXIT_GAME, isExitGame)
  },
  setLeaveGameStatus ({
    commit,
    state
  }, {
    isLeaveGame
  }) {
    commit(IS_LEAVE_GAME, isLeaveGame)
  },
  setLeaveGameRouter ({
    commit,
    state
  }, leaveGameRouter) {
    commit(LEAVE_GAME_ROUTER, leaveGameRouter)
  },
  setPcPostEventStatus ({
    commit,
    state
  }, {
    isPcPostEvent
  }) {
    commit(IS_PC_POST_EVENT, isPcPostEvent)
  },
  setShareChannelStatus ({
    commit,
    state
  }, {
    isShareChannel
  }) {
    commit(IS_SHARE_CHANNEL, isShareChannel)
  }
}

const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}

const mutations = {
  [INCREMENT] (state) {
    state.count++
  },
  [RESET] (state) {
    state.count = 0
  },
  [LOGIN_SUCCESS] (state) {
    state.isLogin = true
  },
  [SET_USER_INFO] (state, userInfo) {
    state.userObj = userInfo
  },
  [SET_RELOGIN_WATCH] (state, reLoginWatch) {
    state.reLoginWatch = reLoginWatch
  },
  [LOGOUT_SUCCESS] (state) {
    state.isLogin = false
  },
  [SHOW_LOGIN_POPUP] (state) {
    state.showLoginPopup = true
  },
  [HIDE_LOGIN_POPUP] (state) {
    state.showLoginPopup = false
  },
  [PLAYING_GAME_APPID] (state, appId) {
    state.appId = appId
  },
  [PLAYING_GAME_APPNAME] (state, appName) {
    state.appName = appName
  },
  [PLAYING_GAME] (state) {
    state.isPlaying = true
  },
  [NO_PLAYING_GAME] (state) {
    state.isPlaying = false
  },
  [TRIGGER_LOGIN] (state, loginAct) {
    state.triggerLogin = loginAct
  },
  [CLEAR_CALLBACK] (state) {
    state.callback = null
  },
  [SET_CALLBACK] (state, obj) {
    state.callbackObj = obj
  },
  [ACCOUNT_FREEZE] (state, isFreeze) {
    state.isAccountFreeze = isFreeze
  },
  [IS_SHOW_POPUP] (state, isShowPopup) {
    state.isShowPopup = isShowPopup
  },
  [SET_PRIVACY_URL] (state, privacyUrl) {
    state.privacyUrl = privacyUrl
  },
  [IS_FORCED_CIRCLE] (state, isForcedCircle) {
    state.isForcedCircle = isForcedCircle
  },
  [IS_FLOAT_SERVICE] (state, isService) {
    state.isService = isService
  },
  [IS_EXIT_GAME] (state, isExitGame) {
    state.isExitGame = isExitGame
  },
  [IS_LEAVE_GAME] (state, isLeaveGame) {
    state.isLeaveGame = isLeaveGame
  },
  [FROM_QR] (state) {
    state.isFromQR = true
  },
  [NOT_FROM_QR] (state) {
    state.isFromQR = false
  },
  [LEAVE_GAME_ROUTER] (state, leaveGameRouter) {
    state.leaveGameRouter = leaveGameRouter
  },
  [IS_PC_POST_EVENT] (state, isPcPostEvent) {
    state.isPcPostEvent = isPcPostEvent
  },
  [IS_SHARE_CHANNEL] (state, isShareChannel) {
    state.isShareChannel = isShareChannel
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
