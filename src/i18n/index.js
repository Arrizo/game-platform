import Vue from 'vue'
import VueI18n from 'vue-i18n'

// import messagesCn from './languages/chinese'
import messagesEn from './languages/english'
import { getI18nDic } from '@/services'

Vue.use(VueI18n)

const messages = {
  'zh': {
    // message: messagesCn
  },
  'en': {
    message: messagesEn
  }
}
function getLanguage () {
  // const lang = navigator.language || navigator.userLanguage
  console.log('language::::', navigator.language)
  // TODO: 换成正则表达式
  // if (lang.indexOf('en') > -1) {
  //   return 'en'
  // } else if (lang.indexOf('zh') > -1) {
  //   return 'zh'
  // } else {
  //   return 'en'
  // }
  return 'en'
}

// 动态加载后台语言 zpinghuang 20180412
function loadDynamicLanguage () {
  var obj = {}
  getI18nDic(obj).then(res => {
    var msgObj = {}
    msgObj.message = res.data
    i18n.setLocaleMessage(getLanguage(), msgObj)
  })
}
// End
/* eslint-disable no-unused-vars */
const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})

loadDynamicLanguage() // 动态加载后台语言 zpinghuang 20180412

export default i18n
