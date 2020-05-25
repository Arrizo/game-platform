function getCurrentOs () {
  var system = {}

  var ua = navigator.userAgent
  // 检测平台
  var p = navigator.platform
  if (p.indexOf('Win') === 0) {
    system.windows = p.indexOf('Win') === 0
  }
  if (p.indexOf('Mac') === 0) {
    system.mac = p.indexOf('Mac') === 0
  }
  if (p.indexOf('Xll') === 0 || p.indexOf('Linux') === 0) {
    system.linux = (p.indexOf('Xll') === 0 || p.indexOf('Linux') === 0)
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
      system.ios = (RegExp['$1'].replace(/_/g, '.'))
    } else {
      system.ios = 'unknown' // 不能真正检测出来，所以只能猜测
    }
  }
  // 检测Android版本
  if (/Android ((\d+\.)*\d+)/i.test(ua)) {
    system.android = (RegExp['$1'])
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

export default getCurrentOs
