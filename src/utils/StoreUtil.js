import setCookie from '@/utils/setCookie'
import getCookie from '@/utils/getCookie'

var storeUtil = new StoreUtil()
var expiredDates = 10000


function StoreUtil() {
  console.log('.....................StoreUtil init.....................')
  this.getInstance = function () {
    if (!storeUtil) {
      storeUtil = new StoreUtil()
    }
    return storeUtil
  }
}

/**
 * 如果localStorage不可用，则使用cookie代替
 * @param {键} key 
 * @param {值} value 
 */
StoreUtil.prototype.setItemToLSCookie = function (key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.warn('---private mode---', error)
    setCookie(key, value, expiredDates)
  }
}

/**
 * 如果localStorage获取不到值，尝试从cookie中获取
 * @param {键} key 
 */
StoreUtil.prototype.getItemFromLSCookie = function (key) {
  var result = localStorage.getItem(key)
  if (!result) {
    result = getCookie(key)
  }
  return result
}
/**
 * 如果localStorage获取不到值，尝试从cookie中获取
 * @param {键} key 
 */
StoreUtil.prototype.removeItemFromLSCookie = function (key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    setCookie(key, "", -1)
  }
}
/**
 * 如果sessionStorage不可用，则使用cookie代替
 * @param {键} key 
 * @param {值} value 
 */
StoreUtil.prototype.setItemToSSCookie = function (key, value) {
  try {
    sessionStorage.setItem(key, value)
  } catch (error) {
    console.warn('---private mode---', error)
    setCookie(key, value, expiredDates)
  }
}

/**
 * 如果sessionStorage获取不到值，尝试从cookie中获取
 * @param {键} key 
 */
StoreUtil.prototype.getItemFromSSCookie = function (key) {
  var result = sessionStorage.getItem(key)
  if (!result) {
    result = getCookie(key)
  }

  return result
}


export default storeUtil
