import * as muTypes from '@/store/mutationTypes'
import { setRedDotRead } from '@/services'
import getCookie from '@/utils/getCookie'
import isNull from '@/utils/filters/isNull'
import * as constVar from '@/config/const'
import setCookie from '@/utils/setCookie'

const state = {
  redDotList: {
    [constVar.RED_DOT_HOME_BEST]: {
      hasRead: false,
      unRead: false
    },
    [constVar.RED_DOT_HOME_NEW]: {
      hasRead: false,
      unRead: false
    },
    [constVar.RED_DOT_GAME_HOT]: {
      hasRead: false,
      unRead: false
    },
    [constVar.RED_DOT_GAME_NEW]: {
      hasRead: false,
      unRead: false
    },
    [constVar.RED_DOT_HOME_INFO_NEWS]: {
      hasRead: false,
      unRead: false
    },
    [constVar.RED_DOT_HOME_INFO_EVENT]: {
      hasRead: false,
      unRead: false
    },
    [constVar.RED_DOT_PERSONAL_MSG]: {
      hasRead: false,
      unRead: false
    },
    [constVar.RED_DOT_PERSONAL_SERVICE]: {
      hasRead: false,
      unRead: false
    }
  },
  currenRedDot: null,
  shortcutReddot: 0,
  shareReddot: 0
}

const getter = {}

const actions = {
  /**
   * 显示红点
   * @desc 红点显示逻辑重构
   * @date 2018.08.29
   * @author Dicky
   * @param {Array} redDotArr 红点推送的数组
   * @example dispatch('showRedDot',[红点提醒的数组])
   */
  showRedDot ({ dispatch, commit, state }, redDotObj) {
    const redDotList = state.redDotList
    // 把cookie中的红点缓存到状态管理器中
    for (let key in redDotList) {
      if (!isNull(getCookie(key))) {
        redDotList[key] = JSON.parse(getCookie(key))
        commit(muTypes.SET_RED_DOT, { redDotLoca: key, curRedDotObj: redDotList[key] })
      }
    }
    // 对新推的红点进行处理
    const pushTargetType = +redDotObj.pushTargetType
    const redDotLocation = redDotObj.redDotLocation
    let redDotLoca = constVar.RED_DOT_LOCATION + redDotLocation
    // 获取cookie中的红点 obj
    let redDotObjFromCookie = null
    let curRedDotObj = redDotList[redDotLoca]
    // 如果有红点的记录就存到state中
    if (!isNull(getCookie(redDotLoca))) {
      redDotObjFromCookie = JSON.parse(getCookie(redDotLoca))
      curRedDotObj = redDotObjFromCookie
    }

    // 记录当前红点的redDotLocation到vuex的obj中,方便日后识别
    curRedDotObj.redDotLocation = redDotLocation

    switch (pushTargetType) {
      case constVar.RED_DOT_COMMON:
        // 当前推送的pushId小于或等于cookie中的pushId，则不做操作
        if (curRedDotObj.pushId && curRedDotObj.pushId >= redDotObj.pushId) break

        curRedDotObj.pushId = redDotObj.pushId
        // 记录显示状态
        curRedDotObj.hasRead = true
        // 记录真实已读状态
        curRedDotObj.unRead = true
        break
      case constVar.RED_DOT_ONE2ONE:
        // 当前推送的pushId小于或等于cookie中的pushId，则不做操作
        if (curRedDotObj.pPushId && curRedDotObj.pPushId > redDotObj.pushId) break
        if (curRedDotObj.pPushId) {
          dispatch('changeRedDotStatus', { redDotLoca, ignore: false })
        }
        curRedDotObj.pPushId = redDotObj.pushId
        curRedDotObj.hasRead = true
        curRedDotObj.unRead = true
        break
    }
    // 同步到状态管理和cookie中
    commit(muTypes.SET_RED_DOT, { redDotLoca, curRedDotObj })
    setCookie(redDotLoca, JSON.stringify(curRedDotObj))

    // 当前浏览的页面不出现红点
    if (state.currenRedDot !== null) {
      let redDotLoca = state.currenRedDot
      let curRedDotObj = redDotList[state.currenRedDot]
      curRedDotObj.hasRead = false
      curRedDotObj.unRead = false
      commit(muTypes.SET_RED_DOT, { redDotLoca, curRedDotObj })
      setCookie(redDotLoca, JSON.stringify(curRedDotObj))
    }
  },

  /**
   * 去掉红点
   * @desc 去掉红点逻辑重构
   * @date 2018.08.29
   * @author Dicky
   * @param {Object}
   * @param {String} redDotLoca
   * @param {Boolean} ignore
   * @example import * as constVar from '@/config/const'
   *          this.$store.dispatch('changeRedDotStatus', {redDotLoca: constVar.RED_DOT_GAME_HOT})
   */
  changeRedDotStatus ({ commit, state, rootState }, { redDotLoca, ignore = true }) {
    if (redDotLoca && ignore) {
      commit(muTypes.SET_CURRENT_RED_DOT, { currenRedDot: redDotLoca })
    } else {
      commit(muTypes.SET_CURRENT_RED_DOT, { currenRedDot: null })
    }
    const curRedDotObj = state.redDotList[redDotLoca]
    // 如果已读则不做任何操作
    if (!(curRedDotObj.unRead || curRedDotObj.hasRead)) return false

    // 已登录则调用红点已读接口
    if (rootState.user.isLogin && curRedDotObj.pPushId) {
      const clientId = rootState.user.userObj.clientId
      const userToken = rootState.user.userObj.h5Token
      const userId = rootState.user.userObj.userId
      const obj = {
        clientId,
        userToken,
        userId,
        pushId: curRedDotObj.pPushId
      }
      setRedDotRead(obj)
    }

    // 不论是全体推送还是个人推送都标记为已读
    curRedDotObj.hasRead = false
    curRedDotObj.unRead = false

    // 同步到状态管理和cookie中
    commit(muTypes.SET_RED_DOT, { redDotLoca, curRedDotObj })
    setCookie(redDotLoca, JSON.stringify(curRedDotObj))
  },

  clearRedDotFilter ({ commit, state }) {
    if (state.currenRedDot) {
      commit(muTypes.CLEAR_RED_DOT_FILTER)
    }
  }
}

const mutations = {
  [muTypes.SET_RED_DOT]: (state, obj) => {
    state.redDotList[obj.redDotLoca] = obj.curRedDotObj
  },
  [muTypes.SET_CURRENT_RED_DOT]: (state, { currenRedDot }) => {
    state.currenRedDot = currenRedDot
  },
  [muTypes.CLEAR_RED_DOT_FILTER]: state => {
    state.currenRedDot = null
  },
  changeGameRedDotStatus: (state, { redDotLoca, ReddotStatus }) => {
    state[redDotLoca] = ReddotStatus
  }
}

export default {
  state,
  getter,
  actions,
  mutations
}
