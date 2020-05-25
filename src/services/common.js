import fetch from '@/utils/fetch'
/* eslint-disable no-unused-vars */
import {
  API_PATH
} from '../config/env'
/* eslint-able */

// 获取游戏客户端国际化显示文字
export const getI18nDic = (jsonObj) => fetch(API_PATH + '/api/guest/client/i18n', jsonObj, 'GET')

// 获取游戏详情
export const getAppDetail = (jsonObj) => fetch(API_PATH + '/api/guest/app/detail', jsonObj, 'GET')

// 获取游戏相关资讯详情
export const getAppNewsList = (jsonObj) => fetch(API_PATH + '/api/guest/app/newslist', jsonObj, 'GET')

// 获取搜索热词
export const getHotAppList = (jsonObj) => fetch(API_PATH + '/api/guest/app/hotapplist', jsonObj, 'GET')

// 获取搜索结果列表
export const getAppSearchList = (jsonObj) => fetch(API_PATH + '/api/guest/app/search', jsonObj, 'GET')

// 埋点接口
export const sendEvent2Server = (jsonObj) => {
  jsonObj.clientId = window.localStorage.clientId
  return fetch(API_PATH + '/api/user/event/h5client', jsonObj, 'GET')
}

// 红点推送一对一推送的接口
export const setRedDotRead = (jsonObj) => fetch(API_PATH + '/api/user/push/read', jsonObj, 'GET')

// 同意隐私政策
export const agreePrivacyPolicy = (jsonObj) => fetch(API_PATH + '/api/user/privacy/agree', jsonObj, 'GET')

// 获取分享相关信息
export const getShareInfo = (jsonObj) => fetch(API_PATH + '/api/guest/share/info', jsonObj, 'GET')

// 主动查询红点显示状态
export const getIconStateQuery = (jsonObj) => fetch(API_PATH + '/api/user/iconstate/query', jsonObj, 'GET')

// 更改红点显示状态
export const setIconState = (jsonObj) => fetch(API_PATH + '/api/user/iconstate/save', jsonObj, 'GET')
