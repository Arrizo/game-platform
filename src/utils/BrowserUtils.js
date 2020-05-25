import platform from 'platform'

//检测浏览器版本
export function getBrowserVersion() {
  var agent = navigator.userAgent.toLowerCase()
  var arr = []
  var Browser = ''
  var Bversion = ''
  var verinNum = ''
  //IE
  if (agent.indexOf('msie') > 0) {
    var regStr_ie = /msie [\d.]+;/gi
    Browser = 'IE'
    Bversion = '' + agent.match(regStr_ie)
  }
  //firefox
  else if (agent.indexOf('firefox') > 0) {
    var regStr_ff = /firefox\/[\d.]+/gi
    Browser = 'firefox'
    Bversion = '' + agent.match(regStr_ff)
  }
  //Chrome
  else if (agent.indexOf('chrome') > 0) {
    var regStr_chrome = /chrome\/[\d.]+/gi
    Browser = 'chrome'
    Bversion = '' + agent.match(regStr_chrome)
  }
  //Safari
  else if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
    var regStr_saf = /version\/[\d.]+/gi
    Browser = 'safari'
    Bversion = '' + agent.match(regStr_saf)
  }
  //Opera
  else if (agent.indexOf('opera') >= 0) {
    var regStr_opera = /version\/[\d.]+/gi
    Browser = 'opera'
    Bversion = '' + agent.match(regStr_opera)
  } else {
    var browser = navigator.appName
    if (browser == 'Netscape') {
      var version = agent.split(';')
      var trim_Version = version[7].replace(/[ ]/g, '')
      var rvStr = trim_Version.match(/[\d\.]/g).toString()
      var rv = rvStr.replace(/[,]/g, '')
      Bversion = rv
      Browser = 'IE'
    }
  }
  verinNum = (Bversion + '').replace(/[^0-9.]/gi, '')
  arr.push(Browser)
  arr.push(verinNum)
  return arr
}

export function isMiniClient() {
  if (this.isMobileDevice() && navigator.userAgent.indexOf('wingMiniClient') > -1) {
    return true
  } else {
    return false
  }
}

//检测当前操作系统
export function CurrentSystem() {
  var system = {}
  var ua = navigator.userAgent
  // 检测平台
  var p = navigator.platform
  if (p.indexOf('Win') == 0) {
    system.windows = p.indexOf('Win') == 0
  }
  if (p.indexOf('Mac') == 0) {
    system.mac = p.indexOf('Mac') == 0
  }
  if (p.indexOf('Xll') == 0 || p.indexOf('Linux') == 0) {
    system.linux = p.indexOf('Xll') == 0 || p.indexOf('Linux') == 0
  }
  // 检测Windows操作系统
  if (system.windows) {
    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
      // system.windows = RegExp['$1'] + " " + RegExp['$2']
      system.windows = RegExp['$2']
    }
  }
  // 移动设备
  if (ua.indexOf('iPhone') > -1) {
    system.ios = ua.indexOf('iPhone') > -1
  }
  if (ua.indexOf('iPod') > -1) {
    system.ios = ua.indexOf('iPod') > -1
  }
  if (ua.indexOf('iPad') > -1) {
    system.ios = ua.indexOf('iPad') > -1
  }
  if (ua.indexOf('nokiaN') > -1) {
    system.nokiaN = ua.indexOf('nokiaN') > -1
  }
  // 检测IOS版本
  if (system.ios && ua.indexOf('Mobile') > -1) {
    if (/CPU (?:iPhone )?OS ((\d+_)*\d+)/i.test(ua)) {
      system.ios = RegExp['$1'].replace(/_/g, '.')
    } else {
      system.ios = 'unknown' // 不能真正检测出来，所以只能猜测
    }
  }
  // 检测Android版本
  if (/Android ((\d+\.)*\d+)/i.test(ua)) {
    system.android = RegExp['$1']
  }
  // 游戏系统
  if (ua.indexOf('Wii') > -1) {
    system.wii = ua.indexOf('Wii') > -1
  }
  if (/PlayStation/i.test(ua)) {
    system.ps = /PlayStation/i.test(ua)
  }
  return system
}

// 获取当前系统
export function getSystem() {
  var systemInfo = CurrentSystem()
  if (!systemInfo) {
    return null
  }
  var currSystem
  for (var k in systemInfo) {
    currSystem = k
  }
  return currSystem
}

// 获取当前系统版本
export function getSystemVersion() {
  return platform.os.version
}
export function getPlatformBrowerName() {
  return platform.name
}
export function getPlatformBrowerVersion() {
  return platform.version
}

// 检查是否移动设备
export function isMobileDevice() {
  var systemInfo = CurrentSystem()
  if (!systemInfo) {
    return false
  }
  var currSystem
  for (var k in systemInfo) {
    currSystem = k
  }
  if (util.inGhwMobileArray(currSystem)) {
    return true
  }
  return false
}

/**
 * 获取时区
 */
export function getTimeZone() {
  var tz = ''
  var tzVal = new Date().getTimezoneOffset() / 60
  if (tzVal > 0) {
    tz = '-0' + tzVal + '00'
  } else {
    tz = '+0' + Math.abs(tzVal) + '00'
  }
  return tz
}

//获取当前参数
export function getUrlParam(paramName) {
  var reg = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

// 获取URL上所有参数
export function getUrlParams(str) {
  let name, value
  // var str = location.href //取得整个地址栏
  let num = str.indexOf('?')
  let obj = {}
  str = str.substr(num + 1) //取得所有参数   stringvar.substr(start [, length ]

  let arr = str.split('&') //各个参数放到数组里
  for (var i = 0; i < arr.length; i++) {
    let index = arr[i].indexOf('=')
    if (index > 0) {
      name = arr[i].substring(0, index)
      value = arr[i].substr(index + 1)
      obj[name] = value
    }
  }
  return obj
}

/**
 * 后退功能
 * @module src/utils/BrowserUtils.js
 * @desc 判断上一级是否有历史记录，没有跳到首页
 * @author chenzechao
 * @date 2018-7-13
 * @example 调用示例
 *    historyBack()
 */
export function historyBack(isOutLink) {
  if (isOutLink) {
    // history.back() === undefined && this.$router.push({ name: 'Home' })
    history.go(-1) === undefined && this.$router.push({
      name: 'Home'
    })
    // ios不刷新的解决方案
    if (platform.os.family === 'iOS') {
      window.location.reload()
    }
  }
}

/**
 * 修改icon路径
 * @module src/utils/BrowserUtils.js
 * @desc 修改小icon的路径
 * @author Dicky
 * @date 2018-7-16
 * @example 调用示例
 *    changeBrowserIcon('https://cdn.chipsgames.com/h5client/static/static/img/favicon.ico')
 */
export function changeBrowserIcon(url) {
  var link = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'shortcut icon'
  link.href = url
  document.getElementsByTagName('head')[0].appendChild(link)
}

/**
 * ios游戏收藏的图标和名称
 * @module src/utils/BrowserUtils.js
 * @desc 动态生成ios游戏收藏的图标和名称
 * @author yanghuiru
 * @date 2018-7-26
 * @example 调用示例
 *    changeAddGameMeta(iconUrl,iconName)
 */
export function changeAddGameIcon(appIconUrl, appName) {
  var link = document.querySelector("link[rel ='apple-touch-icon']") || document.createElement('link')
  var meta = document.querySelector("meta[name ='apple-mobile-web-app-title']") || document.createElement('meta')
  link.rel = "apple-touch-icon"
  link.href = appIconUrl
  meta.name = "apple-mobile-web-app-title"
  meta.content = appName
  document.getElementsByTagName('head')[0].appendChild(link)
  document.getElementsByTagName('head')[0].appendChild(meta)
}

/**
 * 获取语言
 * @module src/utils/BrowserUtils.js
 * @desc 获取浏览器语言，浏览器的语言可能出现多种格式的返回值，如：“zh-CN”或“zh”这两种，我们需要统一处理作为请求参数请求接口
 * @author Dicky
 * @date 2018-7-16
 * @example 调用示例
 *    getLanguage()
 */
export function getLanguage() {
  // console.log(navigator.language.toString().replace(/-/,'_'))
  let language = navigator.language || navigator.userLanguage
  if (language.indexOf('-') > -1) {
    let languages = language.split('-')
    let lan0 = languages[0].toString()
    let lan1 = languages[1].toString()
    language = lan0.toLowerCase()
    language += '_'
    language += lan1.toUpperCase()
    return language
  }
  // language = language.toUpperCase()
  switch (language) {
    case 'zh':
      return 'zh_CN'
      break
    case 'en':
      return 'en_US'
      break
    default:
      return 'en_US'
      break
  }
}

/**
 * 是否移动端
 * @module src/utils/BrowserUtils.js
 * @desc 判断是否为移动端
 * @author Dicky
 * @date 2018-7-24
 * @example 调用示例
 *    isMobile()
 */
export function isMobile() {
  var browser = {
    versions: (function () {
      var u = navigator.userAgent,
        app = navigator.appVersion
      return {
        //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信
        qq: u.match(/\sQQ/i) == ' qq' //是否QQ
      }
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }

  let flag
  if (
    browser.versions.mobile ||
    browser.versions.ios ||
    browser.versions.android ||
    browser.versions.iPhone ||
    browser.versions.iPad
  ) {
    flag = true
  } else {
    flag = false
  }
  return flag
}

export function isiOS(){
  return platform.os.toString().indexOf('iOS') > -1
}