import fetch from '@/utils/fetch'
import { API_PATH } from '../config/env'

// 获取资讯详情的页面

export const getInformation = (jsonObj) => fetch(API_PATH + '/api/guest/news/detail', jsonObj, 'GET')
// 个人中心-我的消息
export const getMyMessageList = (jsonObj) => fetch(API_PATH + '/api/user/notif/list', jsonObj, 'GET')
// 个人中心-消息详情页面
export const getMessageDetails = (jsonObj) => fetch(API_PATH + '/api/user/notif/detail', jsonObj, 'GET')
// 个人中心-删除消息
export const deleteMessage = (jsonObj) => fetch(API_PATH + '/api/user/notif/delete', jsonObj, 'GET')
