import CryptoJS from 'crypto-js'
// import getCookie from '@/utils/getCookie.js'
import * as BrowserUtils from '@/utils/BrowserUtils.js'
import * as env from '@/config/env.js'
import * as services from '@/business_modules/apis/services'
import * as anConst from '@/config/analyticsConst.js'
import {
  SET_USER_INFO
} from '@/store/mutationTypes'
import StoreUtil from '@/utils/StoreUtil'
import {
  API_PATH
} from '@/config/env'
import * as constVar from '@/config/const'

var userObj = {}
export function setUser (store) {
  store.subscribe((mutation, state) => {
    if (mutation.type === SET_USER_INFO) {
      userObj = state.user.userObj
    }
  })
}

export function viewPage (pageId, pageName) {
  // const anValObj = storeUtil.getItemFromLSCookie(anConst.ANALYTICS_VALUE)
  // const anValObj = {
  //   [anConst.H5_CHANNEL_ID]: 'h5ChannelId',
  //   [anConst.LP]: 'lp',
  //   [anConst.subchannel]: 'subchannel'

  // }
  const event = anConst.GHW_H5_VIEW_PAGE || '_unknown'
  const appId = env.ghwAppId || '_unknown'
  const h5ChannelId = StoreUtil.getItemFromLSCookie(anConst.H5_CHANNEL_ID) || '_organic'
  const lp = StoreUtil.getItemFromLSCookie(anConst.LP) || '_unknown'
  const subchannel = StoreUtil.getItemFromLSCookie(anConst.SUBCHANNEL_ID) || '_unknown'
  const userId = userObj.userId || -1

  const fingerId = StoreUtil.getItemFromLSCookie(constVar.CLIENT_ID) || '_unknown'
  const sdkVersion = env.loginParam.sdkVer || '_unknown'
  const sdkType = env.loginParam.sdkType || '_unknown'
  const sdkTime = new Date().getTime() || '_unknown'
  const platform = env.loginParam.runPlatform || '_unknown'
  const targetPageId = pageId

  const targetPageName = pageName || '_unknown'
  const tz = BrowserUtils.getTimeZone() || '_unknown'
  const os = BrowserUtils.getSystem() || '_unknown'
  const osVersion = BrowserUtils.getSystemVersion() || '_unknown'
  const browser = BrowserUtils.getPlatformBrowerName() || '_unknown'
  const browserVersion = BrowserUtils.getPlatformBrowerVersion() || '_unknown'
  const salt = '77230e94b5cd88d51a872031531bfecd'

  console.log('H5_CHANNEL_ID:::', StoreUtil.getItemFromLSCookie(anConst.H5_CHANNEL_ID))
  console.log('LP:::', StoreUtil.getItemFromLSCookie(anConst.LP))
  console.log('SUBCHANNEL:::', StoreUtil.getItemFromLSCookie(anConst.SUBCHANNEL_ID))
  let osignOri = ''

  if (event && event !== '_unknown') {
    osignOri = osignOri + event
  }

  if (appId && appId !== '_unknown') {
    osignOri = osignOri + appId
  }

  if (h5ChannelId && h5ChannelId !== '_unknown') {
    osignOri = osignOri + h5ChannelId
  }

  if (lp && lp !== '_unknown') {
    osignOri = osignOri + lp
  }

  if (subchannel && subchannel !== '_unknown') {
    osignOri = osignOri + subchannel
  }

  if (userId && userId !== '_unknown') {
    osignOri = osignOri + userId
  }

  if (fingerId && fingerId !== '_unknown') {
    osignOri = osignOri + fingerId
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

  if (targetPageId > -1 && targetPageId !== '_unknown') {
    osignOri = osignOri + targetPageId
  }

  if (targetPageName && targetPageName !== '_unknown') {
    osignOri = osignOri + targetPageName
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

  if (browser && browser !== '_unknown') {
    osignOri = osignOri + browser
  }

  if (browserVersion && browserVersion !== '_unknown') {
    osignOri = osignOri + browserVersion
  }

  if (salt && salt !== '_unknown') {
    osignOri = osignOri + salt
  }

  console.log('osignOri:::::', osignOri)
  const osign = CryptoJS.MD5(osignOri).toString()

  let obj = {
    event,
    appId,
    h5ChannelId,
    lp,
    subchannel,
    userId,
    fingerId,
    sdkVersion,
    sdkType,
    sdkTime,
    platform,
    context: {
      targetPageId,
      targetPageName,
      tz,
      os,
      osVersion,
      browser,
      browserVersion
    },
    osign
  }
  fetch(obj)
}

function fetch (obj) {
  services.analyticsApi(API_PATH + '/api/analytics/source/tracking', obj, 'POST').then(
    function (response) {
      console.log('services response:::', response)
      if (response.code !== constVar.API_CODE_SUCC) {
        setTimeout(function () {
          fetch(obj)
        }, 1 * 60 * 1000)
      }
    },
    function (err) {
      console.log('services::::', err)
      if (err) {
        setTimeout(function () {
          fetch(obj)
        }, 1 * 60 * 1000)
      }
    }
  )
}
