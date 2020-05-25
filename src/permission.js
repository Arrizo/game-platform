import router from './router'
import store from './store'
import CookieUtil from '@/utils/CookieUtil'
import loginBox from '@/containers/PersonalCenter/Login/index.js'

import {
  viewPage
} from '@/business_modules/apis/viewPage'

import {
  attribution
} from '@/business_modules/apis/attribution'
import StoreUtil from '@/utils/StoreUtil'
// import * as BrowserUtils from '@/utils/BrowserUtils'

// const whiteList = ['/login'] // 不重定向白名单
const blackList = [] // 黑名单
const greyList = ['IframeWrapper'] // 灰名单

const pushViewPage = to => {
  if (typeof to.meta.pageId !== 'undefined') {
    setTimeout(function () {
      // 页面统计
      viewPage(to.meta.pageId, to.meta.pageName)
    }, 800)
  }
}

router.beforeEach((to, from, next) => {
  console.log('from'.padEnd(10, '=') + from.path)
  console.log('to'.padEnd(10, '=') + to.path)
  const winLocation = window.location
  // 第一次分享外链进来时，如果search中带有 `shareType` 则重新拼成 `vue-router` 的方式进行重定向
  if (~winLocation.search.indexOf('shareType')) {
    window.location.href = winLocation.origin + winLocation.pathname + winLocation.hash + winLocation.search
    return
  }
  // 如果是微端进来，则记录微端状态
  if (~winLocation.search.indexOf('miniClient')) {
    window.location.href = winLocation.origin + winLocation.pathname + winLocation.hash + winLocation.search
    return
  }
  if (to.query.miniClient) {
    StoreUtil.setItemToLSCookie('miniClient', to.query.miniClient)
    // store.commit('setminiClient', to.query.miniClient)
    next({
      name: 'Home'
    })
  }
  // 如果是 `share`，则进行重定向
  if (to.query.shareType) {
    for (let queryKey of Object.keys(to.query)) {
      const queryValue = to.query[queryKey]
      StoreUtil.setItemToLSCookie(queryKey, queryValue)
    }
    // 如果lp和channelId都存在的情况才上报attribution,有lp和channelId的都属于渠道上报，属于归因的一种
    if (to.query.lp && to.query.channelId) {
      attribution()
    }
    if (to.query.shareType === '0') {
      next({
        name: 'Home'
      })
    } else if (to.query.shareType === '1') {
      // `shareType === 1` 代表进入游戏页 `auth`

      store.dispatch('setShareChannelStatus', {
        isShareChannel: true
      })

      next({
        name: 'Login',
        query: {
          appId: to.query.appId
        }
      })
    }
    return
  }

  // 清除红点拦截标记
  store.dispatch('clearRedDotFilter')

  const token = CookieUtil.getInstance().getDecryptH5TokenFromCookie()
  if (~blackList.indexOf(to.name)) {
    // 黑名单
    next(false)
    // 阻断并弹出提示
  } else if (~greyList.indexOf(to.name)) {
    // 灰名单
    if (!from.name && to.name === 'IframeWrapper') {
      const toQuery = to.query
      // 第一次进入且进入游戏 ==> 跳转至auth游戏踏板
      next({
        name: 'Login',
        query: toQuery
      })
    } else {
      // 不是第一次进入进行 token 校验
      if (token) {
        pushViewPage(to)
        next()
      } else {
        next(false)
        // 阻断 并弹出登录页
        loginBox().then().catch(err => console.log(err))
      }
    }
  } else {
    // 白名单
    if (from.name === 'IframeWrapper' && to.name === 'Login') {
      // 外链进入，游戏回退到login.vue
      next({
        name: 'Home',
        replace: true
      })
    } else {
      pushViewPage(to)
      next()
    }
  }
})
