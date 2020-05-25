// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import MintUI from 'mint-ui'
import i18n from '@/i18n'
import store from '@/store'
import 'mint-ui/lib/style.css'
import App from './App'
import * as CoreUtils from '@/utils/CoreUtils.js'
import * as BrowserUtils from '@/utils/BrowserUtils.js'
import 'lib-flexible/flexible.js'
import '@/assets/scss/base.scss'
import '@/assets/scss/style.scss'
import '@/assets/iconfont/iconfont.css'
import {
  STATIC_PATH
} from '@/config/env'
import LoginBox from './containers/PersonalCenter/Login/index.js'

// 路由拦截
import './permission'

const moment = require('moment')

Vue.config.productionTip = false
Vue.use(MintUI)

Vue.prototype.$loginBox = LoginBox

Vue.moment = Vue.prototype.$moment = moment

// 人气数值全局的过滤器
Vue.filter('popularity', function (value) { // 全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  let popularity = 0
  if (value < Math.pow(10, 3)) {
    popularity = value
  } else if (value >= Math.pow(10, 3) && value < Math.pow(10, 6)) {
    popularity = (value / Math.pow(10, 3)).toFixed(1) + 'K'
  } else if (value >= Math.pow(10, 6) && value < Math.pow(10, 9)) {
    popularity = (value / Math.pow(10, 6)).toFixed(1) + 'M'
  } else {
    popularity = (value / Math.pow(10, 9)).toFixed(1) + 'B'
  }
  return popularity
})
// 创建clinetId，需放在应用的入口创建
CoreUtils.creatClientId()

BrowserUtils.changeBrowserIcon(STATIC_PATH + 'static/img/favicon.ico')

console.log('navigator', location.search)
console.log('isLogin:::', store.state.user.isLogin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  moment,
  components: {
    App
  },
  template: '<App/>'
})
