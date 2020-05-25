import { SHOW_FOOTER, IS_TIPS_COOKIE, SHOW_SERVICE_DIOLAG, SERVICE_QUERY_ID } from '@/store/mutationTypes'

const state = {
  showFooterFlag: true,
  isTipsCookie: false,
  showServiceDiolag: false,
  queryId: 0
}

const actions = {
  showFooter ({commit, state}, flag) {
    commit(SHOW_FOOTER, flag)
  },
  changeTipsCookie ({commit, state}, flag) {
    commit(IS_TIPS_COOKIE, flag)
  },
  showServiceDiolag ({commit, state}, flag) {
    commit(SHOW_SERVICE_DIOLAG, flag)
  },
  changeQueryId ({commit, state}, queryId) {
    commit(SERVICE_QUERY_ID, queryId)
  }
}

const mutations = {
  [SHOW_FOOTER] (state, flag) {
    state.showFooterFlag = flag
  },
  [IS_TIPS_COOKIE] (state, flag) {
  },
  [SHOW_SERVICE_DIOLAG] (state, flag) {
    state.showServiceDiolag = flag
  },
  [SERVICE_QUERY_ID] (state, queryId) {
    state.queryId = queryId
  }
}

export default {
  state,
  actions,
  mutations
}
