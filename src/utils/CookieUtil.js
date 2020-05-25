import getCookie from '@/utils/getCookie'
import setCookie from '@/utils/setCookie'
import AesUtil from '@/utils/AesUtil'
import { WING_DOMAIN } from '@/config/env'
import { CLIENT_ID } from '@/config/const'
import StoreUtil from '@/utils/StoreUtil'

var cookieUtil = new CookieUtil()

var COOKIE_H5TOKEN = 'cookie1'
var COOKIE_SDKTOKEN = 'cookie2'
var COOKIE_SDKUSERID = 'cookie3'
var COOKIE_LOGINPLATFORM = 'cookie4'
function CookieUtil () {
    console.log('.....................CookieUtil init.....................')
    this.iv = '77230e94b5cd88d51a872031531bfecd' // md5('h5')
    this.salt = '77230e94b5cd88d51a872031531bfecd'
    this.iterationCount = 1000
    this.keySize = 128 // 密钥长度
    this.userId = ''
    this.clientId = ''

    this.getInstance = function(){
        if(!cookieUtil){
            cookieUtil = new CookieUtil()
        }
  
        return cookieUtil
    }
}

CookieUtil.prototype.setEncryptH5Token2Cookie = function (value, expiredDates) {
    setCookie(COOKIE_H5TOKEN, value, expiredDates)
}

CookieUtil.prototype.setEncryptSdkToken2Cookie = function (value, expiredDates) {
    setCookie(COOKIE_SDKTOKEN, value, expiredDates)
}

CookieUtil.prototype.setSdkUserId2Cookie = function (value, expiredDates) {
    setCookie(COOKIE_SDKUSERID, value, expiredDates)
}

CookieUtil.prototype.setLoginPlatform2Cookie = function (value, expiredDates) {
    setCookie(COOKIE_LOGINPLATFORM, value, expiredDates)
}
CookieUtil.prototype.getH5TokenFromCookie = function () {
    return getCookie(COOKIE_H5TOKEN)
}

CookieUtil.prototype.getSdkTokenFromCookie = function () {
    return getCookie(COOKIE_SDKTOKEN)
}

CookieUtil.prototype.getDecryptH5TokenFromCookie = function (originH5Token) {
    var decryptH5Token = ''

    var h5Token = ''
    if(originH5Token){
        h5Token = originH5Token
    }else{
        h5Token = getCookie(COOKIE_H5TOKEN)
    }
    console.log('---h5Token---', h5Token);

    if(h5Token){
      var aesUtil = new AesUtil(this.keySize, this.iterationCount)
      
    //   if(!this.userId){
      this.userId = getCookie(COOKIE_SDKUSERID)
    //   }
      console.log('userId:::::::::::', getCookie(COOKIE_SDKUSERID))

    //   if(!this.clientId){
      this.clientId = StoreUtil.getInstance().getItemFromLSCookie(CLIENT_ID)
    //   }

      decryptH5Token = aesUtil.decrypt(this.salt, this.iv, this.clientId+''+this.userId, h5Token)
      // 如果解密不成功，获取到空字符串，则返回原来的值；这个场景适用于手机
      // 二维码扫描直接登录，后端获取不到clientId，会返回原始h5Token
      // 此时cookie会保存原始h5Token，此时会进行二次登录，之后后端
      // 可以获取到clientId，则会返回加密后的h5Token，客户端cookie会被覆盖
      if(decryptH5Token){
          return decryptH5Token
      } else {
          return h5Token
      }
    }
}

CookieUtil.prototype.getDecryptSdkTokenFromCookie = function (originSdkToken) {
    var decryptSdkToken = ''

    var sdkToken = ''
    if(originSdkToken){
        sdkToken = originSdkToken
    }else{
        sdkToken = getCookie(COOKIE_SDKTOKEN)
    }
    console.log('---sdkToken---', sdkToken);

    if(sdkToken){
      var aesUtil = new AesUtil(this.keySize, this.iterationCount)

    //   if(!this.clientId){
      this.clientId = StoreUtil.getInstance().getItemFromLSCookie(CLIENT_ID)
    //   }

      decryptSdkToken = aesUtil.decrypt(this.salt, this.iv, this.clientId, sdkToken)
      // 原理类似h5Token
      if(decryptSdkToken){
          return decryptSdkToken
      } else {
          return sdkToken
      }
    }

    // CookieUtil.prototype.getInstance = function(){
    //     if(!cookieUtil){
    //         cookieUtil = new CookieUtil()
    //     }
  
    //     return cookieUtil
    // }
}

CookieUtil.prototype.getLoginPlatformFromCookie = function () {
    return getCookie(COOKIE_LOGINPLATFORM)
}

CookieUtil.prototype.getSdkUserIdFromCookie = function () {
    return getCookie(COOKIE_SDKUSERID)
}

CookieUtil.prototype.clearLoginInfo = function(){
    const EXPIRED_TIME = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ";domain=" + WING_DOMAIN + ";path=/"
    document.cookie = COOKIE_H5TOKEN+EXPIRED_TIME;
    document.cookie = COOKIE_SDKTOKEN+EXPIRED_TIME;
    document.cookie = COOKIE_SDKUSERID+EXPIRED_TIME;
    document.cookie = COOKIE_LOGINPLATFORM+EXPIRED_TIME;
}

CookieUtil.prototype.clearCookie = function(cookieName){
    const EXPIRED_TIME = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ";domain=" + WING_DOMAIN + ";path=/"
    document.cookie = cookieName+EXPIRED_TIME;
}



export default cookieUtil
