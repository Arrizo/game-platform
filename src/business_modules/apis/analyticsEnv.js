import * as env from '@/config/env.js'
import * as BrowserUtils from '@/utils/BrowserUtils.js'
import StoreUtil from '@/utils/StoreUtil'
import * as constVar from '@/config/const'
import platform from 'platform'

const getSdkVer = () => {
  return env.loginParam.sdkVer || '_unknown'
}
const getSdkType = () => {
  return env.loginParam.sdkType || '_unknown'
}
const getOs = () => {
  return BrowserUtils.getSystem() || '_unknown'
}
const getClientId = () => {
  return StoreUtil.getItemFromLSCookie(constVar.CLIENT_ID) || '_unknown'
}
const getAppId = () => {
  return env.ghwAppId || '_unknown'
}
const getRunPlatform = () => {
  return env.loginParam.runPlatform || '_unknown'
}
const getBrowser = () => {
  return platform.name || '_unknown'
  // return BrowserUtils.getBrowserVersion()[0] || '_unknown'
}
const getBrowserVersion = () => {
  return platform.version || '_unknown'
  // return BrowserUtils.getBrowserVersion()[1] || '_unknown'
}
const getBrowserType = () => {
  const family = platform.os.family.toString()
  const product = platform.product || ''
  console.log('family:::', family)
  console.log('product:::', product)
  // 注意大小写
  // TODO: 微端，手机，pc的类型判断需要优化
  let miniClient = StoreUtil.getItemFromLSCookie('miniClient')
  if (miniClient) {
    return constVar.BROWSER_TYPE_FROM_MINICLIENT
  } else if (family.indexOf('iOS') > -1 || family.indexOf('Android') > -1 || family.indexOf('Tablet OS') > -1 || family.indexOf('Windows Phone') > -1 || family.indexOf('BlackBerry') > -1 || product.indexOf('iPad') > -1) {
    return constVar.BROWSER_TYPE_FROM_MB
  } else {
    return constVar.BROWSER_TYPE_FROM_PC
  }
}

export {
  getSdkVer,
  getSdkType,
  getOs,
  getClientId,
  getAppId,
  getRunPlatform,
  getBrowser,
  getBrowserVersion,
  getBrowserType
}
