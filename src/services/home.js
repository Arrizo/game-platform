
import fetch from '@/utils/fetch'
/* eslint-disable no-unused-vars */
import { API_PATH } from '../config/env'
/* eslint-able */

// 获取游戏列表
export const getAppList = (jsonObj) => fetch(API_PATH + '/api/guest/app/list', jsonObj, 'GET')

// 获取首页资讯（与游戏无关）
export const getNewsList = (jsonObj) => fetch(API_PATH + '/api/guest/news/list', jsonObj, 'GET')

// 玩过的游戏列表
export const getPlayedList = (jsonObj) => {
  // jsonObj.userToken = '111sdfsef'
  return fetch(API_PATH + '/api/user/playedlist', jsonObj, 'GET')
}

// 跑马灯-获取跑马灯列表
export const getMarqueeList = (jsonObj) => fetch(API_PATH + '/api/guest/marquee/list', jsonObj, 'GET')

// 轮播图-获取轮播图列表
export const getSlideList = (jsonObj) => fetch(API_PATH + '/api/guest/slideshow/list', jsonObj, 'GET')

// 获取小游戏分类
export const getTypeList = (jsonObj) => fetch(API_PATH + '/api/guest/app/typelist', jsonObj, 'GET')

// 获取个人中心的信息
export const getPersonCenter = (jsonObj) => {
  // jsonObj.userToken = '111sdfsef'
  return fetch(API_PATH + '/api/user/profile/detail', jsonObj, 'GET')
}
