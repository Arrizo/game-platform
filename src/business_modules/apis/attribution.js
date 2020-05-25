import CryptoJS from 'crypto-js'
// import getCookie from '@/utils/getCookie.js'
import * as BrowserUtils from '@/utils/BrowserUtils.js'
import * as env from '@/config/env.js'
import * as services from '@/business_modules/apis/services'
import * as anConst from '@/config/analyticsConst.js'
import { SET_USER_INFO } from '@/store/mutationTypes'
import StoreUtil from '@/utils/StoreUtil'
import { API_PATH } from '@/config/env'
import * as constVar from '@/config/const'
import browerPlatform from 'platform'

var userObj = {}
export function setUser (store) {
  store.subscribe((mutation, state) => {
    if (mutation.type === SET_USER_INFO) {
      userObj = state.user.userObj
    }
  })
}

export function attribution () {
  const lp = StoreUtil.getItemFromLSCookie(anConst.LP) || '_unknown'
  const h5ChannelId = StoreUtil.getItemFromLSCookie(anConst.H5_CHANNEL_ID) || '_organic'
  const subChannelId = StoreUtil.getItemFromLSCookie(anConst.SUBCHANNEL_ID) || '_unknown'
  const appId = env.ghwAppId || '_unknown'
  const userId = userObj.userId || '-1'

  const clientId = StoreUtil.getItemFromLSCookie(constVar.CLIENT_ID) || '_unknown'
  const tz = BrowserUtils.getTimeZone() || '_unknown'
  const os = BrowserUtils.getSystem() || '_unknown'
  const osVersion = BrowserUtils.getSystemVersion() || '_unknown'
  const sdkVersion = env.loginParam.sdkVer || '_unknown'

  const sdkType = env.loginParam.sdkType || '_unknown'
  const sdkTime = new Date().getTime() || '_unknown'

  const platform = env.loginParam.runPlatform || '_unknown'
  const browser = browerPlatform.name || '_unknown'
  const browserVersion = browerPlatform.version || '_unknown'
  const salt = '77230e94b5cd88d51a872031531bfecd'

  let osignOri = ''

  if (lp && lp !== '_unknown') {
    osignOri = osignOri + lp
  }

  if (h5ChannelId && h5ChannelId !== '_unknown') {
    osignOri = osignOri + h5ChannelId
  }

  if (subChannelId && subChannelId !== '_unknown') {
    osignOri = osignOri + subChannelId
  }

  if (appId && appId !== '_unknown') {
    osignOri = osignOri + appId
  }

  if (userId && userId !== '_unknown') {
    osignOri = osignOri + userId
  }

  if (clientId && clientId !== '_unknown') {
    osignOri = osignOri + clientId
  }

  if (tz && tz !== '_unknown') {
    osignOri = osignOri + tz
  }

  if (os && os !== '_unknown') {
    osignOri = osignOri + os
  }

  if (osVersion && osVersion !== '_unknown') {
    osignOri = osignOri + osVersion
  }

  if (sdkVersion && sdkVersion !== '_unknown') {
    osignOri = osignOri + sdkVersion
  }

  if (sdkType && sdkType !== '_unknown') {
    osignOri = osignOri + sdkType
  }

  if (sdkTime && sdkTime !== '_unknown') {
    osignOri = osignOri + sdkTime
  }

  if (platform && platform !== '_unknown') {
    osignOri = osignOri + platform
  }

  if (browser && browser !== '_unknown') {
    osignOri = osignOri + browser
  }

  if (browserVersion && browserVersion !== '_unknown') {
    osignOri = osignOri + browserVersion
  }

  if (salt && salt !== '_unknown') {
    osignOri = osignOri + salt
  }

  const osign = CryptoJS.MD5(osignOri).toString()

  let obj = {
    appId,
    h5ChannelId,
    lp,
    subChannelId,
    userId,
    clientId,
    sdkVersion,
    sdkType,
    sdkTime,
    platform,
    tz,
    os,
    osVersion,
    browser,
    browserVersion,
    osign
  }
  goFetch(obj)
}

function goFetch (obj) {
  obj.v = new Date().getTime()
  console.log('attribution attribution attribution attribution attribution ')
  services.analyticsApi(API_PATH + '/api/analytics/source/attribution', obj, 'GET').then(
    function (response) {
      // 链接失败，重新重试
      if (parseInt(response.code) !== constVar.API_CODE_SUCC) {
        setTimeout(function () {
          goFetch(obj)
        }, 10 * 1000)
      }
    },
    function (err) {
      if (err) {
        setTimeout(function () {
          goFetch(obj)
        }, 10 * 1000)
      }
    }
  )
}
