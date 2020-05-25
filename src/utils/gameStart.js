/**
 * 开始游戏
 * @module src/utils/gameStart.js
 * @desc 项目内的滚动图，二次封装，基于swiper进行二次封装
 * @author Dicky_L
 * @date 2018-3-20
 * @param {Boolean} isLogin --- 登录状态
 * @param {Number} appId --- 游戏id
 * @param {String} appName --- 游戏名(可不传)
 * @param {String} [url] --- 游戏链接
 * @param {obj} self --- 调用此方法的对象
 * @example 调用示例
 *    gameStart(isLogin, appId, appName, url, self)
 */

import * as postMessageEvent from '@/config/postMessageEvent'
import * as services from '@/services'
import * as constVar from '@/config/const'
import store from '@/store'
import loginBox from '@/containers/PersonalCenter/Login/index.js'
import getCookie from '@/utils/getCookie'
import {
  USER_STATUS_FREEZE,
  SET_USER_INFO
} from '@/store/mutationTypes'
var userObj = {}
export function setAccountFreeze(store) {
  store.subscribe((mutation, state) => {
    if (mutation.type === SET_USER_INFO) {
      userObj = state.user.userObj
    }
  })
}

function gameStart(isLogin, appId, appName, url, self, goBackType, isPlayOtherGame) {
  console.warn('isLogin:::', self.isLogin, 'appId:::', appId)

  const loginCallBack = () => {
    var appIconUrl = ''
    const obj = {
      appId,
      userId: userObj.userId
    }
    // 发送游戏信息到PC端显示
    services.getAppDetail(obj).then(res => {
      let hasRotate = false
      if (res.data.userStatus === constVar.USER_ACCOUNT_FREEZE) {
        self.$store.dispatch('accountFreeze', true)
        if (goBackType === constVar.COME_FROM_OUTER) {
          self.$router.push({
            name: 'Home'
          })
        }
        return false
      }
      appIconUrl = res.data.appIconUrl
      if (isPlayOtherGame) {
        self.$router.replace({
          name: 'IframeWrapper',
          query: {
            appId: appId,
            appIconUrl: appIconUrl,
            appName: res.data.appName,
            t: +new Date()
          }
        })
      } else {
        self.$router.push({
          name: 'IframeWrapper',
          query: {
            appId: appId,
            appIconUrl: appIconUrl,
            appName: res.data.appName
          }
        })
      }
      if (res.data.screenType === constVar.IFRAME_VERTICAL) {
        hasRotate = true
      }
      top.postMessage(
        JSON.stringify({
          cmd: postMessageEvent.PLAYING_GAME,
          data: {
            appId: appId,
            isPlaying: true,
            gameName: res.data.appName,
            hasRotate
          }
        }),
        '*'
      )
    })
  }

  if (store.state.user.isLogin) {
    loginCallBack()
  } else {
    loginBox({
      closeBtn: goBackType !== constVar.COME_FROM_OUTER
    }).then(() => {
      loginCallBack()
    }).catch(err => console.log(err))
  }

}

export default gameStart
