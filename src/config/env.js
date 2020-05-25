/**
 * 配置多个环境
 */

// 接口代理地址前缀
let API_PATH = ''

// iframe协议
let PROTOCOL = ''

// iframe根路径
let IFRAME_PATH = ''

// cookie的domain
let WING_DOMAIN = ''

// QA环境不加载外部文件
// VPN是否打开，本地qa环境是关闭的，0-关，1-开
let VPN_ENABLE_VALUE = ''

// facebook 第三方登录
let fbParam = {}

// google 第三方登录
let ggParam = {}

let loginParam = {
  sdkVer: '1.0',
  sdkType: 'html5',
  runPlatform: 'html5'
}

// sdk的appid
let ghwAppId = ''

// 静态资源的路径
let STATIC_PATH = ''

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  // facebook 第三方登录
  fbParam.appId = '946129458872908' // dev
  fbParam.apiVer = 'v2.10'
  // 境外测试环境
  // fbParam.appId = '148648535580091'
  // fbParam.apiVer = 'v2.11'

  // google 第三方登录
  // ggParam.clientId = '15309153268-3jt2c5gbqvid30v9r9m3t023ik41plf8.apps.googleusercontent.com'
  // ggParam.cookiePolicy = 'single_host_origin'
  // ggParam.scope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'

  ggParam.clientId = '15309153268-3jt2c5gbqvid30v9r9m3t023ik41plf8.apps.googleusercontent.com'
  ggParam.cookiePolicy = 'single_host_origin'
  ggParam.scope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'

  // appId
  ghwAppId = '2e980e8130ae11e88f638aaa721891f8'

  // API接口请求地址
  // API_PATH = 'http://172.16.100.165'
  API_PATH = '//172.16.100.161'
  // API_PATH = 'http://pre.wingsdk.com'

  // iframe协议
  PROTOCOL = '//'

  // iframe根路径
  IFRAME_PATH = '/#'

  // 静态资源的路径
  STATIC_PATH = './'

  // cookie的domain
  WING_DOMAIN = document.domain

  // QA环境不加载外部文件
  // VPN是否打开，本地qa环境是关闭的，0-关，1-开
  VPN_ENABLE_VALUE = 1
} else if (process.env.BUILD_ENV === 'development') {
  // 打包后的开发环境
  // facebook 第三方登录
  fbParam.appId = '946129458872908' // dev
  fbParam.apiVer = 'v2.10'

  // google 第三方登录
  ggParam.clientId = '15309153268-3jt2c5gbqvid30v9r9m3t023ik41plf8.apps.googleusercontent.com'
  ggParam.cookiePolicy = 'single_host_origin'
  ggParam.scope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'

  // appId
  ghwAppId = '2e980e8130ae11e88f638aaa721891f8'

  // API接口请求地址
  // API_PATH = 'http://172.16.100.51'
  API_PATH = 'http://172.16.100.161'

  // iframe协议
  PROTOCOL = 'http://'

  // iframe根路径
  IFRAME_PATH = '/mobile/#'

  // 静态资源的路径
  STATIC_PATH = './'

  // cookie的domain
  WING_DOMAIN = document.domain

  // QA环境不加载外部文件
  // VPN是否打开，本地qa环境是关闭的，0-关，1-开
  VPN_ENABLE_VALUE = 1
} else if (process.env.BUILD_ENV === 'qa') {
  // QA内部测试环境
  // facebook 第三方登录
  fbParam.appId = '148648535580091'
  fbParam.apiVer = 'v2.11'

  // google 第三方登录
  ggParam.clientId = '15309153268-3jt2c5gbqvid30v9r9m3t023ik41plf8.apps.googleusercontent.com'
  ggParam.cookiePolicy = 'single_host_origin'
  ggParam.scope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'

  // appId
  ghwAppId = '2e980e8130ae11e88f638aaa721891f8'

  // API接口请求地址
  API_PATH = 'http://172.16.100.165'

  // iframe协议
  PROTOCOL = 'http://'

  // iframe根路径
  IFRAME_PATH = '/mobile/#'

  // 静态资源的路径
  STATIC_PATH = './'

  // cookie的domain
  WING_DOMAIN = document.domain

  // QA环境不加载外部文件
  // VPN是否打开，本地qa环境是关闭的，0-关，1-开
  VPN_ENABLE_VALUE = 0
} else if (process.env.BUILD_ENV === 'production') {
  // 生产环境
  // facebook 第三方登录
  fbParam.appId = '170770377071340'
  fbParam.apiVer = 'v2.12'

  // google 第三方登录
  ggParam.clientId = '863456295468-lop50vpjge7laj7n9kjqqeg1pm3tnklg.apps.googleusercontent.com'
  ggParam.cookiePolicy = 'single_host_origin'
  ggParam.scope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'

  // appId
  ghwAppId = 'e19587963e0211e8952402c85f0429f5'

  // API接口请求地址
  API_PATH = 'https://api.chipsgames.com'

  // iframe协议
  PROTOCOL = 'https://'

  // iframe根路径
  IFRAME_PATH = '/mobile/#'

  // 静态资源的路径
  STATIC_PATH = 'https://cdn.chipsgames.com/h5client/'

  // cookie的domain
  WING_DOMAIN = 'chipsgames.com'

  // QA环境不加载外部文件
  // VPN是否打开，本地qa环境是关闭的，0-关，1-开
  VPN_ENABLE_VALUE = 1
} else if (process.env.BUILD_ENV === 'pre') {
  // 境外测试环境
  fbParam.appId = '148648535580091'
  fbParam.apiVer = 'v2.11'

  // google 第三方登录
  ggParam.clientId = '15309153268-3jt2c5gbqvid30v9r9m3t023ik41plf8.apps.googleusercontent.com'
  ggParam.cookiePolicy = 'single_host_origin'
  ggParam.scope = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'

  // appId
  ghwAppId = 'b3aac7413b0111e8b4c40211fa47f775'

  // API_PATH = 'http://35.166.110.202'
  API_PATH = 'https://pre.wingsdk.com'

  // iframe协议
  PROTOCOL = 'https://'

  // iframe根路径
  IFRAME_PATH = '/mobile/#'

  // 静态资源的路径
  STATIC_PATH = './'

  // cookie的domain
  WING_DOMAIN = 'pre.wingsdk.com'

  // QA环境不加载外部文件
  // VPN是否打开，本地qa环境是关闭的，0-关，1-开
  VPN_ENABLE_VALUE = 1
}

export {
  API_PATH,
  PROTOCOL,
  IFRAME_PATH,
  WING_DOMAIN,
  fbParam,
  ggParam,
  loginParam,
  ghwAppId,
  STATIC_PATH,
  VPN_ENABLE_VALUE
}
