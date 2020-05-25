import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import home from '@/store/modules/home'
import * as viewPage from '@/business_modules/apis/viewPage'
import * as attribution from '@/business_modules/apis/attribution'
import * as gameStart from '@/utils/gameStart'
import redDotPush from '@/store/modules/redDotPush'
// import fromQr from '@/router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    home,
    redDotPush
  },
  plugins: [viewPage.setUser, attribution.setUser, gameStart.setAccountFreeze]
})

export default store
