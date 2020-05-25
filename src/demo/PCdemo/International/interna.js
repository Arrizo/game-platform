import VueI18n from 'vue-i18n'
const messages = {
  zh: {
    message: {
      user: '你好！用户',
      QR: '二维码已失效',
      gift: '礼包',
      info: '资讯',
      server: '客服',
      desktop: '添加到桌面',
      now: '你正玩的是:',
      fresh: '点击刷新二维码',
      usercenter: '用户中心',
      userinfo: '信息',
      account: '切换账号'
    }
  },
  en: {
    message: {
      user: 'Hello! user',
      QR: 'The qr code has expired.',
      gift: 'Gift bag',
      info: 'information',
      server: 'service',
      desktop: 'Add to desktop',
      now: 'You\'re playing:',
      fresh: 'Click the refresh',
      usercenter: 'User center',
      userinfo: 'information',
      account: 'Switch account'
    }
  }
}
var lang = navigator.language || navigator.userLanguage
lang = lang.substr(0, 2)
lang = lang === 'zh' ? 'zh' : 'en'
const i18n = new VueI18n({
  locale: lang,
  messages
})
// 测试国际语言切换包
