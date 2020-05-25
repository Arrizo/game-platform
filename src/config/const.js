export const SESSION_NICKNAME = 'nickname'
export const SESSION_ICON_URL = 'iconUrl'
export const SESSION_EMAIL = 'userEmail'
export const CLIENT_ID = 'clientId'
export const SESSION_IS_LOGIN = 'isLogin'
export const H5_API_FLAG_IS_FROM_QR = 'isFromQR'
export const LOCALSTORAGE_CLIENT = 'clientId'
export const COME_FROM_OUTER = 'comeFromOuter'
export const COOKIE_USER_STATUS = 'userStatus'
// 接口状态码
export const API_CODE_SUCC = 200
export const H5_API_CODE_TOKEN_INVALID = 401
export const SDK_API_CODE_TOKEN_EXPIRED = 4014

// 游戏下架提示类型
export const OUT_OF_STOCK = 1
export const IFRAME_OFF = 0
export const IFRAME_HORIZONTAL = 1
export const IFRAME_VERTICAL = 2

// 跑马灯类型
export const MARQUEE_TYPE_GAME = 0
export const MARQUEE_TYPE_NOTICE = 1
export const MARQUEE_TYPE_GUIDE = 2
export const MARQUEE_TYPE_EVENT = 3
export const MARQUEE_TYPE_OUT_LINK = 4
// 浏览器类型，0-移动端、1-pc端、2-微端，首次登录需要传，如果获取不到传-1
export const BROWSER_TYPE_FROM_MB = 0
export const BROWSER_TYPE_FROM_PC = 1
export const BROWSER_TYPE_FROM_MINICLIENT = 2

// 用户是否封号
export const USER_ACCOUNT_FREEZE = 0

// websocket推送类型
export const NOTIFICATION_TYPE_OTHER = -1
export const NOTIFICATION_TYPE_RED_DOT = 0
export const NOTIFICATION_TYPE_QRCODE = 1

// 红点推送默认前缀
export const RED_DOT_LOCATION = 'redDotLocation_'

// 红点推送类型
export const RED_DOT_COMMON = 0
export const RED_DOT_ONE2ONE = 1

// 红点位置的id
export const RED_DOT_HOME_BEST = 'redDotLocation_0'
export const RED_DOT_HOME_NEW = 'redDotLocation_1'
export const RED_DOT_GAME_HOT = 'redDotLocation_2'
export const RED_DOT_GAME_NEW = 'redDotLocation_3'
export const RED_DOT_HOME_INFO_NEWS = 'redDotLocation_4'
export const RED_DOT_HOME_INFO_EVENT = 'redDotLocation_5'
export const RED_DOT_PERSONAL_MSG = 'redDotLocation_6'
export const RED_DOT_PERSONAL_SERVICE = 'redDotLocation_7'

// 主动获取红点状态
export const RED_DOT_HIDDEN = 0
export const RED_DOT_SHOW = 1
